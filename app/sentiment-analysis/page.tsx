"use client";
import { useState, FormEvent } from "react";
import { getSentiment } from "../actions/getSentiment";
import { SentimentResult } from "../types";

export default function SentimentAnalysis() {
  const [sentimentResult, setSentimentResult] =
    useState<SentimentResult | null>(null);
  const [ticker, setTicker] = useState("");
  const [loading, setLoading] = useState(false);

  const handleAnalyzeSentiment = async (e: FormEvent) => {
    try {
      e.preventDefault();
      if (!ticker.trim()) return alert("Please add a valid ticker!");

      setLoading(true);
      setSentimentResult(null);

      const sentimentData = await getSentiment(ticker.toUpperCase());
      console.log(sentimentData);

      if (sentimentData === undefined) {
        throw new Error("Error fetching sentiment, please try again!");
      }

      setSentimentResult(sentimentData);
    // eslint-disable-next-line @typescript-eslint/no-explicit-any
    } catch (e: any) {
      console.error(e.message);
      alert(e.message);
    } finally {
      setLoading(false);
      setTicker("");
    }
  };

  return (
    <main className="min-h-screen flex flex-col items-center justify-center bg-gradient-to-br from-purple-500 to-indigo-600 font-sans p-6">
      <h1 className="text-4xl font-bold mb-4">Stock Sentiment Analysis</h1>

      <p className="mb-6 text-xl">
        Enter a stock to discover the market&apos; vibe!
      </p>

      <div className="w-full max-w-md flex flex-col items-center">
        <form
          className="w-full flex items-center mb-4"
          onSubmit={handleAnalyzeSentiment}
        >
          <label htmlFor="stock-ticker" className="w-full">
            <input
              type="text"
              value={ticker}
              onChange={(e) => setTicker(e.target.value)}
              placeholder="Enter a ticker (e.g. AAPL)"
              className="w-full px-4 py-2 rounded-l-md text-black outline-none focus:ring-2 focus:ring-purple-300"
            />
          </label>

          <button className="bg-green-400 hover:bg-green-500 font-bold px-4 py-2 rounded-r-md transition duration-300">
            Analyze
          </button>
        </form>

        {/* LOADING SPINNER  */}
        {loading && (
          <div className="text-center mb-4">
            <div className="w-8 h-8 border-4 border-yellow-400 border-t-transparent rounded-full animate-spin mx-auto"></div>
            <p className="mt-2">Analyzing sentiment...</p>
          </div>
        )}

        {/* SENTIMENT RESULT  */}
        {sentimentResult && (
          <div className="w-full bg-white text-black rounded-lg p-4 shadow-lg mt-4">
            <h2 className="text-lg font-semibold text-center">
              Overall Sentiment{" "}
              <span
                className={`${
                  sentimentResult.mainSentiment === "positive"
                    ? "text-green-500"
                    : sentimentResult.mainSentiment === "negative"
                    ? "text-red-500"
                    : "text-gray-500"
                }`}
              >
                {sentimentResult.mainSentiment.toUpperCase()}
              </span>
            </h2>

            <div className="mt-4">
              <h3 className="font-bold text-lg">Post Highlights:</h3>
              {sentimentResult.posts.length > 0 ? (
                sentimentResult.posts.map((post, idx) => (
                  <div key={idx} className="border-b last:border-none py-2">
                    <h4 className="font-semibold">
                      {post.title || "Untitled Post"}
                    </h4>

                    <p className="text-sm text-gray-700">
                      Sentiment:{" "}
                      <span
                        className={`${
                          post.sentiment === "positive"
                            ? "text-green-500"
                            : post.sentiment === "negative"
                            ? "text-red-500"
                            : "text-gray-500"
                        }`}
                      >
                        {post.sentiment}
                      </span>
                    </p>
                  </div>
                ))
              ) : (
                <p>No posts available for this ticker.</p>
              )}
            </div>

            <div className="mt-4">
              <h3 className="font-bold text-lg">Sentiment Summary:</h3>
              <p className="text-sm">
                Positive {sentimentResult.sentimentCount.positive} | Negative{" "}
                {sentimentResult.sentimentCount.negative} | Neutral{" "}
                {sentimentResult.sentimentCount.neutral}
              </p>
            </div>
          </div>
        )}
      </div>
    </main>
  );
}
