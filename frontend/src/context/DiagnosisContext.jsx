import React, { createContext, useContext, useState } from 'react';

const DiagnosisContext = createContext();

export function DiagnosisProvider({ children }) {
  const [latestDiagnosis, setLatestDiagnosis] = useState(null);

  return (
    <DiagnosisContext.Provider value={{ latestDiagnosis, setLatestDiagnosis }}>
      {children}
    </DiagnosisContext.Provider>
  );
}

export function useDiagnosis() {
  return useContext(DiagnosisContext);
}
