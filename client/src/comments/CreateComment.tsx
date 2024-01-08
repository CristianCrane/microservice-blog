import { useForm } from "@mantine/form";
import { Button, Group, Stack, TextInput } from "@mantine/core";
import { useSubmitComment } from "./useSubmitComment.ts";

type CreateCommentProps = { postId: string };

export const CreateComment = ({ postId }: CreateCommentProps) => {
  const form = useForm({
    initialValues: {
      content: "",
    },
    validate: {
      content: (value) => (!value ? "Required" : null),
    },
  });

  const submitPost = useSubmitComment();

  return (
    <form
      onSubmit={form.onSubmit(({ content }) =>
        submitPost.mutateAsync({ content, postId }).then(() => form.reset()),
      )}
    >
      <Stack>
        <TextInput
          withAsterisk
          label="Comment"
          {...form.getInputProps("content")}
        />
        <Group justify="flex-end">
          <Button type="submit">Post comment</Button>
        </Group>
      </Stack>
    </form>
  );
};
