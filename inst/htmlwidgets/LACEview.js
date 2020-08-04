HTMLWidgets.widget({

  name: 'LACEview',

  type: 'output',

  factory: function(el, width, height) {


    return {

      renderValue: function(jsdata) {
        var D = jsdata["data"]
        var E = jsdata["columns"]
        var F = jsdata["colors"]
       
        // set the dimensions and margins of the graph
        var margin = {top: 20, right: 30, bottom: 20, left: 10},
        width = 460 - margin.left - margin.right,
        height = 400 - margin.top - margin.bottom;
      
        // append the svg object to the body of the page
        var svg = d3.select("#streamgraph")
        .append("svg")
        .attr("width", width + margin.left + margin.right)
        .attr("height", height + margin.top + margin.bottom)
        .append("g")
        .attr("transform",
            "translate(" + margin.left + "," + margin.top + ")");


        data = D

        // List of groups = header of the csv files
        var keys = E.slice(1).reverse()
        // Add X axis
        var x = d3.scaleLinear()
            .domain([-0.4, 1.2])
            .range([ height, 0 ]);
        // Add Y axis
        var y = d3.scaleLinear()
            .domain(d3.extent(data, function(d) { return d.Time; }))
            .range([ 0, height ]);
      

        //stack the data?
        var stackedData = d3.stack()
            .offset(d3.stackOffsetNone)
            .keys(keys)
            (data)

        // create a tooltip
        var Tooltip = svg
            .append("text")
            .attr("x", 0)
            .attr("y", 0)
            .style("opacity", 0)
            .style("font-size", 17)

        // Three function that change the tooltip when user hover / move / leave a cell
        var mouseover = function(d) {
            Tooltip.style("opacity", 1)
            d3.selectAll(".myArea").style("opacity", .2)
            d3.select(this)
                .style("stroke", "black")
                .style("opacity", 1)
        }
        var mousemove = function(d,i) {
            grp = keys[i]
            cy.edges().style('opacity','0.2');
            cy.nodes().forEach(function( ele ){
              if (ele.id().indexOf(keys[i]) !== -1) {
                ele.style('opacity','1');
              }
              else{
                ele.style('opacity','0.2');
              }
            });
            cy.$(':parent').style('opacity','1');
            //cy.$('#'+keys[i]+'_t1').style('opacity','1');
            Tooltip.text(grp)
        }
        var mouseleave = function(d) {
            Tooltip.style("opacity", 0)
            d3.selectAll(".myArea").style("opacity", 1).style("stroke", "none")
            cy.nodes().style('opacity','1');
            cy.edges().style('opacity','1');
        }
        
        var tickmouseover = function (d) {
            d3.selectAll(".tick").style("opacity", .2);
            d3.select(this).style("opacity", 1);
            cy.nodes().style('opacity','0.2');
            cy.edges().style('opacity','0.2');
            cy.$('#T'+d).style('opacity','1');
            cy.$('#T'+d).children().style('opacity','1');
            cy.$('#T'+d).children().connectedEdges().style('opacity','1');
        }

        var tickmouseout = function (d) {
            d3.selectAll(".tick").style("opacity", 1);
            cy.nodes().style('opacity','1');
            cy.edges().style('opacity','1');
        }
        
        // Area generator
        var area = d3.area()
            .y(function(d) { return y(d.data.Time); })
            .x0(function(d) { return x(d[0]); })
            .x1(function(d) { return x(d[1]); })

        // Show the areas
        svg
            .selectAll("mylayers")
            .data(stackedData)
            .enter()
            .append("path")
            .attr("class", "myArea")
            .style("fill", function(d) { return F[d.key][0]; })
            .attr("d", area)
            .on("mouseover", mouseover)
            .on("mousemove", mousemove)
            .on("mouseleave", mouseleave)
        
        svg.append("g")
            .attr("transform", "translate("+width*0.7 + ",0)")
            .call(d3.axisRight(y).tickSize(-width*.6).tickValues([1, 2, 3, 4]).tickFormat(d3.format("d")))
            .select(".domain").remove()
        // Customization
        svg.selectAll(".tick line").attr("stroke", "#000000")

        svg.selectAll(".tick").on("mouseover", tickmouseover).on("mouseout", tickmouseout)
        // Add Y axis label:
        svg.append("text")
            .attr("text-anchor", "end")
            .attr("x", width)
            .attr("y", 0 )
            .text("Time point")

       
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

          elements: jsdata["elements"],

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
                    function addtable(){
                      var tablecontainer =  document.getElementById("lacetable")
                      console.log(tablecontainer)
                      
                      tablecontainer.innerHTML="<p style='font-size:1em;'>Lorem ipsum dolor sit amet, consectetur adipiscing elit. Praesent tincidunt massa eu ligula ornare, ac eleifend odio ullamcorper. Mauris imperdiet elit vel tortor pharetra efficitur. Vestibulum varius sagittis nibh, at vestibulum diam maximus non. Cras interdum neque quam, eu rutrum odio elementum eget. Vestibulum non diam sit amet metus mollis consequat a a nibh. Sed ornare est eu neque tempor, a condimentum quam tincidunt. Mauris varius libero nec posuere viverra. Sed tempus justo non ante viverra rutrum. Quisque venenatis fermentum tincidunt.</p>";
                    }
                    addtable();
                    cy.cxtmenu({
                        selector: 'node',

                        commands: [
                            {
                                content: '<span class="fa fa-flash fa-2x"></span>',
                                select: function(ele){
                                    console.log( ele.id() );
                                }
                            },

                            {
                                content: '<span class="fa fa-star fa-2x"></span>',
                                select: function(ele){
                                    console.log( ele.data('name') );
                                },
                                enabled: false
                            },

                            {
                                content: 'Text',
                                select: function(ele){
                                    console.log( ele.position() );
                                }
                            }
                        ]
                    });

                    cy.cxtmenu({
                        selector: 'core',

                        commands: [
                            {
                                content: 'bg1',
                                select: function(){
                                    console.log( 'bg1' );
                                }
                            },

                            {
                                content: 'bg2',
                                select: function(){
                                    console.log( 'bg2' );
                                }
                            }
                        ]
                    });
                    
                    //function selectNode(node){
                      //cy.$('#'+node)
                    //}
                    cy.edges().on('mouseover',function (e) {
                        cy.nodes().style('opacity','0.2');
                        cy.edges().style('opacity','0.2');
                        cy.$(':parent').style('opacity','1');
                        cy.$('#'+e.target.id()).style('opacity','1');
                        cy.$('#'+e.target.id()).target().style('opacity','1');
                        var str = "";
                        cy.$('#'+e.target.id()).target().predecessors().forEach(function( ele ){
                          ele.style('opacity','1');
                          if(ele.isEdge()){
                            if(ele.data()["name"] !== ""){
                              str = ele.data()["name"] +" " +str; 
                            }
                          }
                        });
                        console.log(str);
                        var tablecontainer =  document.getElementById("lacetable")
                      console.log(tablecontainer)
                      
                      tablecontainer.innerHTML=str;
                    
                        cy.$('#'+e.target.id()).target().successors().style('opacity','1');
                    });
                    cy.edges().on('mouseout',function (e) {
                        cy.nodes().style('opacity','1');
                        cy.edges().style('opacity','1');
                        var tablecontainer =  document.getElementById("lacetable")
                      console.log(tablecontainer)
                      
                      tablecontainer.innerHTML="<p style='font-size:1em;'>Lorem ipsum dolor sit amet, consectetur adipiscing elit. Praesent tincidunt massa eu ligula ornare, ac eleifend odio ullamcorper. Mauris imperdiet elit vel tortor pharetra efficitur. Vestibulum varius sagittis nibh, at vestibulum diam maximus non. Cras interdum neque quam, eu rutrum odio elementum eget. Vestibulum non diam sit amet metus mollis consequat a a nibh. Sed ornare est eu neque tempor, a condimentum quam tincidunt. Mauris varius libero nec posuere viverra. Sed tempus justo non ante viverra rutrum. Quisque venenatis fermentum tincidunt.</p>";
                    
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
