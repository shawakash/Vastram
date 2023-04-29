import { Grid } from "@mui/material";
import BlogCard from "../../../template/src/components/dashboard/BlogCard";
import SalesOverview from "../../../template/src/components/dashboard/SalesOverview";
import DailyActivity from "../../../template/src/components/dashboard/DailyActivity";
import ProductPerfomance from "../../../template/src/components/dashboard/ProductPerfomance";
import Head from "next/head";
import { ThemeProvider } from "@mui/material/styles";
import theme from "../../../template/src/theme/theme";
import FullLayout from "../../../template/src/layouts/FullLayout";

export default function Index() {
    return (
        <>
            <Head>
                <title>Admin   |   Vastram</title>
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
                            <SalesOverview />
                        </Grid>
                        {/* ------------------------- row 1 ------------------------- */}
                        <Grid item xs={12} lg={4}>
                            <DailyActivity />
                        </Grid>
                        <Grid item xs={12} lg={8}>
                            <ProductPerfomance />
                        </Grid>
                        <Grid item xs={12} lg={12}>
                            <BlogCard />
                        </Grid>
                    </Grid>
                </FullLayout>
            </ThemeProvider>
        </>
    );
}
