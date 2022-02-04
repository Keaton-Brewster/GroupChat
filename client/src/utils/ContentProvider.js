/* eslint-disable react-hooks/exhaustive-deps */
import {
  useEffect,
  useState,
  createContext,
  useContext,
  useReducer,
} from "react";
import { isMobile } from "react-device-detect";
import { useViewport } from "./ViewportProvider";
import reducer, { initialState } from "./Reducer";
import useLocalStorage from "./useLocalStorage";

const mainContentContext = createContext();

export function useContentContext() {
  return useContext(mainContentContext);
}

export default function ContentProvider({ children }) {
  const [contentState, setContentState] = useLocalStorage(
    "content_state",
    "default"
  );

  // I just had what I think might be the best way to handle contect state management.
  // USE LOCAL STORAGE YOU DUMMY. You need to be able to keep track of what is going on for the user, what converstaion theyre on,
  // what page theyre on, etc, and what better way to get around this than by using local storage.

  const { width, height } = useViewport();

  const [display, setDisplay] = useState(() => {
    if (isMobile) return { menu: true, mainContent: false };
    return { menu: true, mainContent: true };
  });

  const [activeContent, setActiveContent] = useState(
    contentState === "default"
      ? { conversations: true }
      : contentState.storedActiveContent
  );

  const [activeMenu, setActiveMenu] = useState(
    contentState === "default"
      ? { conversations: true }
      : contentState.storedActiveMenu
  );

  // State set up for selectef contact. At some point it may be good to rethink the way that I am organizing the content state for this app.
  const [selectedContact, setSelectedContact] = useState();
  // const [selectedContact, setSelectedContact] = useState("+17859698002");

  // This handles the changes between mobile layout and desktop layout
  useEffect(() => {
    const { menu, mainContent } = display;

    if (!isMobile && (!menu || !mainContent)) {
      return setDisplay({
        menu: true,
        mainContent: true,
      });
    }
    if (isMobile && menu && mainContent) {
      return setDisplay({
        menu: true,
        mainContent: false,
      });
    }
  }, [width, height]);

  const value = {
    activeContent,
    setActiveContent,
    activeMenu,
    setActiveMenu,
    display,
    setDisplay,
    selectedContact,
    setSelectedContact,
  };

  // useEffect(() => {
  //   const storableContentState = JSON.stringify({
  //     storedActiveContent: activeContent,
  //     storedActiveMenu: activeMenu,
  //   });
  //   setContentState(storableContentState);
  // }, [activeContent, activeMenu]);

  return (
    <mainContentContext.Provider value={value}>
      {children}
    </mainContentContext.Provider>
  );
}
