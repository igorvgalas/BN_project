import { useCallback } from "react";
import useStaff from "../hooks/useStaff";
import {
  Box,
  Flex,
  Heading,
  Select,
  Stack,
  Text,
  useColorModeValue,
  Button,
} from "@chakra-ui/react";

interface StaffSelectForm {
  formik: any;
  handleNextStep: () => void;
}

const StaffSelectForm = ({ formik, handleNextStep }: StaffSelectForm) => {
  const { data, error } = useStaff();

  const handleNext = useCallback(() => {
    formik.validateForm().then((e:any) => {
      if (!e.staffId) {
        handleNextStep()
      }
    });
  }, [formik]);

  return (
    <Flex
      align={"center"}
      justify={"center"}
      bg={useColorModeValue("gray.50", "gray.800")}
    >
      <Stack spacing={8} mx={"auto"} maxW={"lg"} py={12} px={6}>
        <Stack align={"center"}>
          <Heading fontSize={"4xl"} textAlign={"center"}>
            Оберіть свого майстра
          </Heading>
          <Text fontSize={"lg"} color={"gray.600"} textAlign={"center"}>
            який з нетерпінням на Вас очікує ✌️
          </Text>
        </Stack>
        <Box
          rounded={"lg"}
          bg={useColorModeValue("white", "gray.700")}
          boxShadow={"lg"}
          p={8}
        >
          <Stack spacing={4}>
            {formik.errors.staffId && <Text>{formik.errors.staffId}</Text>}
            <Select
              onChange={formik.handleChange}
              value={formik.values.staffId}
              name="staffId"
              placeholder="Майстри"
            >
              {data?.map((staff) => (
                <option value={staff.id} key={staff.id}>
                  {staff.name}
                </option>
              ))}
            </Select>
          </Stack>
        </Box>
        <Button onClick={handleNext} colorScheme="blue">
        Далі
      </Button>
      </Stack>
    </Flex>
  );
};

export default StaffSelectForm;
