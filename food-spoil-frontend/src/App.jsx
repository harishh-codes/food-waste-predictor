import React, { useState } from "react";

function App() {
  const [food_type, setFood] = useState("Rice");
  const [methane, setMethane] = useState("");
  const [humidity, setHumidity] = useState("");
  const [temperature, setTemp] = useState("");
  const [model, setModel] = useState("random_forest");
  const [result, setResult] = useState(null);

  const foodOptions = [
    "Rice","Roti/Chapati","Paneer","Biryani","Dal/Lentils","Vegetable Curry",
    "Pizza","Sandwiches","Pasta","Soup","Salad","Fruits","Bread","Sweets/Desserts","Other"
  ];

  const handleSubmit = async (e) => {
    e.preventDefault();
    const payload = { food_type, methane, humidity, temperature, model };

    try {
      const res = await fetch("/predict", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(payload),
      });
      const data = await res.json();
      setResult(data);
    } catch (err) {
      setResult({ error: err.message });
    }
  };

  return (
    <div className="min-h-screen bg-gray-100 flex flex-col items-center py-10">
      <h1 className="text-4xl font-bold text-gray-800 mb-8">🥗 Food Spoilage Detection</h1>

      <div className="bg-white shadow-lg rounded-xl p-8 w-full max-w-lg">
        <form onSubmit={handleSubmit} className="space-y-4">
          {/* Food Type */}
          <div>
            <label className="block text-gray-700 font-semibold mb-1">Food Type</label>
            <select
              value={food_type}
              onChange={e => setFood(e.target.value)}
              className="w-full border-gray-300 rounded-lg p-2 focus:ring-2 focus:ring-green-400"
            >
              {foodOptions.map(f => <option key={f} value={f}>{f}</option>)}
            </select>
          </div>

          {/* Methane */}
          <div>
            <label className="block text-gray-700 font-semibold mb-1">Methane Level (ppm)</label>
            <input
              type="number"
              value={methane}
              onChange={e => setMethane(e.target.value)}
              className="w-full border-gray-300 rounded-lg p-2 focus:ring-2 focus:ring-green-400"
              placeholder="e.g., 400"
            />
          </div>

          {/* Humidity */}
          <div>
            <label className="block text-gray-700 font-semibold mb-1">Humidity (%)</label>
            <input
              type="number"
              value={humidity}
              onChange={e => setHumidity(e.target.value)}
              className="w-full border-gray-300 rounded-lg p-2 focus:ring-2 focus:ring-green-400"
              placeholder="e.g., 80"
            />
          </div>

          {/* Temperature */}
          <div>
            <label className="block text-gray-700 font-semibold mb-1">Temperature (°C)</label>
            <input
              type="number"
              value={temperature}
              onChange={e => setTemp(e.target.value)}
              className="w-full border-gray-300 rounded-lg p-2 focus:ring-2 focus:ring-green-400"
              placeholder="e.g., 30"
            />
          </div>

          {/* Model Selection */}
          <div>
            <label className="block text-gray-700 font-semibold mb-1">Model</label>
            <select
              value={model}
              onChange={e => setModel(e.target.value)}
              className="w-full border-gray-300 rounded-lg p-2 focus:ring-2 focus:ring-green-400"
            >
              <option value="logistic">Logistic Regression</option>
              <option value="random_forest">Random Forest</option>
              <option value="gradient_boost">Gradient Boosting</option>
            </select>
          </div>

          <button
            type="submit"
            className="w-full bg-green-500 hover:bg-green-600 text-white font-semibold p-3 rounded-lg transition-colors"
          >
            Predict
          </button>
        </form>
      </div>

      {/* Result Card */}
      {result && (
        <div className={`mt-6 p-6 w-full max-w-lg rounded-xl shadow-lg transition-all
            ${result.label === "Spoiled" ? "bg-red-100 text-red-800" : "bg-green-100 text-green-800"}`}>
          <h2 className="text-xl font-bold mb-2">Prediction Result</h2>
          <p><span className="font-semibold">Model Used:</span> {result.model_used}</p>
          <p><span className="font-semibold">Outcome:</span> {result.label}</p>
        </div>
      )}
    </div>
  );
}

export default App;
