import React from "react";

function Loader() {
  return (
    <div className="flex gap-1 justify-center items-center">
      <div className="w-2 h-2 bg-blue-500 rounded-full animate-bounce"></div>
      <div className="w-2 h-2 bg-blue-500 rounded-full animate-bounce [animation-delay:-.2s]"></div>
      <div className="w-2 h-2 bg-blue-500 rounded-full animate-bounce [animation-delay:-.4s]"></div>
    </div>
  );
}

export default Loader;
