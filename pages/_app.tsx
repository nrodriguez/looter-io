// import "blk-design-system-react/src/assets/css/blk-design-system-react.css"
import type { AppProps } from 'next/app'

export default function LooterIO ({ Component, pageProps }: AppProps): JSX.Element{
  return <Component {...pageProps} />
}