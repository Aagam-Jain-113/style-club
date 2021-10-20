import { Button, FormControl, FormControlLabel, List, ListItem, Radio, RadioGroup, Typography } from '@material-ui/core';
import Cookies from 'js-cookie';
import { useRouter } from 'next/router'
import { useSnackbar } from 'notistack';
import React from 'react'
import CheckoutWizard from '../components/CheckoutWizard';
import Layout from '../components/Layout';
import { Store } from '../utils/Store';
import useStyles from '../utils/styles';

export default function Payment() {
    const classes = useStyles();
    const {enqueueSnackbar,closeSnackbar} = useSnackbar();
    const submitHandler = (e)=>{
        closeSnackbar();
        e.preventDefault();
        if(!paymentMethod){
            enqueueSnackbar('Payment method is required', {variant: 'error'});
        }else{
            dispatch({type: "SAVE_PAYMENT_METHOD", payload: JSON.stringify(paymentMethod)})
            Cookies.set('paymentMethod',  JSON.stringify(paymentMethod));
            router.push("/placeorder");
        }
    }
    const router = useRouter();
    const [ paymentMethod, setPaymentMethod ] = React.useState('');
    const { state, dispatch } = React.useContext(Store);
    const { cart: { shippingAddress }, } = state;
    React.useEffect(() => {
        if (!shippingAddress.address) {
            router.push("/shipping")
        } else {
            setPaymentMethod(Cookies.get("paymentMethod") || "");
        }
    }, [])
    return (
        <Layout title="Payment Method">
            <CheckoutWizard activeStep={2} />
            <form className={classes.form} onSubmit={submitHandler}>
                <Typography component="h1" variant="h1">Payment Method</Typography>
                <List>
                    <ListItem>
                        <FormControl component="fieldset">
                            <RadioGroup aria-label="Payment method" name="paymentMethod" value={paymentMethod} onChange={(e)=> setPaymentMethod(e.target.value) }>
                                <FormControlLabel label="UPI" value="UPI" control={<Radio />} />
                                <FormControlLabel label="Cash" value="Cash" control={<Radio />} />
                                <FormControlLabel label="Credit/Debit card" value="cards" control={<Radio />} />
                            </RadioGroup>
                        </FormControl>
                    </ListItem>
                    <ListItem>
                        <Button fullWidth type="submit" variant="contained" color="primary">Continue</Button>
                    </ListItem>
                    <ListItem>
                        <Button fullWidth type="button" variant="contained" onClick={()=>router.push("/shipping")}>Back</Button>
                    </ListItem>
                </List>
            </form>
        </Layout>
    )
}
