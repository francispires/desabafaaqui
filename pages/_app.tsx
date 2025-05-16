import type { AppProps } from 'next/app';
import { ClerkProvider } from '@clerk/nextjs';
import '../src/index.css';

export default function App({ Component, pageProps }: AppProps) {
  return (
    <ClerkProvider {...pageProps}>
      <Component {...pageProps} />
    </ClerkProvider>
  );
} 