import { usePosts } from "./usePosts.tsx";
import { Card, Loader, SimpleGrid, Text } from "@mantine/core";
import { ListComments } from "../comments/ListComments.tsx";
import { CreateComment } from "../comments/CreateComment.tsx";

export const ListPosts = () => {
  const { isLoading, isError, data } = usePosts();

  if (isLoading) {
    return <Loader />;
  }

  if (isError || !data) {
    return "Failed to load posts";
  }

  return (
    <SimpleGrid cols={2}>
      {Object.values(data).map((post) => (
        <Card key={post.id} shadow="sm" withBorder>
          <Text fw={500}>{post.title}</Text>
          <ListComments comments={post.comments} />
          <CreateComment postId={post.id} />
        </Card>
      ))}
    </SimpleGrid>
  );
};
