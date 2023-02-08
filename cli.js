#! /usr/bin/env node
// console.log(1)
// const program = require('commander')
// const package = require('./package.json')


// program
//     .command('create <app-name>')
//     .parse(process.argv)
//     .description('create a new project')
//     .option('-f, --force', 'Overwrite target directory if it exists')
//     .option('-c, --clone', 'Use git clone when fetching remote preset')
//     .option('-e, --envName <envName>', '获取环境变量名称') 
//     .action((name, cmd) => {
//         console.log('name', name)
//         console.log('cmd', cmd)
//     })
// program
//     .name(Object.keys(package.bin)[0])
//     .version(`@humphrey-cli ${package.version}`)
//     .parse(process.argv)

const vue3Templates = [
    '.husky/commit-msg',
    '.vscode/extensions.json',
    '.vscode/settings.json',
    'public/vite.svg',
    'src/api/demo.ts',
    'src/assets/icons/demo.png',
    'src/assets/images/demo.png',
    'src/assets/styles/base.less',
    'src/assets/styles/index.less',
    'src/assets/styles/reset.min.css',
    'src/assets/styles/variable.less',
    'src/assets/svgs/demo.svg',
    'src/components/HelloWorld.vue',
    'src/components-global/footer/index.vue',
    'src/components-global/header/index.vue',
    'src/components-global/index.ts',
    'src/router/index.ts',
    'src/store/index.ts',
    'src/utils/axiosInstance.ts',
    'src/utils/storage.ts',
    'src/views/demo/index.vue',
    'src/views/home/index.vue',
    'src/App.vue',
    'src/env.d.ts',
    'src/main.ts',
    'src/shims-vue.d.ts',
    'src/vite-env.d.ts',
    'src/vuex.d.ts',
    '.env',
    '.env.development',
    '.env.production',
    'commitlint.config.cjs',
    'index.html',
    'package.json',
    'README.md',
    'tsconfig.json',
    'tsconfig.node.json',
    'vite.config.ts',
]



const ejs = require('ejs')
const inquirer = require('inquirer')
const path = require('path')
const fs = require('fs')


// function deleteFolderFiles(dirpath) {
//     let files = [];
//     if (fs.existsSync(dirpath)) {
//         files = fs.readdirSync(dirpath);
//         files.forEach(function (file, index) {
//             let curPath = dirpath + "/" + file;
//             if (fs.statSync(curPath).isDirectory()) {  //  recurse
//                 if (!rmdirsSync(curPath)) return false;
//             } else {  //  delete file
//                 fs.unlinkSync(curPath);
//             }
//         });
//         fs.rmdirSync(dirpath);
//     }
// }

function mkfile(pathname, cb) {
    // new-humphrey-project/src/views/demo/home.vue
    if (fs.existsSync(pathname)) {
        // console.log('存在该文件1', pathname)
        // fs.unlinkSync(pathname)
    } else {
        let dir = ''
        const paths = pathname.split('/')
        paths.forEach(item => {
            if (dir) {
                dir = path.join(dir, item)
            } else {
                dir = item
            }
            if (paths[paths.length - 1] == item) {
                // console.log(dir, '我是具体的文件，不是文件夹了')
                cb(dir)
            } else {
                if (!fs.existsSync(dir)) {
                    // console.log(dir, '我正在创建文件夹')
                    fs.mkdirSync(dir)
                } else {
                    // fs.unlinkSync(dir)
                    // console.log('存在该文件6', dir)
                }
            }
        })
    }
}


inquirer.prompt([
    {
        type: 'input',
        name: 'name',
        message: 'project name?',
        default: 'new-humphrey-project'
    },
    // {
    //     type: 'list',
    //     name: 'type',
    //     message: '请选择vue版本',
    //     choices: [
    //         'vue2',
    //         'vue3'
    //     ]
    // }
]).then(anwsers => {
    // const tmplDir = path.join(__dirname, 'templates/vue3')
    vue3Templates.forEach(item => {
        const outputDir = path.join(anwsers.name, item)
        mkfile(outputDir, dirname => {
            const [first, ...file] = dirname.split('/')
            ejs.renderFile(path.join(tmplDir, file.join('/')), anwsers, (e, result) => {
                if (e) throw e
                fs.writeFileSync(dirname, result)
            })
        })
    })


    // const tmplDir = path.join(__dirname, 'templates')
    // fs.readdir(tmplDir, (err, files) => {
    //     if (err) throw err
    //     files.forEach(file => {
    //         console.log(file)
    //         if (file == 'foo.txt') {
    //             // file 就是相对路径
    //             // 安装模版引擎，这里使用的是 ejs
    //             // 在命令行运行 yarn add ejs
    //             ejs.renderFile(path.join(tmplDir, file), anwsers, (e, result) => {
    //                 if (e) throw e
    //                 fs.writeFileSync(file, result)
    //             })
    //         }

    //     })
    // })
})
