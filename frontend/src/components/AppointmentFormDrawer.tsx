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
import React from "react";
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
  

  return (
    <>
      <Drawer
        isOpen={isOpenAppointment}
        placement="right"
        onClose={onCloseAppointment}
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
            <Button colorScheme="blue">Підтвердити</Button>
          </DrawerFooter>
        </DrawerContent>
      </Drawer>
    </>
  );
}

export default AppointmentFormDrawer