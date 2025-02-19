import { useState, useEffect } from "react";

interface UseInfiniteScrollProps {
  fetchData: () => Promise<void>;
}

function useInfiniteScroll({ fetchData }: UseInfiniteScrollProps) {
  const [isLoading, setIsLoading] = useState<boolean>(false);
  const [hasMore, setHasMore] = useState<boolean>(true);
  console.log(setHasMore);

  useEffect(() => {
    const handleScroll = () => {
      if (
        window.innerHeight + document.documentElement.scrollTop ===
          document.documentElement.offsetHeight &&
        !isLoading &&
        hasMore
      ) {
        setIsLoading(true);
        fetchData().finally(() => setIsLoading(false));
      }
    };

    window.addEventListener("scroll", handleScroll);

    return () => {
      window.removeEventListener("scroll", handleScroll);
    };
  }, [fetchData, isLoading, hasMore]);

  return { isLoading, hasMore };
}

export default useInfiniteScroll;

// import { useState, useEffect } from "react";

// type UseInfiniteScrollProps = {
//   callback: () => void;
//   hasMore: boolean;
// };

// const useInfiniteScroll = ({
//   callback,
//   hasMore,
// }: UseInfiniteScrollProps): boolean => {
//   const [loading, setLoading] = useState<boolean>(false);

//   const handleScroll = () => {
//     const scrollHeight = document.documentElement.scrollHeight;
//     const scrollTop = document.documentElement.scrollTop;
//     const clientHeight = document.documentElement.clientHeight;

//     if (scrollTop + clientHeight >= scrollHeight - 5 && !loading && hasMore) {
//       setLoading(true);
//       callback();
//     }
//   };

//   useEffect(() => {
//     window.addEventListener("scroll", handleScroll);
//     return () => {
//       window.removeEventListener("scroll", handleScroll);
//     };
//   }, [loading, hasMore]);

//   return loading;
// };

// export default useInfiniteScroll;
