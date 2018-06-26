const replace = require('replace-in-file');

const options = {
    files: './build/index.html',
    from: /<script *\w*="\w*\/\w*" \w*="\w*.\w*"><\/\w*>/g,
    to: '',
};

replace(options, (error, changes) => {
    if (error) {
        return console.error('Error occurred:', error);
    }
    console.log('Modified files:', changes.join(', '));
});