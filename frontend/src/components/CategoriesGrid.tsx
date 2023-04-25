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
        {data &&
          data?.map((category) => (
            <CategoryCardContainer>
              <CategoriesCard key={category.id} category={category} />
            </CategoryCardContainer>
          ))}
      </SimpleGrid>
    </>
  );
};

export default CategoryGrid;
