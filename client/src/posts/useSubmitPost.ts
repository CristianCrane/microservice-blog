import axios from "axios";
import { useMutation, useQueryClient } from "@tanstack/react-query";

const POST_URL = import.meta.env.VITE_POSTS_URL;
type PostBody = { title: string };

export const useSubmitPost = () => {
  const queryClient = useQueryClient();

  return useMutation({
    mutationFn: (payload: PostBody) =>
      axios.post(`${POST_URL}/posts/create`, payload),
    onSuccess: () => queryClient.invalidateQueries({ queryKey: ["posts"] }),
    onError: (error) => alert(`Error creating post: ${error.message}`),
  });
};
