#!/usr/bin/env node

import fs from "fs/promises";
import path from "path";
import { fileURLToPath } from "url";

const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);

// Source folder inside package
const PACKAGE_SRC = path.join(__dirname, "src", "identityuser");

// Project base
const PROJECT_BASE = path.join(process.cwd(), "src");
let PROJECT_SRC = path.join(PROJECT_BASE, "identityuser");

// NextAuth route target
const NEXTAUTH_ROUTE = path.join(
    PROJECT_BASE,
    "app",
    "api",
    "auth",
    "[...nextauth]",
    "route.ts"
);

const sessionUpdateRoute = path.join(
    PROJECT_BASE,
    "app",
    "api",
    "session",
    "update",
    "route.ts"
);

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
    let counter = 2;

    while (true) {
        try {
            await fs.access(folder);
            folder = `${base}-${counter++}`;
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


async function fixImportsInFolder(folder, newName) {
    const entries = await fs.readdir(folder, { withFileTypes: true });

    for (const entry of entries) {
        const filePath = path.join(folder, entry.name);

        if (entry.isDirectory()) {
            await fixImportsInFolder(filePath, newName);
            continue;
        }

        const ext = path.extname(entry.name).toLowerCase();
        const textExts = new Set([".ts", ".tsx", ".js", ".jsx", ".mjs", ".cjs", ".json", ".md"]);
        if (!textExts.has(ext)) continue;

        let content = await fs.readFile(filePath, "utf8");


        content = content
            .replace(/@\/identityuser\//g, `@/${newName}/`)
            .replace(/@\/identityuser(?![-\w])/g, `@/${newName}`);

        await fs.writeFile(filePath, content, "utf8");
    }
}

(async () => {
    try {
        console.log("🚀 Initializing identityuser...");

        await ensureFolder(PROJECT_BASE);

        // unique folder: identityuser, identityuser-2, identityuser-3, ...
        PROJECT_SRC = await findUniqueFolder(PROJECT_SRC);
        const newFolderName = path.basename(PROJECT_SRC);

        console.log(`📦 Creating folder: ${PROJECT_SRC.replace(process.cwd() + path.sep, "")}`);
        await copyFolder(PACKAGE_SRC, PROJECT_SRC);

        // only fix imports when folder name has a suffix (-2, -3, etc.)
        if (newFolderName !== "identityuser") {
            console.log(`🔧 Fixing internal imports to use @/${newFolderName}/`);
            await fixImportsInFolder(PROJECT_SRC, newFolderName);
        }

        // ensure route folder exists
        await ensureFolder(path.dirname(NEXTAUTH_ROUTE));
        await ensureFolder(path.dirname(sessionUpdateRoute));

        // route.ts content
        const routeContent = `import NextAuth from "next-auth";
import { options } from "@/${newFolderName}/api/auth/[...nextauth]/options";

const handler = NextAuth(options);
export { handler as GET, handler as POST };
`;

        await fs.writeFile(NEXTAUTH_ROUTE, routeContent, "utf8");
        //////////////////////// sessionUpdateRoute
        const sessionRouteContent = `
import { getServerSession } from 'next-auth';
import { options } from '@/${newFolderName}/api/auth/[...nextauth]/options';
import { NextResponse } from 'next/server';
import dbConnect from '@/${newFolderName}/lib/db';
import { getUserByUsernameForSessionAction } from '@/${newFolderName}/helper/userAction';

export async function GET() {
    try {
        await dbConnect();
        const session = await getServerSession(options);

        if (!session?.user?.username) {
            return NextResponse.json({ status: 'unauthenticated' }, { status: 401 });
        }

        // const user = await Users.findOne({ username: session.user.username }).populate('role', 'titleEN');
        const user = await getUserByUsernameForSessionAction(session.user.username);
        if (!user) {
            return NextResponse.json({ status: 'notFound' }, { status: 404 });
        }
        const userPayload = user.payload;

        return NextResponse.json({
            status: 'success',
            user: {
                id: userPayload?.id.toString(),
                username: userPayload?.username,
                name: userPayload?.name,
                email: userPayload?.email,
                phoneNumber: userPayload?.phoneNumber,
                avatar: userPayload?.avatar,
                securityStamp: userPayload?.securityStamp,
                roles: userPayload?.roles,
                claims: userPayload?.claims,
                emailConfirmed: userPayload?.emailConfirmed,
                phoneNumberConfirmed: userPayload?.phoneNumberConfirmed,
                twoFactorEnabled: userPayload?.twoFactorEnabled,

            },
        });
    } catch (error) {
        return NextResponse.json({ status: 'error', message: 'Internal server error' }, { status: 500 });
    }
}
`;

        await fs.writeFile(sessionUpdateRoute, sessionRouteContent, "utf8");



        console.log("✅ identityuser installed successfully!");
    } catch (err) {
        console.error("❌ Error during installation:", err);
        process.exit(1);
    }
})();
