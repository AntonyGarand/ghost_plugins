const cheerio = require('cheerio');
const highLight = require('highlight.js');
const Entities = require('html-entities').AllHtmlEntities;
const entities = new Entities();

const {hooks: {addHookListener}, systemHooks: {postHtml}} = require('../index');

const settings = {
    name: 'Code Highlighter',
    description: 'Integrates HighlightJS class generation on the server-side of the post.',
    init: () => {
        addHookListener(postHtml.name, (html, ...args) => {
            // Highlight the code blocks of the page
            console.log('HTML\n', html);
            const $ = cheerio.load(html, {
                xmlMode: true,
                decodeEntities: false
            });

            $('pre>code').each((index, rawTag) => {
                const tag = cheerio(rawTag, {
                    xmlMode: true,
                    decodeEntities: false
                });
                const before = entities.decode(entities.decode(tag.html()));
                const after = highLight.highlightAuto(before).value;

                tag.html(entities.encode(after));
            });

            return [
                $.html(),
                ...args
            ];
        });
    }
};

module.exports = settings;
