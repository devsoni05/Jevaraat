import { useEffect, useState } from "react";
import axios from "axios";

function GoldPrice() {
  const [rate, setRate] = useState(null);
  const [error, setError] = useState("");
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const fetchGoldPrice = async () => {
      try {
        const res = await axios.get("https://api.gold-api.com/price/XAU");

        const goldUSD = res.data.price; // USD per ounce

        // Static conversion (fast & no second API dependency)
        const usdToInr = 83;

        const pricePerOunceINR = goldUSD * usdToInr;
        const pricePerGram24K = pricePerOunceINR / 31.1035;
        const pricePerGram22K = pricePerGram24K * 0.916;

        setRate({
          price_per_ounce_inr: pricePerOunceINR,
          price_24k_per_gram: pricePerGram24K,
          price_22k_per_gram: pricePerGram22K,
          updated_at: new Date(),
        });

        setError("");
      } catch (err) {
        console.error("Fetch Error:", err);
        setError("Unable to fetch gold price");
      } finally {
        setLoading(false);
      }
    };

    fetchGoldPrice();

   
    const interval = setInterval(fetchGoldPrice, 30000);

    return () => clearInterval(interval);
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