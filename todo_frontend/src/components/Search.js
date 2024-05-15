import styles from './Search.module.css';

export default function Search() {
    return <div className={styles.parent}>
        <input type="text" className={styles.input} placeholder="write your next task" />
        <button className={styles.add}><svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" style={{fill: "rgba(0, 0, 0, 1);transform: ;msFilter:;"}}><path d="M19 11h-6V5h-2v6H5v2h6v6h2v-6h6z"></path></svg></button>
    </div>
}