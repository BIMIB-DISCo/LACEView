## Guide for Developers

### Dependencies
- R 4.0
- htmlwidgets
- cytoscape
- cytoscape-dagre
- cytoscape popper
- jquery
- tippy
- popper
- d3
- Bootstrap 4.5.2

### File Structure
- LACEView 
    - Docs
    - inst
        - htmlwidgets
            - lib (dependency repo)
            - LACEview.yaml (dependency listing)
            - LACEview.js (widget driver code)
    - R
        - LACEview.R (Base R driver code)
    - vignettes
        - example (LACEview example written in R markdown with knitr)
       
> Most of the JS code will be soon be moved to atomic js files which will be added as dependencies

### LACEview.R

Contains the sizing policy, function to compute adjacency matrix, generate color codes, cytoscape node elements and more.


### LACEview.js

Contains all of the widget UI. The cytoscape window, streamgraph from D3, code to fetch Data from Ensembl, user interactions.