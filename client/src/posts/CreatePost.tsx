import { useForm } from "@mantine/form";
import { Button, Group, Stack, TextInput } from "@mantine/core";
import { useSubmitPost } from "./useSubmitPost.ts";

export const CreatePost = () => {
  const form = useForm({
    initialValues: {
      title: "",
    },
    validate: {
      title: (value) => (!value ? "Required" : null),
    },
  });

  const submitPost = useSubmitPost();

  return (
    <form
      onSubmit={form.onSubmit((values) =>
        submitPost.mutateAsync(values).then(() => form.reset()),
      )}
    >
      <Stack>
        <TextInput
          withAsterisk
          label="Post Title"
          {...form.getInputProps("title")}
        />
        <Group justify="flex-end">
          <Button type="submit">Create Post</Button>
        </Group>
      </Stack>
    </form>
  );
};
