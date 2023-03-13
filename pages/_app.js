import Navbar from '@/components/navbar';
import UserContext from '@/context/userContext';
import '@/styles/globals.css';
import {SessionProvider} from "next-auth/react";

export default function App({
  Component, pageProps: {session, ...pageProps}
}) {
  return (
    <SessionProvider session={session}>
      <UserContext>
        <Navbar></Navbar>
        <Component {...pageProps} />
      </UserContext>
    </SessionProvider>
  );
}