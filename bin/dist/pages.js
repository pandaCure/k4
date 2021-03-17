#!/usr/bin/env node
"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const fs_1 = __importDefault(require("fs"));
const path_1 = __importDefault(require("path"));
const process_1 = __importDefault(require("process"));
const commander_1 = require("commander");
const context = process_1.default.cwd();
// const pageName = process.argv[2]
const program = new commander_1.Command();
program.version('0.0.1');
program.requiredOption('-d, --path <path>', '创建文件夹的路径');
program.requiredOption('-n, --name <name>', '创建文件夹的名称，同时生成对应的文件');
program.parse(process_1.default.argv);
const main = async () => {
    console.log(1);
    const options = program.opts();
    const fistCaseName = options.name.slice(0, 1).toUpperCase() + options.name.slice(1);
    const pageDirPath = path_1.default.resolve(context, `src/${options.path}/${fistCaseName}`);
    if (fs_1.default.existsSync(pageDirPath)) {
        process_1.default.exit(0);
        console.log('目录已经存在');
    }
    fs_1.default.mkdirSync(pageDirPath);
    const scss = `
    .${options.name}-page {
      width: 100vw;
    }
    `;
    fs_1.default.writeFileSync(path_1.default.resolve(pageDirPath, `${options.name}.module.scss`), scss);
    const component = `
    import React from "react";
    import styles from "./${options.name}.module.scss";
    export interface I${fistCaseName} {}
    type Props = I${fistCaseName};
    const ${fistCaseName} = (props: Readonly<Props>) => {
      return <div className={styles.${options.name}Page}>1</div>;
    };
    export default ${fistCaseName};
    `;
    fs_1.default.writeFileSync(path_1.default.resolve(pageDirPath, `${fistCaseName}.tsx`), component);
    const index = `export {default} from './${fistCaseName}'`;
    fs_1.default.writeFileSync(path_1.default.resolve(pageDirPath, `index.ts`), index);
};
main();
process_1.default.on('SIGINT', function () {
    process_1.default.exit(0);
});
