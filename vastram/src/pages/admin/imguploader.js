import { ThemeProvider } from '@emotion/react'
import Head from 'next/head'
import React from 'react'
import theme from '../../../template/src/theme/theme'
import FullLayout from '../../../template/src/layouts/FullLayout'

const ImgUploader = () => {
    return (
        <>
            <Head>
                <title>Image Uploader   |   Vastram</title>
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

export default ImgUploader