// @ts-check
const { execSync } = require('node:child_process');
const path = require('node:path');
const fs = require('node:fs');
const crypto = require('node:crypto');
const Datauri = require('datauri/sync');

// import build-in highlight plugin
let buildInHonkitPluginHighlight = null;
try {
    // @ts-ignore
    buildInHonkitPluginHighlight = require('@honkit/honkit-plugin-highlight');
} catch {
  try {
    // @ts-ignore -- Lookup for honkit's pre-fork plugins. (built-in until gitbook@3.2.2)
    buildInHonkitPluginHighlight = require('gitbook-plugin-highlight');
  } catch {
    console.warn('[mermaid-hybrid] Honkit built-in highlight plugin not found.');
  }
}
const highlightJs = require("highlight.js");

// prefix for temporary file
const PREFIX = '.mermaid';

// output format
const FORMAT = /** @type {const} */({
  WEBSITE_EXTERNAL: null,
  WEBSITE_SVG: 'svg',
  OTHER: 'png'
});

/** @type {typeof FORMAT[keyof typeof FORMAT]} */
let format = FORMAT.OTHER;
let config = {};

const DEBUG = false;

const processEmbedImageBlock = (block) => {
  const source = block.body;

  // compile mermaid.js code using cli
  const hash = crypto.createHash('sha1').update(source).digest('hex');
  const inputFilePath = path.resolve(path.join('.', `${PREFIX}_${hash}.mmd`));
  const outputFilePath = path.resolve(path.join('.', `${PREFIX}_${hash}.${format}`));
  const mermaidConfigFilePath = path.resolve(path.join('.', `${PREFIX}_${hash}.json`));
  const configFilePath = path.resolve(path.join('.', 'puppeteer-config.json'));
  if (!fs.existsSync(inputFilePath)) {
    if (DEBUG) console.log(`Input file not found. Writing ${inputFilePath}`);
    fs.writeFileSync(inputFilePath, source, { encoding: 'utf-8' });
  }
  fs.writeFileSync(mermaidConfigFilePath, JSON.stringify(config), { encoding: 'utf-8' });

  if (!fs.existsSync(outputFilePath)) {
    const configFileOption = fs.existsSync(configFilePath) ? `-p ${configFilePath}`  : '';
    if (DEBUG) console.log(
      `Output file not found. Writing ${outputFilePath} with option: ${configFileOption}`
    );
    const stdout = execSync(`npx mmdc ${configFileOption} -i ${inputFilePath} -o ${outputFilePath} -c ${mermaidConfigFilePath}`);
    if (DEBUG) console.log(stdout);
  }

  // make result
  let output = '';
  switch (format) {
    case FORMAT.WEBSITE_EXTERNAL:
      break;
    case FORMAT.WEBSITE_SVG:
      output = fs.readFileSync(outputFilePath, { encoding: 'utf-8' });
      break;
    default:{
      const meta = Datauri(outputFilePath);
      output = `<img src="${meta.content}">`;
      if (DEBUG) console.log(output);
    }
  }

  // delete temporary files
  fs.rmSync(outputFilePath);
  fs.rmSync(inputFilePath);
  fs.rmSync(mermaidConfigFilePath);

  return output;
}

const processBlock = (block) => {
  if (format === FORMAT.WEBSITE_EXTERNAL) {
    const scopedBody = `<div class="mermaid">${block.body}</div>`;
    return scopedBody;
  }

  return processEmbedImageBlock(block);
};

module.exports = {
  website: {
    assets: './lib',
    js: [
      "website/mermaid_11.4.1.min.js",
      "website/plugin.js",
    ],
  },
  blocks: {
    code: (block) => {
      const lang = block.kwargs.language;
      if (lang !== 'mermaid') {
        // fallback
        const isSupportedLang = highlightJs.getLanguage(lang) ?? false;
        if (isSupportedLang) {
          return buildInHonkitPluginHighlight?.blocks?.code?.(block) ?? block;
        }
        return block;
      }

      try {
        block.body = processBlock(block);
      } catch(ex) {
        console.error(ex);
      }
      return block;
    }
  },
  hooks: {
    init: function() {
      // Switch output format depends on build type(website or not)
      if (DEBUG) console.log(this);
      // Capture entire pluginsConfig object to pass on to cli
      const pluginsConfig = this.config.values.pluginsConfig["mermaid-hybrid"];
      const pluginConfig = pluginsConfig?.plugin ?? {};
      config = pluginsConfig?.mermaid ?? {};
      const name = this.output.name.toString();

      switch (name) {
        case 'website':
          if (pluginConfig?.embed) {
            format = FORMAT.WEBSITE_SVG;
          }
          else {
            format = FORMAT.WEBSITE_EXTERNAL;
          }
          break;
        default: format = FORMAT.OTHER;
      }
    },
  }
};
