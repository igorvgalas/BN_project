import { Category } from '../hooks/useGategories'
import { Button, Card, CardBody, CardFooter, Heading, Image, Text} from '@chakra-ui/react';

interface Props {
    category: Category;
}

const CategoriesCard = ({category}: Props) => (
  
  <Card align='center' borderRadius={10} overflow='hidden'>
      <Image src={category.image}/>
      <CardBody>
        <Heading>{category.title}</Heading>
        <Text>
          description
        </Text>
      <CardFooter>
        <Button>More detail</Button>
      </CardFooter>
      </CardBody>
  </Card>

)

export default CategoriesCard
