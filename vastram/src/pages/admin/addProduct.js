import React, { useRef, useState } from 'react'
import FullLayout from '../../../template/src/layouts/FullLayout'
import { ThemeProvider } from '@emotion/react'
import Head from 'next/head'
import theme from '../../../template/src/theme/theme'
import {
    Grid,
    Stack,
    TextField,
    Checkbox,
    FormGroup,
    FormControlLabel,
    RadioGroup,
    Radio,
    FormLabel,
    FormControl,
    Button,
} from "@mui/material";
import BaseCard from "../../../template/src/components/baseCard/BaseCard";
import { Toaster, toast } from 'react-hot-toast'

const AddProducts = () => {
    const [title, setTitle] = useState('');
    const [slug, setSlug] = useState('');
    const [cat, setCat] = useState('');
    const [desc, setDesc] = useState('');
    const [price, setPrice] = useState('');
    const [color, setColor] = useState('');
    const [qty, setQty] = useState('');
    const [size, setSize] = useState('');
    const handleChange = (e) => {
        if(e.target.name == 'title') {
            setTitle(e.target.value);
        }
        if(e.target.name == 'slug') {
            setSlug(e.target.value);
        }
        if(e.target.name == 'desc') {
            setDesc(e.target.value);
        }
        if(e.target.name == 'cat') {
            setCat(e.target.value);
        }
        if(e.target.name == 'price') {
            setPrice(e.target.value);
        }
        if(e.target.name == 'color') {
            setColor(e.target.value);
        }
        if(e.target.name == 'qty') {
            setQty(e.target.value);
        }
        if(e.target.name == 'size') {
            setSize(e.target.value);
        }
    }
    const handleSubmit = async (e) => {
        e.preventDefault();
        const data = {
            title: title,
                slug: slug,
                desc: desc,
                category: cat,
                size: size,
                color: color,
                price: price,
                availqty: qty
        }
        const response = await fetch(`${process.env.NEXT_PUBLIC_BASEURL}/api/addProduct`, {
            method: 'POST',
            body: JSON.stringify(data)
        });
        const resData = await response.json();
        if(resData.status == 'error') {
            toast.error(resData.message)
        } else {
            toast.success(`${resData.result.slug} Added`);
        }
    }
    return (
        <>
            <Head>
                <title>Add Products   |   Vastram</title>
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
                            <BaseCard title="Product Details">
                                <form onSubmit={handleSubmit} className="">
                                    <Stack spacing={3}>
                                        <TextField
                                            name="title"
                                            label="Product Name"
                                            variant="outlined"
                                            value={title && title}
                                            onChange={handleChange}
                                        />
                                        <TextField
                                            name="slug"
                                            label="Slug"
                                            variant="outlined"
                                            value={slug && slug}
                                            onChange={handleChange}
                                        />
                                        <TextField
                                            name="price"
                                            label="Item Price"
                                            variant="outlined"
                                            value={price && price}
                                            type='number'
                                            onChange={handleChange}
                                        />
                                        <TextField
                                            name="cat"
                                            label="Category"
                                            variant="outlined"
                                            value={cat && cat}
                                            onChange={handleChange}
                                        />
                                        <TextField
                                            id="outlined-multiline-static"
                                            name='desc'
                                            label="Description"
                                            multiline
                                            rows={4}
                                            placeholder="Say Features Of Your Product"
                                            value={desc && desc}
                                            onChange={handleChange}
                                        />
                                        <TextField
                                            name="color"
                                            label="Color"
                                            variant="outlined"
                                            value={color && color}
                                            onChange={handleChange}
                                        />

                                        <FormControl>
                                            <FormLabel id="demo-radio-buttons-group-label">Size</FormLabel>
                                            <RadioGroup
                                                aria-labelledby="demo-radio-buttons-group-label"
                                                defaultValue="S"
                                                name="size"
                                                onChange={handleChange}
                                                value={size && size}
                                                className='flex flex-col gap-y-8'
                                            >
                                                <div className="flex gap-x-5">
                                                    <FormControlLabel
                                                        value="S"
                                                        control={<Radio />}
                                                        label="Small"

                                                    />

                                                    <FormControlLabel
                                                        value="M"
                                                        control={<Radio />}
                                                        label="Medium"

                                                    />

                                                    <FormControlLabel
                                                        value="L"
                                                        control={<Radio />}
                                                        label="Large"

                                                    />


                                                    <FormControlLabel
                                                        value="XL"
                                                        control={<Radio />}
                                                        label="XLarge"

                                                    />

                                                    <FormControlLabel
                                                        value="XXL"
                                                        control={<Radio />}
                                                        label="XXLarge"

                                                    />

                                                </div>
                                            </RadioGroup>
                                            <TextField
                                                name="qty"
                                                label="Quantity"
                                                variant="outlined"
                                                className='w-32'
                                                value={qty && qty}
                                                type='number'
                                                onChange={handleChange}
                                            />
                                        </FormControl>
                                    </Stack>
                                    <br />
                                    <button type='submit' className="">Submit</button>
                                </form>
                            </BaseCard>
                        </Grid>
                    </Grid>
                </FullLayout>
                <Toaster />
            </ThemeProvider>
        </>
    )
}

export default AddProducts