import { useCallback } from "react";
import useStaffAvailability from '../hooks/useStaffAvailability'
import { Box, Flex, Heading, Select, Stack, Text, useColorModeValue, Button } from '@chakra-ui/react'

interface AvailabilityDateFormInterface {
  formik: any
  handleNextStep: () => void
}

const AvailabilityDateForm = ({ formik, handleNextStep}: AvailabilityDateFormInterface) => {
  const {data, error} = useStaffAvailability(formik.values.staffId);

  const handleNext = useCallback(() => {
    formik.validateForm().then((e: any) => {
      if (!e.appointmentDate) {
        handleNextStep()
      }
    });
  }, [formik]);

  return (
    <Flex
      align={"center"}
      justify={"center"}
      bg={useColorModeValue("gray.50", "gray.800")}
    >
      <Stack spacing={8} mx={"auto"} maxW={"lg"} py={12} px={6}>
        <Stack align={"center"}>
          <Heading fontSize={"4xl"} textAlign={"center"}>
            Оберіть дату
          </Heading>
          <Text fontSize={"lg"} color={"gray.600"} textAlign={"center"}>
            для Вашого майбутнього візиту ✌️
          </Text>
     </Stack>
        <Box
              rounded={"lg"}
              bg={useColorModeValue("white", "gray.700")}
              boxShadow={"lg"}
              p={8}
              >
          <Stack spacing={4}>
          {formik.errors.appointmentDate && <Text>{formik.errors.appointmentDate}</Text>}
            <Select
              onChange={formik.handleChange}
              value={formik.values.appointmentDate}
              name="appointmentDate"
              placeholder="Оберіть дату"
            >
              {data?.map((availability) => (
                <option value={availability.date} key={availability.id}>
                  {availability.date}
                </option>
              ))}
            </Select>
          </Stack>
        </Box>
        <Button onClick={handleNext} colorScheme="blue">
        Далі
      </Button>
      </Stack>
    </Flex>
    )
}

export default AvailabilityDateForm