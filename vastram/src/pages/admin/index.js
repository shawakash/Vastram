import { Grid } from "@mui/material";
import BlogCard from "../../../template/src/components/dashboard/BlogCard";
import SalesOverview from "../../../template/src/components/dashboard/SalesOverview";
import DailyActivity from "../../../template/src/components/dashboard/DailyActivity";
import ProductPerfomance from "../../../template/src/components/dashboard/ProductPerfomance";

export default function Index() {
    return (
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
    );
}
