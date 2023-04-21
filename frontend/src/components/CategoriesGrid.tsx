import { SimpleGrid, Text } from "@chakra-ui/react";
import UseCategories from "../hooks/useGategories";
import CategoriesCard from "./CategoriesCard";


const CategoryGrid = () => {
const {categories, error} = UseCategories() 
  return (
    <>
    {error && <Text>{error}</Text>}
    <SimpleGrid templateColumns='repeat(auto-fill, minmax(250px, 1fr))' spacing={10} padding='10px' >
      {categories &&
        categories?.map((category) => (
          <CategoriesCard key={category.id} category={category}/>
          ))}
    </SimpleGrid>
    </>
  );
};

export default CategoryGrid;
