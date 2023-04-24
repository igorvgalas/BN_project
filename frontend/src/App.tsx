import { useState } from "react";
import reactLogo from "./assets/react.svg";
import { Grid, GridItem, Show } from "@chakra-ui/react";
import "./App.css";
import NavBar from "./components/NavBar";
import CategoryGrid from "./components/CategoriesGrid";
import CaptionCarousel from "./components/CaptionCarousel";

function App() {
  return (
    <Grid
      templateAreas={`"header"
                  "main"
                  "footer"`}
      gridTemplateColumns={"1200px 1fr"}
      gridTemplateRows={"80px"}
      // maxW={1400}
      // minW={1200}
      gap="1"
      color="blackAlpha.700"
      fontWeight="bold"
    >
      <GridItem pl="2" bg="pink.300" area={"header"} borderRadius={10}>
        <NavBar />
      </GridItem>
      <GridItem  area={"main"}>
        <CaptionCarousel />
        <CategoryGrid />
      </GridItem>
      <GridItem pl="2" area={"footer"}>
        Footer
      </GridItem>
    </Grid>
  );
}

export default App;
