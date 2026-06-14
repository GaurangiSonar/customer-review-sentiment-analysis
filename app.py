from flask import Flask, request, jsonify
from flask_cors import CORS
import joblib
import re
import emoji
from nltk.tokenize import word_tokenize
from nltk.stem import WordNetLemmatizer
from nltk.corpus import stopwords
import nltk

# Initialize Flask app
app = Flask(__name__)
CORS(app)

# --- 1. SETUP & MODEL LOADING ---

# Ensure NLTK resources are available for cleaning
nltk.download(['punkt', 'stopwords', 'wordnet'], quiet=True)
lemmatizer = WordNetLemmatizer()
stop_words = set(stopwords.words('english'))
stop_words.difference_update({'not', 'no', 'never'})

# Load all assets saved from your notebook
try:
    lr_model = joblib.load("model_lr.pkl")
    nb_model = joblib.load("model_nb.pkl")
    
    tfidf = joblib.load("tfidf.pkl")  # Used for Logistic Regression
    bow = joblib.load("bow.pkl")      # Used for Naive Bayes
    model_classes = joblib.load("classes.pkl") # Standard labels [Negative, Neutral, Positive]
    lr_cm = joblib.load("cm_lr.pkl")
    nb_cm = joblib.load("cm_nb.pkl")

except Exception as e:
    print(f"Error loading model files: {e}")

# --- 2. PREPROCESSING FUNCTION ---
# This must match your notebook's clean_text function exactly
def clean_text(text):
    text = emoji.demojize(text)
    text = text.replace(':', ' ').replace('_', ' ').lower()
    text = re.sub(r'[^a-z\s]', '', text)
    tokens = word_tokenize(text)
    return ' '.join([lemmatizer.lemmatize(w) for w in tokens if w not in stop_words])

# --- 3. PREDICTION ROUTE ---

@app.route("/predict", methods=["POST"])
def predict():

    try:

        data = request.json
        raw_review = data.get("review","")

        # Clean review
        processed_review = clean_text(raw_review)

        # Vectorize
        X_tfidf = tfidf.transform([processed_review])
        X_bow = bow.transform([processed_review])

        # Predictions
        lr_pred_idx = int(lr_model.predict(X_tfidf)[0])
        nb_pred_idx = int(nb_model.predict(X_bow)[0])

        # Confidence
        lr_prob = max(lr_model.predict_proba(X_tfidf)[0]) * 100
        nb_prob = max(nb_model.predict_proba(X_bow)[0]) * 100


               # Convert confusion matrices to dictionary format
        lr_matrix = {
            "pp": int(lr_cm[0][0]),
            "pn": int(lr_cm[0][1]),
            "pneg": int(lr_cm[0][2]),

            "np": int(lr_cm[1][0]),
            "nn": int(lr_cm[1][1]),
            "nneg": int(lr_cm[1][2]),

            "negp": int(lr_cm[2][0]),
            "negn": int(lr_cm[2][1]),
            "negneg": int(lr_cm[2][2])
        }

        nb_matrix = {
            "pp": int(nb_cm[0][0]),
            "pn": int(nb_cm[0][1]),
            "pneg": int(nb_cm[0][2]),

            "np": int(nb_cm[1][0]),
            "nn": int(nb_cm[1][1]),
            "nneg": int(nb_cm[1][2]),

            "negp": int(nb_cm[2][0]),
            "negn": int(nb_cm[2][1]),
            "negneg": int(nb_cm[2][2])
        }
        return jsonify({

            "lr": {
                "sentiment": str(model_classes[lr_pred_idx]),
                "confidence": float(round(lr_prob,2))
            },

            "nb": {
                "sentiment": str(model_classes[nb_pred_idx]),
                "confidence": float(round(nb_prob,2))
            },



            # ---------------------------
            # Dataset for confusion matrix
            # ---------------------------
            "lr_matrix": lr_matrix,
            "nb_matrix": nb_matrix

        })


    except Exception as e:

        return jsonify({
            "error": str(e)
        }), 500


if __name__ == "__main__":
    app.run(debug=True)