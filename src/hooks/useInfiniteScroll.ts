import { useState, useEffect, useCallback } from "react";

type CallbackFunction = (done: () => void) => void;

const useInfiniteScroll = (
  callback: CallbackFunction,
  canFetchMore: boolean,
  threshold: number = 100
): [boolean, React.Dispatch<React.SetStateAction<boolean>>] => {
  const [isFetching, setIsFetching] = useState<boolean>(false);

  const handleScroll = useCallback(() => {
    const element = document.getElementById("suggestions-container");

    if (!element || !canFetchMore) return;

    const { scrollTop, scrollHeight, clientHeight } = element;

    if (scrollHeight - scrollTop <= clientHeight + threshold && !isFetching) {
      setIsFetching(true);
    }
  }, [isFetching, canFetchMore, threshold]);

  useEffect(() => {
    const element = document.getElementById("suggestions-container");
    if (element) {
      element.addEventListener("scroll", handleScroll);
    }
    return () => {
      if (element) {
        element.removeEventListener("scroll", handleScroll);
      }
    };
  }, [handleScroll]);

  useEffect(() => {
    if (!isFetching) return;
    callback(() => setIsFetching(false));
  }, [isFetching, callback]);

  return [isFetching, setIsFetching];
};

export default useInfiniteScroll;
