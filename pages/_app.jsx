import { useState, useEffect } from "react";
import { AnimatePresence, motion } from "framer-motion";
import { useRouter } from "next/router";

import Layout from "../components/Layout";
import Transition from "../components/Transition";
import SplashScreen from "../components/SplashScreen";

import "../styles/globals.css";

function MyApp({ Component, pageProps }) {
  const router = useRouter();
  const [isLoading, setIsLoading] = useState(false);

  useEffect(() => {
    if (!sessionStorage.getItem('hasVisited')) {
      setIsLoading(true);
    }
  }, []);
  return (
    <>
      <AnimatePresence>
        {isLoading && (
          <SplashScreen onComplete={() => {
            setIsLoading(false);
            sessionStorage.setItem('hasVisited', 'true');
          }} />
        )}
      </AnimatePresence>

      <Layout>
        <AnimatePresence mode="wait">
          <motion.div key={router.route} className="h-full">
            <Transition />
            <Component {...pageProps} />
          </motion.div>
        </AnimatePresence>
      </Layout>
    </>
  );
}

export default MyApp;
