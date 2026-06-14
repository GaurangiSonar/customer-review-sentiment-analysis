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

<img width="1284" height="1217" alt="image" src="https://github.com/user-attachments/assets/2111f145-1472-4a0b-99c7-f5112352cad8" />
<img width="922" height="1184" alt="image" src="https://github.com/user-attachments/assets/2fb76b24-e9f0-4720-ba9d-19db893e1c1b" />
<img width="1088" height="388" alt="image" src="https://github.com/user-attachments/assets/29bd9bcc-026e-4043-b528-43cc50872666" />

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
