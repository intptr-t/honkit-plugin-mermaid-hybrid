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
      console.log(block.body);
      const scopedBody = `<div class="mermaid">${block.body}</div>`;
      block.body = scopedBody;
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
