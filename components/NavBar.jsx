import DisplayContext from "../context/DisplayMode";
import { useContext } from "react";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faMoon } from "@fortawesome/free-solid-svg-icons";

const NavBar = () => {
  const { displayMode, setDisplayMode } = useContext(DisplayContext);
  return (
    <nav
      className={
        displayMode
          ? "w-full border-b border-b-veryDarkBlue bg-darkBlue text-white shadow-lg"
          : "w-full border-b border-b-gray-300 shadow-lg"
      }
    >
      <div className="flex w-5/6 justify-between mx-auto py-4">
        <h2 className="md:text-2xl text- font-bold">Where in the world?</h2>
        <div
          className="flex items-center cursor-pointer"
          onClick={() => {
            setDisplayMode((displayMode) => !displayMode);
          }}
        >
          {/* <img
            src={displayMode ? "/moon-filled.svg" : "/moon.svg"}
            className="w-5 h-5 mr-1"
            alt=""
          /> */}
          <FontAwesomeIcon icon={faMoon} />
          <h2 className="font-bold">Dark Mode</h2>
        </div>
      </div>
    </nav>
  );
};

export default NavBar;
