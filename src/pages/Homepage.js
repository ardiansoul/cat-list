import axios from "axios";
import { useCallback, useEffect, useRef, useState } from "react";
import StackGrid from "react-stack-grid";
import InfiniteScroll from "react-infinite-scroll-component";
import { Card, Header } from "../components";
import useInfiniteScroll from "../utils/useInfiniteScroll";

function Homepage() {
  const [pages, setPages] = useState(1);

  const { datas, error, hasMore, loading } = useInfiniteScroll(pages);

  const [search, setSearch] = useState("");

  // useEffect(() => {
  //   setIsLoading(true);
  //   if (search) {
  //     setBaseUrl("https://api.thecatapi.com/v1/breeds/search");
  //   } else {
  //     setBaseUrl("https://api.thecatapi.com/v1/breeds");
  //   }
  //   fetchData();
  //   setIsLoading(false);
  // }, [search, limit]);

  const observer = useRef();
  const lastDataElementRef = useCallback(
    (node) => {
      if (loading) return;
      if (observer.current) observer.current.disconnect();
      observer.current = new IntersectionObserver((entries) => {
        if (entries[0].isIntersecting && hasMore) {
          setPages((prevPages) => prevPages + 1);
        }
      });
      console.log("node", node);
      if (node) observer.current.observe(node);
    },
    [loading, hasMore]
  );

  return (
    <div
      className="m-auto my-16"
      style={{
        width: 1000,
      }}
    >
      <Header onSearch={(q) => setSearch(q)} />
      <div className="w-full mt-6">
        {/* <InfiniteScroll
          dataLength={datas.length}
          next={() => pages + 1}
          hasMore={true}
          loader={
            <div>
              <h1>loading</h1>
            </div>
          }
        > */}
        <StackGrid
          columnWidth={300}
          gutterWidth={20}
          gutterHeight={20}
          style={{ minHeight: "100vh" }}
        >
          {datas.map((data, index) => {
            // if (datas.length === index + 1) {
            return (
              // <Card data={data} key={index} ref={lastDataElementRef} />;
              // (
              <div
                key={data}
                className="w-48 rounded-md border-2 border-black"
                ref={lastDataElementRef}
              >
                <img src={data.image?.url} alt={data.name} />
                <h1>{data.name}</h1>
              </div>
            );
            // } else {
            // return (
            // <Card data={data} />;
            // (
            //   <div
            //     className="w-48 rounded-md border-2 border-black"
            //     key={data}
            //   >
            //     <img src={data.image.url} alt={data.name} />
            //     <h1>{data.name}</h1>
            //   </div>
            // );
            //  }
          })}
          {loading && (
            <div>
              <h1>isLoading</h1>
            </div>
          )}
          {error && (
            <div>
              <h1>tidak ada data</h1>
            </div>
          )}
        </StackGrid>
        {/* </InfiniteScroll> */}
      </div>
    </div>
  );
}

export default Homepage;
