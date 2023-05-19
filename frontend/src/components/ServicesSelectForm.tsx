import useServices from "../hooks/useServices";
import { Box, Flex, Heading, Select, Stack, Text, useColorModeValue } from "@chakra-ui/react";

const StaffSelect = (formik: any) => {
  const { data, error } = useServices();
  return (
    <Flex
      align={"center"}
      justify={"center"}
      bg={useColorModeValue("gray.50", "gray.800")}
    >
      <Stack spacing={8} mx={"auto"} maxW={"lg"} py={12} px={6}>
        <Stack align={"center"}>
          <Heading fontSize={"4xl"} textAlign={"center"}>
            Оберіть процедуру
          </Heading>
          <Text fontSize={"lg"} color={"gray.600"} textAlign={"center"}>
            для свого майбутнього запису ✌️
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
            placeholder="Процедури"
        >
        {data?.map((service) => (
          <option value={service.id} key={service.id}>
            {service.title}
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