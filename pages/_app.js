import "../styles/globals.css";
import { ThirdwebProvider } from "@thirdweb-dev/react";
import { PolygonAmoyTestnet } from "@thirdweb-dev/chains";
import { StateContextProvider } from "../Context/NFTs";

export default function App({ Component, pageProps }) {
  return (
    <ThirdwebProvider activeChain={PolygonAmoyTestnet} >
      <StateContextProvider>
        <Component {...pageProps} />
      </StateContextProvider>
    </ThirdwebProvider>
  );
}

//1:40