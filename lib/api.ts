import axios from "axios";
import { Note } from "@/types/note";

const BASE_URL = "https://notehub-public.goit.study/api";

const TOKEN = process.env.NEXT_PUBLIC_NOTEHUB_TOKEN;

export interface FetchNotesResponse {

  notes: Note[];
  totalPages: number;
}

const instance = axios.create({

  baseURL: BASE_URL,

  headers: {
    Authorization: `Bearer ${TOKEN}`,
  },

});
export const deleteNoteById = async (id: string) => {
  const res = await instance.delete(`/notes/${id}`);
  return res.data;
};

export const createNote = async (noteData: {
  title: string;
  content: string;
  tag: string;
}): Promise<Note> => {
  const res = await instance.post("/notes", noteData);
  return res.data;
};
export const fetchNotes = async ({
  page,
  perPage,
  search,
}: {
  page: number;
  perPage: number;
  search?: string;
}): Promise<FetchNotesResponse> => {

//   const res = await instance.get("/notes", {
 const res = await instance.get<FetchNotesResponse>("/notes", {
    params: { page, perPage, search },

  });

  return res.data;

};

export const fetchNoteById = async (id: string): Promise<Note> => {

  const res = await instance.get(`/notes/${id}`);

  return res.data;

};