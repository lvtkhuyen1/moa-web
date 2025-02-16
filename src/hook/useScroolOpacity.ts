import { useEffect, useState } from "react";

const useScrollOpacity = (
  initialOpacity: number = 0.2,
  maxOpacity: number = 1,
  scrollFactor: number = 100
) => {
  const [opacity, setOpacity] = useState(initialOpacity);

  useEffect(() => {
    const handleScroll = () => {
      const scrollY = window.scrollY;
      const newOpacity = Math.min(
        maxOpacity,
        initialOpacity + scrollY / scrollFactor
      );
      setOpacity(newOpacity);
    };

    window.addEventListener("scroll", handleScroll);
    return () => {
      window.removeEventListener("scroll", handleScroll);
    };
  }, [initialOpacity, maxOpacity, scrollFactor]);

  return opacity;
};

export default useScrollOpacity;
