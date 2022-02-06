import React from "react";

const useInitEffect = (cb, deps) => {
  const isMounting = React.useRef(true);

  React.useEffect(() => {
    if (deps && isMounting.current) {
      cb();
      isMounting.current = false;
    }
  }, deps);
};

export default useInitEffect;
