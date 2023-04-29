import { ThemeProvider } from '@emotion/react'
import Head from 'next/head'
import React from 'react'
import FullLayout from '../../../template/src/layouts/FullLayout'
import theme from '../../../template/src/theme/theme'

const Orders = () => {
    return (
        <>
            <Head>
                <title>Orders   |   Vastram</title>
            </Head>
            <ThemeProvider theme={theme}>
            <style jsx global>{`
                .nav, .footer {
                    display: none;
                }
                
            `}</style>
                <FullLayout>
                    Hola
                </FullLayout>
            </ThemeProvider>
        </>
    )
}

export default Orders