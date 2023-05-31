import useData ,{ encodeQueryData } from "./useData"

export interface AppointmentTimeSlots {
    id: number;
    appointmentDate: string;
    appointmentTime:string;
    staff: number;
  }
  
const useAppointmentTimeSlot = (staff:number, date:string) => {
  const params = {
    staffId: staff,
    appointmentDate: date
  }
  const { data, error, isLoading } = useData<AppointmentTimeSlots>(`/onlineappointment/?` + encodeQueryData(params));

  return { data, error, isLoading };
};
export default useAppointmentTimeSlot;