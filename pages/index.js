import { Card, CardActionArea, CardActions, CardContent, CardMedia, Grid, Typography, Button } from '@material-ui/core';
import Layout from '../components/Layout'
import NextLink from 'next/link'
import db from '../utils/db'
import Product from '../models/Product';

export default function Home(props) {
  const {products} = props;
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
                    <Typography> ${product.price} </Typography>
                    <Button size="small" color="primary" className="text-white">Add to Cart</Button>
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

export async function getServerSideProps(){
  await db.connect();
  const products = await Product.find({}).lean();
  await db.disconnect();
  return{
    props: {
      products: products.map(db.convertDocToObj),
    }
    
  }
}