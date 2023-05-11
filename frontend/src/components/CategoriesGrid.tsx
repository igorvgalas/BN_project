import { SimpleGrid, Text } from "@chakra-ui/react";
import useCategories from "../hooks/useGategories";
import CategoriesCard from "./CategoriesCard";
import CategoryCardSkeleton from "./CategoryCardSkeleton";
import CategoryCardContainer from "./CategoryCardContainer";

const CategoryGrid = () => {
  const { data, error, isLoading } = useCategories();
  const skeletons = [1, 2, 3, 4];
  return (
    <>
      {error && <Text>{error}</Text>}
      <SimpleGrid
        id='serviceType'
        templateColumns="repeat(auto-fill, minmax(280px, 1fr))"
        spacing={6}
        padding={4}
      >
        {isLoading &&
          skeletons.map((skeleton) => (
            <CategoryCardContainer key={skeleton}>
              <CategoryCardSkeleton />
            </CategoryCardContainer>
          ))}
        {data?.map((category) => (
          <CategoryCardContainer key={category.id}>
            <CategoriesCard category={category} />
          </CategoryCardContainer>
        ))}
      </SimpleGrid>
    </>
  );
};

export default CategoryGrid;
