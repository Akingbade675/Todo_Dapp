import Image from 'next/image'
import Link from 'next/link'
import { useEffect, useState } from 'react'
import styles from '@/styles/navigation.module.css'

import NearLogo from '/public/near-logo.svg'
import { useStore } from '@/layout'

export const Navigation = () => {
    const { signedAccountId, wallet } = useStore()
    const [action, setAction] = useState(() => {})
    const [label, setLabel] = useState('Loading...')
    const [loggedIn, setLoggedIn] = useState(false)

    useEffect(() => {
        if (!wallet) return

        if (signedAccountId) {
            setAction(() => wallet.signOut)
            // setLabel(`Logout ${signedAccountId}`)
            setLabel('Logout')
            setLoggedIn(true)
        } else {
            setAction(() => wallet.signIn)
            setLabel('Login')
        }
    }, [signedAccountId, wallet])

    return (
        <nav className={`navbar navbar-expand-lg ${styles.nav}`}>
            <div className="container-fluid">
                {/* <Link href="/" passHref legacyBehavior>
          <Image priority src={NearLogo} alt="NEAR" width="30" height="24" className="d-inline-block align-text-top" />
        </Link> */}
                <div className="navbar-brand">
                    <h3 className={styles.brand}>
                        TODO <span>DAPP</span>
                    </h3>
                </div>
                <div className="navbar-nav pt-1">
                    <button
                        className={`btn btn-secondary ${
                            loggedIn
                                ? styles.loggedInAuthBtn
                                : styles.loggedOutAuthBtn
                        }`}
                        onClick={action}
                    >
                        {' '}
                        {label}{' '}
                    </button>
                </div>
            </div>
        </nav>
    )
}
