import { Button, Link, List, ListItem, TextField, Typography } from '@material-ui/core'
import React from 'react'
import Layout from '../components/Layout'
import useStyles from '../utils/styles'
import NextLink from 'next/link'
import axios from 'axios'
import { Store } from '../utils/Store'
import { useRouter } from 'next/router'
import Cookies from 'js-cookie'


export default function Register() {
    const router = useRouter();
    const { redirect } = router.query;
    const { state, dispatch } = React.useContext(Store);
    const { userInfo } = state;
    React.useEffect(() => {
        if (userInfo) {
            router.push('/');
        }
    }, []);
    const [name, setName] = React.useState('');
    const [email, setEmail] = React.useState('');
    const [password, setPassword] = React.useState('');
    const [confirmpassword, setConfirmPassword] = React.useState('');
    const classes = useStyles();
    const submitHandler = async (e) => {
        e.preventDefault();
        if (password !== confirmpassword) {
            alert('passwords dont match')
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
            alert(err.response.data ? err.response.data.message : err.message);
        }
    }
    return (
        <Layout title="Login">
            <form onSubmit={submitHandler} className={classes.form}>
                <Typography component="h1" variant="h1">
                    Register
                </Typography>
                <List>
                    <ListItem>
                        <TextField variant="outlined" onChange={(e) => setName(e.target.value)} fullWidth id="name" label="Name" inputProps={{ type: 'text' }} />
                    </ListItem>
                    <ListItem>
                        <TextField variant="outlined" onChange={(e) => setEmail(e.target.value)} fullWidth id="email" label="Email" inputProps={{ type: 'email' }} />
                    </ListItem>
                    <ListItem>
                        <TextField variant="outlined" onChange={(e) => setPassword(e.target.value)} fullWidth id="password" label="Password" inputProps={{ type: 'password' }} />
                    </ListItem>
                    <ListItem>
                        <TextField variant="outlined" onChange={(e) => setConfirmPassword(e.target.value)} fullWidth id="confirmPassword" label="Confirm Password" inputProps={{ type: 'password' }} />
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
