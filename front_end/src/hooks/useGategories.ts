import { useEffect, useState } from "react";
import apiClient from "../services/apiClient";
import { CanceledError } from "axios";

interface Category {
    id: number;
    title: string;
  }
  
  interface FetchCategoriesResponse {
    results: Category[]
  }

const UseCategories =  () => {
    const [categories, setCategories] = useState<Category[]>([]);
    const [error, setError] = useState("");
  
    useEffect(() => {
    const controller  = new AbortController()
      apiClient
        .get<FetchCategoriesResponse>("/categories", {signal: controller.signal})
        .then((res) => setCategories(res.data.results))
        .catch((err) => {
            if (err instanceof CanceledError) return;
            setError(err.message)});
    return () => controller.abort();    
    }, []);

    return {categories, error};

}  

export default UseCategories;