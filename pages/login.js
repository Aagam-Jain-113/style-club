import { Button, Link, List, ListItem, TextField, Typography } from '@material-ui/core'
import React from 'react'
import Layout from '../components/Layout'
import useStyles from '../utils/styles'
import NextLink from 'next/link'
import axios from 'axios'
import { Store } from '../utils/Store'
import { useRouter } from 'next/router'
import Cookies from 'js-cookie'
import { Controller, useForm } from 'react-hook-form'
import { useSnackbar } from 'notistack'

export default function Login() {
    const { handleSubmit, control, formState: { errors } } = useForm();
    const { enqueueSnackbar, closeSnackbar } = useSnackbar();
    const router = useRouter();
    const { redirect } = router.query;
    const { state, dispatch } = React.useContext(Store);
    const { userInfo } = state;
    React.useEffect(() => {
        if (userInfo) {
            router.push('/');
        }
    }, []);

    const classes = useStyles();
    const submitHandler = async ({ email, password }) => {
        closeSnackbar();
        try {
            const { data } = await axios.post('/api/users/login', {
                email,
                password,
            });
            dispatch({ type: 'USER_LOGIN', payload: data });
            Cookies.set('userInfo', data);
            router.push(redirect || "/");
        }
        catch (err) {
            enqueueSnackbar(err.response.data ? err.response.data.message : err.message, { variant: 'error' });
        }
    }
    return (
        <Layout title="Login">
            <form onSubmit={handleSubmit(submitHandler)} className={classes.form}>
                <Typography component="h1" variant="h1">
                    Login
                </Typography>
                <List>
                    <ListItem>
                        <Controller control={control} defaultValue="" rules={{ required: true, pattern: /^[a-z0-9._%+-]+@[a-z0-9.-]+\.[a-z]{2,4}$/, }} name="email" render={({ field }) => (
                            <TextField variant="outlined" fullWidth id="email" label="Email" error={Boolean(errors.email)} helperText={errors.email ? errors.email.type === 'pattern' ? "Email is not valid" : "Email is required" : ''} inputProps={{ type: 'email' }} {...field} />
                        )} />
                    </ListItem>
                    <ListItem>
                        <Controller control={control} defaultValue="" rules={{ required: true, minLength: 6, }} name="password" render={({ field }) => (
                            <TextField variant="outlined" fullWidth id="password" label="Password" error={Boolean(errors.password)} helperText={errors.password ? errors.password.type === 'minLength' ? "Password should be atleast 6 characters" : "Password is required" : ''} inputProps={{ type: 'password' }} {...field} />
                        )} />
                    </ListItem>
                    <ListItem>
                        <Button color="primary" fullWidth variant="contained" type="submit">Login</Button>
                    </ListItem>
                    <ListItem>
                        Dont have an account? &nbsp; <NextLink href={`/register?redirect=${redirect || '/'}`} passHref><Link>Register</Link></NextLink>
                    </ListItem>
                </List>
            </form>
        </Layout>
    )
}
