import React from "react";

const Loader = () => {
  return (
    <div className="flex items-center justify-center min-h-[60vh] w-full">
      <div className="relative flex items-center justify-center">
    
        <div className="absolute w-16 h-16 bg-purple-500 rounded-full blur-xl opacity-40 animate-pulse"></div>

        <div className="w-12 h-12 rounded-full border-4 border-purple-500/20 border-t-purple-500 animate-spin"></div>
      </div>
    </div>
  );
};

export default Loader;
