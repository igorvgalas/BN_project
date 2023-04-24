import { SimpleGrid, Text } from "@chakra-ui/react";
import UseCategories from "../hooks/useGategories";
import CategoriesCard from "./CategoriesCard";
import CategoryCardSkeleton from "./CategoryCardSkeleton";
import CategoryCardContainer from "./CategoryCardContainer";

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
          skeletons.map((skeleton) => (
          <CategoryCardContainer>
            <CategoryCardSkeleton key={skeleton} />
          </CategoryCardContainer>
          ))}
        {categories &&
          categories?.map((category) => (
            <CategoryCardContainer>
              <CategoriesCard key={category.id} category={category} />
            </CategoryCardContainer>
          ))}
      </SimpleGrid>
    </>
  );
};

export default CategoryGrid;
