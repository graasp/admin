/**
 * A hook used to render graphics according to the given
 * Vega-Lite specification.
 *
 * The hook expects a `vega_lite:<id>:init` event with `{ spec }` payload,
 * where `spec` is the graphic definition as an object.
 *
 * Configuration:
 *
 *   * `data-id` - plot id
 *
 *
 * OPTIONS : FULL LIST @ https://github.com/vega/vega-embed#options
 * Eg,
 * actions:	Boolean / Object
 * Determines if action links ("Export as PNG/SVG", "View Source", "View Vega"
 * (only for Vega-Lite), "Open in Vega Editor") are included with the embedded view. If the value is true,
 * all action links will be shown and none if the value is false. This property can take a key-value mapping
 * object that maps keys (export, source, compiled, editor) to boolean values for determining if each action
 * link should be shown. By default, export, source, and editor are true and compiled is false. These defaults
 * can be overridden: for example, if actions is {export: false, source: true}, the embedded visualization
 * will have two links – "View Source" and "Open in Vega Editor". The export property can take a key-value
 * mapping object that maps keys (svg, png) to boolean values for determining if each export action
 * link should be shown. By default, svg and png are true.
 */

const VegaLite = {
  // event based interaction
  mounted() {
    this.id = this.el.dataset.id;
    this.viewPromise = null;
    const container = document.createElement("div");
    this.el.appendChild(container);
    this.handleEvent(`vega_lite:${this.id}:init`, ({ spec }) => {
      this.viewPromise = vegaEmbed(
        container,
        { ...spec, data: { name: "data" } },
        { actions: false },
      )
        .then((result) => result.view)
        .catch((error) => {
          console.error(
            `Failed to render the given Vega-Lite specification, got the following error:\n\n    ${error.message}\n\nMake sure to check for typos.`,
          );
        });
    });
    this.handleEvent(`vega_lite:${this.id}:update`, ({ spec }) => {
      const changes = vega
        .changeset()
        .remove(() => true)
        .insert(spec.data.values);
      this.viewPromise.then((view) => view.change("data", changes).run());
    });
  },
  destroyed() {
    if (this.viewPromise) {
      this.viewPromise.then((view) => view.finalize());
    }
  },
};

export default VegaLite;
