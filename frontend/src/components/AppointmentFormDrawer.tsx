import {
  Drawer,
  DrawerBody,
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
  const handleFormSubmission = () => {
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
          <DrawerHeader 
            borderBottomWidth="2px" >
            Новий Запис
          </DrawerHeader>
          <DrawerBody>
            <OrderForm onSubmitSuccess={handleFormSubmission} />
          </DrawerBody>
        </DrawerContent>
      </Drawer>
    </>
  );
};

export default AppointmentFormDrawer;
