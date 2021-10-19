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
import { getError } from '../utils/error'


export default function Register() {
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
    const submitHandler = async ({name, email, password, confirmPassword}) => {
        closeSnackbar();
        if (password !== confirmPassword) {
            enqueueSnackbar('Passwords dont match', {variant: 'error',})
            return;
        }
        try {
            const { data } = await axios.post('/api/users/register', {
                name,
                email,
                password,
            });
            dispatch({ type: 'USER_LOGIN', payload: data });
            Cookies.set('userInfo', data);
            router.push(redirect || "/");
        }
        catch (err) {
            enqueueSnackbar(getError(err), {variant: 'error',});
        }
    }
    return (
        <Layout title="Register">
            <form onSubmit={handleSubmit(submitHandler)} className={classes.form}>
                <Typography component="h1" variant="h1">
                    Register
                </Typography>
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
                        <Controller control={control} defaultValue="" rules={{ required: true, minLength: 6, }} name="password" render={({ field }) => (
                            <TextField variant="outlined" fullWidth id="password" label="Password" error={Boolean(errors.password)} helperText={errors.password ? errors.password.type === 'minLength' ? "Password should be atleast 6 characters" : "Password is required" : ''} inputProps={{ type: 'password' }} {...field} />
                        )} />
                    </ListItem>
                    <ListItem>
                        <Controller control={control} defaultValue="" rules={{ required: true, minLength: 6, }} name="confirmPassword" render={({ field }) => (
                            <TextField variant="outlined" fullWidth id="confirmPassword" label="Confirm Password" error={Boolean(errors.confirmPassword)} helperText={errors.confirmPassword ? errors.confirmPassword.type === 'minLength' ? "Confirm Password should be atleast 6 characters" : "Confirm Password is required" : ''} inputProps={{ type: 'password' }} {...field} />
                        )} />
                    </ListItem>
                    <ListItem>
                        <Button color="primary" fullWidth variant="contained" type="submit">Register</Button>
                    </ListItem>
                    <ListItem>
                        Already have an account? &nbsp; <NextLink href={`/login?redirect=${redirect || '/'}`} passHref><Link>Login</Link></NextLink>
                    </ListItem>
                </List>
            </form>
        </Layout>
    )
}
