export const services: Array<{
    name: string;
    description: string;
    href: string;
    icon: "sparkles" | "smile" | "personal" | "insight" | "simulation" | "risk";
  }> = [
    {
      name: "Stock Prediction",
      href: "/prediction",
      description:
        "Get a short stock prediction based on the stock historical data.",
      icon: "sparkles",
    },
    {
      name: "Sentiment Analysis",
      href: "/sentiment-analysis",
      description: "Determine the market sentiment surrounding specific stocks.",
      icon: "smile",
    },
    {
      name: "Personalized Financial Planning",
      href: "/personalized-planning",
      description:
        "Get a tailored investment plan based on your personal financial goal.",
      icon: "personal",
    },
    {
      name: "Historical Data Insights",
      href: "/historical-insights",
      description:
        "Get detailed insights and visualizations of historical stock performance.",
      icon: "insight",
    },
    {
      name: "Market Scenarios Simulation",
      href: "/market-simulation",
      description:
        "Simulate different market conditions (e.g., bull or bear markets) and see how your stocks would perform.",
      icon: "simulation",
    },
    {
      name: "Risk Assessment",
      href: "/risk-assessment",
      description:
        "Assess the risk level of your portfolios or potential investments.",
      icon: "risk",
    },
  ];
  