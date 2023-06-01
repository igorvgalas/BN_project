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



const  Pricing = () => {
  const pink100BoxStyle = {
    p: 3,
    overflow :"hidden",
    borderRadius:10,
    bg:useColorModeValue("pink.100", "pink.100"),
    color:useColorModeValue("gray.600", "grey.200")};
  
    const pink50BoxStyle = {
      p: 3,
      overflow :"hidden",
      borderRadius:10,
      bg:useColorModeValue("pink.50", "pink.50"),
      color:useColorModeValue("gray.600", "grey.200")};  
    
    const textColor ={
      color:useColorModeValue("gray.600", "white")
    }
  return (
    <Container maxW={"8xl"} py={12} id="pricing">
      <Box>
        <Heading textAlign={"center"} mb={10} sx={textColor}>
          Прайс
        </Heading>
      </Box>
      <SimpleGrid columns={{ base: 1, md: 2 }} spacing={10}>
        <Box sx={pink100BoxStyle}>
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
        <Box sx={pink50BoxStyle} >
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
        <Box sx={pink50BoxStyle} >
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
        <Box sx={pink100BoxStyle} >
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
        <Box sx={pink100BoxStyle} >
          <TableContainer>
            <Table size={{ base: "md", md: "lg", lg: "lg" }}>
              <Thead>
                <Tr>
                  <Th p={5} fontSize={{ base: "1xl", md: "2xl", lg: "3xl" }}>
                    Манікюр
                  </Th>
                  <Th textAlign="right"></Th>
                </Tr>
              </Thead>
              <Tbody>
                <Tr>
                  <Td>Класична чистка</Td>
                  <Td isNumeric>180</Td>
                </Tr>
                <Tr>
                  <Td>Комбінований манікюр</Td>
                  <Td isNumeric>190</Td>
                </Tr>
                <Tr borderBottom={0}>
                  <Td>Апаратний манікюр</Td>
                  <Td isNumeric>210</Td>
                </Tr>
                <Tr>
                  <Td>Чоловічий манікюр</Td>
                  <Td isNumeric>190</Td>
                </Tr>
                <Tr>
                  <Td>Опил форми нігтів</Td>
                  <Td isNumeric>450</Td>
                </Tr>
                <Tr>
                  <Td></Td>
                  <Td isNumeric></Td>
                </Tr>
              </Tbody>
            </Table>
          </TableContainer>
        </Box>
        <Box sx={pink50BoxStyle} >
          <TableContainer>
            <Table size={{ base: "md", md: "lg", lg: "lg" }}>
              <Thead>
                <Tr>
                  <Th p={5} fontSize={{ base: "1xl", md: "2xl", lg: "3xl" }}>
                    Нарощення
                  </Th>
                  <Th textAlign="right"></Th>
                </Tr>
              </Thead>
              <Tbody>
                <Tr>
                  <Td>Довжина (0,5/1)/(1,5/2)</Td>
                  <Td isNumeric>270/370</Td>
                </Tr>
                <Tr borderBottom={0}>
                  <Td>Довжина (2,5/3)/(3,5/4)</Td>
                  <Td isNumeric>470/570</Td>
                </Tr>
                <Tr>
                  <Td>Довжина 4,5 і більше</Td>
                  <Td isNumeric>670</Td>
                </Tr>
                <Tr>
                  <Td>Корекція</Td>
                  <Td isNumeric>350/450</Td>
                </Tr>
                <Tr>
                  <Td>Зняття нарощенних</Td>
                  <Td isNumeric>120</Td>
                </Tr>
                <Tr>
                  <Td>Ремонт 1 нігтя</Td>
                  <Td isNumeric>30</Td>
                </Tr>
              </Tbody>
            </Table>
          </TableContainer>
        </Box>
        <Box sx={pink50BoxStyle} >
          <TableContainer>
            <Table size={{ base: "md", md: "lg", lg: "lg" }}>
              <Thead>
                <Tr>
                  <Th p={5} fontSize={{ base: "1xl", md: "2xl", lg: "3xl" }}>
                    Педикюр
                  </Th>
                  <Th textAlign="right"></Th>
                </Tr>
              </Thead>
              <Tbody>
                <Tr>
                  <Td>Чистка пальчиків</Td>
                  <Td isNumeric>170/220</Td>
                </Tr>
                <Tr>
                  <Td>Чистка пяточок</Td>
                  <Td isNumeric>170/220</Td>
                </Tr>
                <Tr borderBottom={0}>
                  <Td>Покриття</Td>
                  <Td isNumeric>250</Td>
                </Tr>
                <Tr>
                  <Td></Td>
                  <Td isNumeric></Td>
                </Tr>
              </Tbody>
            </Table>
          </TableContainer>
        </Box>
        <Box sx={pink100BoxStyle} >
          <TableContainer>
            <Table size={{ base: "md", md: "lg", lg: "lg" }}>
              <Thead>
                <Tr>
                  <Th p={5} fontSize={{ base: "1xl", md: "2xl", lg: "3xl" }}>
                    Покриття
                  </Th>
                  <Th textAlign="right"></Th>
                </Tr>
              </Thead>
              <Tbody>
                <Tr>
                  <Td>Однотонне покриття</Td>
                  <Td isNumeric>450</Td>
                </Tr>
                <Tr>
                  <Td>Покриття френч</Td>
                  <Td isNumeric>500</Td>
                </Tr>
                <Tr borderBottom={0}>
                  <Td>Дизайн 1 нігтя</Td>
                  <Td isNumeric>15/40</Td>
                </Tr>
                <Tr>
                  <Td>Зняття</Td>
                  <Td isNumeric>50/70</Td>
                </Tr>
              </Tbody>
            </Table>
          </TableContainer>
        </Box>
      </SimpleGrid>
    </Container>
  );
}


export default Pricing