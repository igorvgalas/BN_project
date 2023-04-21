import { useState } from "react";
import reactLogo from "./assets/react.svg";
import { Grid, GridItem, Show } from "@chakra-ui/react";
import "./App.css";
import NavBar from "./components/NavBar";

function App() {
  return (
    <Grid
      templateAreas={`"header"
                  "main"
                  "footer"`}
      gridTemplateColumns={"1200px 1fr"}
      // maxW={1400}
      // minW={1200}
      gap="1"
      color="blackAlpha.700"
      fontWeight="bold"
    >
      <GridItem pl="2" bg="pink.300" area={"header"}>
        <NavBar />
      </GridItem>
      <GridItem pl="2" bg="green.300" area={"main"}>
        Main
      </GridItem>
      <GridItem pl="2" bg="blue.300" area={"footer"}>
        Footer
      </GridItem>
    </Grid>
  );
}

export default App;
