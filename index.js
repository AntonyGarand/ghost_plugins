const hooks = require('./hooks');
const systemHooks = require('./system_hooks').hooks;

const initHooks = () => {
    const highlight = require('./code-highlight');
    highlight.init();
    const numbers = require('./code-numbers');
    numbers.init();
};

module.exports = {
    hooks,
    systemHooks,
    initHooks
};
