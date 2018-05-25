'use strict';
const Generator = require('yeoman-generator');
module.exports = class extends Generator {
    constructor(args, opts) {
        super(args, opts);
        this.log('Initializing...');
    }

    start() {
        const me = this;
        this.prompt([
            {
                type: 'input',
                name: 'name',
                message: 'Enter a name for the new entity (i.e.: MyNewEntity): '
            },
            {
                type: 'confirm',
                name: 'createModel',
                message: 'Do you want to create model? ',
                store   : true
            },
            {
                type: 'confirm',
                name: 'createController',
                message: 'Do you want to create controller? ',
                store   : true
            },
        ]).then((answers) => {
            // create destination folder
            const name = answers.name;
            const nameCamelCase = me.lowercaseFirstLetter(name);
            const nameUnderscore = me.camelCaseToUnderscore(nameCamelCase);
            const nameHyphen = me.underscoreToHyphen(nameUnderscore);
            if (answers.createModel) {
                this.fs.copyTpl(
                    this.templatePath('_model.js'),
                    this.destinationPath('models/' + nameHyphen + '.js'),
                    {
                        name: name,
                        nameCamelCase: nameCamelCase,
                        nameUnderscore: nameUnderscore
                    }
                );
            }
            if (answers.createController) {
                this.fs.copyTpl(
                    this.templatePath('_controller.js'),
                    this.destinationPath('api/' + nameHyphen + 's.js'),
                    {
                        name: name,
                        nameCamelCase: nameCamelCase,
                        nameUnderscore: nameUnderscore
                    }
                );
            }
        });
    }

    lowercaseFirstLetter(string) {
        if (!string) {
            return;
        }
        return string.charAt(0).toUpperCase() + string.slice(1);
    }

    camelCaseToUnderscore(string) {
        if (!string) {
            return;
        }
        return string.replace(/\.?([A-Z]+)/g, function (x, y) {
            return '_' + y.toLowerCase()
        }).replace(/^_/, '');
    }

    underscoreToHyphen(string) {
        if (!string) {
            return;
        }
        return string.replace(/_/g, "-");
    }
};