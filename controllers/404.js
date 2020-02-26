var Template = require('Template');
module.exports.get = async (req, res) => {
    res.writeHead(404, {
        'Content-Type': 'text/html'
    });

    var params = {};
    params.title = "404 - Page not found";
    params.pagetitle = "Oh noes, it's a 404";
    params.content = "<p>This isn't the page you're looking for...</p>";

    var template = await Template.readTemplate('./views/404.myt');
    template = await Template.renderTemplate(template,params);
    res.end(template);
};