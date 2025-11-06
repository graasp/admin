// import vegaEmbed from "./vega-embed.min.js";

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
  // mounted() {
  //   // Read initial data/spec from dataset
  //   this.spec = JSON.parse(this.el.dataset.spec);
  //   this.values = JSON.parse(this.el.dataset.values || "[]");
  //   this.title = this.el.dataset.title || "";
  //   // Initialize chart once
  //   this.embedChart(this.spec, this.values, this.title);
  // },
  // updated() {
  //   // On any assign change, LiveView patches the element’s dataset
  //   const newValues = JSON.parse(this.el.dataset.values || "[]");
  //   const newTitle = this.el.dataset.title || "";
  //   // Efficiently update without full re-embed:
  //   if (this.view && this.view.changeset) {
  //     // Update title and data via Vega signals/data changes
  //     // If your spec defines a top-level title as a signal, update it; else re-embed if title changed
  //     const titleChanged = newTitle !== this.title;
  //     if (titleChanged) {
  //       this.title = newTitle;
  //       // vega-lite title isn’t a signal by default; simplest is re-embed if title changes
  //       this.embedChart(this.spec, newValues, this.title);
  //       return;
  //     }
  //     // Update data in the named source that vega-lite generates: "source"
  //     // vega-lite compiles to vega with a main dataset typically named "data".
  //     // vega-embed exposes view.change for updating data.
  //     const changeset = vega
  //       .changeset()
  //       .remove(() => true)
  //       .insert(newValues);
  //     this.view.change("data", changeset).run();
  //     this.values = newValues;
  //   } else {
  //     // Fallback: re-embed
  //     this.embedChart(this.spec, newValues, newTitle);
  //   }
  // },
  // async embedChart(spec, values, title) {
  //   const fullSpec = {
  //     ...spec,
  //     title,
  //   };
  //   // Provide inline data
  //   const specWithData = {
  //     ...fullSpec,
  //     data: { name: "data" }, // define named dataset to update later
  //   };
  //   // Render
  //   const result = await vegaEmbed(this.el, specWithData, {
  //     actions: false,
  //     renderer: "canvas",
  //     tooltip: true,
  //   });
  //   // vega view instance
  //   this.view = result.view;
  //   // Seed data after embed so we can use named dataset updates
  //   const changeset = vega
  //     .changeset()
  //     .remove(() => true)
  //     .insert(values);
  //   this.view.change("data", changeset).run();
  //   // Handle resize
  //   const ro = new ResizeObserver(() => this.view && this.view.resize().run());
  //   ro.observe(this.el);
  //   this._ro = ro;
  // },
  // destroyed() {
  //   if (this._ro) this._ro.disconnect();
  //   if (this.view) this.view.finalize();
  // },
  // event based interaction
  // mounted() {
  //   this.id = this.el.getAttribute("data-id");
  //   this.viewPromise = null;
  //   const container = document.createElement("div");
  //   this.el.appendChild(container);
  //   this.handleEvent(`vega_lite:${this.id}:init`, ({ spec }) => {
  //     this.viewPromise = vegaEmbed(container, spec, { actions: false })
  //       .then((result) => result.view)
  //       .catch((error) => {
  //         console.error(
  //           `Failed to render the given Vega-Lite specification, got the following error:\n\n    ${error.message}\n\nMake sure to check for typos.`,
  //         );
  //       });
  //   });
  // },
  // destroyed() {
  //   if (this.viewPromise) {
  //     this.viewPromise.then((view) => view.finalize());
  //   }
  // },
};

export default VegaLite;
