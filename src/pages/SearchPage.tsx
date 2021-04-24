import { FormEvent, useCallback, useMemo, useRef } from "react";
import { useHistory } from "react-router";
import cssModule from "./SearchPage.module.scss";

const SearchPage = () => {
  const history = useHistory();
  const inputRef = useRef<HTMLInputElement>(null);
  const onSubmit = useCallback((event: FormEvent) => {
    event.preventDefault();
    const employeeName = inputRef.current?.value;
    if (employeeName && employeeName.length > 0) {
      history.push(`/overview/${employeeName}`);
    }
  }, [history]);
  return (
    <div className={cssModule.container}>
      <form onSubmit={onSubmit}>
        <input type="text" ref={inputRef} />
        <button type="submit">Search</button>
      </form>
    </div>
  );
};

export default SearchPage;
