import styles from './Main.module.css';

export default function Main () {
    return <div className={styles.main}>
<div><h2 style={{fontWeight: 700}}>Todo Done</h2>
<span className={styles.remark}>keep it up</span>
</div>
<div className={styles.score}>
    1/3
</div>
    </div>
}