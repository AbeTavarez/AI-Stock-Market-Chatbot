import Hero from "./ui/hero";

export default function Home() {
  return (
    <main className="flex min-h-screen flex-col items-center p-24 font-sans">
     <Hero />

      <div className="mt-32">
        <p className="text-2xl md:text-5xl text-center leading-loose">
          Welcome to the next generation of stock market analysis. Our
          AI-powered application harnesses the power of advanced machine
          learning algorithms to analyze historical stock data and provide
          accurate predictions, helping you make informed investment decisions.
        </p>
      </div>

      <section id="why-choose-us" className="my-32">
        <h2 className="text-5xl font-semibold mb-5 text-center border-b border-b-green-300">
          Why Choose Our AI Chatbot?
        </h2>

        <ul className="text-xl md:text-3xl ">
          <li className="list-disc leading-loose">
            Data-Driven Insights: Leveraging vast amounts of historical stock
            data, our chatbot delivers data-driven predictions to guide your
            investment strategy.
          </li>
          <li className="list-disc leading-loose">
            Real-Time Predictions: Get instant predictions and market trends
            directly from our chatbot, allowing you to stay ahead of the curve.
          </li>
          <li className="list-disc leading-loose">
            User-Friendly Interface: Chat with our intuitive AI to receive
            easy-to-understand insights, whether you&apos;re a seasoned investor
            or just starting out.
          </li>
          <li className="list-disc leading-loose">
            Personalized Advice: Tailored recommendations based on your
            portfolio and investment goals.
          </li>
        </ul>
      </section>

      <section id="how-it-works" className="my-32">
        <h2 className="text-5xl font-semibold mb-5 text-center border-b border-b-green-300">
          How It Works
        </h2>

        <ul className="text-xl md:text-3xl">
          <li className="list-decimal leading-loose">
            Connect: Simply start a conversation with our chatbot and input the
            stocks you&apos;re interested in.
          </li>
          <li className="list-decimal leading-loose">
            Analyze: Our AI analyzes the historical data and applies
            cutting-edge prediction models to forecast potential stock
            movements.
          </li>
          <li className="list-decimal leading-loose">
            User-Friendly Interface: Chat with our intuitive AI to receive
            easy-to-understand insights, whether you&apos;re a seasoned investor
            or just starting out.
          </li>
          <li className="list-decimal leading-loose">
            Predict: Receive real-time predictions and insights on stock
            performance, helping you make well-informed decisions.
          </li>
        </ul>
      </section>

      <section id="who-can-benefit" className="my-32">
        <h2 className="text-5xl font-semibold mb-5 text-center border-b border-b-green-300">
          Who Can Benefit?
        </h2>

        <ul className="text-xl md:text-3xl">
          <li className="list-disc leading-loose">
            Individual Investors: Whether you&apos;re new to investing or
            looking to optimize your strategy, our chatbot offers insights to
            help grow your portfolio.
          </li>
          <li className="list-disc leading-loose">
            Financial Advisors: Enhance your advisory services with AI-driven
            predictions to provide better guidance to your clients.
          </li>
          <li className="list-disc leading-loose">
            Traders: Stay ahead of market trends and make timely trades with our
            accurate stock predictions.
          </li>
        </ul>
      </section>

      <div className="mt-32 text-center">
        <h2 className="text-5xl mb-10 font-semibold">
          Start Predicting Your Success Today
        </h2>
        <p className=" text-2xl md:text-5xl text-center leading-loose">
          Don&apos;t let the market&apos;s unpredictability hold you back. Join
          countless others who trust our AI-powered chatbot to navigate the
          complexities of the stock market. Start chatting now and take control
          of your financial future.
        </p>
      </div>
    </main>
  );
}
