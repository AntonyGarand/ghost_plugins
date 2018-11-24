const hooks = {};

/**
 * Adds a new hook listener
 * When the hook event is triggered, the callback method will be called
 * @param hookName The hook name
 * @param callback The method to call when the hook is triggered
 */
const addHookListener = (hookName, callback) => {
    console.debug(`Added listener to hook ${hookName}`);
    if (!Object.getOwnPropertyNames(hooks).includes(hookName)) {
        console.warn('Hook not found!', hookName);
        return;
    }

    hooks[hookName].listeners.push(callback);
};

/**
 * Creates a new hook
 * @param name The hook name
 * @param description The hook description
 * TODO: Also add support for asynchronous callbacks!
 * TODO: Add arg for consecutive vs concurrent hooks
 * TODO: Also, figure out how to pass the original arguments vs modified results to the next hooks
 */
const registerHook = (name, description) => {
    console.debug(`Created hook ${name}`);
    hooks[name] = {
        name,
        description,
        listeners: []
    };
};

/**
 * Triggers a hook, and returns the result of the sum of all callbacks
 * @param name The hook name
 * @param args The arguments to pass to the hook listener
 */
const triggerHook = (name, ...args) => {
    console.log(`Hook ${name} was triggered!`);
    if (!Object.getOwnPropertyNames(hooks).includes(name)) {
        console.warn('Hook not found!', name);
        return;
    }

    const hook = hooks[name];
    let result = args;
    hook.listeners.forEach((listener) => {
        result = listener(...result) || result;
    });
    return result;
};

module.exports = {
    addHookListener,
    registerHook,
    triggerHook
};
