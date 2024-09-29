import "src/styles/globals.css";
import type { AppProps } from "next/app";
import 'src/styles/Dashboard.css'

export default function App({ Component, pageProps }: AppProps) {
  return <Component {...pageProps} />;
}
