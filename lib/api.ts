import axios from "axios";
import type { Note } from "@/types/note";

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

export const fetchNotes = async ({
  page,
  perPage,
  search,
}: {
  page: number;
  perPage: number;
  search?: string;
}): Promise<FetchNotesResponse> => {
  const res = await instance.get<FetchNotesResponse>("/notes", {
    params: { page, perPage, search },
  });

  const data: FetchNotesResponse = res.data;
  return data;
};

export const fetchNoteById = async (id: string): Promise<Note> => {
  const res = await instance.get<Note>(`/notes/${id}`);

  const data: Note = res.data;
  return data;
};

export const createNote = async (noteData: {
  title: string;
  content: string;
  tag: string;
}): Promise<Note> => {
  const res = await instance.post<Note>("/notes", noteData);

  const data: Note = res.data;
  return data;
};

export const deleteNoteById = async (id: string): Promise<Note> => {
  const res = await instance.delete<Note>(`/notes/${id}`);

  const data: Note = res.data;
  return data;
};






// import axios from "axios";
// import { Note } from "@/types/note";

// const BASE_URL = "https://notehub-public.goit.study/api";
// const TOKEN = process.env.NEXT_PUBLIC_NOTEHUB_TOKEN;

// export interface FetchNotesResponse {
//   notes: Note[];
//   totalPages: number;
// }

// const instance = axios.create({
//   baseURL: BASE_URL,
//   headers: {
//     Authorization: `Bearer ${TOKEN}`,
//   },
// });

// export const fetchNotes = async ({
//   page,
//   perPage,
//   search,
// }: {
//   page: number;
//   perPage: number;
//   search?: string;
// }): Promise<FetchNotesResponse> => {
//   const res = await instance.get<FetchNotesResponse>("/notes", {
//     params: { page, perPage, search },
//   });
  
//   const data: FetchNotesResponse = res.data;
//   return res.data;
// };

// export const fetchNoteById = async (id: string): Promise<Note> => {
//   const res = await instance.get<Note>(`/notes/${id}`);
//   const data: Note = res.data;

//   return res.data;
// };

// export const createNote = async (noteData: {
//   title: string;
//   content: string;
//   tag: string;
// }): Promise<Note> => {
//   const res = await instance.post<Note>("/notes", noteData);
//   return res.data;
// };

// export const deleteNoteById = async (id: string): Promise<Note> => {
//   const res = await instance.delete<Note>(`/notes/${id}`);
//   return res.data;
// };



