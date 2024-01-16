import axios from "../../axios";

// Function to get all notes
export async function getNotes() {
  try {
    const response = await axios.get("/api/notes");
    return response.data;
  } catch (error) {
    console.error(error);
    throw error; // You may want to re-throw the error to handle it elsewhere
  }
}

// Function to get a single note by ID
export async function getNoteById(id) {
  try {
    const response = await axios.get(`/api/notes/${id}`);
    return response.data;
  } catch (error) {
    console.error(error);
    throw error;
  }
}

// Function to create a new note
export async function createNote(note) {
  try {
    const response = await axios.post("/api/notes/create", note);
    return response.data;
  } catch (error) {
    console.error(error);
    throw error;
  }
}

// Function to update a note
export async function updateNote(note) {
  try {
    const response = await axios.put(`/api/notes/${note.id}/update/`, note);
    return response.data;
  } catch (error) {
    console.error(error);
    throw error;
  }
}

// Function to delete a note by ID
export async function deleteNote(id) {
  try {
    const response = await axios.delete(`/api/notes/${id}/delete/`);
    return response.data;
  } catch (error) {
    console.error(error);
    throw error;
  }
}
