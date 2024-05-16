import styles from './Search.module.css'
import { useState } from 'react'
import { useStore } from '@/layout'
import useListStore from '../../stores/ListStore'

export default function Search() {
    const { addTodo } = useListStore()
    const { wallet } = useStore()
    const [newTodo, setNewTodo] = useState('')
    const [showSpinner, setShowSpinner] = useState(false)

    const saveTodo = async () => {
        if (!wallet || newTodo == '') return
        setShowSpinner(true)
        await wallet.callMethod({
            contractId: 'bhobo1.testnet',
            method: 'add_todo',
            args: { description: newTodo },
        })
        setNewTodo('')
        addTodo(newTodo)
        setShowSpinner(false)
    }

    return (
        <div className={styles.parent}>
            <input
                type="text"
                className={styles.input}
                placeholder="write your next task"
                onChange={(t) => setNewTodo(t.target.value)}
            />
            <button className={styles.add} onClick={saveTodo}>
                <span hidden={showSpinner}>
                    <svg
                        xmlns="http://www.w3.org/2000/svg"
                        width="24"
                        height="24"
                        viewBox="0 0 24 24"
                        style={{
                            fill: 'rgba(47,16,16,255);transform: ;msFilter:;',
                        }}
                    >
                        <path d="M19 11h-6V5h-2v6H5v2h6v6h2v-6h6z"></path>
                    </svg>
                </span>
                <i
                    className="spinner-border spinner-border-sm"
                    hidden={!showSpinner}
                ></i>
            </button>
        </div>
    )
}
