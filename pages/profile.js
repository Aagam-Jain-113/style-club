import { Button, Card, Grid, List, ListItem, ListItemText, TextField, Typography } from '@material-ui/core'
import axios from 'axios'
import dynamic from 'next/dynamic'
import { useRouter } from 'next/router'
import React from 'react'
import Layout from '../components/Layout'
import { getError } from '../utils/error'
import { Store } from '../utils/Store'
import useStyles from '../utils/styles'
import NextLink from 'next/link'
import { Controller, useForm } from 'react-hook-form'
import { useSnackbar } from 'notistack'
import Cookies from 'js-cookie'

function Profile() {

    const { handleSubmit, control, formState: { errors }, setValue } = useForm();
    const { enqueueSnackbar, closeSnackbar } = useSnackbar();
    const classes = useStyles();
    const router = useRouter();
    const { state, dispatch } = React.useContext(Store);
    const { userInfo } = state

    React.useEffect(() => {
        if (!userInfo) {
            router.push('/login');
        }
        setValue('name', userInfo.name);
        setValue('email', userInfo.email);
    }, [])

    const submitHandler = async ({ name, email, password, confirmPassword }) => {
        closeSnackbar();
        if (password !== confirmPassword) {
            enqueueSnackbar('Passwords dont match', { variant: 'error', })
            return;
        }
        try {
            const { data } = await axios.put('/api/users/profile', {
                name,
                email,
                password,
            },
            { headers: { authorization: `Bearer ${userInfo.token}` } }
            );
            dispatch({ type: 'USER_LOGIN', payload: data });
            Cookies.set('userInfo', data);
            enqueueSnackbar('Profile Updated successfully', { variant: 'success' });
        }
        catch (err) {
            enqueueSnackbar(getError(err), { variant: 'error' });
        }
    }

    return (
        <Layout title="Profile" >
            <Grid container spacing={3}>
                <Grid item md={3} xs={12}>
                    <Card className={classes.section}>
                        <List>
                            <NextLink href="/profile" passHref>
                                <ListItem selected button component="a">
                                    <ListItemText primary="User Profile"></ListItemText>
                                </ListItem>
                            </NextLink>
                            <NextLink href="/order-history" passHref>
                                <ListItem button component="a">
                                    <ListItemText primary="Order History"></ListItemText>
                                </ListItem>
                            </NextLink>
                        </List>
                    </Card>
                </Grid>
                <Grid item md={9} xs={12}>
                    <Card className={classes.section}>
                        <List>
                            <ListItem>
                                <Typography component="h1" variant="h1">Profile</Typography>
                            </ListItem>
                            <ListItem>
                                <form onSubmit={handleSubmit(submitHandler)} className={classes.form}>
                                    <List>
                                        <ListItem>
                                            <Controller control={control} defaultValue="" rules={{ required: true, minLength: 2 }} name="name" render={({ field }) => (
                                                <TextField variant="outlined" fullWidth id="name" label="Name" error={Boolean(errors.name)} helperText={errors.name ? errors.name.type === 'minLength' ? "Name length must be more than 2" : "Name is required" : ''} inputProps={{ type: 'text' }} {...field} />
                                            )} />
                                        </ListItem>
                                        <ListItem>
                                            <Controller control={control} defaultValue="" rules={{ required: true, pattern: /^[a-z0-9._%+-]+@[a-z0-9.-]+\.[a-z]{2,4}$/, }} name="email" render={({ field }) => (
                                                <TextField variant="outlined" fullWidth id="email" label="Email" error={Boolean(errors.email)} helperText={errors.email ? errors.email.type === 'pattern' ? "Email is not valid" : "Email is required" : ''} inputProps={{ type: 'email' }} {...field} />
                                            )} />
                                        </ListItem>
                                        <ListItem>
                                            <Controller control={control} defaultValue="" rules={{ vaildate: (value) => (value === '' || value.length > 5 || 'Password length is more than 5') }} name="password" render={({ field }) => (
                                                <TextField variant="outlined" fullWidth id="password" label="Password" error={Boolean(errors.password)} helperText={errors.password ? "Password length should be more than 5" : ''} inputProps={{ type: 'password' }} {...field} />
                                            )} />
                                        </ListItem>
                                        <ListItem>
                                            <Controller control={control} defaultValue="" rules={{ vaildate: (value) => (value === '' || value.length > 5 || 'Confirm Password length is more than 5') }} name="confirmPassword" render={({ field }) => (
                                                <TextField variant="outlined" fullWidth id="confirmPassword" label="Confirm Password" error={Boolean(errors.confirmPassword)} helperText={errors.password ? "Confirm Password length should be more than 5" : ''} inputProps={{ type: 'password' }} {...field} />
                                            )} />
                                        </ListItem>
                                        <ListItem>
                                            <Button color="primary" fullWidth variant="contained" type="submit">Update</Button>
                                        </ListItem>
                                    </List>
                                </form>
                            </ListItem>
                        </List>
                    </Card>
                </Grid>
            </Grid>
        </Layout>
    )
}

export default dynamic(() => Promise.resolve(Profile), { ssr: false })