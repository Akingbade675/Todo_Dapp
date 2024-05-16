import { create } from 'zustand'

const initialState = {
    Lists: [
        // { id: 1, description: 'Task 1', completed: false },
        // { id: 2, description: 'Task 2', completed: true },
        // { id: 3, description: 'Task 3', completed: false },
        // { id: 4, description: 'Task 4', completed: false },
        // { id: 5, description: 'Task 5', completed: true },
    ],
}

const useListStore = create((set) => ({
    ...initialState,
    addTodo: (description) =>
        set((state) => ({
            Lists: [
                ...state.Lists,
                { id: state.Lists.length, description, completed: false },
            ],
        })),
    setLists: (lists) =>
        set({
            Lists: lists.map((item, index) => ({ ...item, id: index })),
        }),
    setCompleted: async (id, wallet) => {
        if (!wallet) return

        console.log('Completing todo', id)
        await wallet.callMethod({
            contractId: 'bhobo1.testnet',
            method: 'complete_todo',
            args: { index: id },
        })
        return set((state) => ({
            Lists: state.Lists.map((list) => {
                if (list.id === id)
                    return { ...list, completed: !list.completed }
                else return list
            }),
        }))
    },
}))

export default useListStore
