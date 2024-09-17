import Link from "next/link";
import Navbar from "./navbar";

export default function Header() {
  return (
    <header className="flex items-center justify-center p-5">
      <Link href="/">
        <h1 className="text-3xl font-sans font-black">AI Stocks 🚀</h1>
      </Link>
    <Navbar />
    </header>
  );
}
