const fs = require('fs');

module.exports = class Template {
    static readTemplate = (path) =>
        new Promise((resolve, reject) => {
            fs.readFile(path, {encoding: 'utf8'}, (err, data) =>
                resolve(data.toString())
            );
        });

    static renderTemplate = (template, variables) => {
        for (let variable in variables) {
            let regexp = new RegExp(`{${variable}}`, "g")
            template = template.replace(regexp, `${variables[variable]}`);
        }
        return template;
    }
}