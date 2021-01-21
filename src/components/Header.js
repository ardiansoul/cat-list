import React from "react";

function Header({onSearch}) {
  return (
    <div className="w-full h-36 bg-black flex justify-center items-center rounded-lg">
      <input
        className="w-8/12 h-10 p-2 rounded-md"
        onChange={(e) => onSearch(e.target.value)}
      />
    </div>
  );
}

export default Header;
