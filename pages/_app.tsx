import Header from "@/components/Layout/Header";
import "@/styles/globals.css";
import type { AppProps } from "next/app";
import { useRouter } from "next/router";

export default function App({ Component, pageProps }: AppProps) {
  const router = useRouter();
  const hidePaths = ["/login", "/signup"];

  return (
    <>
      {!hidePaths.includes(router.pathname) && <Header />}
      <Component {...pageProps} />
    </>
  );
}
