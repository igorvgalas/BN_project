import {Box} from  "@chakra-ui/react"
import { ReactNode } from "react"

interface Props {
    children : ReactNode
}

const CategoryCardContainer = ({children}: Props) => {
  return (
    <Box height="500px" width="250px" borderRadius={10} overflow='hidden'>
        {children}
    </Box>
  )
}

export default CategoryCardContainer