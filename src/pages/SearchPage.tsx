import { useCallback, useRef } from "react";
import { useHistory } from "react-router";
import cssModule from "./SearchPage.module.scss";

const SearchPage = () => {
  const history = useHistory();
  const inputRef = useRef<HTMLInputElement>(null);
  const onClick = useCallback(() => {
    const employeeName = inputRef.current?.value;
    if (employeeName && employeeName.length > 0) {
      history.push(`/overview/${employeeName}`);
    }
  }, [history]);
  return (
    <div className={cssModule.container}>
      <input type="text" ref={inputRef} />
      <button {...{ onClick }}>Search</button>
    </div>
  );
};

export default SearchPage;
