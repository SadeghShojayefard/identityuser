#!/usr/bin/env node

function parse(version) {
    return version.split('.').map(Number);
}

function lt(a, b) {
    for (let i = 0; i < Math.max(a.length, b.length); i++) {
        const x = a[i] || 0;
        const y = b[i] || 0;
        if (x < y) return true;
        if (x > y) return false;
    }
    return false;
}

function check(pkg, min) {
    if (!pkg) return false;
    return lt(parse(pkg), parse(min));
}

const react = process.env.npm_package_dependencies_react
    || process.env.npm_package_peerDependencies_react;

const next = process.env.npm_package_dependencies_next
    || process.env.npm_package_peerDependencies_next;

const warnings = [];

if (check(react, '19.2.1')) {
    warnings.push(
        'React < 19.2.1 detected. This version may be vulnerable to critical RCE issues (React2Shell). Upgrade is strongly recommended.'
    );
}

if (check(next, '15.5.7')) {
    warnings.push(
        'Next.js < 15.5.7 detected. This version may be vulnerable to known Server Components issues.'
    );
}

if (warnings.length) {
    console.warn('\n⚠️  identityuser security notice:\n');
    warnings.forEach(w => console.warn(' - ' + w));
    console.warn('\nPlease upgrade to the minimum supported versions.\n');
}
