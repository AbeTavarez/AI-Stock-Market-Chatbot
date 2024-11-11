"use client";
import { useState, useEffect } from "react";
import { getSentiment } from "../actions/getSentiment";

export default function SentimentAnalysis() {
  const [sentimentResult, setSentimentResult] = useState([]);

  useEffect(() => {
    const fetchData = async () => {
      const res = await getSentiment("AAPL");
      console.log(res);
      setSentimentResult(res);
    };
    fetchData();
  }, []);
  return (
    <main>
      <h1>Sentiment Analysis</h1>

      <div>
        {sentimentResult.length > 1 &&
          sentimentResult.map((sentiment, i) => (
            <div key={i}>
              <h2>{sentiment.title}</h2>
              <h2>{sentiment.content}</h2>
              <h2>{sentiment.sentiment}</h2>
            </div>
          ))}
      </div>
    </main>
  );
}
