//from https://stackoverflow.com/questions/40682848/how-to-clean-delete-contents-folder-with-npm
var fs = require("fs");

function deleteFolderRecursive(path) {
    if (!fs.existsSync(path)) {
        return;
    }

    try {
        const files = fs.readdirSync(path);

        for (const file of files) {
            const curPath = path + "/" + file;

            if (fs.lstatSync(curPath).isDirectory()) {
                // 재귀적으로 하위 디렉토리 삭제
                deleteFolderRecursive(curPath);
            } else {
                // 파일 삭제 시도
                try {
                    fs.unlinkSync(curPath);
                    console.log(`Deleted file: ${curPath}`);
                } catch (err) {
                    console.error(`Failed to delete file: ${curPath}`, err);
                }
            }
        }

        // 디렉토리 삭제 시도
        try {
            fs.rmdirSync(path);
            console.log(`Deleted directory: ${path}`);
        } catch (err) {
            console.error(`Failed to delete directory: ${path}`, err);
        }
    } catch (err) {
        console.error(`Error while processing directory: ${path}`, err);
    }
}

console.log("Cleaning working tree...");

deleteFolderRecursive("./dist");

try {
    fs.rmdirSync("./dist");
} catch (err) {
    console.error(`Failed to delete directory: ./dist`, err);
}

//make directory (dist)
try {
    fs.mkdirSync("./dist");
} catch (err) {
    console.error(`Failed to make directory: ./dist`, err);
}

console.log("Successfully cleaned working tree!");

// get package.json version field.
var packageJson = require("./package.json");
var version = packageJson.version;

//replace patch version in package.json
var newVersion = version.split(".");
newVersion[2] = parseInt(newVersion[2]) + 1;
newVersion = newVersion.join(".");
packageJson.version = newVersion;

//write new package.json
fs.writeFileSync("./package.json", JSON.stringify(packageJson, null, 2));

//copy package.json to ./dist/package.json
fs.copyFileSync("./package.json", "./dist/package.json");

//copy REMDMe.md to ./dist/README.md
fs.copyFileSync("./README.md", "./dist/README.md");

//write console
console.log(`Updated package.json version to ${newVersion}`);

//remove dist path in dist/package.json at main
var distPackageJson = require("./dist/package.json");
distPackageJson.main = "./index.js";
distPackageJson.module = "./index.js";
distPackageJson.types = "./index.d.ts";
distPackageJson.exports = {
    ".": {
        import: "./index.js",
        require: "./index.js",
        types: "./index.d.ts",
    },
    "./*": {
        import: "./*",
        require: "./*",
        types: "./*",
    },
};
fs.writeFileSync(
    "./dist/package.json",
    JSON.stringify(distPackageJson, null, 2)
);

//write console with changed values in dist/package.json
console.log(`Updated dist/package.json main to ${distPackageJson.main}`);
console.log(`Updated dist/package.json types to ${distPackageJson.types}`);

//update Signature.tsx
var signatureLogger = fs.readFileSync("./src/lib/Signature.tsx", "utf8");

//replace version in Signature.tsx
signatureLogger = signatureLogger.replace(
    /const currentVersionFromPackageJson = '[^']*'/,
    `const currentVersionFromPackageJson = '${newVersion}'`
);

//write Signature.tsx
fs.writeFileSync("./src/lib/Signature.tsx", signatureLogger);

//write console
console.log(`Updated Signature.tsx version to ${newVersion}`);
