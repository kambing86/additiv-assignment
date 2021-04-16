import axios from "axios";

// example
// ["CEO",{"direct-subordinates":["Samad Pitt","Leanna Hogg"]}]
interface EmployeeResponse {
  // position
  [0]: string;
  // subordinates
  // can be optional
  [1]?: {
    "direct-subordinates": string[];
  };
}

export const getEmployee = (employeeName: string) => {
  return axios.get<EmployeeResponse>(
    `http://api.additivasia.io/api/v1/assignment/employees/${employeeName}`
  );
};
