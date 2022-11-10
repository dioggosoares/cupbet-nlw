import type { AppProps } from 'next/app'
import { ToastContainer } from 'react-toastify'

import '../styles/global.css'

export default function App({ Component, pageProps }: AppProps) {
  return (
    <>
      <Component {...pageProps} />
      <ToastContainer progressClassName="toastProgress" closeButton={false} />
    </>
  )
}
