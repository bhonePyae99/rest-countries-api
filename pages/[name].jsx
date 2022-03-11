import axios from "axios";
import { useRouter } from "next/router";
import { useContext } from "react";
import Link from "next/link";
import DisplayContext from "../context/DisplayMode";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faArrowLeft } from "@fortawesome/free-solid-svg-icons";

export async function getServerSideProps(context) {
  const resp = await axios.get(
    `https://restcountries.com/v3.1/alpha/${context.params.name}`
  );

  return {
    props: { data: resp.data },
  };
}

const Country = ({ data }) => {
  const { displayMode } = useContext(DisplayContext);
  const router = useRouter();
  return (
    <div className={displayMode ? "w-5/6 mx-auto text-white" : "w-5/6 mx-auto"}>
      <button
        className={
          displayMode
            ? "text-xs shadow border-2 border-veryDarkBlue bg-darkBlue px-5 rounded py-1 font-bold mt-10"
            : "text-xs shadow border-2 px-5 rounded py-1 font-bold mt-10"
        }
        onClick={() => {
          router.push("/");
        }}
      >
        <div className="flex items-center">
          <FontAwesomeIcon icon={faArrowLeft} className="mr-2" />
          <p>Back</p>
        </div>
      </button>
      <div className="grid gap-x-10 md:grid-cols-2 grid-cols-1 mt-10">
        <div className="col-span-1">
          <img src={data[0].flags.png} className="w-[500px] h-[250px]" alt="" />
        </div>
        <div className="col-span-1 md:grid md:grid-cols-2 grid-cols-1 md:grid-rows-3 pt-7 pb-5">
          <div className="col-span-1 md:row-span-2">
            <h2 className="font-bold text-2xl">{data[0].name.common}</h2>
            <ul className="text-xs list-none mt-2 leading-loose">
              <li>
                <span className="font-semibold">Native Name: </span>
                {data[0].name.nativeName !== undefined
                  ? data[0].name.nativeName[
                      Object.keys(data[0].name.nativeName)[0]
                    ].common
                  : ""}
              </li>
              <li>
                <span className="font-semibold">Population: </span>
                {data[0].population}
              </li>
              <li>
                <span className="font-semibold">Region: </span>
                {data[0].region}
              </li>
              <li>
                <span className="font-semibold">Sub Region: </span>
                {data[0].subregion}
              </li>
              <li>
                <span className="font-semibold">Capital: </span>
                {data[0].capital !== undefined ? data[0].capital[0] : ""}
              </li>
            </ul>
          </div>
          <div className="col-span-1 row-span-2">
            <ul className="list-none text-xs mt-10 leading-loose">
              <li>
                <span className="font-semibold">Top Level Domain: </span>
                {data[0].tld[0]}
              </li>
              <li>
                <span className="font-semibold">Currencies: </span>
                {data[0].currencies !== undefined
                  ? data[0].currencies[Object.keys(data[0].currencies)[0]].name
                  : ""}
              </li>
              <li>
                <span className="font-semibold">Languages: </span>
                {data[0].languages !== undefined
                  ? Object.keys(data[0].languages).map((item) => {
                      return ` ${data[0].languages[item]}`;
                    })
                  : ""}
              </li>
            </ul>
          </div>
          <div className="col-span-2 pt-6">
            <span className="text-xs font-semibold md:inline block md:mb-0 mb-2">
              Border Countries:{" "}
            </span>
            {data[0].borders &&
              data[0].borders.map((item) => {
                return (
                  <Link href={`/${item}`} passHref key={item}>
                    <button
                      className={
                        displayMode
                          ? "text-xs shadow border-2 mb-2 text-white border-veryDarkBlue bg-darkBlue px-5 md:mr-0 mr-2 md:ml-2 rounded py-1 font-bold"
                          : "text-xs shadow border-2 mb-2 text-gray-500 px-5 md:mr-0 mr-2 md:ml-2 rounded py-1 font-bold"
                      }
                    >
                      {item}
                    </button>
                  </Link>
                );
              })}
          </div>
        </div>
      </div>
    </div>
  );
};

export default Country;
