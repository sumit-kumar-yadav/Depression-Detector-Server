import numpy as np
import pandas as pd
import nltk
import os


# Python os path join method
data_path = os.path.join(os.getcwd(), "src/ML/stress", "stress_dataset.csv")

# Load the depression data from the csv file
df = pd.read_csv(data_path)

# Extract the input and output from the dataframe
x_train = df["text"]
y_train = df["labels"]

from nltk.tokenize import word_tokenize
documents = []
for i in range(len(x_train)):
    documents.append((word_tokenize(x_train[i].lower()) ,y_train[i]))

from clean_data_file import clean_data


documents = [(clean_data(document), category) for document, category in documents]


# Split into training and testing data
training_documents = documents[0:5500]
testing_documents = documents[5501:]

all_words = []
for doc in training_documents:
    all_words += doc[0]

import nltk
freq = nltk.FreqDist(all_words)                 #will retrurn a freq distribution object
common = freq.most_common(1200)
features = [i[0] for i in common]

def get_feature_dict(words):
    current_features = {}
    words_set = set(words)
    for w in features:
        current_features[w] = w in words_set
    return current_features

training_data = [(get_feature_dict(doc), category) for doc, category in training_documents]
testing_data = [(get_feature_dict(doc), category) for doc, category in testing_documents]

#Classification using NLTK Naive Bayes
from nltk import NaiveBayesClassifier
classifier = NaiveBayesClassifier.train(training_data)

accuracy = nltk.classify.accuracy(classifier, testing_data)


# Save functions and variables to be exported in "pickle" built-in module

import pickle
pickle_file_path2 = os.path.join(os.getcwd(), "src/ML/stress", "temp2.pkl")
pickle_file_path3 = os.path.join(os.getcwd(), "src/ML/stress", "temp3.pkl")
pickle_file_path4 = os.path.join(os.getcwd(), "src/ML/stress", "temp4.pkl")
if os.path.isfile(pickle_file_path2):
    os.remove(pickle_file_path2)
if os.path.isfile(pickle_file_path3):
    os.remove(pickle_file_path3)
if os.path.isfile(pickle_file_path4):
    os.remove(pickle_file_path4)

file_obj2 = open(pickle_file_path2, 'wb')
file_obj3 = open(pickle_file_path3, 'wb')
file_obj4 = open(pickle_file_path4, 'wb')

pickle.dump(features, file_obj2)
pickle.dump(classifier, file_obj3)
pickle.dump(accuracy, file_obj4)

file_obj2.close()
file_obj3.close()
file_obj4.close()

print(accuracy)


