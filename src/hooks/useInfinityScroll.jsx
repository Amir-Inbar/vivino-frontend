import React from "react";

const useInfinityScroll = (cb, deps, isEnabled) => {
  const infinityScroll = async () => {
    const { scrollTop, clientHeight, scrollHeight } = document.documentElement;
    if (scrollTop + clientHeight >= scrollHeight * 0.8) {
      window.removeEventListener("scroll", infinityScroll);
      await cb();
    }
  };

  React.useEffect(() => {
    if (deps && isEnabled) window.addEventListener("scroll", infinityScroll);
    return () => window.removeEventListener("scroll", infinityScroll);
  }, deps);
};

export default useInfinityScroll;
