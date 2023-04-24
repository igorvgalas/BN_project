import { useState } from "react";
import {Box,IconButton,useBreakpointValue,Stack,Heading,Text,Container} from "@chakra-ui/react";
import { BiLeftArrowAlt, BiRightArrowAlt } from "react-icons/bi";
import Slider from "react-slick";

const settings = {
  dots: true,
  arrows: false,
  fade: true,
  infinite: true,
  autoplay: true,
  speed: 500,
  autoplaySpeed: 5000,
  slidesToShow: 1,
  slidesToScroll: 1,
};

const CaptionCarousel = () => {
  const [slider, setSlider] = useState<Slider | null>(null);
  const top = useBreakpointValue({ base: "90%", md: "50%" });
  const side = useBreakpointValue({ base: "30%", md: "40px" });

  const cards = [
    {
      title: "Запрошуємо в студію Beauty Nails",
      text: "Ми команда талановитих нейл-дизайнерів, які роблять найкращий манікюр у Львові",
      image:
        "https://img.freepik.com/free-photo/beautiful-wellgroomed-female-toes-with-flowers_186202-729.jpg?w=1480&t=st=1682371973~exp=1682372573~hmac=8bc863808425c5cf2c05b2e0b0abbc9ba43d839c26165213bd65e30a0f8c903b",
    },
    {
      title: "Запрошуємо в студію Beauty Nails",
      text: "Ми команда талановитих нейл-дизайнерів, які роблять найкращий манікюр у Львові",
      image: "https://img.freepik.com/free-photo/manicurist-master-makes-manicure-woman-s-hands-spa-treatment-concept_186202-7769.jpg?w=1380&t=st=1682372245~exp=1682372845~hmac=6eee5a6f834027b2210de9799a77400531ca3513547f06117d42cf48231e2670",
    },
    { title: "Запрошуємо в студію Beauty Nails",
      text: "Ми команда талановитих нейл-дизайнерів, які роблять найкращий манікюр у Львові",
      image:
        "https://img.freepik.com/free-photo/healthy-beautiful-manicure-manicurist_23-2148766558.jpg?w=1480&t=st=1682372565~exp=1682373165~hmac=b54843bd87278f3d1f91c1accf33f6bbe2bd0473bd9b03487c2670c6724ab255",
    },
  ];

  return (
    <Box
      position={"relative"}
      height={"600px"}
      width={"full"}
      overflow={"hidden"}
      borderRadius={10}
    >
      {/* CSS files for react-slick */}
      <link
        rel="stylesheet"
        type="text/css"
        charSet="UTF-8"
        href="https://cdnjs.cloudflare.com/ajax/libs/slick-carousel/1.6.0/slick.min.css"
      />
      <link
        rel="stylesheet"
        type="text/css"
        href="https://cdnjs.cloudflare.com/ajax/libs/slick-carousel/1.6.0/slick-theme.min.css"
      />
      {/* Left Icon */}
      <IconButton
        aria-label="left-arrow"
        variant="ghost"
        position="absolute"
        left={side}
        top={top}
        transform={"translate(0%, -50%)"}
        zIndex={2}
        onClick={() => slider?.slickPrev()}
      >
        <BiLeftArrowAlt size="40px" />
      </IconButton>
      {/* Right Icon */}
      <IconButton
        aria-label="right-arrow"
        variant="ghost"
        position="absolute"
        right={side}
        top={top}
        transform={"translate(0%, -50%)"}
        zIndex={2}
        onClick={() => slider?.slickNext()}
      >
        <BiRightArrowAlt size="40px" />
      </IconButton>
      {/* Slider */}
      <Slider {...settings} ref={(slider) => setSlider(slider)}>
        {cards.map((card, index) => (
          <Box
            key={index}
            height={"6xl"}
            position="relative"
            backgroundPosition="center"
            backgroundRepeat="no-repeat"
            backgroundSize="cover"
            backgroundImage={`url(${card.image})`}
            borderRadius={10}
          >
            {/* This is the block you need to change, to customize the caption */}
            <Container size="container.lg" height="600px" position="relative">
              <Stack
                spacing={6}
                w={"full"}
                maxW={"lg"}
                position="absolute"
                top="50%"
                transform="translate(0, -50%)"
              >
                <Heading fontSize={{ base: "3xl", md: "4xl", lg: "5xl" }}>
                  {card.title}
                </Heading>
                <Text fontSize={{ base: "md", lg: "lg" }} color="GrayText">
                  {card.text}
                </Text>
              </Stack>
            </Container>
          </Box>
        ))}
      </Slider>
    </Box>
  );
};

export default CaptionCarousel;
