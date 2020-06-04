HTMLWidgets.widget({

  name: 'LACEview',

  type: 'output',

  factory: function(el, width, height) {

    // TODO: define shared variables for this instance

    return {

      renderValue: function(x) {

        // TODO: code to render the widget, e.g.
        var cy = window.cy = cytoscape({
          container: el,

          boxSelectionEnabled: false,

          style: [
            {
              selector: 'node',
              css: {
                'content': 'data(name)',
                'text-valign': 'center',
                'text-halign': 'center'
              }
            },
            {
              selector: ':parent',
              css: {
                'text-valign': 'top',
                'background-opacity': '0.333',
                'text-halign': 'center',
              }
            },
            {
              selector: 'edge',
              css: {
                'curve-style': 'bezier',
                'target-arrow-shape': 'triangle',
                'line-style': 'data(linestyle)'
              }
            }
          ],

          elements: x["elements"],

          layout: {
                    name: 'cola'
                },
        });

      },

      resize: function(width, height) {

        // TODO: code to re-render the widget with a new size

      }

    };
  }
});
