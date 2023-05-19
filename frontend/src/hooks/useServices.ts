import useData from "../hooks/useData"

export interface Service {
    id: number;
    title: string;
  }
  
const useServices =  () => useData<Service>("/services")

export default useServices;