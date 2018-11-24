const cheerio = require('cheerio');

const {hooks: {addHookListener}, systemHooks: {postHtml}} = require('../index');

const settings = {
    name: 'Code Line Numbers',
    description: 'Adds the line numbers to the code snippets',
    init: () => {
        addHookListener(postHtml.name, (html, ...args) => {
            const $ = cheerio.load(html, {
                xmlMode: true,
                decodeEntities: true
            });

            $('pre>code').each((index, rawTag) => {
                const tag = cheerio(rawTag);
                const lines = tag.html().split('\n');
                // Sometimes, the last line will be empty
                if (lines.length && lines[lines.length - 1].trim() === '') {
                    lines.length -= 1;
                }
                const numberWidth = lines.length.toString().length;
                const after = lines.map((line, index) => '' +
          `<span class="line-number">${(index + 1).toString().padStart(numberWidth, ' ')}|</span>${line}`
                ).join('\n');
                tag.html(after);
            });

            return [
                $.html(),
                ...args
            ];
        });
    }
};

module.exports = settings;
