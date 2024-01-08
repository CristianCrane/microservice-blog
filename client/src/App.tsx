import "@mantine/core/styles.css";
import {
  AppShell,
  Burger,
  Container,
  MantineProvider,
  Stack,
  Title,
} from "@mantine/core";
import { useDisclosure } from "@mantine/hooks";
import { CreatePost } from "./posts/CreatePost.tsx";
import { PropsWithChildren } from "react";
import { QueryClient, QueryClientProvider } from "@tanstack/react-query";
import { ListPosts } from "./posts/ListPosts.tsx";

const queryClient = new QueryClient();

function App() {
  const [opened, { toggle }] = useDisclosure();

  return (
    <Providers>
      <AppShell
        header={{ height: 60 }}
        navbar={{
          width: 300,
          breakpoint: "sm",
          collapsed: { mobile: !opened },
        }}
        padding="md"
      >
        <AppShell.Header>
          <Burger opened={opened} onClick={toggle} hiddenFrom="sm" size="sm" />
          <div>Blog</div>
        </AppShell.Header>

        <AppShell.Navbar p="md">Navbar</AppShell.Navbar>

        <Container>
          <AppShell.Main>
            <Stack>
              <Title order={2}>Create Post</Title>
              <CreatePost />
              <Title order={2}>Posts</Title>
              <ListPosts />
            </Stack>
          </AppShell.Main>
        </Container>
      </AppShell>
    </Providers>
  );
}

const Providers = ({ children }: PropsWithChildren) => {
  return (
    <MantineProvider>
      <QueryClientProvider client={queryClient}>{children}</QueryClientProvider>
    </MantineProvider>
  );
};

export default App;
