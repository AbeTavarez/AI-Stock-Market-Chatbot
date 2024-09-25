"use server"

import { fetchStocksData } from "./stocksActions"

/**
 * Get Prediction
 * @param symbols 
 */
export async function getPrediction(symbols: string[]) {
    const stocksDataResults = await fetchStocksData(symbols)
    console.log(stocksDataResults);
    
    
}