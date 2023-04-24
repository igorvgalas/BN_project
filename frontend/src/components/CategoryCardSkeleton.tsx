import { Card, CardBody, Skeleton, SkeletonText, Text,CardFooter, Button } from "@chakra-ui/react"


const CategoryCardSkeleton = () => {
  return (
    <Card align='center' borderRadius={10} overflow='hidden'>
        <Skeleton height={"200px"}/>
        <CardBody>
            <SkeletonText />
        <Text>
          description
        </Text>
        <CardFooter>
          <Button>More detail</Button>
        </CardFooter>
        </CardBody>
    </Card>

  )
}

export default CategoryCardSkeleton