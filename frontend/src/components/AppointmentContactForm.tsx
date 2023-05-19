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
} from "@chakra-ui/react";

export default function SignupCard() {
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
            <HStack>
              <Box>
                <FormControl id="firstName" isRequired>
                  <FormLabel>Імʼя</FormLabel>
                  <Input type="text" />
                </FormControl>
              </Box>
              <Box>
                <FormControl id="lastName">
                  <FormLabel>Прізвище</FormLabel>
                  <Input type="text" />
                </FormControl>
              </Box>
            </HStack>
            <FormControl id="phoneNumber" isRequired>
              <FormLabel>Номер телефону</FormLabel>
              <InputGroup>
                <InputLeftAddon children="+380" />
                <Input type="tel" placeholder="номер телефону" />
              </InputGroup>
            </FormControl>
          </Stack>
        </Box>
      </Stack>
    </Flex>
  );
}
