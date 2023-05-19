import { Grid, GridItem, useDisclosure } from "@chakra-ui/react";
import Navbar from "./components/NavBar";
import CategoryGrid from "./components/CategoriesGrid";
import LargeWithNewsletter from "./components/Footer";
import HeroAboutUs from "./components/HeroAboutUs";
import FeaturesClientExp from "./components/FeaturesClientExp";
import Pricing from "./components/Pricing";
import Team from "./components/Team";
import Articles from "./components/Articles";
import Contacts from "./components/Contacts";
import AppointmentFormDrawer from "./components/AppointmentFormDrawer"

function App() {
  const { isOpen: isOpenAppointment, onOpen: onOpenAppointment, onClose: onCloseAppointment } = useDisclosure()

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
        <GridItem
          area={"header"}
          zIndex={1}
          sx={{ position: "sticky", top: "0" }}
        >
          <Navbar onOpenAppointment={onOpenAppointment}/>
        </GridItem>
        <GridItem area={"main"}>
          <HeroAboutUs onOpenAppointment={onOpenAppointment}/>
          <FeaturesClientExp />
          <CategoryGrid />
          <Pricing />
          <Team />
          <Articles />
          <Contacts />
        </GridItem>
        <GridItem area={"footer"}>
          <LargeWithNewsletter />
        </GridItem>
        <AppointmentFormDrawer isOpenAppointment={isOpenAppointment} onOpenAppointment={onOpenAppointment} onCloseAppointment={onCloseAppointment}/>
      </Grid>
    </>
  );
}

export default App;

