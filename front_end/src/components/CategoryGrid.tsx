import { Text } from "@chakra-ui/react";
import UseCategories from "../hooks/useGategories";


const CategoryCrid = () => {
const {categories, error} = UseCategories() 
  return (
    <>
    {error && <Text>{error}</Text>}
    <ul>
      {categories &&
        categories?.map((category) => (
          <li key={category.id}>{category.title}</li>
          ))}
    </ul>
    </>
  );
};

export default CategoryCrid;
