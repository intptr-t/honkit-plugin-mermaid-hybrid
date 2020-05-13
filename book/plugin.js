require([
  'gitbook'
], function (gitbook) {
    gitbook.events.bind('page.change', function () {
      const config = {
        startOnLoad: true,
        securityLevel: 'loose'
      };
      const pluginConfig = gitbook.state.config.pluginsConfig['mermaid-newface'] || null;
      if (pluginConfig) { 
        config.theme = pluginConfig.theme || 'default';
        // TODO: add other config. see: https://mermaid-js.github.io/mermaid/#/mermaidAPI?id=mermaidapi-configuration-defaults
      }
      mermaid.initialize(config);
    });
});