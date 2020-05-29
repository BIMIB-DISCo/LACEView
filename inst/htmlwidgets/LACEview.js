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
        'text-halign': 'center',
      }
    },
    {
      selector: 'edge',
      css: {
        'curve-style': 'bezier',
        'target-arrow-shape': 'triangle'
      }
    }
  ],

  elements: {
    nodes: [
      { data: { id: 'HNRNPC',name:'HNRNPC', parent: 't1' }, position: { x: 135, y: 135 } },
      { data: { id: 'PRAME',name:'PRAME', parent: 't1' }, position: { x: 215, y: 55 } },
      { data: { id: 'ARPC2',name:'ARPC2', parent: 't1' }, position: { x: 305, y: 25 } },
      { data: { id: 'COL1A2',name:'COL1A2', parent: 't1' }, position: { x: 215, y: 125 } },
      { data: { id: 'RPL5',name:'RPL5', parent: 't1' }, position: { x: 315, y: 125 } },
      { data: { id: 'CCT8',name:'CCT8', parent: 't1' }, position: { x: 185, y: 175 } },
      { data: { id: 't1',name:'t1' } },
      { data: { id: 'HNRNPC_t1',name:'HNRPC', parent: 't2' }, position: { x: 125, y: 245 } },
      { data: { id: 'CCT8_t1',name:'CCT8', parent: 't2' }, position: { x: 185, y: 245 } },
      { data: { id: 'COL1A2_t1',name:'COL1A2', parent: 't2' }, position: { x: 245, y: 245 } },
      { data: { id: 'PRAME_t1',name:'PRAME', parent: 't2' }, position: { x: 305, y: 245 } },
      { data: { id: 'ARPC2_t1',name:'ARPC2', parent: 't2' }, position: { x: 365, y: 245 } },
      { data: { id: 'RPL5_t1',name:'RPL5', parent: 't2' }, position: { x: 425, y: 245 } },
      { data: { id: 't2' ,name:'t2'} },
      { data: { id: 'HNRNPC_t2',name:'HNRPC', parent: 't3' }, position: { x: 125, y: 315 } },
      { data: { id: 'CCT8_t2',name:'CCT8', parent: 't3' }, position: { x: 185, y: 315 } },
      { data: { id: 'COL1A2_t2',name:'COL1A2', parent: 't3' }, position: { x: 245, y: 315 } },
      { data: { id: 'PRAME_t2',name:'PRAME', parent: 't3' }, position: { x: 305, y: 315 } },
      { data: { id: 'ARPC2_t2',name:'ARPC2', parent: 't3' }, position: { x: 365, y: 315 } },
      { data: { id: 'RPL5_t2',name:'RPL5', parent: 't3' }, position: { x: 425, y: 315 } },
      { data: { id: 't3',name:'t3' } },
      { data: { id: 'HNRNPC_t3',name:'HNRPC', parent: 't4' }, position: { x: 125, y: 395 } },
      { data: { id: 'CCT8_t3',name:'CCT8', parent: 't4' }, position: { x: 185, y: 395 } },
      { data: { id: 'COL1A2_t3',name:'COL1A2', parent: 't4' }, position: { x: 245, y: 395 } },
      { data: { id: 'PRAME_t3',name:'PRAME', parent: 't4' }, position: { x: 305, y: 395 } },
      { data: { id: 'ARPC2_t3',name:'ARPC2', parent: 't4' }, position: { x: 365, y: 395 } },
      { data: { id: 'RPL5_t3',name:'RPL5', parent: 't4' }, position: { x: 425, y: 395 } },
      { data: { id: 't4',name:'t4' } },

    ],
    edges: [
    { data: { id: 'COL1A2_CCT8', source: 'COL1A2', target: 'CCT8' } },
    { data: { id: 'PRAME_COL1A2', source: 'PRAME', target: 'COL1A2' } },
    { data: { id: 'ARPC2_PRAME', source: 'ARPC2', target: 'PRAME' } },
    { data: { id: 'ARPC2_RPL5', source: 'ARPC2', target: 'RPL5' } },
    { data: { id: 'PRAME_HNRNPC', source: 'PRAME', target: 'HNRNPC' } },
    { data: { id: 'HNRNPC_HNRNPC_t1_t2', source: 'HNRNPC', target: 'HNRNPC_t1' } },
    { data: { id: 'HNRNPC_HNRNPC_t2_t3', source: 'HNRNPC_t1', target: 'HNRNPC_t2' } },
    { data: { id: 'HNRNPC_HNRNPC_t3_t4', source: 'HNRNPC_t2', target: 'HNRNPC_t3' } },
    { data: { id: 'CCT8_CCT8_t1_t2', source: 'CCT8', target: 'CCT8_t1' } },
    { data: { id: 'CCT8_CCT8_t2_t3', source: 'CCT8_t1', target: 'CCT8_t2' } },
    { data: { id: 'CCT8_CCT8_t3_t4', source: 'CCT8_t2', target: 'CCT8_t3' } },
    { data: { id: 'COL1A2_COL1A2_t1_t2', source: 'COL1A2', target: 'COL1A2_t1' } },
    { data: { id: 'COL1A2_COL1A2_t2_t3', source: 'COL1A2_t1', target: 'COL1A2_t2' } },
    { data: { id: 'COL1A2_COL1A2_t3_t4', source: 'COL1A2_t2', target: 'COL1A2_t3' } },
    { data: { id: 'PRAME_PRAME_t1_t2', source: 'PRAME', target: 'PRAME_t1' } },
    { data: { id: 'PRAME_PRAME_t2_t3', source: 'PRAME_t1', target: 'PRAME_t2' } },
    { data: { id: 'PRAME_PRAME_t3_t4', source: 'PRAME_t2', target: 'PRAME_t3' } },
    { data: { id: 'ARPC2_ARPC2_t1_t2', source: 'ARPC2', target: 'ARPC2_t1' } },
    { data: { id: 'ARPC2_ARPC2_t2_t3', source: 'ARPC2_t1', target: 'ARPC2_t2' } },
    { data: { id: 'ARPC2_ARPC2_t3_t4', source: 'ARPC2_t2', target: 'ARPC2_t3' } },
    { data: { id: 'RPL5_RPL5_t1_t2', source: 'RPL5', target: 'RPL5_t1' } },
    { data: { id: 'RPL5_RPL5_t2_t3', source: 'RPL5_t1', target: 'RPL5_t2' } },
    { data: { id: 'RPL5_RPL5_t3_t4', source: 'RPL5_t2', target: 'RPL5_t3' } },
    ]
  },

  layout: {
    name: 'preset',
    padding: 5
  }
});

      },

      resize: function(width, height) {

        // TODO: code to re-render the widget with a new size

      }

    };
  }
});
