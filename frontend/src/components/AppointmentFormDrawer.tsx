import {
  Button,
  Drawer,
  DrawerBody,
  DrawerFooter,
  DrawerHeader,
  DrawerOverlay,
  DrawerContent,
  DrawerCloseButton,
} from "@chakra-ui/react";
import OrderForm from "./OrderForm";

interface AppintmentFormDrawlerProps {
  isOpenAppointment: boolean;
  onOpenAppointment: () => void;
  onCloseAppointment: () => void;
}

const AppointmentFormDrawer = ({
  isOpenAppointment,
  onCloseAppointment,
}: AppintmentFormDrawlerProps) => {
  
  const handleFormSubmit = () => {
    const submitButton = document.getElementById("OrderFormSubmitButton");
    if (submitButton) {
      submitButton.click();
    }
    onCloseAppointment();
  };

  return (
    <>
      <Drawer
        isOpen={isOpenAppointment}
        placement="left"
        onClose={onCloseAppointment}
        size="md"
      >
        <DrawerOverlay />
        <DrawerContent>
          <DrawerCloseButton />
          <DrawerHeader borderBottomWidth="1px">Новий Запис</DrawerHeader>
          <DrawerBody>
            <OrderForm />
          </DrawerBody>
          <DrawerFooter borderTopWidth="1px">
            <Button variant="outline" mr={3} onClick={onCloseAppointment}>
              Відмінити
            </Button>
            <Button colorScheme="blue" onClick = {handleFormSubmit}>
              Підтвердити
            </Button>
          </DrawerFooter>
        </DrawerContent>
      </Drawer>
    </>
  );
};

export default AppointmentFormDrawer;
