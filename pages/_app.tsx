import '../styles/results.css';
import type { AppProps } from 'next/app';

// This default export is required in a new `pages/_app.js` file.
export default function LooterIO({
  Component,
  pageProps,
}: AppProps): JSX.Element {
  return <Component {...pageProps} />;
}
