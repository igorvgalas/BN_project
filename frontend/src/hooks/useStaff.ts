import useData from "../hooks/useData"

export interface Staff {
    id: number;
    name: string;
    age: number;
  }
  
const useStaff = () => useData<Staff>("/staff")

export default useStaff;