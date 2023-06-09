import { ThemeProvider } from '@emotion/react'
import Head from 'next/head'
import React from 'react'
import FullLayout from '../../../template/src/layouts/FullLayout'
import theme from '../../../template/src/theme/theme'

const Login = () => {
    return (
        <>
            <Head>
                <title>Admin - Login   |   Vastram</title>
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

export default Login