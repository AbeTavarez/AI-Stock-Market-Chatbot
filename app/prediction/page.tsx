"use client";
import { FormEvent, useState } from "react";
import Button from "../ui/button";
import { getPrediction } from "../actions/getPrediction";
export default function Prediction() {
  const [symbol, setSymbol] = useState("");
  const [symbols, setSymbols] = useState<string[]>([]);
  const [error, setError] = useState("");
  const [loading, setLoading] = useState(false);

  const handleAddStockSymbol = (e: FormEvent) => {
    e.preventDefault();
    if (symbols.length >= 5) return;

    setSymbols((prevState) => [...prevState, symbol.toLocaleUpperCase()]);
    setSymbol("");
  };

  const handleSubmit = (e: FormEvent) => {
    e.preventDefault();
    getPrediction(symbols);
    
  };

  return (
    <main className="h-screen p20">
      <h1 className="text-4xl font-bold text-center">Stocks Prediction</h1>

      <div className="h-5">
        <div className="flex justify-center pt-2">
          {symbols.map((s) => (
            <div key={s} className="mr-5 font-semibold">
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
          Get Prediction
        </Button>

        <>{error && <div className="text-red-600 text-center">{error}</div>}</>
      </form>
    </main>
  );
}
