import "src/styles/globals.css";
import type { AppProps } from "next/app";
import 'src/styles/Dashboard.css'
import 'bootstrap/dist/css/bootstrap.min.css';
import 'bootstrap-icons/font/bootstrap-icons.css';


export default function App({ Component, pageProps }: AppProps) {
  return <Component {...pageProps} />;
}
