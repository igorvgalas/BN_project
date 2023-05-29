import {
    Box,
    Button,
    Heading,
    Table,
    TableContainer,
    Tbody,
    Td,
    Tr,
  } from "@chakra-ui/react";
import { Staff } from "../hooks/useStaff";
import { Service } from "../hooks/useServices";
import { useCallback } from "react";

  
  interface AppointmentSummaryInterface {
    formik: any;
    data: Staff[];
    serviceData:Service[];
    storedValue:any
    handlePreviousStep: () => void
}
  
  export default function AppointmentSummary({formik,data,serviceData,storedValue, handlePreviousStep}:AppointmentSummaryInterface) {
    
    const handleBack = useCallback(() => {
        handlePreviousStep(); 
      }, [handlePreviousStep]);
    

    return (
          <><Heading>Ваш запис</Heading><Box>
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
            <Button onClick={handleBack} colorScheme="blue">
            Назад
          </Button>
        </Box>
        </>
        );
    }