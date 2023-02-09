#! /usr/bin/env node
const path = require('path')
const fs = require('fs')
const ejs = require('ejs')
const inquirer = require('inquirer')
const program = require('commander')
const package = require('./package.json')

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

const vue2Templates = [
    // '.vscode/extensions.json',
    // '.vscode/settings.json',
    'public/index.html',
    'public/login.png',
    'src/api/demo.js',
    'src/api/index.js',
    'src/assets/icons/demo.png',
    'src/assets/images/demo.png',
    'src/assets/svgs/demo.svg',
    'src/assets/svgs/demo.svg',
    'src/components/home/index.vue',
    'src/components/login/index.vue',
    'src/components-global/header/index.vue',
    'src/components-global/index.js',
    'src/router/index.js',
    'src/store/index.js',
    'src/styles/base.less',
    'src/styles/index.less',
    'src/styles/reset.min.css',
    'src/styles/variable.less',
    'src/utils/axiosInstance.js',
    'src/utils/debounce.js',
    'src/utils/format.js',
    'src/utils/rem.js',
    'src/utils/storage.js',
    'src/views/home/index.vue',
    'src/views/login/index.vue',
    'src/App.vue',
    'src/main.js',
    '.babelrc',
    '.editorconfig',
    '.env',
    '.env.development',
    '.env.production',
    '.gitignore',
    'babel.config.js',
    'jsconfig.json',
    'package.json',
    'README.md',
    'vue.config.js',
]

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
                    // fs.rmdirSync(dirpath) // 删除文件夹
                    // fs.unlinkSync(dir) // 删除文件
                    // console.log('存在该文件6', dir)
                }
            }
        })
    }
}

program
    .command('create <app-name>')
    .parse(process.argv)
    .description('create a new project')
    .option('-f, --force', 'Overwrite target directory if it exists')
    .option('-c, --clone', 'Use git clone when fetching remote preset')
    .option('-e, --envName <envName>', '获取环境变量名称')
    .action((name, cmd) => {
        inquirer.prompt([
            // {
            //     type: 'input',
            //     name: 'name',
            //     message: 'project name?',
            //     default: 'new-humphrey-project'
            // },
            {
                type: 'list',
                name: 'type',
                message: '请选择vue版本',
                choices: [
                    'vue2',
                    'vue3'
                ]
            }
        ]).then(anwsers => {
            const tmplDir = path.join(__dirname, `templates/${anwsers.type}`)
            const templates = anwsers.type == 'vue2' ? vue2Templates : vue3Templates
            templates.forEach(item => {
                const outputDir = path.join(name, item)
                mkfile(outputDir, dirname => {
                    const [first, ...file] = dirname.split('/')
                    ejs.renderFile(path.join(tmplDir, file.join('/')), anwsers, (e, result) => {
                        if (e) throw e
                        fs.writeFileSync(dirname, result)
                    })
                })
            })
        })
    })
program
    .name(Object.keys(package.bin)[0])
    .version(`@humphrey-cli ${package.version}`)
    .parse(process.argv)


