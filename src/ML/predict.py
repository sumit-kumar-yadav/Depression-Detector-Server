import numpy as np
import pandas as pd
import nltk
from nltk.tokenize import word_tokenize
import sys
import os

# from temp.pkl file, load model_objects which was dumped from the model.py file
import pickle
pickle_file_path2 = os.path.join(os.getcwd(), "src/ML", "temp2.pkl")
pickle_file_path3 = os.path.join(os.getcwd(), "src/ML", "temp3.pkl")
pickle_file_path4 = os.path.join(os.getcwd(), "src/ML", "temp4.pkl")

file_obj2 = open(pickle_file_path2, 'rb')
file_obj3 = open(pickle_file_path3, 'rb')
file_obj4 = open(pickle_file_path4, 'rb')

features = pickle.load(file_obj2)
classifier = pickle.load(file_obj3)
accuracy = pickle.load(file_obj4)

file_obj2.close()
file_obj3.close()
file_obj4.close()


# Now predict the new data
# Load data
rawData = "i never make her separate from me because i don t ever want her to feel like i m ashamed with her"
arrayData = [rawData]

# Convert it into document which will be array of array of words using
inputDocuments = []
for i in range(len(arrayData)):
    inputDocuments.append(word_tokenize(arrayData[i].lower()))

# Clean it
from clean_data_file import clean_data
inputDocuments = [clean_data(document) for document in inputDocuments]

# # Get feature dictionary format for Naive Bayes classification 
def get_feature_dict(words):
    current_features = {}
    words_set = set(words)
    for w in features:
        current_features[w] = w in words_set
    return current_features

predection_data_x = [get_feature_dict(doc) for doc in inputDocuments]

# Save the prediction using
predection_data_y=[]
for i in range(len(predection_data_x)):
    predection_data_y.append(classifier.classify(predection_data_x[i]))



# print('Predicted data ', str(sys.argv), accuracy, classifier, get_feature_dict, predection_data_y)
print(predection_data_y[0])