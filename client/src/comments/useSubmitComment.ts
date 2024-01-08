import axios from "axios";
import { useMutation, useQueryClient } from "@tanstack/react-query";

const COMMENTS_URL = import.meta.env.VITE_COMMENTS_URL;
type Payload = { postId: string; content: string };

export const useSubmitComment = () => {
  const queryClient = useQueryClient();

  return useMutation({
    mutationFn: ({ postId, content }: Payload) =>
      axios.post(`${COMMENTS_URL}/posts/${postId}/comments`, { content }),
    onSuccess: () =>
      queryClient.invalidateQueries({
        queryKey: ["posts"],
      }),
    onError: (error) => alert(`Error creating comment: ${error.message}`),
  });
};
