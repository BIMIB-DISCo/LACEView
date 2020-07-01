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
                    var makeTippy = function(node, text){
                var ref = node.popperRef();

                // unfortunately, a dummy element must be passed
                // as tippy only accepts a dom element as the target
                // https://github.com/atomiks/tippyjs/issues/661
                var dummyDomEle = document.createElement('div');

                var tip = tippy( dummyDomEle, {
                    onCreate: function(instance){ // mandatory
                        // patch the tippy's popper reference so positioning works
                        // https://atomiks.github.io/tippyjs/misc/#custom-position
                        instance.popperInstance.reference = ref;
                    },
                    lazy: false, // mandatory
                    trigger: 'manual', // mandatory

                    // dom element inside the tippy:
                    content: function(){ // function can be better for performance
                        var div = document.createElement('div');

                        div.innerHTML = text;

                        return div;
                    },

                    // your own preferences:
                    arrow: true,
                    placement: 'bottom',
                    hideOnClick: false,
                    multiple: true,
                    sticky: true,

                    // if interactive:
                    interactive: true,
                    appendTo: document.body // or append dummyDomEle to document.body
                } );

                return tip;
            };

            var tip;

            cy.nodes().on('mouseover',function (e) {

                if(!cy.$("#"+e.target.id()).isParent()){
                    if(tip !== undefined){
                        tip.destroy();
                    }
                    tip = makeTippy(cy.$("#"+e.target.id()),cy.$("#"+e.target.id()).data()["prev"]);
                    tip.show();

                }
            });
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
