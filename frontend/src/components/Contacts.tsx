import {
  Card,
  CardBody,
  Heading,
  Text,
  Stack,
  Container,
  HStack,
  Box,
  SimpleGrid,
  Grid,
  Center,
  useColorMode,
} from "@chakra-ui/react";

const Contacts = () => {
  const contactsBoxStyle = {
    borderRadius: "full",
    boxSize: "30px",
    backgroundColor: "pink.200",
    boxShadow: "dark-lg",
    p: "5",
    // rounded:'md',
    // bg:'white'
    ":hover": {
      backgroundColor: "pink.400",
    },
  };
  const { colorMode } = useColorMode();
  const textColor = { light: "black", dark: "white" };

  return (
    <Grid id="contacts" py={10}>
      <Box mb={10}>
        <Heading textAlign={"center"} color={textColor[colorMode]}>Контакти</Heading>
        <Text textAlign={"center"} margin={0} color={textColor[colorMode]}>
          Торгово-офісний центр Інтерсіті
        </Text>
      </Box>
      <SimpleGrid
        templateColumns="repeat(auto-fill, minmax(500px, 1fr))"
        spacing="40px"
        padding={10}
        alignItems="top"
        justifyContent="center"
      >
        <Box>
          <Card>
            <CardBody>
              <Stack gap={"10px"}>
                <HStack gap={"10px"}>
                  <Box sx={contactsBoxStyle} />
                  <Stack>
                    <Text margin={0} fontSize={"2xl"}>
                      Місцезнаходження:
                    </Text>
                    <Text margin={0} fontWeight={"thin"}>
                      проспект Чорновола 67г Львів 79000, Україна
                    </Text>
                  </Stack>
                </HStack>
                <HStack gap={"10px"}>
                  <Box sx={contactsBoxStyle} />
                  <Stack>
                    <Text margin={0} fontSize={"2xl"}>
                      Електронна пошта:
                    </Text>
                    <Text margin={0} fontWeight={"thin"}>
                      beautynailslviv@gmail.com
                    </Text>
                  </Stack>
                </HStack>
                <HStack gap={"10px"}>
                  <Box sx={contactsBoxStyle} />
                  <Stack>
                    <Text margin={0} fontSize={"2xl"}>
                      Телефонуйте:
                    </Text>
                    <Text margin={0} fontWeight={"thin"}>
                      +380684786142
                    </Text>
                  </Stack>
                </HStack>
              </Stack>
            </CardBody>
          </Card>
        </Box>
        <Box>
          <iframe
            width="100%"
            height="280px"
            src="https://maps.google.com/maps?q=%D0%9B%D1%8C%D0%B2%D1%96%D0%B2%20%D0%BF%D1%80.%20%D0%A7%D0%BE%D1%80%D0%BD%D0%BE%D0%B2%D0%BE%D0%BB%D0%B0%2067%20%D0%B3&t=&z=13&ie=UTF8&iwloc=&output=embed"
          ></iframe>
        </Box>
      </SimpleGrid>
    </Grid>
  );
};

export default Contacts;
