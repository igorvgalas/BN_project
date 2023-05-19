import React, { useState } from "react";
import { useFormik } from "formik";
import { Button } from "@chakra-ui/react";
import StaffSelect from "./StaffSelectForm";
import AvailabilityForm from "./AvailabilityDateForm";
import AvailabilityTimeSlotForm from "./AvailabilityTimeSlotForm";
import ServicesSelectForm from "./ServicesSelectForm";
import AppointmentContactForm from "./AppointmentContactForm";

const OrderForm = () => {
  const [activeStep, setActiveStep] = useState<number>(0);
  const [availableDates, setAvailableDates] = useState<number>(0);

  const formik = useFormik({
    initialValues: {
      staffId: "",
    },
    onSubmit: (values, actions) => {
      if (activeStep === 0) {
        
      }

      if (activeStep === 1) {
        //async запит до бази подивитись які ceрвіси є
      }

      setActiveStep(activeStep + 1);
    },
  });

  const _renderStepContent = (step: number) => {
    switch (step) {
      case 0:
        return <StaffSelect formik={formik} />;
      case 1:
        return <AvailabilityForm formik={formik}/>;
      // return <DateSelect dates={availableDates}>2<DateSelect/>;
      case 2:
        return <AvailabilityTimeSlotForm formik={formik}/>;
      case 3:
        return <ServicesSelectForm formik={formik}/>;  
      case 4:
        return <AppointmentContactForm/>;  
      default:
        return <div>Not Found</div>;
    }
  }

  return (
    <React.Fragment>
      <form onSubmit={formik.handleSubmit}>
        {_renderStepContent(activeStep)}
        <Button type="submit" colorScheme="blue">
          Далі
        </Button>
      </form>
    </React.Fragment>
  );
}

export default OrderForm;
