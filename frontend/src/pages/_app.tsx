import "../../styles/globals.scss";
import type { AppProps } from "next/app";
import { SessionProvider } from "next-auth/react";
import PopulatedNavBar from "../components/PopulatedNavBar";
import axios from 'axios';
import LoginForm from "@/components/userLogin/LoginForm";

function MyApp({ Component, pageProps: { session, ...pageProps } }: AppProps) {
  return (
  
    <SessionProvider session={session}>
    
      <PopulatedNavBar />
      
      <Component {...pageProps} />
    </SessionProvider>
  );
}
export default MyApp;
