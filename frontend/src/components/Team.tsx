import {
  Container,
  Heading,
  Box,
  Stack,
  useColorMode,
} from "@chakra-ui/react";
import team1 from "../assets/team/team-1.jpg";
import team2 from "../assets/team/team-2.jpg";
import team3 from "../assets/team/team-3.jpg";
import team4 from "../assets/team/team-4.jpg";
import TeamMember from "./TeamMember";

 const Team = () => {
  
  const { colorMode } = useColorMode();
  const textColor = { light: "black", dark: "white" };

  return (
    <Container maxW={"8xl"} py={12}>
      <Heading textAlign="center" mb={10} color={textColor[colorMode]}>
        Команда майстрів
      </Heading>
      <Stack  direction={["column", "row"]} marginLeft="25px" spacing="50px">
        <Box>
          <TeamMember name={"Христина"} photo={team1} instagram={[]}/>
        </Box>
        <Box>
          <TeamMember name={"Христина"} photo={team2} instagram={[]}/>
        </Box>
        <Box>
          <TeamMember name={"Христина"} photo={team3} instagram={[]}/>
        </Box>
        <Box>
          <TeamMember name={"Христина"} photo={team4} instagram={[]}/>
        </Box>
      </Stack>
    </Container>
  );
};

export default Team