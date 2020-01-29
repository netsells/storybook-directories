/**
 * Generate the story title based on file structure
 *
 * @param {String} filePath
 *
 * @returns {String}
 */
function generateTitle(filePath) {
    const normalised = filePath
        .replace(/\.\/(.*)\.stories\.js/, '$1')
        .replace('.stories.js', '')
        .split('/');

    const [category, ...segments] = normalised;

    const filename = segments.pop();

    let title = `${ category }|`;

    if (segments.length) {
        title += segments.join('/');
        title += '/';
    }

    title += filename;

    return title;
}

/**
 * Format each of the stories titles based on directory structure
 *
 * @param {Object} stories
 *
 * @returns {function(*=): any}
 */
const storyLoader = ({ stories }) => {
    const storyMap = new Map();

    stories.keys().forEach((i) => {
        const content = stories(i);
        const defaultExport = content.default || {};

        if (!defaultExport.title) {
            defaultExport.title = generateTitle(i);
        }

        storyMap.set(i, {
            default: defaultExport,
            ...content
        });
    });

    const loadStories = (id) => storyMap.get(id);

    loadStories.keys = () => ([
        ...storyMap.keys()
    ]);

    return loadStories;
};

export default storyLoader;
