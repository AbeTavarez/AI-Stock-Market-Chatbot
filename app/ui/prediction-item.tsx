import { Prediction } from "../types";

export default function PredictionItem(props: Prediction) {
  const { symbol, latestClosePrice, latestTrend, nextDayPrediction, analysis } =
    props;

  return (
    <section className="prediction-item">
      <h2>Stock Price Prediction</h2>

      <div>
        <h3>{symbol}</h3>

        <p>
          <strong>Latest Close Price: {latestClosePrice}</strong>
        </p>
        <p>
          <strong>Latest Trend: {latestTrend}</strong>
        </p>
        <p>
          <strong>Prediction for Next Opening Day: {nextDayPrediction}</strong>
        </p>
        <p>
          <strong>Analysis: {analysis}</strong>
        </p>
      </div>
    </section>
  );
}
