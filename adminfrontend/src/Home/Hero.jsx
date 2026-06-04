import { useEffect, useState } from "react";
import axios from "axios";

let cachedGoldRate = null;
let goldRateRequest = null;

const loadGoldPrice = async () => {
  if (cachedGoldRate) {
    return cachedGoldRate;
  }

  if (!goldRateRequest) {
    goldRateRequest = axios
      .get("https://api.gold-api.com/price/XAU")
      .then((res) => {
        const goldUSD = res.data.price; // USD per ounce

        // Static conversion (fast & no second API dependency)
        const usdToInr = 83;

        const pricePerOunceINR = goldUSD * usdToInr;
        const pricePerGram24K = pricePerOunceINR / 31.1035;
        const pricePerGram22K = pricePerGram24K * 0.916;

        cachedGoldRate = {
          price_per_ounce_inr: pricePerOunceINR,
          price_24k_per_gram: pricePerGram24K,
          price_22k_per_gram: pricePerGram22K,
          updated_at: new Date(),
        };

        return cachedGoldRate;
      })
      .catch((err) => {
        goldRateRequest = null;
        throw err;
      });
  }

  return goldRateRequest;
};

function GoldPrice() {
  const [rate, setRate] = useState(null);
  const [error, setError] = useState("");
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    let shouldUpdate = true;

    loadGoldPrice()
      .then((goldRate) => {
        if (!shouldUpdate) return;
        setRate(goldRate);
        setError("");
      })
      .catch((err) => {
        if (!shouldUpdate) return;
        console.error("Fetch Error:", err);
        setError("Unable to fetch gold price");
      })
      .finally(() => {
        if (!shouldUpdate) return;
        setLoading(false);
      });

    return () => {
      shouldUpdate = false;
    };
  }, []);

  return (
    <div className="container mt-5 p-5">
      <div className="row mb-4">
        <h3 className="text-center fw-bold">Live Gold Price</h3>
      </div>

      <div className="row justify-content-center">
        <div className="col-md-8">
          <div className="card shadow-sm p-4 text-center">

            {loading ? (
              <h5>Loading Gold Price...</h5>
            ) : error ? (
              <h5 className="text-danger">{error}</h5>
            ) : (
              <>
                <h5 className="fw-semibold">Gold Price (India)</h5>

                <h3 className="fw-bold text-warning">
                  ₹ {rate.price_per_ounce_inr.toFixed(2)} / ounce
                </h3>

                <hr />

                <div className="row">
                  <div className="col-md-6">
                    <h6>24K Gold</h6>
                    <h5>₹ {rate.price_24k_per_gram.toFixed(2)} / gram</h5>
                  </div>

                  <div className="col-md-6">
                    <h6>22K Gold</h6>
                    <h5>₹ {rate.price_22k_per_gram.toFixed(2)} / gram</h5>
                  </div>
                </div>

                <hr />

                <p className="text-muted">
                  Last updated:{" "}
                  {new Date(rate.updated_at).toLocaleString()}
                </p>
              </>
            )}

          </div>
        </div>
      </div>
    </div>
  );
}

export default GoldPrice;
