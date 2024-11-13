import Footer from "@/components/Layout/Footer";
import Header from "@/components/Layout/Header";
import "@/styles/globals.css";
import type { AppProps } from "next/app";
import { useRouter } from "next/router";

export default function App({ Component, pageProps }: AppProps) {
  const router = useRouter();
  const hidePaths = ["/login", "/signup", "/404"];

  return (
    <div className="min-h-screen flex flex-col">
      {!hidePaths.includes(router.pathname) && <Header />}
      <div className="flex-grow">
        <Component {...pageProps} />
      </div>
      {!hidePaths.includes(router.pathname) && <Footer />}
    </div>
  );
}
