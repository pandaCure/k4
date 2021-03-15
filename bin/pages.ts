import fs from 'fs'
import path from 'path'
import process from 'process'
import {Command} from "commander";
const context = process.cwd();
// const pageName = process.argv[2]
const program = new Command();
program.version('0.0.1')
program.requiredOption('-n, --name <name>', '创建文件夹的名称，同时生成对应的文件')
program.parse(process.argv)
const main = async () => {
    const options = program.opts()
    const fistCaseName = options.name.slice(0, 1).toUpperCase() + options.name.slice(1)
    const pageDirPath = path.resolve(context, `src/pages/${fistCaseName}`)
    if (fs.existsSync(pageDirPath)) {
        process.exit(0)
        console.log('目录已经存在')
    }
    fs.mkdirSync(pageDirPath)
    const scss = `
    .${options.name}-page {
      width: 100vw;
    }
    `
    fs.writeFileSync(path.resolve(pageDirPath, `${options.name}.module.scss`), scss)
    const component = `
    import React from "react";
    import styles from "./${options.name}.module.scss";
    export interface I${fistCaseName} {}
    type Props = I${fistCaseName};
    const ${fistCaseName} = (props: Readonly<Props>) => {
      return <div className={styles.homePage}>1</div>;
    };
    export default ${fistCaseName};
    `
    fs.writeFileSync(path.resolve(pageDirPath, `${fistCaseName}.tsx`), component)
    const index = `export {default} from './${fistCaseName}'`
    fs.writeFileSync(path.resolve(pageDirPath, `index.ts`), index)
}
main()
