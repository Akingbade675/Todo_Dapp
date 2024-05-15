import Image from 'next/image';

import  Main  from '@/components/Main';
import Search from '@/components/Search';
import Tasks  from '@/components/Tasks'

import NearLogo from '/public/near.svg';
import NextLogo from '/public/next.svg';
import styles from '@/styles/app.module.css';
import { DocsCard, HelloComponentsCard, HelloNearCard } from '@/components/cards';

export default function Home() {
  return (
    <main className={styles.main}>
      {/* <div className={styles.description}> </div>

      <div className={styles.center}>
        <Image
          className={styles.logo}
          src={NearLogo}
          alt="NEAR Logo"
          width={110 * 1.5}
          height={28 * 1.5}
          priority
        />
        <h3 className="ms-2 me-3 text-dark"> + </h3>
        <Image
          className={styles.logo}
          src={NextLogo}
          alt="Next.js Logo"
          width={300 * .58}
          height={61 * .58}
          priority
        />
      </div>

      <div className={styles.grid}>
        <HelloComponentsCard />
        <HelloNearCard />
        <DocsCard />
      </div> */}

      <Main />
      <Search />
      <div className={styles.tasks}>

      {Array.from({length: 5}, (_,i) => <Tasks key={i} />)}
      </div>
    </main>
  );
}