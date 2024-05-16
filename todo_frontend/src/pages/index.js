import Image from 'next/image'

import Main from '@/pages/Main'
import Search from '@/components/Search'
import Tasks from './Task'

import NearLogo from '/public/near.svg'
import NextLogo from '/public/next.svg'
import styles from '@/styles/app.module.css'
import { useEffect, useState } from 'react'
import { useStore } from '@/layout'
import useListStore from '../../stores/ListStore'
import {
    DocsCard,
    HelloComponentsCard,
    HelloNearCard,
} from '@/components/cards'

export default function Home() {
    const { Lists, setLists } = useListStore()
    const { signedAccountId, wallet } = useStore()
    const [isLoggedIn, setIsLoggedIn] = useState(false)

    useEffect(() => {
        if (!wallet) return

        if (signedAccountId) {
            console.log(signedAccountId)
            wallet
                .viewMethod({
                    contractId: 'bhobo1.testnet',
                    method: 'get_todos',
                    args: { account_id: signedAccountId },
                })
                .then((todos) => setLists(todos))
                .catch((value) => console.error(value))
            setIsLoggedIn(true)
        } else {
            setIsLoggedIn(false)
        }
    }, [signedAccountId, wallet])

    return (
        <main className={styles.main}>
            {isLoggedIn ? (
                <Main>
                    <Search />
                </Main>
            ) : (
                <div>
                    <h2>Welcome to our Todo Dapp!</h2>
                    <p>
                        Our Todo Dapp helps you organize your tasks efficiently.
                        Log in to start managing your todos and stay organized.
                    </p>
                </div>
            )}
        </main>
    )
}
