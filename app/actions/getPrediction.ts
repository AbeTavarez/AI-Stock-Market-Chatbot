"use server";
import OpenAI from "openai";
import { fetchStocksData } from "./stocksActions";

const openai = new OpenAI({ apiKey: process.env.OPENAI_API_KEY });

/**
 * Get Prediction
 * @param symbols
 */
export async function getPrediction(symbols: string[]) {
  try {
    const stocksDataResults = await fetchStocksData(symbols);
    console.log(stocksDataResults);

    if (stocksDataResults.length <= 0) {
      throw new Error("No historical data found, please try again!");
    }

    stocksDataResults.forEach((item) => {
      if (item.error) throw new Error(`${item.error}, please try again!`);
    });

    // === Prompt
    const prompt = [
      `
        Your task is to provide a brief stock price prediction for the next stock market opening day.
        You will be provided with a list of stock symbols and their historical data as follow:
          {
              symbol: <stock symbol>,
              data: <historical data>
          }
              
        The <historical data> is organized as follow:
          {
              c: The close price for the symbol in the given time period,
              h: The highest price for the symbol in the given time period,
              l: The lowest price for the symbol in the given time period,
              n: The number of transactions in the aggregate window,
              o: The open price for the symbol in the given time period,
              otc: Whether or not this aggregate is for an OTC ticker. This field will be left off if false,
              t: The Unix Msec timestamp for the start of the aggregate window,
              v: The trading volume of the symbol in the given time period,
              vw: The volume weighted average price
          }
    
          Use the historical data and search for the latest trends before making your prediction.
    
          Format the response in an array of JSON objects just like the two example below:
          
          Example #1, array of a single JSON object:
          
        [
          {
            "symbol": "GME (GameStop Corp.)",
            "latestClosePrice": 21.85,
            "latestTrend": "GME has shown a consistent pattern of volatility with a recent upward trend, reaching highs of $28.10.",
            "nextDayPrediction": 22.10,
            "analysis": "price prediction considers the recent upward trend following a lower close, alongside potential market movements. Trading volume has been significantly high, indicating increased interest which could lead to a slight price increase."
          }
        ]
    
          Example #2, array of multiple JSON objects:
    
        [
          {
            "symbol": "DELL (DELL Technologies Inc.)",
            "latestClosePrice": 117.5,
            "latestTrend": "DELL has shown a consistent pattern of volatility with a recent upward trend, reaching highs of $118.84.",
            "nextDayPrediction": 118.25,
            "analysis": "The stock has shown a stable upward momentum, closing higher than its opening price in several recent sessions. Considering the latest trend and historical performance, the prediction estimates a slight increase at the next opening."
          },
          {
            "symbol": "AAPL (Apple Inc.)",
            "latestClosePrice": 217.70,
            "latestTrend": "IBM has shown a consistent pattern of volatility with a recent upward trend, reaching highs of $218.84.",
            "nextDayPrediction": 218.50,
            "analysis": "The stock has shown a stable upward momentum, closing higher than its opening price in several recent sessions. Considering the latest trend and historical performance, the prediction estimates a slight increase at the next opening."
          }
        ]
    
          Don't add any other extra markup.
    
          The actual historical data will start right after this line:
          `,
    ];

    //
    stocksDataResults.forEach((symbol) => {
      const dataObj = {
        symbol: symbol.ticker,
        data: symbol.results?.map((item) => JSON.stringify(item)).join(""),
      };

      prompt.push(JSON.stringify(dataObj));
    });

    // Make the request to OPEN AI
    const completion = await openai.chat.completions.create({
      model: "gpt-4o-mini",
      messages: [
        { role: "system", content: "You are a stock market expert." },
        { role: "user", content: prompt.join("") },
      ],
      temperature: 0,
    });

    console.log(completion);

    const predictionData = completion.choices[0].message.content;
    console.log(predictionData);

    return { predictionData };
  // eslint-disable-next-line @typescript-eslint/no-explicit-any
  } catch (e: any) {
    console.error(e);
    return { message: e.message };
  }
}
