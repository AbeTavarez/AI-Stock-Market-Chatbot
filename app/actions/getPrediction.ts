"use server"

import { fetchStocksData } from "./stocksActions"


export async function getPrediction(symbols: string[]) {
    const stocksDataResults = await fetchStocksData(symbols)
    console.log(stocksDataResults);
    
    
}