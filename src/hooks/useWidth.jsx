
import { useState, useEffect } from "react";

const useWidth = () => {
  const [isSmall, setIsSmall] = useState(false);

  useEffect(() => {
    const updateIsSmall = () => {
      const windowWidth = window.innerWidth;
      setIsSmall(windowWidth < 768 ? true : false); 
    };

    updateIsSmall();

    window.addEventListener("resize", updateIsSmall);

    return () => {
      window.removeEventListener("resize", updateIsSmall);
    };
  }, []);

  return isSmall;
};

export default useWidth;
