import { Button, Card, CircularProgress, Grid, List, ListItem, ListItemText, Table, TableBody, TableCell, TableContainer, TableHead, TableRow, Typography } from '@material-ui/core'
import axios from 'axios'
import dynamic from 'next/dynamic'
import { useRouter } from 'next/router'
import React, { useReducer } from 'react'
import Layout from '../components/Layout'
import { getError } from '../utils/error'
import { Store } from '../utils/Store'
import useStyles from '../utils/styles'
import NextLink from 'next/link'


function reducer(state, action) {
    switch (action.type) {
        case 'FETCH_REQUEST':
            return { ...state, loading: true, error: '' }
        case 'FETCH_SUCCESS':
            return { ...state, loading: false, orders: action.payload, error: '' }
        case 'FETCH_FAIL':
            return { ...state, loading: false, error: action.payload }
        default:
            return { ...state, loading: false }
    }
}


function OrderHistory() {

    const classes = useStyles();
    const router = useRouter();
    const { state } = React.useContext(Store);
    const { userInfo } = state
    const [{ loading, error, orders }, dispatch] = useReducer(reducer, { loading: true, orders: [], error: '' })
    React.useEffect(() => {
        if (!userInfo) {
            router.push('/login');
        }
        const fetchOrders = async () => {
            try {
                dispatch({ type: 'FETCH_REQUEST' });
                const { data } = await axios.get(`/api/orders/history`, {
                    headers: {
                        authorization: `Bearer ${userInfo.token}`
                    }
                })
                dispatch({ type: "FETCH_SUCCESS", payload: data })
            } catch (err) {
                dispatch({ type: "FETCH_FAIL", payload: getError(err) })
            }
        }
        fetchOrders();
    }, [])
    return (
        <Layout title="Order History" >
            <Grid container spacing={3}>
                <Grid item md={3} xs={12}>
                    <Card className={classes.section}>
                        <List>
                            <NextLink href="/profile" passHref>
                                <ListItem button component="a">
                                    <ListItemText primary="User Profile"></ListItemText>
                                </ListItem>
                            </NextLink>
                            <NextLink href="/order-history" passHref>
                                <ListItem selected button component="a">
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
                                <Typography component="h1" variant="h1">Order History</Typography>
                            </ListItem>
                            <ListItem>
                            {loading ? (<CircularProgress />) : error ? <Typography className={classes.error}>{error}</Typography> : (
                                <TableContainer>
                                    <Table>
                                        <TableHead>
                                            <TableRow>
                                                <TableCell>ID</TableCell>
                                                <TableCell>DATE</TableCell>
                                                <TableCell>TOTAL</TableCell>
                                                <TableCell>DELIVERED</TableCell>
                                                <TableCell>ACTION</TableCell>
                                            </TableRow>
                                        </TableHead>
                                        <TableBody>
                                            {orders.map((order)=>(
                                                <TableRow key={order._id}>
                                                    <TableCell>{order._id.substring(20,24)}</TableCell>
                                                    <TableCell>{order.createdAt}</TableCell>
                                                    <TableCell>₹{order.totalPrice}</TableCell>
                                                    <TableCell>{order.isPaid ? `paid at ${order.paidAt}` : "Not paid"}</TableCell>
                                                    <TableCell>{order.isDelivered ? `paid at ${order.deliveredAt}` : "Not delivered"}</TableCell>
                                                    <TableCell><NextLink href={`/order/${order._id}`}><Button variant="contained">Details</Button></NextLink></TableCell>
                                                </TableRow>

                                            ))}
                                        </TableBody>
                                    </Table>
                                </TableContainer>

                            )}
                            </ListItem>
                        </List>
                    </Card>
                </Grid>
            </Grid>
        </Layout>
    )
}

export default dynamic(() => Promise.resolve(OrderHistory), { ssr: false })