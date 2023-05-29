import React, { useEffect, useCallback } from "react";
import { useFormik } from "formik";
import {
  Box,
  Heading,
  Table,
  TableContainer,
  Tbody,
  Td,
  Tr,
} from "@chakra-ui/react";
import AvailabilityDateForm from "./AvailabilityDateForm";
import AvailabilityTimeSlotForm from "./AvailabilityTimeSlotForm";
import ServicesSelectForm from "./ServicesSelectForm";
import AppointmentContactForm from "./AppointmentContactForm";
import useLocalStorage from "../hooks/LocalStorage";
import { useStep } from "usehooks-ts";
import apiClient from "../services/apiClient";
import * as Yup from "yup";
import StaffSelectForm from "./StaffSelectForm";
import useStaff from "../hooks/useStaff";
import useServices from "../hooks/useServices";

interface serviceOrderInterface {
  staffId?: number;
  appointmentDate?: string;
  appointmentTime?: string;
  serviceId?: number;
  name?: string;
  phoneNumber?: string;
}

const schema = Yup.object({
  staffId: Yup.number().required().resolve({}),
  appointmentDate: Yup.string().required(),
  appointmentTime: Yup.string().required(),
  serviceId: Yup.number().required().positive().integer(),
  name: Yup.string()
    .required()
    .min(2, "Імʼя занадто коротке")
    .max(50, "Імʼя занадто довге"),
  phoneNumber: Yup.number().required().max(9).min(9),
});

const OrderForm = () => {
  const { data, error } = useStaff();
  const { data: serviceData, error: serviceError } = useServices();
  const [currentStep, helpers] = useStep(6);
  const [storedValue, setValue] = useLocalStorage<serviceOrderInterface>(
    "order",
    {}
  );

  useEffect(() => {
    const step = Object.values(storedValue).filter(
      (i) => i !== undefined
    ).length;
    helpers.setStep(step + 1);
  }, []);

  const initialValues: serviceOrderInterface = storedValue;

  const formik = useFormik({
    validationSchema: schema,
    initialValues: initialValues,
    onSubmit: (values, actions) => {},
  });

  const handleNextStep = useCallback(() => {
    formik.setErrors({});
    formik.setStatus({});

    if (currentStep === 1) {
      setValue({
        ...storedValue,
        staffId: Number(formik.values.staffId),
      });
    }

    if (currentStep === 2) {
      setValue({
        ...storedValue,
        appointmentDate: formik.values.appointmentDate,
      });
    }

    if (currentStep === 3) {
      setValue({
        ...storedValue,
        appointmentTime: formik.values.appointmentTime,
      });
    }

    if (currentStep === 4) {
      setValue({
        ...storedValue,
        serviceId: Number(formik.values.serviceId),
      });
    }

    if (currentStep === 5) {
      setValue({
        ...storedValue,
        name: formik.values.name,
        phoneNumber: formik.values.phoneNumber,
      });

      apiClient.post("/", storedValue).then(() => {
        setValue({});
      });
    }

    helpers.setStep(currentStep + 1);
  }, [formik]);

  const _renderStepContent = (step: number) => {
    switch (step) {
      case 1:
        return (
          <StaffSelectForm formik={formik} handleNextStep={handleNextStep} />
        );
      case 2:
        return (
          <AvailabilityDateForm
            formik={formik}
            handleNextStep={handleNextStep}
          />
        );
      case 3:
        return (
          <AvailabilityTimeSlotForm
            formik={formik}
            handleNextStep={handleNextStep}
          />
        );
      case 4:
        return (
          <ServicesSelectForm formik={formik} handleNextStep={handleNextStep} />
        );
      case 5:
        return (
          <AppointmentContactForm
            formik={formik}
            handleNextStep={handleNextStep}
          />
        );
      case 6:
        return (
          <>
            <Heading>Ваш запис</Heading>
            <Box>
              <TableContainer>
                <Table size={{ base: "md", md: "lg", lg: "lg" }}>
                  <Tbody>
                    <Tr>
                      <Td>Майстер</Td>
                      <Td>
                        {data && data?.find((staff) => staff.id === storedValue.staffId)?.name}
                      </Td>
                    </Tr>
                    <Tr>
                      <Td>Дата</Td>
                      <Td>{formik.values.appointmentDate}</Td>
                    </Tr>
                    <Tr>
                      <Td>Час</Td>
                      <Td>{formik.values.appointmentTime}</Td>
                    </Tr>
                    <Tr>
                      <Td>Послуга</Td>
                      <Td>
                        {serviceData && serviceData
                          ?.filter((service) => service.id === storedValue.serviceId)
                          .map((service) => (
                            <span key={service.id}>{service.title}</span>
                          ))}
                      </Td>
                    </Tr>
                    <Tr>
                      <Td>Особисті дані</Td>
                      <Td>
                        {formik.values.name} 0{formik.values.phoneNumber}
                      </Td>
                    </Tr>
                  </Tbody>
                </Table>
              </TableContainer>
            </Box>
          </>
        );
      default:
        return <div>Not Found</div>;
    }
  };

  return (
    <React.Fragment>
      <form onSubmit={formik.handleSubmit}>
        {_renderStepContent(currentStep)}
      </form>
    </React.Fragment>
  );
};

export default OrderForm;
