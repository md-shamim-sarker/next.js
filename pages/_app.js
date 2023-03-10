import Navbar from '@/components/navbar';
import '@/styles/globals.css';
import {SessionProvider} from "next-auth/react";

export default function App({
  Component, pageProps: {session, ...pageProps}
}) {
  return (
    <SessionProvider session={session}>
      <Navbar></Navbar>
      <Component {...pageProps} />
    </SessionProvider>
  );
}