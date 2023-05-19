import useAppointmentTimeSlotFree from '../hooks/useAppointmentTimeSlotFree';
import { Box, Flex, Heading, Select, Stack, Text, useColorModeValue } from '@chakra-ui/react'

const AvailabilityTimeSlotForm = (formik: any) => {
    const allTimeSlots = ['10:00:00','11:30:00','13:00:00','14:30:00','16:00:00','17:30:00']
    const {data:dataAppointment, error:errorAppointment} = useAppointmentTimeSlotFree(1,'2023-06-01')
    const bookedTimeSlot: string[] = []
    
    if (dataAppointment) {
      dataAppointment?.forEach((appointment) => {
          bookedTimeSlot.push(appointment.time_slot);
        });
    }
    const availableTimeSlots = allTimeSlots.filter(x => !bookedTimeSlot.includes(x));
    console.log(bookedTimeSlot)
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
        {errorAppointment && <Text>{errorAppointment}</Text>}
        <Select
          onChange={formik.formik.handleChange}
          name="availabilityTime"
          placeholder="Оберіть час"
        >
          {availableTimeSlots.map(time_slot => (
            <option key={time_slot} value={time_slot}>
              {time_slot}
            </option>
          ))}
        </Select>
        </Stack>
      </Box>
      </Stack>
    </Flex>
    );
  };

export default AvailabilityTimeSlotForm