import { ThemeProvider } from '@emotion/react'
import { Grid } from "@mui/material";
import Head from 'next/head'
import React from 'react'
import FullLayout from '../../../template/src/layouts/FullLayout'
import theme from '../../../template/src/theme/theme'
import ProductPerfomance from '../../../template/src/components/dashboard/ProductPerfomance';

const Products = () => {
    return (
        <>
            <Head>
                <title>Products   |   Vastram</title>
            </Head>
            <ThemeProvider theme={theme}>
                <style jsx global>{`
                .nav, .footer {
                    display: none;
                }
                
            `}</style>
                <FullLayout>
                    <Grid container spacing={0}>
                        <Grid item xs={12} lg={12}>
                            <ProductPerfomance />
                        </Grid>
                    </Grid>
                </FullLayout>
            </ThemeProvider>
        </>
    )
}

export default Products