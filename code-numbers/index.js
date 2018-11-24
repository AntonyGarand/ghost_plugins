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
                const before = tag.html();
                const lines = before.split('\n');
                // Sometimes, the last line will be empty
                if (lines.length && lines[lines.length - 1].trim() === '') {
                    lines.length -= 1;
                }
                let after;
                if (lines.length === 0 || lines.length === 1) {
                    after = before;
                } else {
                    const numberWidth = lines.length.toString().length;
                    after = lines.map((line, index) => '' +
                        `<span class="line-number">${(index + 1).toString().padStart(numberWidth, ' ')}|</span>${line}`
                    ).join('\n');
                }
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
