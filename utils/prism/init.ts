import Prism from 'prismjs'
import 'prismjs/plugins/line-numbers/prism-line-numbers'
import 'prismjs/plugins/toolbar/prism-toolbar'

export const initPrismOnSDKPage = (): void => {
    Prism.languages.csharp = Prism.languages.extend('clike', {
        keyword:
            /\b(?:abstract|add|alias|as|ascending|async|await|base|bool|break|byte|case|catch|char|checked|class|const|continue|decimal|default|delegate|descending|do|double|dynamic|else|enum|event|explicit|extern|false|finally|fixed|float|for|foreach|from|get|global|goto|group|if|implicit|in|int|interface|internal|into|is|join|let|lock|long|namespace|new|null|object|operator|orderby|out|override|params|partial|private|protected|public|readonly|ref|remove|return|sbyte|sealed|select|set|short|sizeof|stackalloc|static|string|struct|switch|this|throw|true|try|typeof|uint|ulong|unchecked|unsafe|ushort|using|value|var|virtual|void|volatile|where|while|yield)\b/,
        string: [
            { pattern: /@("|')(?:\1\1|\\[\s\S]|(?!\1)[^\\])*\1/, greedy: !0 },
            { pattern: /("|')(?:\\.|(?!\1)[^\\\r\n])*?\1/, greedy: !0 },
        ],
        'class-name': [
            { pattern: /\b[A-Z]\w*(?:\.\w+)*\b(?=\s+\w+)/, inside: { punctuation: /\./ } },
            {
                pattern: /(\[)[A-Z]\w*(?:\.\w+)*\b/,
                lookbehind: !0,
                inside: { punctuation: /\./ },
            },
            {
                pattern: /(\b(?:class|interface)\s+[A-Z]\w*(?:\.\w+)*\s*:\s*)[A-Z]\w*(?:\.\w+)*\b/,
                lookbehind: !0,
                inside: { punctuation: /\./ },
            },
            {
                pattern: /((?:\b(?:class|interface|new)\s+)|(?:catch\s+\())[A-Z]\w*(?:\.\w+)*\b/,
                lookbehind: !0,
                inside: { punctuation: /\./ },
            },
        ],
        number: /\b0x[\da-f]+\b|(?:\b\d+\.?\d*|\B\.\d+)f?/i,
        operator: />>=?|<<=?|[-=]>|([-+&|?])\1|~|[-+*/%&|^!=<>]=?/,
        punctuation: /\?\.?|::|[{}[\];(),.:]/,
    })
    Prism.languages.insertBefore('csharp', 'class-name', {
        'generic-method': {
            pattern: /\w+\s*<[^>\r\n]+?>\s*(?=\()/,
            inside: {
                function: /^\w+/,
                'class-name': {
                    pattern: /\b[A-Z]\w*(?:\.\w+)*\b/,
                    inside: { punctuation: /\./ },
                },
                keyword: Prism.languages.csharp.keyword,
                punctuation: /[<>(),.:]/,
            },
        },
        preprocessor: {
            pattern: /(^\s*)#.*/m,
            lookbehind: !0,
            alias: 'property',
            inside: {
                directive: {
                    pattern:
                        /(\s*#)\b(?:define|elif|else|endif|endregion|error|if|line|pragma|region|undef|warning)\b/,
                    lookbehind: !0,
                    alias: 'keyword',
                },
            },
        },
    })
    Prism.plugins.toolbar.registerButton('select-code', env => {
        const button = document.createElement('button')

        button.innerHTML = 'Copy'
        button.addEventListener('click', () => {
            navigator.clipboard.writeText(env.code).then(() => {
                button.innerHTML = 'Copied!'
                setTimeout(() => {
                    button.innerHTML = 'Copy'
                }, 5000)
            })
        })

        return button
    })
    Prism.highlightAll()
}
