## Mermaid plugin for GitBook

[![NPM Stats](https://nodei.co/npm/honkit-plugin-mermaid-hybrid.png)](https://npmjs.org/package/honkit-plugin-mermaid-hybrid/)
[![npm](https://img.shields.io/npm/v/honkit-plugin-mermaid-hybrid.svg)](https://npmjs.org/package/honkit-plugin-mermaid-hybrid)
[![npm downloads](https://img.shields.io/npm/dm/honkit-plugin-mermaid-hybrid.svg)](https://npmjs.org/package/honkit-plugin-mermaid-hybrid)
[![npm bundle size](https://img.shields.io/bundlephobia/min/honkit-plugin-mermaid-hybrid.svg)](https://npmjs.org/package/honkit-plugin-mermaid-hybrid)

Plugin for [Honkit](https://github.com/honkit/honkit) or [GitBook](https://github.com/GitbookIO/gitbook/tree/3.2.2) 3 which renders [Mermaid](https://mermaid-js.github.io/mermaid) diagrams and flow charts detected in the book markdown.  

**THIS PLUGIN WAS BORN TO USING MERMAID V11.4 AND LATER AT HONKIT/GITBOOKv3**

Use mermaid-cli to generate PDFs using Mermaid.
Generate a website using Mermaid, we give you the option of using mermaid-cli and Mermaid directly.

## Installation

```sh
npm install honkit-plugin-mermaid-hybrid
```

## Config

If you want to change the settings of mermaid, please add `pluginsConfig` in the book.json:

```json
{
  "plugins": ["mermaid-hybrid"],
  "pluginsConfig": {
    "mermaid-hybrid": {
      "plugin": {
        "embed": false
      },
      "mermaid": {
        "theme": "neutral" // default, forest, dar, natural. see https://mermaid-js.github.io/mermaid/#/mermaidAPI?id=theme
      }
    }
  }
}
```

- pluginsConfig["mermaid-hybrid"].plugin
    - **description**: configuration for _mermaid-hybrid_
- pluginsConfig["mermaid-hybrid"].plugin.embed
    - **description**: configuration for _mermaid-hybrid_
      - If `true`, mermaid-cli is used during website build.
      - Otherwise, i.e., false or undefined, the Mermaid prepared by this plugin is used directly at website build.
      - Ignored when generating PDFs.
- pluginsConfig["mermaid-hybrid"].mermaid
    - **description**: configuration for _Mermaid_

## Linux issue

If you are using Docker, you will need to add a following configurations.

Create a puppeteer-config.json file in the your book directory root:  

```json
{
  "args": ["--no-sandbox"]
}
```

See. [Linux sandbox issue](https://github.com/mermaidjs/mermaid.cli#linux-sandbox-issue)

