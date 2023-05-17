import {
  Table,
  Thead,
  Tbody,
  Tr,
  Th,
  Td,
  TableContainer,
  Container,
  SimpleGrid,
  Heading,
  useColorModeValue,
  Box,
} from "@chakra-ui/react";

export default function Pricing() {
  return (
    <Container maxW={"8xl"} py={12} id="pricing">
      <Box>
        <Heading textAlign={"center"} mb={10}>
          Прайс
        </Heading>
      </Box>
      <SimpleGrid columns={{ base: 1, md: 2 }} spacing={10}>
        <Box
          p={3}
          overflow={"hidden"}
          borderRadius={10}
          bg={useColorModeValue("pink.100", "pink.900")}
          color={useColorModeValue("gray.600", "gray.200")}
        >
          <TableContainer>
            <Table size={{ base: "md", md: "lg", lg: "lg" }}>
              <Thead>
                <Tr>
                  <Th p={5} fontSize={{ base: "1xl", md: "2xl", lg: "3xl" }}>
                    Укріплення
                  </Th>
                  <Th textAlign="right"></Th>
                </Tr>
              </Thead>
              <Tbody>
                <Tr>
                  <Td>Базою</Td>
                  <Td isNumeric>100</Td>
                </Tr>
                <Tr>
                  <Td>Акрилом</Td>
                  <Td isNumeric>100/180</Td>
                </Tr>
                <Tr borderBottom={0}>
                  <Td>Гелем</Td>
                  <Td isNumeric>200</Td>
                </Tr>
              </Tbody>
            </Table>
          </TableContainer>
        </Box>
        <Box
          p={3}
          overflow={"hidden"}
          borderRadius={10}
          bg={useColorModeValue("pink.50", "pink.900")}
          color={useColorModeValue("gray.600", "gray.200")}
        >
          <TableContainer>
            <Table size={{ base: "md", md: "lg", lg: "lg" }}>
              <Thead>
                <Tr>
                  <Th p={5} fontSize={{ base: "1xl", md: "2xl", lg: "3xl" }}>
                    Покриття лаком
                  </Th>
                  <Th textAlign="right"></Th>
                </Tr>
              </Thead>
              <Tbody>
                <Tr>
                  <Td>Покриття лаком</Td>
                  <Td isNumeric>100</Td>
                </Tr>
                <Tr>
                  <Td>Покриття відживкою</Td>
                  <Td isNumeric>100</Td>
                </Tr>
                <Tr borderBottom={0}>
                  <Td>Зняття лаку</Td>
                  <Td isNumeric>20</Td>
                </Tr>
              </Tbody>
            </Table>
          </TableContainer>
        </Box>
        <Box
          p={3}
          overflow={"hidden"}
          borderRadius={10}
          bg={useColorModeValue("pink.50", "pink.900")}
          color={useColorModeValue("gray.600", "gray.200")}
        >
          <TableContainer>
            <Table size={{ base: "md", md: "lg", lg: "lg" }}>
              <Thead>
                <Tr>
                  <Th p={5} fontSize={{ base: "1xl", md: "2xl", lg: "3xl" }}>
                    Догляд
                  </Th>
                  <Th textAlign="right"></Th>
                </Tr>
              </Thead>
              <Tbody>
                <Tr>
                  <Td>Пілінг рук</Td>
                  <Td isNumeric>30</Td>
                </Tr>
                <Tr>
                  <Td>Зволоження кремом</Td>
                  <Td isNumeric>10</Td>
                </Tr>
                <Tr borderBottom={0}>
                  <Td>Масаж рук</Td>
                  <Td isNumeric>100</Td>
                </Tr>
                <Tr>
                  <Td>СПА-рукавички(свічка)</Td>
                  <Td isNumeric>50</Td>
                </Tr>
                <Tr>
                  <Td>Парафінотерапія</Td>
                  <Td isNumeric>250</Td>
                </Tr>
                <Tr>
                  <Td>Корекція форми</Td>
                  <Td isNumeric>30</Td>
                </Tr>
              </Tbody>
            </Table>
          </TableContainer>
        </Box>
        <Box
          p={3}
          overflow={"hidden"}
          borderRadius={10}
          bg={useColorModeValue("pink.100", "pink.900")}
          color={useColorModeValue("gray.600", "gray.200")}
        >
          <TableContainer>
            <Table size={{ base: "md", md: "lg", lg: "lg" }}>
              <Thead>
                <Tr>
                  <Th p={5} fontSize={{ base: "1xl", md: "2xl", lg: "3xl" }}>
                    Брови
                  </Th>
                  <Th textAlign="right"></Th>
                </Tr>
              </Thead>
              <Tbody>
                <Tr>
                  <Td>Фарбування брів фарбою/хною</Td>
                  <Td isNumeric>140/190</Td>
                </Tr>
                <Tr>
                  <Td>Корекція брів</Td>
                  <Td isNumeric>140</Td>
                </Tr>
                <Tr borderBottom={0}>
                  <Td>Комплекс фарба/хна</Td>
                  <Td isNumeric>250/300</Td>
                </Tr>
                <Tr>
                  <Td>Фарбування вій</Td>
                  <Td isNumeric>100</Td>
                </Tr>
                <Tr>
                  <Td>Ламінування брів</Td>
                  <Td isNumeric>450</Td>
                </Tr>
                <Tr>
                  <Td>Комплекс + Ламінування</Td>
                  <Td isNumeric>500</Td>
                </Tr>
              </Tbody>
            </Table>
          </TableContainer>
        </Box>
      </SimpleGrid>
    </Container>
  );
}
