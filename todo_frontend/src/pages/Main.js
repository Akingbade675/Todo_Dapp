import styles from '../components/Main.module.css'
import useListStore from '../../stores/ListStore'
import Task from './Task'

export default function Main({ children }) {
    //create you array of lists and use it to populate the Tasks
    //I will create one of default length 5
    // const Lists = [
    //   { id: 1, name: "Task 1", completed: false },
    //   { id: 2, name: "Task 2", completed: true },
    //   { id: 3, name: "Task 3", completed: false },
    //   { id: 4, name: "Task 4", completed: false },
    //   { id: 5, name: "Task 5", completed: true },
    // ];
    const { Lists } = useListStore()

    const completed = Lists.filter((list) => list.completed === true).length
    const totalLists = Lists.length

    return (
        <div>
            <div className={styles.main}>
                <div>
                    <h2 className={styles.hTxt} style={{ fontWeight: 700 }}>
                        Todo Done
                    </h2>
                    <span className={styles.remark}>keep it up</span>
                </div>
                <div className={styles.score}>
                    {completed}/{totalLists}
                </div>
            </div>

            {children}

            <div className={styles.tasks}>
                {Lists.map((list) => (
                    <Task
                        key={list.id}
                        id={list.id}
                        content={list.description}
                        completed={list.completed}
                    />
                ))}
            </div>
        </div>
    )
}
