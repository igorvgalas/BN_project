import { useCallback } from "react";
import useAppointmentTimeSlotFree from "../hooks/useAppointmentTimeSlot";
import {
  Box,
  Button,
  Flex,
  Heading,
  Select,
  Stack,
  Text,
  useColorModeValue,
} from "@chakra-ui/react";

interface AvailabilityTimeSlotInterface {
  formik: any
  handleNextStep:() => void
  handlePreviousStep:() => void
}


const AvailabilityTimeSlotForm = ({formik, handleNextStep,handlePreviousStep}: AvailabilityTimeSlotInterface) => {
  
  const handleNext = useCallback(() => {
    formik.validateForm().then((e: any) => {
      if (!e.appointmentTime) {
        handleNextStep()
      }
    });
  }, [formik]);

  const handleBack = useCallback(() => {
    handlePreviousStep(); 
  }, [handlePreviousStep]);

  const allTimeSlots = [
    "10:00:00",
    "11:30:00",
    "13:00:00",
    "14:30:00",
    "16:00:00",
    "17:30:00",
  ];
  const { data: dataAppointment, error: errorAppointment } =
    useAppointmentTimeSlotFree(formik.values.staffId, formik.values.appointmentDate);
  const bookedTimeSlot: string[] = [];

  if (dataAppointment) {
    dataAppointment?.forEach((appointment) => {
      bookedTimeSlot.push(appointment.time_slot);
    });
  }
  const availableTimeSlots = allTimeSlots.filter(
    (x) => !bookedTimeSlot.includes(x)
  );
  return (
    <Flex
      align={"center"}
      justify={"center"}
      bg={useColorModeValue("gray.50", "gray.800")}
    >
      <Stack spacing={8} mx={"auto"} maxW={"lg"} py={12} px={6}>
        <Stack align={"center"}>
          <Heading fontSize={"4xl"} textAlign={"center"}>
            Оберіть вільний час
          </Heading>
          <Text fontSize={"lg"} color={"gray.600"} textAlign={"center"}>
            у Вашого майстра ✌️
          </Text>
        </Stack>
        <Box
          rounded={"lg"}
          bg={useColorModeValue("white", "gray.700")}
          boxShadow={"lg"}
          p={8}
        >
          <Stack spacing={4}>
            {formik.errors.appointmentTime&& <Text>{formik.errors.appointmentTime}</Text>}
            <Select
              onChange={formik.handleChange}
              value={formik.values.appointmentTime}
              name="appointmentTime"
              placeholder="Оберіть час"
            >
              {availableTimeSlots.map((timeSlot) => (
                <option key={timeSlot} value={timeSlot}>
                  {timeSlot}
                </option>
              ))}
            </Select>
          </Stack>
        </Box>
        <Flex justify="space-between">
          <Button onClick={handleBack} colorScheme="blue">
            Назад
          </Button>
          <Button onClick={handleNext} colorScheme="blue">
            Далі
          </Button>
        </Flex> 
      </Stack>
    </Flex>
  );
};

export default AvailabilityTimeSlotForm;
