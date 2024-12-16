export type Prediction = {
  symbol: string;
  latestClosePrice: number;
  latestTrend: string;
  nextDayPrediction: number;
  analysis: string;
};

export type RedditPost = {
  data: {
    title: string;
    selftext: string;
  };
};

export type ParsedPost = {
  title: string;
  content: string;
  sentiment: string;
};

export type SentimentCount = {
  positive: number;
  negative: number;
  neutral: number;
};

export type SentimentResult = {
  mainSentiment: string;
  posts: ParsedPost[];
  sentimentCount: SentimentCount;
};
