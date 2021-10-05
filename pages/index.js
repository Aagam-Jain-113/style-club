import React from 'react'
import { Card, CardActionArea, CardActions, CardContent, CardMedia, Grid, Typography, Button } from '@material-ui/core';
import Layout from '../components/Layout'
import NextLink from 'next/link'
import db from '../utils/db'
import Product from '../models/Product';
import { useRouter } from 'next/router';
import { Store } from '../utils/Store';
import axios from 'axios';

export default function Home(props) {
  const router = useRouter();
  const { state, dispatch } = React.useContext(Store);
  const { products } = props;
  const addToCartHandler = async (product) => {
    const existItem = state.cart.cartItems.find(x=>x._id === product._id);
    const quantity = existItem ? existItem.quantity + 1 : 1;
    const { data } = await axios.get(`/api/products/${product._id}`);
    if(data.countInStock < quantity){
      window.alert('Sorry. Product is out of stock');
      return;
    }
    dispatch({ type: 'CART_ADD_ITEM', payload: { ...product, quantity } })
    router.push('/cart')
  }
  return (
    <Layout>
      <div className="my-10">
        <Grid container spacing={3}>
          {products.map((product) => {
            return (
              <Grid item md={4} key={product.name}>
                <Card>
                  <NextLink href={`/product/${product.slug}`} passHref>
                    <CardActionArea>
                      <div className="overflow-hidden">
                        <CardMedia className="overflow-hidden duration-300 transform hover:scale-125" component="img" image={product.image} title={product.name}></CardMedia>
                      </div>
                      <CardContent>
                        <Typography>
                          {product.name}
                        </Typography>
                      </CardContent>
                    </CardActionArea>
                  </NextLink>
                  <CardActions>
                    <Typography> ₹{product.price} </Typography>
                    <Button size="small" color="primary" className="text-white" onClick={() => addToCartHandler(product)}>Add to Cart</Button>
                  </CardActions>
                </Card>
              </Grid>
            )
          })}
        </Grid>
      </div>
    </Layout>
  )
}

export async function getServerSideProps() {
  await db.connect();
  const products = await Product.find({}).lean();
  await db.disconnect();
  return{
    props: {
      products: products.map(db.convertDocToObj),
    }
    
  }
}