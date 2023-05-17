import {
  Container,
  Image,
  Heading,
  Box,
  Stack,
  Text,
} from "@chakra-ui/react";
import team1 from "../assets/team/team-1.jpg";
import team2 from "../assets/team/team-2.jpg";
import team3 from "../assets/team/team-3.jpg";
import team4 from "../assets/team/team-4.jpg";

export default function Team() {
  const teamBoxStyles = {
    rounded : "2xl", 
    boxShadow : "2xl",
    ':hover': {
      bg: 'pink.200'}
    }

  const teamImageStyles = {
    rounded:"md",
    boxSize:"300px"
  };

  return (
    <Container maxW={"8xl"} py={12}>
      <Heading textAlign="center" mb={10}>
        Команда майстрів
      </Heading>
      <Stack  direction={["column", "row"]} marginLeft="70px" spacing="24px">
        <Box position={"relative"} sx={teamBoxStyles}>
          <Box><Image zIndex={0} sx={teamImageStyles} src={team1} /></Box>
          <Box zIndex={1} position={"absolute"} ><Text>Христина </Text></Box>
        </Box>
        <Box sx={teamBoxStyles}>
          <Image sx={teamImageStyles} src={team2} />
        </Box>
        <Box sx={teamBoxStyles}>
          <Image sx={teamImageStyles} src={team3} />
        </Box>
        <Box sx={teamBoxStyles}>
          <Image sx={teamImageStyles} src={team4} />
        </Box>
      </Stack>
    </Container>
  );
};
