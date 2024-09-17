export default function Footer() {
  return (
    <footer className="bg-gradient-to-r from-green-400 to-green-700 py-40 text-center font-sans">
      <div>
        <div>
          <h3 className="mb-10 text-3xl font-bold">Stay Connected</h3>
          <p className="font-xl font-semibold text-lg">
            Follow us on social media for the latest updates and stock insights:
          </p>
          <div className="my-10 text-lg">
            <a
              href="https://twitter.com/yourprofile"
              target="_blank"
              className="mr-2"
            >
              Twitter
            </a>
            <a
              href="https://linkedin.com/yourprofile"
              target="_blank"
              className="mr-2"
            >
              LinkedIn
            </a>
            <a
              href="https://facebook.com/yourprofile"
              target="_blank"
              className="mr-2"
            >
              Facebook
            </a>
          </div>
        </div>

        <div className="mb-10 text-lg">
          <p>
            <a href="/privacy-policy" className="mr-2 text-blue-600">
              Privacy Policy
            </a>{" "}
            <a href="/terms-of-service" className="mr-2 text-blue-600">
              Terms of Service
            </a>
          </p>
        </div>

        <div className="text-lg">
          <p>© 2024 AI-Stocks. All rights reserved.</p>
        </div>
      </div>
    </footer>
  );
}
