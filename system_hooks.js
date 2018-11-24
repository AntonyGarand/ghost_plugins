const {registerHook} = require('./hooks');

const hookTypes = {
    system: 'SYSTEM',
    plugin: 'PLUGIN'
};

const hooks = {
    postHtml: {
        name: 'postHtml',
        description: 'Modify the HTML after it has been converted to HTML',
        type: hookTypes.system
    }
};

registerHook(hooks.postHtml.name, hooks.postHtml.description);

module.exports = {
    hooks,
    hookTypes
};
