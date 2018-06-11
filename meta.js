'use strict'
const path = require('path')
const {
  sortDependencies,
  installDependencies,
  runDll,
  printMessage,
} = require('./utils')
const pkg = require('./package.json')
const templateVersion = pkg.version

module.exports = {
  "helpers": {
    if_or(v1, v2, options) {
      if (v1 || v2) {
        return options.fn(this);
      }
      return options.inverse(this);
    },
    template_version() {
      return templateVersion
    }
  },
  prompts: {
    name: {
      type: 'string',
      required: true,
      message: 'Project name'
    },
    shortName: {
      type: 'string',
      required: false,
      message: 'Project short name: fewer than 12 characters to not be truncated on homescreens (default: same as name)'
    },
    description: {
      type: 'string',
      required: false,
      message: 'Project description',
      default: 'A Vue.js PWA project'
    },
    author: {
      type: 'string',
      message: 'Author'
    },
    cssSprite: {
      type: 'confirm',
      message: 'Install webpack-spritesmith?'
    },
    autoInstall: {
      type: 'list',
      message:
        'Should we run `npm install` for you after the project has been created? (recommended)',
      choices: [
        {
          name: 'Yes, use NPM',
          value: 'npm',
          short: 'npm',
        },
        {
          name: 'Yes, use Yarn',
          value: 'yarn',
          short: 'yarn',
        },
        {
          name: 'No, I will handle that myself',
          value: false,
          short: 'no',
        }
      ]
    },
    autoRunDll: {
      type: 'confirm',
      message: 'Whether to execute the `npm run dll` immediately? (recommended)'
    }
  },
  filters: {
    'src/assets/less/_sprite.css': 'cssSprite',
    'src/assets/images/sprites/*': 'cssSprite'
  },
  skipInterpolation: [ // 过滤掉不用解析的文件，如替换{{}}语法
    'template/**/*'
  ],
  complete: function (data, {chalk}) {
    const green = chalk.green

    sortDependencies(data, green)

    const cwd = path.join(process.cwd(), data.inPlace ? '' : data.destDirName)

    if (data.autoInstall) {
      installDependencies(cwd, data.autoInstall, green)
        .then(() => {
          return runDll(cwd, data, green)
        })
        .then(() => {
          printMessage(data, green)
        })
        .catch(e => {
          console.log(chalk.red('Error:'), e)
        })
    } else {
      printMessage(data, chalk)
    }
  }
};
