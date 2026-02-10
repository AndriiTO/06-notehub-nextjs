"use client";

import Link from "next/link";
import { Note } from "@/types/note";

export default function NoteList({
  notes,
}: {
  notes: Note[];
}) {

  return (

    <div>

      {notes.map((note) => (

        <div key={note.id}>

          <h3>{note.title}</h3>

          <Link href={`/notes/${note.id}`}>
            View details
          </Link>

        </div>

      ))}

    </div>

  );

}