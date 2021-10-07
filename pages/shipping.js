import { Button, Link, List, ListItem, TextField, Typography } from '@material-ui/core'
import React from 'react'
import Layout from '../components/Layout'
import useStyles from '../utils/styles'
import NextLink from 'next/link'
import { Store } from '../utils/Store'
import { useRouter } from 'next/router'
import Cookies from 'js-cookie'
import { Controller, useForm } from 'react-hook-form'
import CheckoutWizard from '../components/CheckoutWizard'


export default function Shipping() {
    const { handleSubmit, control, formState: { errors }, setValue } = useForm();
    const router = useRouter();
    const { redirect } = router.query;
    const { state, dispatch } = React.useContext(Store);
    const { userInfo, cart: {shippingAddress} } = state;
    React.useEffect(() => {
        if (!userInfo) {
            router.push('/login?redirect=/shipping');
        }
        setValue('fullName', shippingAddress.fullName);
        setValue('address', shippingAddress.address);
        setValue('city', shippingAddress.city);
        setValue('phoneNumber', shippingAddress.phoneNumber);
    }, []);
    const classes = useStyles();
    const submitHandler = ({fullName, address, city, phoneNumber}) => {
            dispatch({ type: 'SAVE_DELIVERY_ADDRESS', payload: {fullName, address, city, phoneNumber} });
            Cookies.set('shippingAddress', {fullName, address, city, phoneNumber});
            router.push('/payment');
    }
    return (
        <Layout title="Delivery Address">
            <CheckoutWizard activeStep={1} />
            <form onSubmit={handleSubmit(submitHandler)} className={classes.form}>
                <Typography component="h1" variant="h1">
                    Delivery Address
                </Typography>
                <List>
                    <ListItem>
                        <Controller control={control} defaultValue="" rules={{ required: true, minLength: 2 }} name="fullName" render={({ field }) => (
                            <TextField variant="outlined" fullWidth id="fullName" label="Full Name" error={Boolean(errors.fullName)} helperText={errors.fullName ? errors.fullName.type === 'minLength' ? "Full Name length must be more than 2" : "Full Name is required" : ''} inputProps={{ type: 'text' }} {...field} />
                        )} />
                    </ListItem>
                    <ListItem>
                        <Controller control={control} defaultValue="" rules={{ required: true, minLength: 2 }} name="address" render={({ field }) => (
                            <TextField variant="outlined" fullWidth id="address" label="Address" error={Boolean(errors.address)} helperText={errors.address ? errors.address.type === 'minLength' ? "Address length must be more than 2" : "Address is required" : ''} inputProps={{ type: 'text' }} {...field} />
                        )} />
                    </ListItem>
                    <ListItem>
                        <Controller control={control} defaultValue="" rules={{ required: true, minLength: 2 }} name="city" render={({ field }) => (
                            <TextField variant="outlined" fullWidth id="city" label="City" error={Boolean(errors.city)} helperText={errors.city ? errors.city.type === 'minLength' ? "City length must be more than 2" : "City is required" : ''} inputProps={{ type: 'text' }} {...field} />
                        )} />
                    </ListItem>
                    <ListItem>
                        <Controller control={control} defaultValue="" rules={{ required: true, minLength: 10 }} name="phoneNumber" render={({ field }) => (
                            <TextField variant="outlined" fullWidth id="phoneNumber" label="Phone Number" error={Boolean(errors.phoneNumber)} helperText={errors.phoneNumber ? errors.phoneNumber.type === 'minLength' ? "Phone Number must be 10 digits" : "Phone Number is required" : ''} inputProps={{ type: 'text' }} {...field} />
                        )} />
                    </ListItem>
                    <ListItem>
                        <Button color="primary" fullWidth variant="contained" type="submit">Continue</Button>
                    </ListItem>
                </List>
            </form>
        </Layout>
    )
}
