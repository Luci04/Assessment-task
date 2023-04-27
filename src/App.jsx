import { useEffect, useState } from "react";
import reactLogo from "./assets/react.svg";
import viteLogo from "/vite.svg";
import "./App.css";
import axios from "axios";

function App() {
  const [page, setPage] = useState(1);
  const [Data, setData] = useState([]);
  const [totalPage, setTotalPage] = useState(0);
  const [nextUrl, setNextUrl] = useState(null);

  const URI =
    "https://stagingapi.enalo.in/inventory/get-items/?limit=10&offset=";

  useEffect(() => {
    const fetchData = () => {
      axios
        .get(`${URI}${(page - 1) * 10}`)
        .then((result) => result.data)
        .then((data) => {
          console.log(data.results);
          setData(data.results);
          setTotalPage(data.count);
        })
        .catch((err) => {
          console.log(err);
        });
    };

    fetchData();
  }, [page]);

  return (
    <div>
      <ul>
        {Data.map((ele, index) => {
          console.log("Avinash");
          return <li key={index}>{ele.item_name}</li>;
        })}
      </ul>

      <div>
        <h2>Pagination</h2>
        <button
          disabled={page === 1}
          onClick={() => {
            setPage(page - 1);
          }}
        >
          Prev
        </button>

        <button
          disabled={page === Math.floor((totalPage + 10) / 10)}
          onClick={() => {
            setPage(page + 1);
            console.log(page);
          }}
        >
          Next
        </button>
      </div>
    </div>
  );
}

export default App;
