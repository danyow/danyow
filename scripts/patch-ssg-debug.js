// 临时诊断脚本：patch Docusaurus SSG 错误处理，输出每个页面的具体错误
const fs = require('fs');
const path = require('path');

const f = path.resolve(__dirname, '../node_modules/@docusaurus/core/lib/ssg/ssgGlobalResult.js');
let src = fs.readFileSync(f, 'utf8');

const target = 'if (ssgErrors.length > 0) {';
const replacement = `if (ssgErrors.length > 0) {
        console.error("\\n=== SSG ERRORS (" + ssgErrors.length + " total) ===");
        ssgErrors.slice(0, 10).forEach(function(e, i) {
            console.error("[SSG-ERR-" + i + "] " + e.pathname);
            if (e.error) {
                console.error("  message: " + e.error.message);
                if (e.error.cause) {
                    console.error("  cause: " + e.error.cause.message);
                    console.error("  cause stack: " + String(e.error.cause.stack).slice(0, 500));
                }
            }
        });
        console.error("=== END SSG ERRORS ===\\n");`;

if (src.includes(target)) {
    src = src.replace(target, replacement);
    fs.writeFileSync(f, src);
    console.log('Patched ssgGlobalResult.js successfully');
} else {
    console.error('ERROR: Could not find patch target in ssgGlobalResult.js');
    process.exit(1);
}
