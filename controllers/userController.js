const User = require("../model/User");
//const fs = require('fs');
//const url = require('url');
//const qs = require('querystring');
//Template V3
const Template = require("Template");

var userController = {};

userController.get = async (req, res) => {
    var users = User.find();
    var strUsers = "";
    users.forEach(
        user => strUsers += "<li>" + user.getFullName() + "</li>"
    );


    strUsers = "<ul>" + strUsers + "</ul>";
    res.writeHead(200, {
        'Content-Type': 'text/html'
    });

    var params = {};
    params.title = "Test web page on node.js";
    params.pagetitle = "Hello there";
    params.content = "<p>List of users:</p>" + strUsers;

    //Template V1
    //template.build(params.title. params.pagetitle, params.content);

    //Template V2
    //var template = "";
    // fs.readFile('./views/users.myt', {encoding: 'utf8'}, (err, data) => {
    //     console.log(typeof data);
    //     template = data.toString();
    //     for (param in params){
    //         var regexp = new RegExp(`{${param}}`, "g")
    //         template=template.replace(regexp, `${params[param]}`);
    //     }
    //     res.write(template);
    //     res.end();
    // });

    //Template V3
    // var readTemplate = (path) =>
    //     new Promise((resolve, reject) => {
    //         fs.readFile(path, {encoding: 'utf8'}, (err, data) =>
    //             resolve(data.toString())
    //         );
    //     });

    // var readTemplate = (path) =>
    //     new Promise((resolve, reject) => {
    //         fs.readFile(path, {encoding: 'utf8'}, (err, data) =>
    //             resolve(data.toString())
    //         );
    //     });
    //
    // var renderTemplate = (template, variables) => {
    //     for (variable in variables) {
    //         var regexp = new RegExp(`{${variable}}`, "g")
    //         template = template.replace(regexp, `${variables[variable]}`);
    //     }
    //     return template;
    // }

    // readTemplate('./views/users.myt')
    //     .then(template => renderTemplate(template,params))
    //     .then(template => res.end(template));

    var template = await Template.readTemplate('./views/users.myt');
    template = await Template.renderTemplate(template, params);
    res.end(template);

};

userController.save = function(req, res){
    const chunks = [];
    req.on('data', chunk => chunks.push(chunk));
    req.on('end', () => {
        const data = Buffer.concat(chunks).toString('utf8');
        var userData = {};
        var params = data.toString().split("&");
        params.forEach(
            param => userData[param.split("=")[0]] = param.split("=")[1]
        );
        var user = new User( userData.firstName, userData.lastName );
        user.save(function(err){
            if( err ){
                console.log('Error: ', err);
            } else {
                console.log("Successfully created an user. :)");
            }
            res.writeHead(301,
                {Location: '/'}
            );
            res.end();
        });


    })

};

/*
 * Other actions
 */

module.exports = userController;