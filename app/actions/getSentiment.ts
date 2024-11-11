"use server";
import OpenAI from "openai";

const openai = new OpenAI({ apiKey: process.env.OPENAI_API_KEY });

export async function getSentiment(ticker: string) {
  try {
    // ==== Reddit Auth Token ===============
    const auth = Buffer.from(
      `${process.env.REDDIT_WEB_APP}:${process.env.REDDIT_SECRET}`,
    ).toString("base64");

    const redditRes = await fetch(
      "https://www.reddit.com/api/v1/access_token",
      {
        method: "POST",
        headers: {
          "Content-Type": "application/x-www-form-urlencoded",
          Authorization: `Basic ${auth}`,
        },
        body: `grant_type=client_credentials&redirect_url=${process.env.REDIRECT_URL}`,
      },
    );

    const tokenData = await redditRes.json();
    //   console.log(tokenData);

    const accessToken = tokenData.access_token;
    //   console.log(accessToken);

    // ===== Fetch SubReddit Data =============
    const res = await fetch(
      `https://oauth.reddit.com/r/stocks/search?q=${ticker}&limit=2&sort=new&restrict_sr=true`,
      {
        headers: {
          Authorization: `Bearer ${accessToken}`,
        },
      },
    );

    const subRedditData = await res.json();
    console.log(subRedditData.data);

    // ===== Prepare Data =====================

    const posts = subRedditData.data.children.map((p) => {
        return {
            title: p.data.title,
            content: p.data.selftext
        }
    });

    console.log('POST+++++++', posts);
    


    // ============== Posts Sentiment Analysis =================
    const postsSentiment = await Promise.all(
        posts.map(async (p) => {
            const prompt = `
            Your task is to analyze the sentiment of the following text and classify it as positive, negative, or neutral.

            You will be provided with a title and content, analyze both the title and the content before analyzing the sentiment.
            
            {
                title: ${p.title},
                content: ${p.content}
            }

            Do not add any other extra information, just provide the sentiment.

            Here is an example of the response you should provide:
            Positive 
            `;

            const completion = await openai.chat.completions.create({
                model: 'gpt-4o-mini',
                messages: [{role: 'user', content: prompt}],
            });

            const sentiment = completion.choices[0].message.content;
            // console.log(sentiment);
            
            return {
                ...p,
                sentiment
            }

        })
    );
    // console.log(postsSentiment);
    
    return postsSentiment;

  } catch (e) {
    console.error(e);
  }
}
