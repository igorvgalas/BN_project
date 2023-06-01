import React, { ReactNode } from "react";
import {
  Box,
  Text,
  Image,
  Link,
  Flex,
  VisuallyHidden,
  chakra,
  useColorModeValue,
  Stack,
} from "@chakra-ui/react";
import { FaTwitter, FaYoutube, FaInstagram } from "react-icons/fa";

interface TeamMemberProps {
  name: string;
  photo: string;
  instagram: { name: string; url: string }[];
}

const SocialButton = ({
  children,
  label,
  href,
}: {
  children: ReactNode;
  label: string;
  href: string;
}) => {
  return (
    <chakra.button
      bg={useColorModeValue("whiteAlpha.100", "blackAlpha.100")}
      rounded={"full"}
      w={10}
      h={10}
      cursor={"pointer"}
      as={"a"}
      href={href}
      display={"inline-flex"}
      alignItems={"center"}
      justifyContent={"center"}
      transition={"background 0.3s ease"}
      _hover={{
        bg: useColorModeValue("whiteAlpha.200", "blackAlpha.200"),
      }}
    >
      <VisuallyHidden>{label}</VisuallyHidden>
      {children}
    </chakra.button>
  );
};

const TeamMember: React.FC<TeamMemberProps> = ({ name, photo, instagram }) => {
  const [isHovered, setIsHovered] = React.useState(false);

  const handleMouseEnter = () => {
    setIsHovered(true);
  };

  const handleMouseLeave = () => {
    setIsHovered(false);
  };

  return (
    <Box
      as="figure"
      position="relative"
      display="inline-block"
      onMouseEnter={handleMouseEnter}
      onMouseLeave={handleMouseLeave}
    >
      <Image
        src={photo}
        alt={name}
        borderRadius="full"
        boxSize="350px"
        objectFit="cover"
      />
      {isHovered && (
        <Box
          position="absolute"
          top="0"
          left="0"
          width="100%"
          height="100%"
          background="rgba(0, 0, 0, 0.2)"
          borderRadius="full"
          display="flex"
          alignItems="center"
          justifyContent="center"
        >
          <Flex direction="column" align="center">
            <Text color="gray.100" fontWeight="light" fontSize="lg" mb={2}>
              {name}
            </Text>
            <Flex direction="column" align="end" mt={40}>
              <Stack direction={"row"} spacing={6}>
                <SocialButton label={"Twitter"} href={"#"}>
                  <FaTwitter />
                </SocialButton>
                <SocialButton label={"YouTube"} href={"#"}>
                  <FaYoutube />
                </SocialButton>
                <SocialButton label={"Instagram"} href={"#"}>
                  <FaInstagram />
                </SocialButton>
              </Stack>
              {/* {instagram.map((item) => (
                <Link key={item.name} href={item.url} color="white" mr={2} _hover={{ textDecoration: 'none' }}>
                  {item.name}
                </Link>
              ))} */}
            </Flex>
          </Flex>
        </Box>
      )}
    </Box>
  );
};

export default TeamMember;
