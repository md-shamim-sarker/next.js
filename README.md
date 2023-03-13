# Next.js Note

## Next.js Context API

### context/userContext.js
```js
import {createContext} from "react";

export const AppContext = createContext();

const UserContext = ({children}) => {
    const myName = "Shamim Sarker";
    const value = {myName};
    return (
        <AppContext.Provider value={value}>
            {children}
        </AppContext.Provider>
    );
};

export default UserContext;
```
### pages/_app.js
```js
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
```
### pages/index.js
```js
import {AppContext} from '@/context/userContext';
import {useSession} from 'next-auth/react';
import React, {useContext} from 'react';

const Home = () => {
  const {myName} = useContext(AppContext);
  const {data: session} = useSession();
  console.log(session);
  return (
    <div>
      <h1>{myName}</h1>
      <p>lorem200</p>
    </div>
  );
};

export default Home;
```