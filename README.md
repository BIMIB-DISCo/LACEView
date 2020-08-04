LACE View
=========

The LACE View tool is a visualization application to explore the LACE
output.

LACEview depends upon LACE tool, since it is a visualizer for LACE.

LACE installation
=================

Firstly install R (tested on version 4.0)

Inside an R session execute the following commands.

```R
install.packages("devtools", dependencies = TRUE)
install.packages("igraph", dependencies = TRUE)
install.packages("RColorBrewer", dependencies = TRUE)
install.packages("Rfast", dependencies = TRUE)
```

Now LACE can be installed as follows:

```R
# install CIMLR from Github
library("devtools")
install_github("BIMIB-DISCo/LACE", ref = "master")

# load LACE library
library("LACE")
```

LACEview Installation
=====================

```R
install_github("BIMIB-DISCo/LACEView")
```

Once both LACE and LACEview are installed. Its time to run the LACE vignette \
in the following snippet

```R
library("LACE")
data(longitudinal_sc_variants)
names(longitudinal_sc_variants)
lik_weights = c(0.2308772,0.2554386,0.2701754,0.2435088)
alpha = list()
alpha[[1]] = c(0.02,0.01,0.01,0.01)
alpha[[2]] = c(0.10,0.05,0.05,0.05)
beta = list()
beta[[1]] = c(0.10,0.05,0.05,0.05)
beta[[2]] = c(0.10,0.05,0.05,0.05)
inference = LACE(D = longitudinal_sc_variants, 
    lik_w = lik_weights, 
    alpha = alpha, 
    beta = beta, 
    keep_equivalent = FALSE, 
    num_rs = 5, 
    num_iter = 10, 
    n_try_bs = 5, 
    num_processes = NA, 
    seed = 12345, 
    verbose = FALSE)
```
instructions to RUN LACEview

```R
library(LACEview)
LACEview(inference)
```
The default viewer is too small for LACEview kindly use the enlarged viewer 
by clicking on the magnifying glass while using Rstudio.

![test](https://user-images.githubusercontent.com/52484030/89264978-70b7a500-d651-11ea-81c6-be3075ecb427.png)

