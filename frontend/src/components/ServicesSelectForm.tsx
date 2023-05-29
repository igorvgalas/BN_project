import { useCallback } from "react";
import useServices from "../hooks/useServices";
import { Box, Button, Flex, Heading, Select, Stack, Text, useColorModeValue } from "@chakra-ui/react";

interface ServiceSelectFormInterface {
  formik: any
  handleNextStep: () => void
}
const ServiceSelectForm = ({formik, handleNextStep}:ServiceSelectFormInterface) => {
  
  const { data, error } = useServices();
  
  const handleNext = useCallback(() => {
    formik.validateForm().then((e: any) => {
      if (!e.serviceId) {
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
            onChange={formik.handleChange}
            value={formik.values.serviceId}
            name="serviceId"
            placeholder="Процедури"
        >
        {data?.map((service:any) => (
          <option value={service.id} key={service.id}>
            {service.title}
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
  );
}

export default ServiceSelectForm;