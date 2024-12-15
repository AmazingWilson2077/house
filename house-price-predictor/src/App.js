import React, { useState } from "react";
import axios from "axios";

function App() {
  const [size, setSize] = useState("");
  const [bedrooms, setBedrooms] = useState("");
  const [age, setAge] = useState("");
  const [prediction, setPrediction] = useState(null);
  const [error, setError] = useState("");

  const handlePredict = async () => {
    try {
      const response = await axios.post("http://127.0.0.1:5000/predict", {
        size: parseFloat(size),
        bedrooms: parseInt(bedrooms),
        age: parseInt(age),
      });
      setPrediction(response.data.predicted_price);
      setError("");
    } catch (err) {
      setError("Error: Invalid Input or Server Issue");
    }
  };

  return (
    <div style={{ padding: "20px" }}>
      <h1>House Price Predictor</h1>
      <div>
        <label>Size (sq ft):</label>
        <input
          type="number"
          value={size}
          onChange={(e) => setSize(e.target.value)}
        />
      </div>
      <div>
        <label>Bedrooms:</label>
        <input
          type="number"
          value={bedrooms}
          onChange={(e) => setBedrooms(e.target.value)}
        />
      </div>
      <div>
        <label>Age (years):</label>
        <input
          type="number"
          value={age}
          onChange={(e) => setAge(e.target.value)}
        />
      </div>
      <button onClick={handlePredict}>Predict</button>
      {prediction && (
        <div>
          <h2>Predicted Price: ${prediction.toFixed(2)}</h2>
        </div>
      )}
      {error && <p style={{ color: "red" }}>{error}</p>}
    </div>
  );
}

export default App;
