const cheerio = require('cheerio');
const highLight = require('highlight.js');

const {hooks: {addHookListener}, systemHooks: {postHtml}} = require('../index');

const settings = {
    name: 'Code Highlighter',
    description: 'Integrates HighlightJS class generation on the server-side of the post.',
    init: () => {
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

            console.log('From:\n', html,'\nTo:\n', $.html());

            return [
                $.html(),
                ...args
            ];
        });
    }
};

module.exports = settings;
