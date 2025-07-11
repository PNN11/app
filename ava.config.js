module.exports = {
    extensions: {
        js: true,
    },
    typescript: {
        extensions: ['ts', 'tsx'],
        rewritePaths: {
            'src/': 'build/',
        },
        compile: false,
    },
    require: ['./register-paths.js'],
}
