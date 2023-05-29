import useData ,{ encodeQueryData } from "./useData"

export interface AppointmentTimeSlots {
    id: number;
    date: string;
    time_slot:string;
    staff: number;
  }
  
const useAppointmentTimeSlot = (staff:number, date:string) => {
  const params = {
    staff: staff,
    date: date
  }
  const { data, error, isLoading } = useData<AppointmentTimeSlots>(`/appointments/?` + encodeQueryData(params));

  return { data, error, isLoading };
};
export default useAppointmentTimeSlot;