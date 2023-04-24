import { useEffect, useState } from "react";
import apiClient from "../services/apiClient";
import { CanceledError } from "axios";

export interface Category {
    id: number;
    title: string;
    image: string;
  }
  
  interface FetchCategoriesResponse {
    results: Category[]
  }

const UseCategories =  () => {
    const [categories, setCategories] = useState<Category[]>([]);
    const [error, setError] = useState("");
    const [isLoading, setLoading] = useState(false);
  
    useEffect(() => {
    const controller  = new AbortController()

    setLoading(true);
      apiClient
        .get<FetchCategoriesResponse>("/categories", {signal: controller.signal})
        .then((res) => {
          setCategories(res.data.results);
          setLoading(false)
        })
        .catch((err) => {
            if (err instanceof CanceledError) return;
            setError(err.message);
            setLoading(false);
          });
    return () => controller.abort();    
    }, []);

    return {categories, error, isLoading};

}  

export default UseCategories;