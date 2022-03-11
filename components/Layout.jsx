import Heading from "./Head";
import NavBar from "./NavBar";
import DisplayContext from "../context/DisplayMode";
import { useState } from "react";
import "@fortawesome/fontawesome-svg-core/styles.css"; // import Font Awesome CSS
import { config } from "@fortawesome/fontawesome-svg-core";
config.autoAddCss = false;
const Layout = ({ children }) => {
  const [displayMode, setDisplayMode] = useState(false);
  return (
    <>
      <DisplayContext.Provider value={{ displayMode, setDisplayMode }}>
        <Heading />
        <NavBar />
        <div
          className={
            displayMode
              ? "w-full bg-veryDarkBlueDbg min-h-screen"
              : "w-full bg-gray-50"
          }
        >
          {children}
        </div>
      </DisplayContext.Provider>
    </>
  );
};

export default Layout;
