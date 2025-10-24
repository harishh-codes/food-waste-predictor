🥗 Food Waste Spoilage Predictor

A Food Spoilage Prediction System using Machine Learning (3 models) with a Flask backend and React + Vite + Tailwind CSS frontend.

This project helps users predict whether leftover food is spoiled or not based on input features like food type, methane level, humidity, and temperature.

📁 Project Structure
food-waste-predictor/
│
├─ backend/
│   ├─ app.py                  # Flask backend API
│   ├─ train_models.py         # Script to train 3 ML models
│   ├─ logistic_food_spoil_model.pkl
│   ├─ random_forest_food_spoil_model.pkl
│   ├─ gradient_boost_food_spoil_model.pkl
│   ├─ preprocessor.joblib     # optional
│   └─ requirements.txt        # Python dependencies
│
├─ frontend/
│   ├─ package.json
│   ├─ vite.config.js
│   └─ src/
│       └─ App.jsx             # Main React component
│
├─ .gitignore
└─ README.md

🚀 Features

Predict food spoilage using 3 ML models:

Logistic Regression

Random Forest

Gradient Boosting

Modern dashboard UI with Tailwind CSS

Manual numeric inputs for Methane, Humidity, Temperature

Dropdowns for Food Type and Model

Color-coded results:

Red = Spoiled

Green = Not Spoiled

Fully interactive and responsive

🧠 Backend Setup (Flask + Python)
1. Install dependencies
cd backend
pip install -r requirements.txt

2. Train models (optional if models already present)
python train_models.py


This will create three .pkl files:

logistic_food_spoil_model.pkl

random_forest_food_spoil_model.pkl

gradient_boost_food_spoil_model.pkl

3. Run backend
python app.py


The API will be available at http://127.0.0.1:5000.

🔗 API Endpoints
POST /predict

Request Body:

{
  "model": "random_forest",
  "food_type": "Rice",
  "methane": 420,
  "humidity": 85,
  "temperature": 33
}


Response:

{
  "model_used": "random_forest",
  "prediction": 1,
  "label": "Spoiled"
}

🌐 Frontend Setup (React + Vite + Tailwind)
1. Install dependencies
cd frontend
npm install

2. Run frontend
npm run dev


Open your browser at the Vite dev URL (usually http://localhost:5173/).

Fill the form: Food Type, Methane, Humidity, Temperature

Select Model

Click Predict → See color-coded result

⚡ Vite Proxy

The frontend fetches predictions from Flask backend. Ensure vite.config.js contains:

server: {
  proxy: {
    '/predict': 'http://127.0.0.1:5000',
  }
}

📝 Notes

Make sure the backend is running before using the frontend.

You can add more food types or tune ML models in train_models.py.

All frontend styling uses Tailwind CSS.

Results are Spoiled / Not Spoiled with interactive UI.

📦 Installation Summary

Clone the repo:

git clone https://github.com/username/food-waste-predictor.git


Backend:

cd backend
pip install -r requirements.txt
python app.py


Frontend:

cd frontend
npm install
npm run dev

🎨 Tech Stack

Backend: Python, Flask, Scikit-learn, Pandas, Joblib

Frontend: React, Vite, Tailwind CSS

Machine Learning Models: Logistic Regression, Random Forest, Gradient Boosting
