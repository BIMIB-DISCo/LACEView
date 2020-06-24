#' <Add Title>
#'
#' <Add Description>
#'
#' @import htmlwidgets
#'
#' @export
LACEview <- function(inference, width = NULL, height = NULL, elementId = 'cy') {
  B = inference$B
  adj_matrix = array(0L,c((dim(B)[1]-1),(dim(B)[2]-1)))
  rownames(adj_matrix) <- colnames(B)[(2:ncol(B))]
  colnames(adj_matrix) <- colnames(B)[(2:ncol(B))]

  for(rP in 2:(nrow(B))-1) {

    for(rC in (rP+1):nrow(B)) {

      if(all(B[rP,1:rP] == B[rC,1:rP]) && sum(B[rP,])==(sum(B[rC,])-1)) {

        adj_matrix[(rP-1),(rC-1)] <- 1

      }

    }

  }
  library('RColorBrewer')
  adjMatrix_base <- adj_matrix
  colours = brewer.pal(n = nrow(inference$clones_prevalence), name = "Paired")
  elements = list()
  elements$nodes = list()
  elements$edges = list()
  for(row in 1:nrow(adjMatrix_base)) {
    for(col in 1:ncol(adjMatrix_base)) {
      if(adjMatrix_base[row, col] == 1){
        data = list()
        data$data = list()
        data$data$source = sprintf('%s_t%s',rownames(inference[["clones_prevalence"]])[row],1)
        data$data$target = sprintf('%s_t%s',rownames(inference[["clones_prevalence"]])[col],1)
        data$data$name = sprintf('%s',clone_labels[col],1)
        data$data$color = colours[col]
        data$data$id = sprintf('%s_%s',data$data$source,data$data$target)
        data$data$linestyle = "solid"
        elements$edges = c(elements$edges,list(data))
      }
    }
  }
  for(col in 1:(ncol(inference$clones_prevalence)-1)) {
    data = list()
    data$data = list()
    data$data$id = sprintf('T%s',col)
    data$data$name = sprintf('T%s',col)
    data$data$color = "#FFFFFF"
    data$data$size = sprintf('%spx',50)
    data$data$prev = sprintf('%s [%s]',data$data$name,round(inference$clones_prevalence[row,col],2))
    parent = data$data$name
    elements$nodes = c(elements$nodes,list(data))
    for(row in 1:nrow(inference$clones_prevalence)) {
      data = list()
      data$data = list()
      data$data$name = rownames(inference[["clones_prevalence"]])[row]
      data$data$color = colours[row]
      data$data$id = sprintf('%s_t%s',rownames(inference[["clones_prevalence"]])[row],col)
      data$data$size = sprintf('%spx',5+as.integer(inference$clones_prevalence[row,col]*150))
      data$data$prev = sprintf('%s [%s]',data$data$name,round(inference$clones_prevalence[row,col],2))
      data$data$parent = parent
      elements$nodes = c(elements$nodes,list(data))
    }
  }
  for(row in 1:(nrow(inference$clones_prevalence))) {
    for(col in 1:(ncol(inference$clones_prevalence)-1)) {
      if(col == 1){
        source = sprintf('%s_t%s',rownames(inference[["clones_prevalence"]])[row],col)
        next
      }
      target = sprintf('%s_t%s',rownames(inference[["clones_prevalence"]])[row],col)
      data = list()
      data$data = list()
      data$data$source = source
      data$data$id = sprintf('%s_%s',source,target)
      data$data$name = sprintf('')
      data$data$color = colours[row]
      data$data$target = target
      data$data$linestyle = "dashed"
      source = target
      elements$edges = c(elements$edges,list(data))
    }
  }

  
  # forward options using x
  x = list(
    elements = elements
  )

  # create widget
  htmlwidgets::createWidget(
    name = 'LACEview',
    x,
    width = width,
    height = height,
    package = 'LACEview',
    elementId = elementId
  )
  
}

#' Shiny bindings for LACEview
#'
#' Output and render functions for using LACEview within Shiny
#' applications and interactive Rmd documents.
#'
#' @param outputId output variable to read from
#' @param width,height Must be a valid CSS unit (like \code{'100\%'},
#'   \code{'400px'}, \code{'auto'}) or a number, which will be coerced to a
#'   string and have \code{'px'} appended.
#' @param expr An expression that generates a LACEview
#' @param env The environment in which to evaluate \code{expr}.
#' @param quoted Is \code{expr} a quoted expression (with \code{quote()})? This
#'   is useful if you want to save an expression in a variable.
#'
#' @name LACEview-shiny
#'
#' @export
LACEviewOutput <- function(outputId, width = '100%', height = '400px'){
  htmlwidgets::shinyWidgetOutput(outputId, 'LACEview', width, height, package = 'LACEview')
}

#' @rdname LACEview-shiny
#' @export
renderLACEview <- function(expr, env = parent.frame(), quoted = FALSE) {
  if (!quoted) { expr <- substitute(expr) } # force quoted
  htmlwidgets::shinyRenderWidget(expr, LACEviewOutput, env, quoted = TRUE)
}
