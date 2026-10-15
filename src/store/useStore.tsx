import { atom } from "jotai";
import axios from "axios";

const API = "https://6a56fde4b17de7bebbdeb233.mockapi.io/data";


export const todosAtom = atom([]);


export const loadingAtom = atom(false);

export const errorAtom = atom(null);


export const getTodosAtom = atom(null, async (get, set) => {
  set(loadingAtom, true);
  set(errorAtom, null);

  try {
    const response = await axios.get(API);

    set(todosAtom, response.data);
  } catch (error) {
    set(errorAtom, "Error");
  } finally {
    set(loadingAtom, false);
  }
});


export const addTodoAtom = atom(null, async (get, set, title) => {
  set(loadingAtom, true);
  set(errorAtom, null);

  try {
    const response = await axios.post(API, {
     title,
      status: false,
      id: Date.now()
    });

    set(todosAtom, (prev) => [response.data, ...prev]);
  } catch (error) {
    set(errorAtom, "Error equired");
  } finally {
    set(loadingAtom, false);
  }
});


export const deleteTodoAtom = atom(null, async (get, set, id) => {
  set(errorAtom, null);

  try {
    await axios.delete(`${API}/${id}`);

    set(todosAtom, (prev) =>
      prev.filter((todo) => todo.id !== id)
    );
  } catch (error) {
    set(errorAtom, "Error");
  }
});

export const toggleTodoAtom = atom(
  null,
  async (get, set, todo) => {
    set(errorAtom, null);

    try {
      const response = await axios.put(`${API}/${todo.id}`, {
        status: !todo.status,
      });

      set(todosAtom, (prev) =>
        prev.map((item) =>
          item.id === todo.id
            ? { ...item, status: response.data.status }
            : item
        )
      );
    } catch (error) {
      set(errorAtom, "Errorr");
    }
  }
);