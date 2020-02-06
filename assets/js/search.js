var client = algoliasearch('18N9PEKHUC', '29ab24453d2b70065a76b4e1a6a82abc');
var indexName = "cert-manager-latest"
let versionMatch = window.location.href.match(/v(.*)-docs\//) 
if (versionMatch && versionMatch[1]) { // check if we matched a version
  indexName = `cert-manager-v${versionMatch[1]}`
}
var index = client.initIndex(indexName);
autocomplete('#search-box', { hint: false }, [
  {
    source: autocomplete.sources.hits(index, { hitsPerPage: 5 }),
    displayKey: 'title',
    clearOnSelected: true,
    templates: {
      suggestion: function(suggestion) {
        return `<a href="${suggestion.uri.replace("en","")}">${suggestion._highlightResult.title.value}</a>`;
      },
      footer: '<div class="algolia-branding"><img src="/images/search-by-algolia-light-background.svg" alt="Search powered by Algolia" /></div>',
    }
  }
]).on('autocomplete:selected', function(event, suggestion, dataset, context) {
    // Do nothing on click, as the browser will already do it
    if (context.selectionMethod === 'click') {
      return;
    }
    // Change the page, for example, on other events
    window.location.assign(suggestion.uri.replace("en",""));
});