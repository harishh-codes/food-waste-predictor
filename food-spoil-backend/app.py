# app.py
from flask import Flask, request, jsonify
import joblib
import pandas as pd

app = Flask(__name__)

# Load all models once
models = {
    "logistic": joblib.load("logistic_food_spoil_model.pkl"),
    "random_forest": joblib.load("random_forest_food_spoil_model.pkl"),
    "gradient_boost": joblib.load("gradient_boost_food_spoil_model.pkl")
}

@app.route("/")
def home():
    return "✅ Food Spoilage Prediction API with 3 Models is running!"

@app.route("/predict", methods=["POST"])
def predict():
    data = request.json
    try:
        model_name = data.get("model", "random_forest")  # default to random forest
        food = data["food_type"]
        methane = float(data["methane"])
        humidity = float(data["humidity"])
        temperature = float(data["temperature"])

        if model_name not in models:
            return jsonify({"error": "Invalid model name. Use logistic, random_forest, or gradient_boost."})

        # Prepare DataFrame
        sample_df = pd.DataFrame({
            "Food type": [food],
            "methane gas level": [methane],
            "humidity": [humidity],
            "temperature": [temperature]
        })

        # Predict
        pred = models[model_name].predict(sample_df)[0]
        label = "Spoiled" if pred == 1 else "Not Spoiled"

        return jsonify({
            "model_used": model_name,
            "prediction": int(pred),
            "label": label
        })

    except Exception as e:
        return jsonify({"error": str(e)})

if __name__ == "__main__":
    app.run(debug=True)
