import { useQuery } from "@tanstack/react-query";
import axios, { AxiosResponse } from "axios";

type Posts = Record<
  string,
  { id: string; title: string; comments: { id: string; content: string }[] }
>;

export const usePosts = () => {
  return useQuery({
    queryKey: ["posts"],
    queryFn: () => axios.get(`${import.meta.env.VITE_QUERY_URL}/posts`),
    select: (data: AxiosResponse<Posts>) => Object.values(data.data),
  });
};
