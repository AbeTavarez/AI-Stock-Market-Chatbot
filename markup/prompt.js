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