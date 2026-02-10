import { QueryClient, dehydrate, HydrationBoundary } from "@tanstack/react-query";
import { fetchNotes } from "@/lib/api";
import NotesClient from "./Notes.client";

export default async function NotesPage() {

  const client = new QueryClient();

  await client.prefetchQuery({

    queryKey: ["notes", 1, ""],

    queryFn: () =>
      fetchNotes({
        page: 1,
        perPage: 12,
        search: "",
      }),

  });

  return (

    <HydrationBoundary state={dehydrate(client)}>

      <NotesClient />

    </HydrationBoundary>

  );

}