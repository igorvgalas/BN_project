import {
    Box,
    Button,
    Flex,
    Heading,
    Table,
    TableContainer,
    Tbody,
    Td,
    Tr,
  } from "@chakra-ui/react";
import { Staff } from "../hooks/useStaff";
import { Service } from "../hooks/useServices";

  
  interface AppointmentSummaryInterface {
    formik: any
    data: Staff[]
    serviceData:Service[]
    storedValue:any
    handlePreviousStep: () => void
    handleNextStep: () => void
}
  
  export default function AppointmentSummary({formik,data,serviceData,storedValue, handlePreviousStep, handleNextStep}:AppointmentSummaryInterface) {
    
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
            <Flex justify="space-between">
          <Button onClick={handlePreviousStep} colorScheme="blue">
            Назад
          </Button>
          <Button onClick={handleNextStep} colorScheme="blue">
            Підтвердити
          </Button>
        </Flex>
        </Box>
        </>
        );
    }