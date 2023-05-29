import {
  Flex,
  Box,
  FormControl,
  FormLabel,
  Input,
  InputGroup,
  HStack,
  Stack,
  Heading,
  Text,
  useColorModeValue,
  InputLeftAddon,
  Button,
} from "@chakra-ui/react";
import { useCallback } from "react";

interface AppointmentContactFormInterface {
  formik: any;
  handleNextStep: () => void;
}

export default function AppointmentContactForm({formik, handleNextStep}:AppointmentContactFormInterface) {
  
  const handleNext = useCallback(() => {
    formik.validateForm().then((e:any) => {
      if (!e.name || !e.phoneNumber) {
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
            Внеси свої дані
          </Heading>
          <Text fontSize={"lg"} color={"gray.600"}>
            для завершення свого запису на процедуру ✌️
          </Text>
        </Stack>
        <Box
          rounded={"lg"}
          bg={useColorModeValue("white", "gray.700")}
          boxShadow={"lg"}
          p={8}
        >
          <Stack spacing={4}>
          {formik.errors.name && <Text>{formik.errors.name}</Text>}
          {formik.errors.phoneNumber && <Text>{formik.errors.phoneNumber}</Text>}
            <HStack>
              <Box>
                <FormControl id="name" isRequired>
                  <FormLabel>Імʼя</FormLabel>
                  <Input 
                  name="name" 
                  type="text"
                  onChange={formik.handleChange}
                  value={formik.values.name}
                   />
                </FormControl>
              </Box>
            </HStack>
            <FormControl id="phoneNumber" isRequired>
              <FormLabel>Номер телефону</FormLabel>
              <InputGroup>
                <InputLeftAddon children="+380" />
                <Input 
                type="tel" 
                name="phoneNumber" 
                placeholder="номер телефону"
                onChange={formik.handleChange}
                value={formik.values.phoneNumber}/>
              </InputGroup>
            </FormControl>
          </Stack>
        </Box>
        <Button onClick={handleNext} colorScheme="blue">
        Далі
      </Button>
      </Stack>
    </Flex>
  );
}
