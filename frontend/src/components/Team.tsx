import {
  Table,
  Thead,
  Tbody,
  Tr,
  Th,
  Td,
  TableContainer,
  Container,
  Image,
  SimpleGrid,
  Heading,
  useColorModeValue,
  Box,
  HStack,
  Stack,
} from "@chakra-ui/react";
import team1 from "../assets/team/team-1.jpg";
import team2 from "../assets/team/team-2.jpg";
import team3 from "../assets/team/team-3.jpg";
import team4 from "../assets/team/team-4.jpg";

export default function Team() {
  const hover = () => {
    console.log(123);
  };
  return (
    <Container maxW={"8xl"} py={12}>
      <Heading textAlign="center" mb={10}>
        Команда майстрів
      </Heading>
      <Stack direction={["column", "row"]} spacing="24px">
        <Box rounded={"2xl"} boxShadow={"2xl"}>
          <Image rounded={"md"} boxSize="300px" src={team1} />
        </Box>
        <Box rounded={"2xl"} boxShadow={"2xl"}>
          <Image rounded={"md"} boxSize="300px" src={team2} />
        </Box>
        <Box rounded={"2xl"} boxShadow={"2xl"}>
          <Image rounded={"md"} boxSize="300px" src={team3} />
        </Box>
        <Box rounded={"2xl"} boxShadow={"2xl"}>
          <Image rounded={"md"} boxSize="300px" src={team4} />
        </Box>
      </Stack>
    </Container>
  );
}
