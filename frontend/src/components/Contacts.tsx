import {
  Card,
  CardBody,
  Heading,
  Text,
  SimpleGrid,
  Stack,
  Container,
  HStack,
  Box,
  Grid,
  GridItem,
} from "@chakra-ui/react";

const Contacts = () => {
  return (
    <Container>    
      <Heading textAlign={"center"} mb={10}>
        Контакти
      </Heading>
      <Text textAlign={"center"}>Торгово-офісний центр Інтерсіті </Text>
        <Card width="100%" height="350px">
            <CardBody>
              <Stack>
                <HStack gap={"20px"}>
                  <Box
                    borderRadius="full"
                    boxSize="30px"
                    backgroundColor="green.500"
                  />
                  <Stack>
                    <Text fontSize={"2xl"}>Місцезнаходження:</Text>
                    <Text>проспект Чорновола 67г Львів 79000, Україна</Text>
                  </Stack>
                </HStack>
                <HStack gap={"20px"}>
                  <Box
                    borderRadius="full"
                    boxSize="30px"
                    backgroundColor="green.500"
                  />
                  <Stack>
                    <Text fontSize={"2xl"}>Електронна пошта:</Text>
                    <Text>beautynailslviv@gmail.com</Text>
                  </Stack>
                </HStack>
                <HStack gap={"20px"}>
                  <Box
                    borderRadius="full"
                    boxSize="30px"
                    backgroundColor="green.500"
                  />
                  <Stack>
                    <Text fontSize={"2xl"}>Телефонуйте:</Text>
                    <Text>+380684786142</Text>
                  </Stack>
                </HStack>
              </Stack>
            </CardBody>
        </Card>
        <iframe
          width="100%"
          height="350px"
          src="https://maps.google.com/maps?q=%D0%9B%D1%8C%D0%B2%D1%96%D0%B2%20%D0%BF%D1%80.%20%D0%A7%D0%BE%D1%80%D0%BD%D0%BE%D0%B2%D0%BE%D0%BB%D0%B0%2067%20%D0%B3&t=&z=13&ie=UTF8&iwloc=&output=embed"
        ></iframe>
    </Container>
  );
};

export default Contacts;
