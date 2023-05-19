import useStaff from "../hooks/useStaff";
import { Box, Flex, Heading, Select, Stack, Text, useColorModeValue } from "@chakra-ui/react";

const StaffSelect = (formik: any) => {
  const { data, error } = useStaff();
  return (
    <Flex
      align={"center"}
      justify={"center"}
      bg={useColorModeValue("gray.50", "gray.800")}
    >
      <Stack spacing={8} mx={"auto"} maxW={"lg"} py={12} px={6}>
        <Stack align={"center"}>
          <Heading fontSize={"4xl"} textAlign={"center"}>
            Оберіть свого майстра
          </Heading>
          <Text fontSize={"lg"} color={"gray.600"} textAlign={"center"}>
            який з нетерпінням на Вас очікує ✌️
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
        name="staffId"
        placeholder="Майстри"
      >
        {data?.map((staff) => (
          <option value={staff.id} key={staff.id}>
            {staff.name}
          </option>
        ))}
      </Select>
        </Stack>
      </Box>
      </Stack>
    </Flex>
    
  );
}

export default StaffSelect;
