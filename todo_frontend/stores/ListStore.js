import { create } from "zustand";

const initialState = {
  Lists: [
    { id: 1, name: "Task 1", checked: false },
    { id: 2, name: "Task 2", checked: true },
    { id: 3, name: "Task 3", checked: false },
    { id: 4, name: "Task 4", checked: false },
    { id: 5, name: "Task 5", checked: true },
  ],
};

const useListStore = create((set) => ({
  ...initialState,
  setChecked: (id) =>
    set((state) => ({
      Lists: state.Lists.map((list) => {
        if (list.id === id) return { ...list, checked: !list.checked };
        else return list;
      }),
    })),
}));

export default useListStore;
