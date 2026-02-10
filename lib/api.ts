import axios from "axios";
import { FetchNotesResponse, Note } from "@/types/note";

const BASE_URL = "https://notehub-public.goit.study/api";

const TOKEN = process.env.NEXT_PUBLIC_NOTEHUB_TOKEN;

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

  const res = await instance.get("/notes", {

    params: { page, perPage, search },

  });

  return res.data;

};

export const fetchNoteById = async (id: string): Promise<Note> => {

  const res = await instance.get(`/notes/${id}`);

  return res.data;

};