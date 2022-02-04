import React from "react";

const useInfinityScroll = (cb, deps, isEnabled) => {
  const infinityScroll = async () => {
    if (
      document.documentElement.scrollTop +
        document.documentElement.clientHeight >=
      document.documentElement.scrollHeight * 0.7
    ) {
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
