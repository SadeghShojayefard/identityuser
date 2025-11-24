#!/usr/bin/env node

import fs from "fs/promises";
import path from "path";
import { fileURLToPath } from "url";

const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);

const PACKAGE_SRC = path.join(__dirname, "src", "identityUser");
const PROJECT_BASE = path.join(process.cwd(), "src");
let PROJECT_SRC = path.join(PROJECT_BASE, "identityUser");

const NEXTAUTH_ROUTE = path.join(PROJECT_BASE, "app", "api", "auth", "[...nextauth]", "route.ts");

async function ensureFolder(folder) {
    try {
        await fs.access(folder);
    } catch {
        await fs.mkdir(folder, { recursive: true });
        console.log(`ℹ️ Created folder: ${folder.replace(process.cwd() + path.sep, "")}`);
    }
}

async function findUniqueFolder(base) {
    let folder = base;
    let counter = 1;
    while (true) {
        try {
            await fs.access(folder);
            folder = `${base}_${counter++}`;
        } catch {
            return folder;
        }
    }
}

async function copyFolder(src, dest) {
    await fs.mkdir(dest, { recursive: true });
    const entries = await fs.readdir(src, { withFileTypes: true });

    for (const entry of entries) {
        const srcPath = path.join(src, entry.name);
        const destPath = path.join(dest, entry.name);

        if (entry.isDirectory()) {
            await copyFolder(srcPath, destPath);
        } else {
            await fs.copyFile(srcPath, destPath);
        }
    }
}

(async () => {
    try {
        console.log("🚀 Initializing identityUser in your project...");

        await ensureFolder(PROJECT_BASE);

        PROJECT_SRC = await findUniqueFolder(PROJECT_SRC);
        console.log(`📦 Creating folder: ${PROJECT_SRC.replace(process.cwd() + path.sep, "")}`);
        await copyFolder(PACKAGE_SRC, PROJECT_SRC);

        await ensureFolder(path.dirname(NEXTAUTH_ROUTE));
        const routeContent = `import NextAuth from "next-auth";\nimport { authOptions } from "../../../../identityUser/api/auth/[...nextauth]/options";\n\nexport const GET = NextAuth(authOptions);\nexport const POST = NextAuth(authOptions);`;
        await fs.writeFile(NEXTAUTH_ROUTE, routeContent);
        console.log(`✅ Created NextAuth route at: ${NEXTAUTH_ROUTE.replace(process.cwd() + path.sep, "")}`);

        console.log("✅ identityUser installed successfully!");
        console.log("📁 Location:", PROJECT_SRC);
    } catch (err) {
        console.error("❌ Error during installation:", err);
        process.exit(1);
    }
})();
