import styles from '../components/Tasks.module.css'
import useListStore from '../../stores/ListStore'
import { useStore } from '@/layout'
import { useState } from 'react'

export default function Task({ id, content, completed }) {
    const { signedAccountId, wallet } = useStore()
    const [clicked, setClicked] = useState(false)
    const { setCompleted } = useListStore()

    const removeTodo = async () => {
        if (!wallet) return
        await wallet.callMethod({
            contractId: 'bhobo1.testnet',
            method: 'remove_todo',
            args: { index: id },
        })
    }

    return (
        <div className={styles.task}>
            <div className={styles.left}>
                <button
                    onClick={async () => {
                        if (completed || clicked) return

                        await setCompleted(id, wallet)
                        setClicked((c) => !c)
                    }}
                    className={`${
                        clicked || completed ? styles.check : styles.uncheck
                    }`}
                ></button>
                <span
                    className={`${
                        clicked || completed ? styles.strikeThrough : ''
                    }`}
                >
                    {content}
                </span>
            </div>
            <div className={styles.right}>
                <button className={styles.iconButton} onClick={removeTodo}>
                    <svg
                        xmlns="http://www.w3.org/2000/svg"
                        x="0px"
                        y="0px"
                        width="28"
                        height="28"
                        viewBox="0,0,270,250"
                    >
                        <g
                            fill="#ffffff"
                            fill-rule="nonzero"
                            stroke="none"
                            stroke-width="1"
                            stroke-linecap="butt"
                            stroke-linejoin="miter"
                            stroke-miterlimit="10"
                            stroke-dasharray=""
                            stroke-dashoffset="0"
                            font-family="none"
                            font-weight="none"
                            font-size="none"
                            text-anchor="none"
                        >
                            <g transform="scale(4,4)">
                                <path d="M28,11c-1.105,0 -2,0.895 -2,2v1h-13c-1.104,0 -2,0.896 -2,2c0,1.104 0.896,2 2,2h1.16016l2.54102,30.49805c0.256,3.085 2.88447,5.50195 5.98047,5.50195h18.63672c3.096,0 5.72347,-2.41695 5.98047,-5.50195l2.54102,-30.49805h1.16016c1.104,0 2,-0.896 2,-2c0,-1.104 -0.896,-2 -2,-2h-13v-1c0,-1.105 -0.895,-2 -2,-2zM18.17383,18h27.6543l-2.51562,30.16602c-0.086,1.028 -0.96019,1.83398 -1.99219,1.83398h-18.63867c-1.033,0 -1.90914,-0.80598 -1.99414,-1.83398z"></path>
                            </g>
                        </g>
                    </svg>
                </button>
                {/* <button className={styles.iconButton}>
                    <svg
                        className={styles.icon}
                        xmlns="http://www.w3.org/2000/svg"
                        width="16"
                        height="16"
                        fill="currentColor"
                        class="bi bi-pencil-square"
                        viewBox="0 0 16 16"
                    >
                        <path d="M15.502 1.94a.5.5 0 0 1 0 .706L14.459 3.69l-2-2L13.502.646a.5.5 0 0 1 .707 0l1.293 1.293zm-1.75 2.456-2-2L4.939 9.21a.5.5 0 0 0-.121.196l-.805 2.414a.25.25 0 0 0 .316.316l2.414-.805a.5.5 0 0 0 .196-.12l6.813-6.814z" />
                        <path
                            fill-rule="evenodd"
                            d="M1 13.5A1.5 1.5 0 0 0 2.5 15h11a1.5 1.5 0 0 0 1.5-1.5v-6a.5.5 0 0 0-1 0v6a.5.5 0 0 1-.5.5h-11a.5.5 0 0 1-.5-.5v-11a.5.5 0 0 1 .5-.5H9a.5.5 0 0 0 0-1H2.5A1.5 1.5 0 0 0 1 2.5z"
                        />
                    </svg>
                </button> */}
            </div>
        </div>
    )
}
