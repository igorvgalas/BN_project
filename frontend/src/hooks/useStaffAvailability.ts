import useData, { encodeQueryData } from "../hooks/useData"

export interface DateAvialability {
    id: number;
    date: string;
    staff: number;
  }

  const useStaffAvailability = (staff: number) => {
    const params = {
      staff: staff
    }
    const { data, error, isLoading } = useData<DateAvialability>(`/availability?` + encodeQueryData(params));
    
    return { data, error, isLoading };  
  };
export default useStaffAvailability;