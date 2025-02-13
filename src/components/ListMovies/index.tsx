import React from "react";

export default function ListMovies({
  children,
  mainTitle,
}: {
  children: React.ReactNode;
  mainTitle: string;
}) {
  return (
    <>
      <div className="w-full bg-[#FFBB00] text-black font-semibold text-sm md:text-lg flex items-center p-2 md:p-4 my-2 md:my-3 md:m-0">
        {mainTitle}
      </div>
      {children}
    </>
  );
}
