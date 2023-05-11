import useData from "../hooks/useData"

export interface Category {
    id: number;
    title: string;
    image: string;
  }
  
const useCategories =  () => useData<Category>("/categories")

export default useCategories;