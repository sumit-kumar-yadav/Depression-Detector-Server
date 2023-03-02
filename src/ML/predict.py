
import numpy as np
import pandas as pd
import nltk
from nltk.tokenize import word_tokenize
from model import sys

# from pythonn import clean_data, get_feature_dict, classifier, accuracy in funvar variable
funvar = sys.funvar

# Now predict the new data
# Load data
rawData = "i never make her separate from me because i don t ever want her to feel like i m ashamed with her"
arrayData = [rawData]

# Convert it into document which will be array of array of words using
inputDocuments = []
for i in range(len(arrayData)):
    inputDocuments.append(word_tokenize(arrayData[i].lower()))

# Clean it
inputDocuments = [funvar["clean_data"](document) for document in inputDocuments]

# Get feature dictionary format for Naive Bayes classification 
predection_data_x = [funvar["get_feature_dict"](doc) for doc in inputDocuments]

# Save the prediction using
predection_data_y=[]
for i in range(len(predection_data_x)):
    predection_data_y.append(funvar["classifier"].classify(predection_data_x[i]))



print('Predicted data ', str(sys.argv), funvar["accuracy"], predection_data_y[0], inputDocuments[0], funvar)