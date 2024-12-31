require(["gitbook"], (gitbook) => {
  // called by
  // - honkit/packages/@honkit/theme-default/src/js/core/page.js
  // - honkit/packages/@honkit/theme-default/_layouts/website/page.html > gitbook.page.hasChanged
  gitbook.events.bind("page.change", () => {
    const mermaid = window.mermaid;
    if (mermaid) {
      mermaid.init();
    }
    else {
      console.error("mermaid not loaded");
    }
  });
});
