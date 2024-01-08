import { useQuery } from "@tanstack/react-query";
import axios, { AxiosResponse } from "axios";

const COMMENTS_URL = import.meta.env.VITE_COMMENTS_URL;
type Comments = {
  id: string;
  content: string;
}[];

export const useComments = (postId: string) => {
  return useQuery({
    queryKey: ["comments", postId],
    queryFn: () => axios.get(`${COMMENTS_URL}/posts/${postId}/comments`),
    select: (data: AxiosResponse<Comments>) => data.data,
  });
};
