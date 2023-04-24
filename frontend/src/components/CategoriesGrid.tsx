import { SimpleGrid, Text } from "@chakra-ui/react";
import UseCategories from "../hooks/useGategories";
import CategoriesCard from "./CategoriesCard";
import CategoryCardSkeleton from "./CategoryCardSkeleton";

const CategoryGrid = () => {
  const { categories, error, isLoading } = UseCategories();
  const skeletons = [1, 2, 3, 4];
  return (
    <>
      {error && <Text>{error}</Text>}
      <SimpleGrid
        templateColumns="repeat(auto-fill, minmax(250px, 1fr))"
        spacing={10}
        padding="10px"
      >
        {isLoading &&
          skeletons.map((skeleton) => <CategoryCardSkeleton key={skeleton} />)}
        {categories &&
          categories?.map((category) => (
            <CategoriesCard key={category.id} category={category} />
          ))}
      </SimpleGrid>
    </>
  );
};

export default CategoryGrid;
