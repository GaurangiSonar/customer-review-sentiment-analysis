# Customer Review Sentiment Analysis

## Overview

Customer Review Sentiment Analysis is a Machine Learning and Natural Language Processing (NLP) project that analyzes customer reviews and classifies them as **Positive**, **Neutral**, or **Negative**. The application compares the performance of **Logistic Regression** and **Naive Bayes** models through an interactive web interface built using Flask.

The project demonstrates the complete machine learning workflow, from data preprocessing and feature engineering to model training, evaluation, visualization, and deployment.

---

## Features

* Sentiment classification of customer reviews
* Comparison between Logistic Regression and Naive Bayes models
* Confidence score visualization for predictions
* Text preprocessing using NLP techniques
* Interactive confusion matrix visualization
* Model performance comparison
* Real-time sentiment prediction through a Flask web application
* Modern and responsive user interface

---

## Technologies Used

### Programming & Data Science

* Python
* NumPy
* Pandas

### Machine Learning & NLP

* Scikit-learn
* NLTK
* TF-IDF Vectorization
* Bag-of-Words (BoW)

### Web Development

* Flask
* HTML
* CSS
* JavaScript

### Visualization

* Chart.js
* Matplotlib

---

## Dataset

The project uses a Flipkart Product Reviews dataset containing customer reviews and sentiment labels.

Due to GitHub file size limitations, the dataset has been compressed and uploaded as:

`Flipkart_Product.csv.gz`

---

## Machine Learning Workflow

1. Data Collection
2. Data Cleaning & Preprocessing
3. Tokenization and Lemmatization
4. Stop-word Removal
5. Feature Extraction using TF-IDF and Bag-of-Words
6. Model Training
7. Model Evaluation
8. Web Application Development

---

## Models Used

### Logistic Regression

* TF-IDF feature representation
* Probabilistic linear classification model

### Naive Bayes

* Bag-of-Words feature representation
* Fast probabilistic text classification model

---

## Project Structure

```text
customer-review-sentiment-analysis/
│
├── app.py
├── FMiniProject.ipynb
├── README.md
├── requirements.txt
│
├── templates/
│   └── index.html
│
├── static/
│   ├── style.css
│   └── script.js
│
├── model_lr.pkl
├── model_nb.pkl
├── tfidf.pkl
├── bow.pkl
├── classes.pkl
├── cm_lr.pkl
├── cm_nb.pkl
│
└── Flipkart_Product.csv.gz
```

## Application Outputs

The web application provides:

* Sentiment prediction using Logistic Regression
* Sentiment prediction using Naive Bayes
* Confidence score comparison
* Confusion matrix visualization
* Accuracy, Precision, Recall, and F1-Score metrics
* Model performance insights

<img width="2187" height="1244" alt="image" src="https://github.com/user-attachments/assets/d8782ea6-69df-4d33-b0c1-68a1237ed351" />
<img width="2043" height="1159" alt="image" src="https://github.com/user-attachments/assets/210746bc-4d14-4228-8c45-e9ec342f56ca" />
<img width="1066" height="415" alt="image" src="https://github.com/user-attachments/assets/f38acf11-a9c1-4e1b-bd43-40b009cf0801" />


---

## How to Run

### Install Dependencies

```bash
pip install flask flask-cors pandas numpy scikit-learn nltk emoji joblib matplotlib
```

### Run the Application

```bash
python app.py
```

### Open in Browser

```text
http://127.0.0.1:5000
```

---

## Learning Outcomes

Through this project, I gained practical experience in:

* Natural Language Processing (NLP)
* Text preprocessing and feature engineering
* Machine Learning model development
* Sentiment classification
* Model evaluation and comparison
* Flask-based web application development
* Data visualization and performance analysis

---

## Future Improvements

* Integration of Transformer-based models such as BERT
* Cloud deployment
* Multilingual sentiment analysis
* Review summarization and keyword extraction
* Enhanced analytics dashboard

---

## Author

**Gaurangi Sonar**
