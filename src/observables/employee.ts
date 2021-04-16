import { EMPTY, from } from "rxjs";
import { catchError, map, mergeMap, scan } from "rxjs/operators";
import { getEmployee } from "../api/employee";
import { distinctExpand } from "./operators";

export const getEmployee$ = (employeeName: string) => {
  return from(getEmployee(employeeName)).pipe(
    catchError((err: Error) => {
      console.error(err);
      return EMPTY;
    }),
    map((res) => {
      return res.data;
    })
  );
};

export const getEmployeeSub$ = (employeeName: string) => {
  return getEmployee$(employeeName).pipe(
    mergeMap((data) => {
      const subordinates = data[1]?.["direct-subordinates"];
      return subordinates === undefined ? EMPTY : from(subordinates);
    })
  );
};

export const getEmployeeGraph$ = (employeeName: string) => {
  return getEmployeeSub$(employeeName).pipe(
    distinctExpand((name) => {
      return getEmployeeSub$(name);
    }),
    scan((acc, name) => {
      return [...acc, name];
    }, [] as string[])
  );
};
