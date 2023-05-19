import { useEffect, useState } from "react";
import apiClient from "../services/apiClient";
import { AxiosRequestConfig, CanceledError } from "axios";


  
  // interface FetchResponse<T> {
  //   results: T[]
  // }

interface encodeQuery {
    [key: string]: number|string;
 }

export function encodeQueryData(data: encodeQuery) {
  const ret = [];
  for (let d in data)
    ret.push(encodeURIComponent(d) + '=' + encodeURIComponent(data[d]));
  return ret.join('&');
}  

const useData = <T> (endpoint:string, requestConfig?:AxiosRequestConfig, deps?:any) => {
    const [data, setData] = useState<T[]>([]);
    const [error, setError] = useState("");
    const [isLoading, setLoading] = useState(false);
  
    useEffect(() => {
    const controller  = new AbortController()

    setLoading(true);
      apiClient
        .get<T[]>(endpoint, {signal: controller.signal})
        .then((res) => {
          setData(res.data);
          setLoading(false)
        })
        .catch((err) => {
            if (err instanceof CanceledError) return;
            setError(err.message);
            setLoading(false);
          });
    return () => controller.abort();    
    }, deps ? [...deps] : []);

    return {data, error, isLoading};

}  

export default useData;