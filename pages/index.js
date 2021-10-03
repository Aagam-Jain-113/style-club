import { Card, CardActionArea, CardActions, CardContent, CardMedia, Grid, Typography, Button } from '@material-ui/core';
import Layout from '../components/Layout'
import data from '../utils/Data'
import NextLink from 'next/link'

export default function Home() {
  return (
    <Layout>
      <div>
        <h1 className="text-3xl">Style Club</h1>
        <Grid container spacing={3}>
          {data.products.map((product) => {
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
                    <Button size="small" color="primary">Add to Cart</Button>
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
