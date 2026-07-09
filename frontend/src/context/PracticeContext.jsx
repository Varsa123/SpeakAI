import { createContext, useContext, useState } from "react";

const PracticeContext = createContext();

export function PracticeProvider({ children }) {
  const [transcript, setTranscript] = useState("");
  const [analysis, setAnalysis] = useState(null);
  const [loading, setLoading] = useState(false);

  return (
    <PracticeContext.Provider
      value={{
        transcript,
        setTranscript,
        analysis,
        setAnalysis,
        loading,
        setLoading,
      }}
    >
      {children}
    </PracticeContext.Provider>
  );
}

export const usePractice = () => useContext(PracticeContext);