import { Category } from "../hooks/useGategories";
import {
  Button,
  Card,
  CardBody,
  CardFooter,
  Heading,
  Image,
  Text,
} from "@chakra-ui/react";
import getCroppedImageUrl from "../services/image_url";

interface Props {
  category: Category;
}

const CategoriesCard = ({ category }: Props) => (
  <Card align="center">
    <Image src={category.image} width="100%" borderRadius="10px" />
    <CardBody>
      <Heading>{category.title}</Heading>
      <Text color="gray.300">description</Text>
      <CardFooter>
        <Button>More detail</Button>
      </CardFooter>
    </CardBody>
  </Card>
);

export default CategoriesCard;
