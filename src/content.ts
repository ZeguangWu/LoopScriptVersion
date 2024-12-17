if (window.location.href.includes("loop.cloud-dev.microsoft")) {
  console.log("Intercepted by content script.");

  const queryString = window.location.search; // Get "?name=John&age=30"
  const urlParams = new URLSearchParams(queryString);

  const codeVersion = urlParams.get("scriptVersion");

  if (!!codeVersion && codeVersion.length > 0) {
    // Fetch the replacement content from the alternative URL
    fetch(`https://res-sdf.cdn.office.net/fluid/stg/loop-app/versionless/deployment/${codeVersion}/index.html`)
      .then((response) => response.text())
      .then((data) => {
        // Replace the current page content with the fetched data
        document.open();
        document.write(data);
        document.close();
      })
      .catch((error) => {
        console.error("Failed to fetch replacement content:", error);
      });
  }
}
