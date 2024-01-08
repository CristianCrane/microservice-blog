import { List, Stack, Text } from "@mantine/core";

type ListCommentsProps = { comments: { id: string; content: string }[] };

export const ListComments = ({ comments }: ListCommentsProps) => {
  return (
    <Stack>
      <Text size="sm" c="dimmed" fs="italic">
        {comments.length} comment
        {(comments.length === 0 || comments.length > 1) && "s"}
      </Text>
      <List>
        {comments.map((comment) => (
          <List.Item key={comment.id}>{comment.content}</List.Item>
        ))}
      </List>
    </Stack>
  );
};
