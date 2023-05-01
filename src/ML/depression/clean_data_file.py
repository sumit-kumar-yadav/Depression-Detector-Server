
from cleantext import clean
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
            words_without_emojis = clean(clean_word.lower(), no_emoji=True)
            output_words.append(words_without_emojis)
    return output_words