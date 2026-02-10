"use client";

import Link from "next/link";
import { Note } from "@/types/note";
import { useMutation, useQueryClient } from "@tanstack/react-query";
import {  deleteNoteById } from "@/lib/api"; 
import css from "./NoteList.module.css";

interface NoteListProps {
  notes: Note[];
}

export default function NoteList({ notes }: NoteListProps) {
  const queryClient = useQueryClient();

  const deleteMutation = useMutation({
    mutationFn: (id: string) => deleteNoteById(id),
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ["notes"] });
    },
  });

  const handleDelete = (id: string) => {
    if (confirm("Are you sure you want to delete this note?")) {
      deleteMutation.mutate(id);
    }
  };

  return (
    <div className={css.container}>
      {notes.map((note) => (
        <div key={note.id} className={css.note}>
          <h3>{note.title}</h3>
          <p className={css.tag}>{note.tag}</p>
          <p className={css.content}>{note.content}</p>
          <Link href={`/notes/${note.id}`} className={css.link}>
            View details
          </Link>
          <button
            className={css.deleteBtn}
            onClick={() => handleDelete(note.id)}
            disabled={deleteMutation.status === "pending"}
          >
            Delete
          </button>
        </div>
      ))}
    </div>
  );
}















// "use client";

// import Link from "next/link";
// import { Note } from "@/types/note";

// export default function NoteList({
//   notes,
// }: {
//   notes: Note[];
// }) {

//   return (

//     <div>

//       {notes.map((note) => (

//         <div key={note.id}>

//           <h3>{note.title}</h3>

//           <Link href={`/notes/${note.id}`}>
//             View details
//           </Link>

//         </div>

//       ))}

//     </div>

//   );

// }