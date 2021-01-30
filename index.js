const { execSync } = require('child_process');
const path = require('path');
const fs = require('fs');
const crypto = require('crypto');

const ASSET_PATH = 'assets/images/mermaid/';
const FORMAT = 'png';

const DEBUG = true;

const processBlock = (block) => {
  const source = block.body;
  const hash = crypto.createHash('sha1').update(source).digest('hex');
  const inputFilePath = path.join(ASSET_PATH, `${hash}.mmd`);
  const outputFilePath = path.join(ASSET_PATH, `${hash}.${FORMAT}`);
  fs.writeFileSync(inputFilePath, source, { coding: 'utf-8' });
  const stdout = execSync(`npx mmdc -i ${inputFilePath} -o ${outputFilePath}`);
  if (DEBUG) console.log(stdout);
  return `<img src=/${outputFilePath}>`;
};

module.exports = {
  website: {
    assets: './dist',
    js: [
      'mermaid/mermaid.min.js',
      'book/plugin.js'
    ]
  },
  blocks: {
    code: function (block) { 
      const lang = block.kwargs.language;
      if (lang != 'mermaid') { 
        return block;
      }
      block.body = processBlock(block);
      return block;
    }
  },
  hooks: {
    // init: () => { 
    // },
    // page: (page) => { 
    // }
  }
};
