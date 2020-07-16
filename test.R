library(jsonlite)
clonalprev_df <- inference$clones_prevalence;
clonalprev_df <- subset(clonalprev_df,select = -c(Total));
clonalprev_df_names <- rownames(clonalprev_df);
stream_df <- data.frame("Time"=c(1:ncol(clonalprev_df)))
# print(c("Time",y))
# print(c(1:length(y)))
# z["Time"] <- c(1:length(y))
for(k in clonalprev_df_names){
  temp <- data.frame(k=clonalprev_df[k,],stringsAsFactors = FALSE) 
  stream_df <- cbind(stream_df,temp)
}
stream_df_colors = list()

library('RColorBrewer')
colours = brewer.pal(n = nrow(inference$clones_prevalence), name = "Paired")
for(K in 1:length(colours)){
 C[[clonalprev_df_names[K]]] = colours[K] 
}
names(stream_df) <- c("Time",clonalprev_df_names)
print(toJSON(stream_df))
print(toJSON(names(stream_df)))
print(toJSON(C))