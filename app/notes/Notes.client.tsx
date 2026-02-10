"use client";

import { useState } from "react";
import { useQuery } from "@tanstack/react-query";
import { useDebouncedCallback } from "use-debounce";
import { fetchNotes } from "@/lib/api";
import { Note } from "@/types/note";
import { FetchNotesResponse } from "@/lib/api";
import NoteList from "@/components/NoteList/NoteList";
import SearchBox from "@/components/SearchBox/SearchBox";
import Pagination from "@/components/Pagination/Pagination";
import Modal from "@/components/Modal/Modal";
import NoteForm from "@/components/NoteForm/NoteForm";
import css from "./NotesClient.module.css";

interface NotesClientProps {
  initialData?: FetchNotesResponse;
}

const PER_PAGE = 12;

const NotesClient = ({ initialData }: NotesClientProps) => {
  const [currentPage, setCurrentPage] = useState<number>(1);
  const [searchQuery, setSearchQuery] = useState<string>("");
  const [isModalOpen, setIsModalOpen] = useState<boolean>(false);

  const debouncedSearch = useDebouncedCallback((value: string) => {
    setCurrentPage(1); 
    setSearchQuery(value);
  }, 500);

  const { data, isLoading, error } = useQuery<FetchNotesResponse>({
  queryKey: ["notes", currentPage, searchQuery],
  queryFn: () =>
    fetchNotes({ page: currentPage, perPage: PER_PAGE, search: searchQuery }),
   placeholderData: initialData ?? { notes: [], totalPages: 1 },
//   initialData,
//   keepPreviousData: true,
});

//   const { data, isLoading, error } = useQuery<FetchNotesResponse>(
//     ["notes", currentPage, searchQuery],
//     () => fetchNotes({ page: currentPage, perPage: PER_PAGE, search: searchQuery }),
//     {
//       initialData,
//       keepPreviousData: true, 
//     }
//   );

  if (isLoading) return <p>Loading, please wait...</p>;
  if (error) return <p>Could not fetch the list of notes.</p>;

  return (
    <div className={css.container}>
      <div className={css.controls}>
        <SearchBox onSearch={debouncedSearch} />
        <button onClick={() => setIsModalOpen(true)}>Create Note</button>
      </div>

      {data && data.notes.length > 0 ? (
        <NoteList notes={data.notes} />
      ) : (
        <p>No notes found.</p>
      )}

      <Pagination
        currentPage={currentPage}
        totalPages={data?.totalPages || 1}
        onPageChange={setCurrentPage}
      />

      <Modal isOpen={isModalOpen} onClose={() => setIsModalOpen(false)}>
        <NoteForm onClose={() => setIsModalOpen(false)} />
      </Modal>
    </div>
  );
};

export default NotesClient;






// "use client";

// import { useQuery } from "@tanstack/react-query";
// import { fetchNotes } from "@/lib/api";
// import NoteList from "@/components/NoteList/NoteList";

// export default function NotesClient() {

//   const { data, isLoading, error } =
//     useQuery({

//       queryKey: ["notes", 1, ""],

//       queryFn: () =>
//         fetchNotes({
//           page: 1,
//           perPage: 12,
//           search: "",
//         }),

//     });

//   if (isLoading)
//     return <p>Loading...</p>;

//   if (error)
//     return <p>Error</p>;

//   return <NoteList notes={data?.notes ?? []} />;

// }