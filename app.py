from flask import Flask, request, jsonify
from flask_cors import CORS
import pandas as pd
import numpy as np
from sklearn.model_selection import train_test_split
from sklearn.linear_model import LinearRegression
from sklearn.metrics import mean_squared_error

app = Flask(__name__)
CORS(app)

# Sample dataset (replace with a real one or load from a database)
data = {
    "size": [1200, 1500, 1800, 2000, 2400],
    "bedrooms": [2, 3, 3, 4, 4],
    "age": [10, 5, 2, 7, 3],
    "price": [200000, 250000, 300000, 400000, 450000]
}

df = pd.DataFrame(data)
X = df[["size", "bedrooms", "age"]]
y = df["price"]

# Split data for training and testing
X_train, X_test, y_train, y_test = train_test_split(X, y, test_size=0.2, random_state=42)

# Train the model
model = LinearRegression()
model.fit(X_train, y_train)

@app.route("/predict", methods=["POST"])
def predict():
    try:
        input_data = request.json
        features = np.array([input_data["size"], input_data["bedrooms"], input_data["age"]]).reshape(1, -1)
        prediction = model.predict(features)
        return jsonify({"predicted_price": prediction[0]})
    except Exception as e:
        return jsonify({"error": str(e)}), 400

@app.route("/evaluate", methods=["GET"])
def evaluate():
    predictions = model.predict(X_test)
    mse = mean_squared_error(y_test, predictions)
    return jsonify({"mse": mse})

if __name__ == "__main__":
    app.run(debug=True)
