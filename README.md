# Customer Review Sentiment Analysis

## Overview

Customer Review Sentiment Analysis is a Machine Learning and Natural Language Processing (NLP) project that analyzes customer reviews and classifies them as **Positive**, **Negative**, or **Neutral**. The system helps understand customer opinions from large volumes of textual feedback, enabling businesses to make data-driven decisions and improve customer satisfaction.

## Features

* Sentiment classification of customer reviews
* Text preprocessing and cleaning
* Feature extraction using TF-IDF Vectorization
* Multiple machine learning models for prediction
* Comparison of model performance
* Interactive web interface using Flask
* Real-time sentiment prediction from user input

## Technologies Used

### Programming Language

* Python

### Libraries & Tools

* Pandas
* NumPy
* Scikit-learn
* Flask
* NLTK
* Matplotlib
* Seaborn

### Machine Learning Models

* Logistic Regression
* Naive Bayes

### NLP Techniques

* Text Cleaning
* Tokenization
* Stop-word Removal
* TF-IDF Vectorization

## Dataset

The project uses the **Flipkart Product Review Dataset** containing customer reviews and sentiment labels.

Dataset Information:

* Approximate Size: 189,874 records
* Features:

  * Product Name
  * Price
  * Rating
  * Review
  * Summary
  * Sentiment

To reduce repository size, the dataset is stored in compressed format (`.csv.gz`).

## Project Workflow

1. Data Collection
2. Data Cleaning and Preprocessing
3. Text Feature Extraction using TF-IDF
4. Model Training
5. Model Evaluation
6. Sentiment Prediction
7. Web Application Deployment using Flask

## Project Structure

```text
Customer-Review-Sentiment-Analysis/
│
├── app.py
├── model_lr.pkl
├── model_nb.pkl
├── Flipkart_Product.csv.gz
├── requirements.txt
├── README.md
│
├── templates/
├── static/
```

## Key Learning Outcomes

* Applied Natural Language Processing techniques to real-world review data.
* Built and evaluated machine learning classification models.
* Developed an end-to-end ML pipeline from preprocessing to deployment.
* Created a Flask-based web application for real-time sentiment prediction.
* Gained practical experience in machine learning model comparison and evaluation.

## Future Improvements

* Integration of Deep Learning models such as LSTM and BERT.
* Support for multilingual sentiment analysis.
* Advanced visualization dashboard for sentiment insights.
* Deployment on cloud platforms for public access.

## Author

**Gaurangi Sonar**
