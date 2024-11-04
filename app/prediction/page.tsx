"use client";
import { FormEvent, useState, useRef, useEffect } from "react";
import Button from "../ui/button";
import { getPrediction } from "../actions/getPrediction";
import { Prediction } from "../types";
import PredictionItem from "../ui/prediction-item";
import { ArrowPathIcon } from "@heroicons/react/24/solid";

export default function PredictionPage() {
  const [symbol, setSymbol] = useState("");
  const [symbols, setSymbols] = useState<string[]>([]);
  const [error, setError] = useState("");
  const [loading, setLoading] = useState(false);
  const [predictons, setPredictions] = useState<Prediction[]>([]);
  const inputRef = useRef<HTMLInputElement>(null);

  useEffect(() => {
    inputRef.current?.focus();
  }, []);

  const handleAddStockSymbol = (e: FormEvent) => {
    e.preventDefault();
    if (symbols.length >= 5) return;

    setSymbols((prevState) => [...prevState, symbol.toLocaleUpperCase()]);
    setSymbol("");
  };

  const handleSubmit = async (e: FormEvent) => {
    try {
      e.preventDefault();
      setLoading(true);
      const { predictionData, message } = await getPrediction(symbols);

      console.log(predictionData, message);

      if (message) {
        setError(message);
        setSymbols([]);
        setLoading(false);
      }

      if (predictionData) {
        const parsedPrediction = JSON.parse(predictionData);
        setPredictions(parsedPrediction);
        setSymbols([]);
        setLoading(false);
        setError("");
      }
    } catch (e) {
      console.error(e);
    }
  };

  return (
    <main className="h-full p-20">
      <h1 className="text-4xl font-bold text-center mb-10">
        Stocks Prediction
      </h1>

      <div className="h-5">
        <div className="flex justify-center pt-2">
          {symbols.map((s) => (
            <div key={s} className="mr-5 font-semibold text-2xl">
              {s}
            </div>
          ))}
        </div>
      </div>

      <form
        onSubmit={handleSubmit}
        className="flex flex-col items-center p-5 mb-10"
      >
        <input
          ref={inputRef}
          type="text"
          placeholder="Enter stock symbol (e.g. AAPL)"
          className="text-black p-1 rounded mb-2 w-[50%]"
          value={symbol}
          onChange={(e) => setSymbol(e.target.value)}
          required={symbols.length < 1}
        />

        <small className="text-sm font-medium mb-5">
          Enter one stock symbol at a time (e.g. AAPL){" "}
          <i className="text-green-300">The max you can add is five.</i>
        </small>

        <>
          {symbols.length >= 5 && (
            <small className="text-sm font-medium mb-5 text-green-600">
              Max symbols reached
            </small>
          )}
        </>

        <Button
          className="bg-blue-600 my-2 font-medium disabled:bg-transparent"
          onClick={handleAddStockSymbol}
          disabled={symbol.length < 1}
        >
          Add Stock
        </Button>

        <Button className="bg-green-500 my-2 font-medium disabled:bg-transparent">
          <div className="flex justify-center">
            {loading && <ArrowPathIcon className="size-6 mr-2 animate-spin" />}
            Get Prediction
          </div>
        </Button>

        <>{error && <div className="text-red-600 text-center">{error}</div>}</>
      </form>

      <>
        {predictons &&
          predictons.map((prediction) => (
            <PredictionItem key={prediction.symbol} {...prediction} />
          ))}
      </>
    </main>
  );
}
