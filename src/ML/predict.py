import model
import numpy as np
import pandas as pd
import nltk
from nltk.tokenize import word_tokenize
import sys
import os

# from temp.pkl file, load model_objects which was dumped from the model.py file
import pickle
pickle_file_path = os.path.join(os.getcwd(), "src/ML", "temp.pkl")
file_obj = open(pickle_file_path, 'rb')
model_objects = pickle.load(file_obj)
print("model_objects***", model_objects)
file_obj.close()

# Now predict the new data
# Load data
rawData = "i never make her separate from me because i don t ever want her to feel like i m ashamed with her"
arrayData = [rawData]

# Convert it into document which will be array of array of words using
inputDocuments = []
for i in range(len(arrayData)):
    inputDocuments.append(word_tokenize(arrayData[i].lower()))

# Clean it
inputDocuments = [model_objects["clean_data"](document) for document in inputDocuments]

# Get feature dictionary format for Naive Bayes classification 
predection_data_x = [model_objects["get_feature_dict"](doc) for doc in inputDocuments]

# Save the prediction using
predection_data_y=[]
for i in range(len(predection_data_x)):
    predection_data_y.append(model_objects["classifier"].classify(predection_data_x[i]))



print('Predicted data ', str(sys.argv), model_objects["accuracy"], predection_data_y[0], inputDocuments[0], model_objects)