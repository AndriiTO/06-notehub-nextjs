"use client";

import { useQuery } from "@tanstack/react-query";
import { useParams } from "next/navigation";
import { fetchNoteById } from "@/lib/api";

export default function NoteDetailsClient() {

  const params = useParams();

  const id = params.id as string;

  const { data, isLoading, error } =
    useQuery({

      queryKey: ["note", id],

      queryFn: () =>
        fetchNoteById(id),

    });

  if (isLoading)
    return <p>Loading, please wait...</p>;

  if (error || !data)
    return <p>Something went wrong.</p>;

  return (

    <div>

      <h2>{data.title}</h2>

      <p>{data.content}</p>

      <p>{data.tag}</p>

      <p>{data.createdAt}</p>

    </div>

  );

}