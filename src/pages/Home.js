import axios from "axios";
import React, { useEffect, useState } from "react";
import StackGrid from "react-stack-grid";
import { Card, Header } from "../components";

function Home() {
  const [pages, setPages] = useState(1);
  const [datas, setdatas] = useState([]);
  const [isFetching, setIsFetching] = useState(false);
  const [baseUrl, setBaseUrl] = useState("https://api.thecatapi.com/v1/breeds");
  const [search, setSearch] = useState("");

  const fetchData = async () => {
    const secretKey = process.env.REACT_APP_CAT_API_SECRET_KEY;

    const response = await axios.get(baseUrl, {
      params: { limit: 10, page: pages },
      headers: {
        "x-api-key": secretKey,
      },
    });
    const data = response.data;
    setPages(pages + 1);
    setdatas(() => {
      return [...datas, ...data];
    });
  };
  useEffect(() => {
    fetchData();
    window.addEventListener("scroll", handleScroll);
  }, []);

  const handleScroll = () => {
    if (
      Math.ceil(window.innerHeight + document.documentElement.scrollTop) !==
        document.documentElement.offsetHeight ||
      isFetching
    )
      return;
    setIsFetching(true);
  };

  useEffect(() => {
    if (!isFetching) return;
    fetchMoredatas();
  }, [isFetching]);

  const fetchMoredatas = () => {
    fetchData();
    setIsFetching(false);
  };

  const handleSearch = (e) => {
    setIsFetching(true);
    setSearch(e);
    setIsFetching(false);
  };

  return (
    <div className="h-full m-auto" style={{ width: 1000 }}>
      <Header onSearch={(e) => handleSearch(e)} />
      <div className="w-full mt-4 flex justify-between items-center flex-wrap">
        {datas
          .filter((item) => {
            if (search === "") {
              return item;
            } else if (item.name.toLowerCase().includes(search.toLowerCase())) {
              return item;
            }
          })
          .map((data) => {
            return <Card data={data} />;
          })}
        {isFetching && <h1>Fetching more list items...</h1>}
      </div>
    </div>
  );
}

export default Home;
