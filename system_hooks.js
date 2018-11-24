const hookTypes = {
    system: 'SYSTEM',
    plugin: 'PLUGIN'
};

const hooks = {
    post_html: {
        name: 'post_html',
        description: 'Modify the HTML after it has been converted to HTML',
        type: hookTypes.system
    }
};

module.exports = {
    hooks,
    hookTypes
};
