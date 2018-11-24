const hooks = new Map();

const addHook = (hookName, ...args) => {
    if (!hooks.has(hookName)) {
        console.warn('Hook not found!', hookName);
        return;
    }

    hooks.get(hookName)(...args);
};

const registerHook = (hookName, callback) => {
    hooks.set(hookName, callback);
};

module.exports = {
    addHook,
    registerHook
};
