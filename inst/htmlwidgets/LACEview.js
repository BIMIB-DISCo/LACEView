HTMLWidgets.widget({

  name: 'LACEview',

  type: 'output',

  factory: function(el, width, height) {


    return {

      renderValue: function(x) {

        var cy = window.cy = cytoscape({
          container:document.getElementById('cy'),
          boxSelectionEnabled: false,
          autounselectify: false,
          layout: {
                name: 'dagre'
          },
          style: [
            {
              selector: 'node',
              css: {
                'content': 'data(name)',
                'text-valign': 'center',
                'width' : 'data(size)',
                'background-color': 'data(color)',
                'height' : 'data(size)',
                'text-halign': 'center'
              }
            },
            {
              selector: ':parent',
              css: {
                'content': 'data(name)',
                'text-valign': 'top',
                'background-opacity': '0.333',
                'text-halign': 'center',
                'border-width' : '2',
                'border-color' : 'black'
              }
            },
            {
              selector: '.fade',
              style: {
              'opacity': '0.5',
              }
             },
            {
              selector: 'edge',
              css: {
                'content': 'data(name)',
                'text-valign': 'center',
                'curve-style': 'bezier',
                'line-color': 'data(color)',
                'target-arrow-shape': 'triangle',
                'target-arrow-color':'data(color)',
                'line-style': 'data(linestyle)'
              }
            }
          ],

          elements: x["elements"],

          ready: function() {
                    cy = this;
                    function runLayout(fit, callBack) {
                        var parentNodes = cy.nodes(':parent');
                        var dagre_layout = parentNodes.layout({
                            name: 'dagre',
                            rankDir: 'LR',
                            fit: fit
                        });
                        dagre_layout.promiseOn('layoutstop').then(function(event) {
                            if (callBack) {
                                callBack.call(cy, event);
                            }
                        });
                        dagre_layout.run();

                    }
                    cy.edges().on('mouseover',function (e) {
                        console.log('c');
                        cy.nodes().style('opacity','0.2');
                        cy.edges().style('opacity','0.2');
                        cy.$(':parent').style('opacity','1');
                        cy.$('#'+e.target.id()).style('opacity','1');
                        cy.$('#'+e.target.id()).target().style('opacity','1');
                        cy.$('#'+e.target.id()).target().successors().style('opacity','1');
                    });
                    cy.edges().on('mouseout',function (e) {
                        console.log('c');
                        cy.nodes().style('opacity','1');
                        cy.edges().style('opacity','1');
                    });
                    runLayout(true);
                }
            });
            
            document.getElementById(el.id).cy = cy;

      },

      resize: function(width, height) {

        // TODO: code to re-render the widget with a new size

      }

    };
  }
});
