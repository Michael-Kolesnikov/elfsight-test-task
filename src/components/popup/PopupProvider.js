import { createContext, useContext, useMemo, useState } from 'react';

export function PopupProvider({ children }) {
  const [popupSettings, setPopupSettings] = useState({
    visible: false,
    content: {}
  });

  const value = useMemo(() => ({ popupSettings, setPopupSettings }), [
    popupSettings
  ]);

  return (
    <PopupContext.Provider value={value}>{children}</PopupContext.Provider>
  );
}

const PopupContext = createContext({});

export const usePopup = () => useContext(PopupContext);
