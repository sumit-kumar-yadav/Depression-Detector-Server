import numpy as np
import pandas as pd
import nltk
import os


# Python os path join method
data_path = os.path.join(os.getcwd(), "src/ML", "depression_data.csv")

# Load the depression data from the csv file
df = pd.read_csv(data_path)

# Extract the input and output from the dataframe
x_train = df["tweet"]
y_train = df["target"]

from nltk.tokenize import word_tokenize
documents = []
for i in range(len(x_train)):
    documents.append((word_tokenize(x_train[i].lower()) ,y_train[i]))

from nltk.stem import WordNetLemmatizer
lemmatizer = WordNetLemmatizer()


from nltk.corpus import wordnet
def get_simple_pos(tag):
    if tag.startswith('J'):
        return wordnet.ADJ
    elif tag.startswith('V'):
        return wordnet.VERB
    elif tag.startswith('N'):
        return wordnet.NOUN
    elif tag.startswith('R'):
        return wordnet.ADV
    else:
        return wordnet.NOUN

from nltk.corpus import stopwords
import string
stops = stopwords.words('english') + list(string.punctuation)

from nltk import pos_tag
def clean_data(words):
    output_words = []
    for w in words:
        if w.lower() not in stops:
            pos = pos_tag([w])                                 
            clean_word = lemmatizer.lemmatize(w, get_simple_pos(pos[0][1]))
            output_words.append(clean_word.lower())
    return output_words


import time
start = time.time()
documents = [(clean_data(document), category) for document, category in documents]
end = time.time()

# Split into training and testing data
training_documents = documents[0:2300]
testing_documents = documents[2300:]

all_words = []
for doc in training_documents:
    all_words += doc[0]

import nltk
freq = nltk.FreqDist(all_words)                 #will retrurn a freq distribution object
common = freq.most_common(1000)
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
model_objects = {
    "clean_data": clean_data,
    "get_feature_dict": get_feature_dict,
    "classifier": classifier,
    "accuracy": accuracy
}

import pickle
pickle_file_path = os.path.join(os.getcwd(), "src/ML", "temp.pkl")
if os.path.isfile(pickle_file_path):
    os.remove(pickle_file_path)
file_obj = open(pickle_file_path, 'wb')
pickle.dump(model_objects, file_obj)
file_obj.close()

print("Training is completed.")


