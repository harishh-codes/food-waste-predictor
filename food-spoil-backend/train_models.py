# train_models.py
import pandas as pd
from sklearn.model_selection import train_test_split
from sklearn.preprocessing import OneHotEncoder, StandardScaler
from sklearn.compose import ColumnTransformer
from sklearn.pipeline import Pipeline
from sklearn.linear_model import LogisticRegression
from sklearn.ensemble import RandomForestClassifier, GradientBoostingClassifier
from sklearn.metrics import accuracy_score
import joblib

# 1️⃣ Load dataset
data = pd.read_csv("generated_foods_allitems.csv")

# 2️⃣ Define features and target
X = data[["Food type", "methane gas level", "humidity", "temperature"]]
y = data["outcome"]

# 3️⃣ Split dataset
X_train, X_test, y_train, y_test = train_test_split(X, y, test_size=0.2, random_state=42)

# 4️⃣ Preprocessing (numeric + categorical)
numeric = ["methane gas level", "humidity", "temperature"]
categorical = ["Food type"]

preprocess = ColumnTransformer([
    ("num", StandardScaler(), numeric),
    ("cat", OneHotEncoder(handle_unknown="ignore"), categorical)
])

# 5️⃣ Define three algorithms
models = {
    "logistic": LogisticRegression(max_iter=1000),
    "random_forest": RandomForestClassifier(n_estimators=100, random_state=42),
    "gradient_boost": GradientBoostingClassifier(random_state=42)
}

# 6️⃣ Train, evaluate, and save all models
for name, clf in models.items():
    pipe = Pipeline([
        ("preprocess", preprocess),
        ("model", clf)
    ])
    pipe.fit(X_train, y_train)
    preds = pipe.predict(X_test)
    acc = accuracy_score(y_test, preds)
    print(f"✅ {name.upper()} accuracy: {acc:.2f}")
    joblib.dump(pipe, f"{name}_food_spoil_model.pkl")
    print(f"💾 Saved as {name}_food_spoil_model.pkl\n")

print("🎯 All 3 models trained and saved successfully!")
