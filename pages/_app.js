import 'tailwindcss/tailwind.css'
import React from 'react'
import { StoreProvider } from '../utils/Store';

function MyApp({ Component, pageProps }) {
  React.useEffect(()=>{
    const jssStyles = document.querySelector("#jss-server-side");
    if(jssStyles){
      jssStyles.parentElement.removeChild(jssStyles);
    }
  },[]);
  return (
    <StoreProvider>
      <Component {...pageProps} />
    </StoreProvider>
  );
}

export default MyApp