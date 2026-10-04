import { createContext, useContext } from "react";

import { WeddingData } from "@/core/types";

const WeddingDataContext = createContext<WeddingData | null>(null);

export const WeddingDataProvider = WeddingDataContext.Provider;

export const useWeddingData = (): WeddingData => {
  const data = useContext(WeddingDataContext);
  if (!data) {
    throw new Error("useWeddingData must be used inside <WeddingDataProvider>");
  }
  return data;
};
