const warned = new Set<string>();

function installDeprecationObserver() {
  if (typeof MutationObserver === "undefined") return;

  const SSK_PATTERN = /^ssk-/;

  function checkNode(node: Node) {
    if (node.nodeType !== 1) return;
    const tag = (node as Element).tagName.toLowerCase();
    if (SSK_PATTERN.test(tag) && !warned.has(tag)) {
      warned.add(tag);
      const canonical = tag.replace(/^ssk-/, "ds-");
      console.warn(
        `[DS 3.0] <${tag}> is deprecated and will be removed in v4.0. ` +
        `Please use <${canonical}> instead.`,
      );
    }
    (node as Element).querySelectorAll?.("[class]")?.forEach?.(() => {});
    node.childNodes.forEach(checkNode);
  }

  const observer = new MutationObserver((mutations) => {
    for (const m of mutations) {
      m.addedNodes.forEach(checkNode);
    }
  });

  const start = () => {
    if (document.body) {
      document.body.childNodes.forEach(checkNode);
      observer.observe(document.body, { childList: true, subtree: true });
    }
  };

  if (document.readyState === "loading") {
    document.addEventListener("DOMContentLoaded", start, { once: true });
  } else {
    start();
  }
}

installDeprecationObserver();
