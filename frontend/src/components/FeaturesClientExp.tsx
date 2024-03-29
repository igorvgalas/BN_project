import {
  Container,
  SimpleGrid,
  Image,
  Flex,
  Heading,
  Text,
  Stack,
  StackDivider,
  Icon,
  useColorModeValue,
  Box,
} from "@chakra-ui/react";
import {ArrowRightIcon} from "@chakra-ui/icons"
import { ReactElement } from "react";
import banner from "../assets/banner.webp"

interface FeatureProps {
  text: string;
  iconBg: string;
  icon?: ReactElement;
}

const Feature = ({ text, icon, iconBg }: FeatureProps) => {
  return (
    <Stack direction={"row"} align={"center"}>
      <Flex
        w={8}
        h={8}
        align={"center"}
        justify={"center"}
        rounded={"full"}
        bg={iconBg}
      >
        {icon}
      </Flex>
      <Text fontWeight={600} color={useColorModeValue("gray.900", "gray.100")}>{text}</Text>
    </Stack>
  );
};

const FeaturesClientExp = () => {
  return (
    <Container maxW={"8xl"} py={12}>
      <SimpleGrid columns={{ base: 1, md: 2 }} spacing={10}>
        <Flex>
          <Box
            position={"relative"}
            height={"400px"}
            rounded={"2xl"}
            boxShadow={"2xl"}
            width={"full"}
            overflow={"hidden"}
          >
            <Image
              rounded={"md"}
              alt={"feature image"}
              src={banner}
              objectFit={"cover"}
            />
          </Box>
        </Flex>
        <Stack spacing={4}>
          <Text
            textTransform={"uppercase"}
            color={"blue.400"}
            fontWeight={600}
            fontSize={"sm"}
            bg={useColorModeValue("blue.50", "blue.900")}
            p={2}
            alignSelf={"flex-start"}
            rounded={"md"}
          >
            Our Story
          </Text>
          <Heading color={useColorModeValue("gray.900", "gray.100")}>Ми даруємо найцінніше - задоволення</Heading>
          <Text color={useColorModeValue("gray.900", "gray.100")} fontSize={"lg"}>
            Важливим є піклування про кожного клієнта, 
            тому ми завжди надаємо Вам якісний та безпечний сервіс.
          </Text>
          <Stack
            spacing={4}
            divider={
              <StackDivider
                borderColor={useColorModeValue("gray.100", "gray.700")}
              />
            }
          >
            <Feature
              icon={
                <Icon as={ArrowRightIcon} color={"yellow.500"} w={5} h={5} />
              }
              iconBg={useColorModeValue("yellow.500", "yellow.100")}
              text={"4-ох етапна стерилізація інструменту"}
            />
            <Feature
              icon={<Icon as={ArrowRightIcon} color={"green.500"} w={5} h={5} />}
              iconBg={useColorModeValue("green.500", "green.100")}
              text={"Гарантована якість"}
            />
            <Feature
              icon={
                <Icon as={ArrowRightIcon} color={"purple.500"} w={5} h={5} />
              }
              iconBg={useColorModeValue("purple.500", "purple.100")}
              text={"Простір приємного спілкування"}
            />
          </Stack>
        </Stack>
      </SimpleGrid>
    </Container>
  );
}

export default FeaturesClientExp