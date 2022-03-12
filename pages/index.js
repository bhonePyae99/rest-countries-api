import axios from "axios";
import Link from "next/link";
import { useEffect, useState, useContext } from "react";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faSearch, faAngleDown } from "@fortawesome/free-solid-svg-icons";
import DisplayContext from "../context/DisplayMode";

export async function getStaticProps() {
  const resp = await axios.get("https://restcountries.com/v3.1/all");

  return {
    props: { data: resp.data },
  };
}

export default function Home({ data }) {
  const [searchInput, setSearchInput] = useState("");
  const [displayData, setDisplayData] = useState([]);
  const [filter, setFilter] = useState(false);
  const [region, setRegion] = useState("");
  const { displayMode } = useContext(DisplayContext);

  const regions = ["africa", "americas", "asia", "europe", "oceania"];

  useEffect(() => {
    setRegion("");
    const displayData = data.filter((item) =>
      item.name.common.toLowerCase().includes(searchInput.toLowerCase())
    );
    setDisplayData(displayData);
  }, [data, searchInput]);

  useEffect(() => {
    setSearchInput("");
    if (region !== "") {
      let displayData = data.filter(
        (item) => item.region.toLowerCase() === region
      );
      setDisplayData(displayData);
    }
  }, [region, data]);

  // useEffect(() => {
  //   const getData = async () => {
  //     const copyData = { ...data };
  //     copyData.loading = true;
  //     setData(copyData);
  //     try {
  //       const resp = await axios.get("https://restcountries.com/v3.1/all");
  //       setData({ loading: false, list: [...resp.data] });
  //     } catch (ex) {
  //       copyData.loading = false;
  //       setData(copyData);
  //     }
  //   };
  //   getData();
  // }, [data]);
  return (
    <div>
      <main
        className={
          displayMode ? "w-5/6 mx-auto pt-10 text-white" : "w-5/6 mx-auto pt-10"
        }
      >
        <div className="flex justify-between flex-wrap gap-y-2 relative">
          <div
            className={
              displayMode
                ? "flex items-center px-4 border-veryDarkBlue bg-darkBlue border-2 rounded"
                : "flex items-center px-4 border-gray-200 border-2 rounded"
            }
          >
            <FontAwesomeIcon
              icon={faSearch}
              style={displayMode ? { color: "white" } : { color: "gray" }}
            />
            <input
              className="outline-none p-2 bg-inherit"
              type="text"
              placeholder="Search for a country..."
              value={searchInput || ""}
              onChange={(e) => {
                setSearchInput(e.target.value);
              }}
            />
          </div>
          <div
            className={
              displayMode
                ? "border-2 px-2 w-[150px] h-[44px] border-veryDarkBlue bg-darkBlue rounded flex items-center"
                : "border-2 px-2 w-[150px] h-[44px] border-gray-200 rounded flex items-center"
            }
          >
            <p className="text-xs font-semibold">Filter by Region</p>
            <FontAwesomeIcon
              icon={faAngleDown}
              onClick={() => {
                setFilter((filter) => !filter);
              }}
              style={displayMode && { color: "white" }}
              className={
                filter
                  ? "w-5 h-5 ml-2 cursor-pointer transforme transition-transform duration-300 ease-linear rotate-180"
                  : "w-5 h-5 ml-2 cursor-pointer transforme transition-transform duration-300 ease-linear "
              }
            />
          </div>
          {filter && (
            <div
              className={
                displayMode
                  ? "absolute px-4 -bottom-1 border-veryDarkBlue bg-darkBlue  border-2 w-[150px] md:right-0 translate-y-full"
                  : "absolute px-4 -bottom-1 border-grey-200 bg-white border-2 w-[150px] md:right-0 translate-y-full"
              }
            >
              <ul className="list-none capitalize text-sm font-semibold">
                {regions.map((item) => (
                  <li
                    key={item}
                    className={
                      item === region
                        ? "py-1 font-bold cursor-pointer"
                        : "py-1 cursor-pointer hover:text-red-400"
                    }
                    onClick={() => {
                      setRegion(item);
                    }}
                  >
                    {item}
                  </li>
                ))}
              </ul>
            </div>
          )}
        </div>
        <div className="grid lg:grid-cols-4 md:grid-cols-2 mt-10 grid-cols-1 gap-x-10 gap-y-10">
          {displayData.map((item) => (
            <Link href={`/${item.cca2}`} passHref key={item.name.common}>
              <div className="col-span-1 flex justify-center">
                <div
                  className={
                    displayMode
                      ? "shadow-lg cursor-pointer bg-darkBlue border-veryDarkBlue border"
                      : "shadow-lg cursor-pointer border"
                  }
                >
                  <img
                    src={item.flags.png}
                    className="w-[226px] h-[113px]"
                    alt=""
                  />
                  <div className="p-4 mb-7">
                    <h3 className="font-bold text-2xl">{item.name.common}</h3>
                    <p>
                      <span className="font-semibold">Population</span>:{" "}
                      {item.population}
                    </p>
                    <p>
                      <span className="font-semibold">Region</span>:{" "}
                      {item.region}
                    </p>
                    <p>
                      <span className="font-semibold">Capital</span>:{" "}
                      {item.capital}
                    </p>
                  </div>
                </div>
              </div>
            </Link>
          ))}
        </div>
      </main>

      <footer></footer>
    </div>
  );
}
