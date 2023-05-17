import { Grid, GridItem } from "@chakra-ui/react";
import Navbar from "./components/NavBar";
import CategoryGrid from "./components/CategoriesGrid";
import LargeWithNewsletter from "./components/Footer";
import HeroAboutUs from "./components/HeroAboutUs";
import FeaturesClientExp from "./components/FeaturesClientExp";
import Pricing from "./components/Pricing";
import Team from "./components/Team";
import Articles from "./components/Articles";
import Contacts from "./components/Contacts";


function App() {
  return (
    <>
      <Grid
        templateAreas={`"header"
                  "main"
                  "footer"`}
        gridTemplateColumns={"100% 1fr"}
        gridTemplateRows={"80px"}
        gap="1"
        color="blackAlpha.700"
        fontWeight="bold"
      >
        <GridItem area={"header"}>
          <Navbar />
        </GridItem>
        <GridItem area={"main"}>
          <HeroAboutUs />
          <FeaturesClientExp/>
          <CategoryGrid />
          <Pricing />
          <Team/>
          <Articles/>
          <Contacts/>
        </GridItem>
        <GridItem area={"footer"}>
          <LargeWithNewsletter />
        </GridItem>
      </Grid>
    </>
  );
}

export default App;
