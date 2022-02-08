import React, { useState } from "react";
import { useRef } from "react";
import { debounce } from "../../services/util.service";

export function FilterSearchPopup({ data, toggleSelect }) {
  const [result, setResult] = useState([]);
  const elSearch = useRef(null);
  const elInput = useRef(null);

  const SearchResult = ({ el, result, search, toggleSelect, close }) => {
    if (!result?.length || !search) return null;
    const top = el.offsetTop + el.clientHeight + 6;
    const style = { top: `${top}px`, width: `${el.clientWidth}px` };
    return (
      <div className="quick-filter-popup" style={style}>
        {result.map((res, idx) => {
          const re = new RegExp(`(${search})`, "gi");
          const title = {
            __html: `${res.name.replace(re, `<span class="bold">$1</span>`)}`,
          };
          return (
            <button
              onClick={() => toggleSelect(res.seo || res.name)}
              data-trans={`${res.seo || res.name} `}
              dangerouslySetInnerHTML={title}
            ></button>
          );
        })}
      </div>
    );
  };

  const cleanUp = () => {
    debounce(
      () => {
        setResult(null);
      },
      `FILTER_CLEAR_${elInput.current.value}`,
      500
    );
  };

  const onSearch = ({ target }) => {
    if (!target.value) {
      cleanUp();
    } else {
      const re = new RegExp(`^(${target.value})`, "gi");
      const result = data
        .filter(
          ({ name, seo }) => name?.match(re) || seo?.replace("-", " ").match(re)
        )
        .slice(0, 8);
      setResult(result);
    }
  };

  const handleKey = ({ key, target }) => {
    if (key === "Enter") {
      const find = target.value.toLowerCase();
      const res =
        data.find(
          ({ name, seo }) =>
            name?.toLowerCase() === find ||
            seo?.replace("-", " ").toLowerCase() === find
        ) || result[0];
      if (res) {
        toggle(res?.seo || res?.name);
        elInput.current.value = "";
      }
    }
  };

  const toggle = (type) => {
    toggleSelect(type);
    elInput.current.value = "";
  };

  return (
    <div className="quick-filter-search">
      <div className="search" ref={elSearch}>
        <input
          ref={elInput}
          onKeyPress={handleKey}
          onInput={onSearch}
          onFocus={onSearch}
          onBlur={cleanUp}
          spellCheck="false"
        ></input>
      </div>
      <SearchResult
        el={elSearch.current}
        result={result}
        search={elInput.current?.value}
        close={cleanUp}
        toggleSelect={toggle}
      />
    </div>
  );
}
