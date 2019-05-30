import React, { useState, useMemo, useRef } from "react";
import axios from "axios";

const Finder = () => {
  const [state, setState] = useState({});
  const ref = useRef();

  function handleSubmit(e) {
    e.preventDefault();

    setState({ ...state, searchText: ref.current.value });
  }

  function fetchEmoji() {
    if (state.searchText) {
      const response = axios.get(
        `https://www.emojidex.com/api/v1/emoji/${state.searchText}`
      );
      return response;
    }
  }

  useMemo(async () => {
    const data = await fetchEmoji();
    setState({ ...state, data: data && data.data });
  }, [state.searchText]);

  return (
    <>
      <form onSubmit={handleSubmit}>
        <input type="text" ref={ref} />
      </form>
      {/* {emoji ? <span>{emoji}</span> : "Enter emoji to search"} */}
      <div style={{ fontSize: "10em" }}>{state.data && state.data.moji}</div>
    </>
  );
};

export default Finder;
