import { useState } from "react";

const Card = ({ data }) => {
  const [dropdown, setDropdown] = useState(false);

  const handleDropdown = () => {
    setDropdown(!dropdown);
  };

  return (
    <div
      className="rounded-md border-2 border-black my-5"
      style={{ width: 300, height: 300 }}
      onClick={() => {
        handleDropdown();
      }}
    >
      {!dropdown ? (
        <img
          src={data.image?.url}
          alt={data.name}
          className="w-full h-full object-center object-cover"
        />
      ) : (
        <div className="w-full h-full flex flex-col items-center p-2">
          <h1 className="font-bold text-lg mb-2">{data.name}</h1>
          <h1 className="font-bold">Description</h1>
          <h1 className="font-sm mb-2">
            {data.description.substr(1, 200) + " ..."}
          </h1>
          <button
            href={data.wikipedia_url}
            className="font-bold text-center p-2 border-2 border-black rounded-md"
          >
            Wikipedia
          </button>
        </div>
      )}
    </div>
  );
};

export default Card;
