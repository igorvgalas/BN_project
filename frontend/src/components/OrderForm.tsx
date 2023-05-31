import React, { useEffect, useCallback, useRef } from "react";
import { useFormik } from "formik";
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
import AppointmentSummary from "./AppointmentSummary";

export interface serviceOrderInterface {
  staffId?: number;
  appointmentDate?: string;
  appointmentTime?: string;
  serviceId?: number;
  name?: string;
  phoneNumber?: string;
}

interface OrderFormProps {
  onSubmitSuccess: () => void;
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
  phoneNumber: Yup.number().required(),
});

const OrderForm = ({ onSubmitSuccess }: OrderFormProps) => {
  const formRef = useRef();
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
  }, []);

  const initialValues: serviceOrderInterface = storedValue;

  const formik = useFormik({
    validationSchema: schema,
    initialValues: initialValues,
    onSubmit: (values) => {
      apiClient
        .post("/onlineappointment/", storedValue)
        .then(() => {setValue({});
        formik.resetForm();
        onSubmitSuccess(); })
        .catch((error) => {const errorMessage = "Сталась помилка. Перевірте правильність заповнення полів форми або спробуйте пізніше.";
        formik.setStatus({ error: errorMessage });});
    },
  });

  useEffect(() => {
    if (error) {
      formik.setErrors({
        staffId: error,
      });
    }

    if (serviceError) {
      formik.setErrors({
        serviceId: serviceError, 
      });
    }
  }, [error, serviceError, formik]);

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
    }
    if (currentStep === 6) {
      formik.submitForm();
      return;
    }

    helpers.setStep(currentStep + 1);
  }, [currentStep, formik, helpers, setValue, storedValue]);

  const handlePreviousStep = useCallback(() => {
    helpers.setStep(currentStep - 1);
  }, [currentStep, helpers]);

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
            handlePreviousStep={handlePreviousStep}
          />
        );
      case 3:
        return (
          <AvailabilityTimeSlotForm
            formik={formik}
            handleNextStep={handleNextStep}
            handlePreviousStep={handlePreviousStep}
          />
        );
      case 4:
        return (
          <ServicesSelectForm
            formik={formik}
            handleNextStep={handleNextStep}
            handlePreviousStep={handlePreviousStep}
          />
        );
      case 5:
        return (
          <AppointmentContactForm
            formik={formik}
            handleNextStep={handleNextStep}
            handlePreviousStep={handlePreviousStep}
          />
        );
      case 6:
        return (
          <AppointmentSummary
            formik={formik}
            data={data}
            serviceData={serviceData}
            storedValue={storedValue}
            handlePreviousStep={handlePreviousStep}
            handleNextStep={handleNextStep}
          />
        );
      default:
        return <div>Not Found</div>;
    }
  };

  return (
    <React.Fragment>
      <form onSubmit={formik.handleSubmit}>
      {formik.status && formik.status.error && (
          <div>{formik.status.error}</div>
        )}
        {_renderStepContent(currentStep)}
      </form>
    </React.Fragment>
  );
};

export default OrderForm;

