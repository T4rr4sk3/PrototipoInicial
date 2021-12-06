import React, { useState } from 'react'
import Head from 'next/head'
import MyHeader from './Header'
import UserMenuDropDown from './UserMenuDropdown'
import PropTypes from 'prop-types'
import { useUser } from '../pages/CurrentUser'

export default function Layout({ children, currentPage, logged, noHeader = false }){

    const [dropMenuActive, setDropMenu] = useState(false)

    const currentUser = useUser()

    return(
        <>
            <Head>
                <title>{currentPage}</title>
                <meta name="viewport" content="initial-scale=1.0, width=device-width" />
                <meta charSet='UTF-8' />
            </Head>

            {noHeader == true ? null :
                <MyHeader logged={logged} userInfo={currentUser} menuActive={dropMenuActive} displayMenuFunc={setDropMenu}/> }

            {logged == true && noHeader == false ? <UserMenuDropDown active={dropMenuActive} /> : null}

            <div className='wrapper'>
                <main>
                    {children}
                </main>
            </div>
        </>
    )
}

Layout.propTypes = {
    children: PropTypes.node
}