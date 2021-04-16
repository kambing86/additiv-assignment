import { useParams } from "react-router";
import useObservable from "../hooks/useObservable";
import { getEmployeeGraph$ } from "../observables/employee";
import cssModule from "./OverviewPage.module.scss";

const OverviewPage = () => {
  const { employeeName } = useParams<{ employeeName: string }>();
  const [employeeListState] = useObservable(() =>
    getEmployeeGraph$(employeeName)
  );
  const { data, error, completed } = employeeListState;
  if (error) {
    return <>Error: {error.message}</>;
  }
  return (
    <div className={cssModule.container}>
      {completed && !data && <>Employee Not Found</>}
      {data && <div>Employee name: {employeeName}</div>}
      {!completed && <>Loading...</>}
      {data && (
        <ul>
          {data.map((name, index) => {
            return <li key={index}>{name}</li>;
          })}
        </ul>
      )}
    </div>
  );
};

export default OverviewPage;
