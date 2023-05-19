import useStaffAvailability from '../hooks/useStaffAvailability'
import { Box, Flex, Heading, Select, Stack, Text, useColorModeValue } from '@chakra-ui/react'

const AvailabilityForm = (formik: any) => {
  const staffId = 1
  const {data, error} = useStaffAvailability(staffId);
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
        {error && <Text>{error}</Text>}
    <Select
      onChange={formik.formik.handleChange}
      name="availabilityDate"
      placeholder="Оберіть дату"
    >
      {data?.map((availability) => (
        <option value={availability.id} key={availability.staff}>
          {availability.date}
        </option>
      ))}
    </Select>
        </Stack>
      </Box>
      </Stack>
    </Flex>
    )
}

export default AvailabilityForm