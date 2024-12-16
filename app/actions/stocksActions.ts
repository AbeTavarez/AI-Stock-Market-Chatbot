import { restClient } from "@polygon.io/client-js";
import { IAggs } from "@polygon.io/client-js";
import {
  yesterdaysDateString,
  getMonthsBackFromYesterday,
} from "../lib/dateHelpers";

const rest = restClient(process.env.POLYGON_API_KEY);

const yesterday = yesterdaysDateString();
const monthsBack = getMonthsBackFromYesterday(1);
console.log(yesterday);

interface StockDataResult extends IAggs {
  error?: { error: string; status: string };
}


/**
 * Fetch the stock dat for a single stock symbol
 * @param symbol 
 * @returns 
 */
export async function fetchStock(symbol: string) {
  try {
    const data = await rest.stocks.aggregates(
      symbol,
      1,
      "day",
      monthsBack,
      yesterday,
    );

    console.log("STOCKS DATA ::: ", data);

    if ( data.resultsCount === 0) {
      return Promise.reject(`Data not available for stock ${data.ticker}`);
    }

    return data;
  } catch (e) {
    console.error(`Error fetching data for ${symbol}: `, e);
  }
}


/**
 * Fetch the Stock data from all symbols
 * @param symbols 
 * @returns 
 */
export async function fetchStocksData(symbols: string[]) {
  try {
    const results = await Promise.allSettled(symbols.map(fetchStock));

    return results.map((promiseResult) => {
      if (promiseResult.status === "fulfilled") {
        return promiseResult.value as StockDataResult;
      } else {
        console.error("Promise rejected: ", promiseResult.reason);

        const error: StockDataResult = {
          error: promiseResult.reason,
        };

        return error;
      }
    });
  } catch (e) {
    console.error("Unexpected error in fetchStocksData: ", e);
    throw new Error("Failed to fetch stocks data")
  }
}
