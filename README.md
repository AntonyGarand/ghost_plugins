# Ghost hooks and plugins

I created this tool to modify the rendered HTML before it was sent.

This means I can prepare the code highlighting on the server-side, add numbers to the code samples, and more!

# Usage
This plugin system uses a hook-based approach.
This means that Ghost will trigger `Hooks` at certain moments, and you can react to those.

The system hooks should be listed under `./system_hooks.js`

Here is a sample hook:
```
name: 'postHtml',
description: 'Modify the HTML resulting from markdown or mobiledoc',
```

A sample plugin, to add code highlighting, is available under `./code-highlight`
Here is how it works:

```javascript
addHookListener(postHtml.name, (html, ...args) => {
    // Highlight the code blocks of the page
    const $ = cheerio.load(html, {
        xmlMode: true,
        decodeEntities: false
    });

    $('code').each((index,rawTag) => {
        const tag = cheerio(rawTag);
        const before = tag.html();
        const after = highLight.highlightAuto(before).value;
        tag.html(after);
    });

    return [
        $.html(),
        ...args
    ];
});
```

Hooks are not needed to return data. If they don't, the previous data will be returned.
Hooks are also synchronous, and can be chained.
The inputs of the different hooks will be the results of the previous one.

# Setup
As Ghost doesn't natively support plugins at the moment, we need to modify few core files for this to work.
I should probably make a diff patch file for this, but it's a manual process at the moment.

1. Copy this repo in the `/plugins` folder.
2. Modify `index.js` file of the ghost server. Add the following:
```
// Registering hooks
require('./plugins').initHooks();
```

3. Add the hooks you want to trigger
Here is the post-html hook:
`current/core/server/lib/mobiledoc/converters/mobiledoc-converter.js:120`
```javascript
     modifier.modifyChildren(rendered.result);

+    const html = serializer.serializeChildren(rendered.result);
+    return triggerHook(postHtml.name, html)[0];
 },
```

Note: we don't need to add the hook to the markdown converter, as the markdown result is passed to the mobiledoc one.
