import { Card, CardActionArea, CardActions, CardContent, CardMedia, Grid, Typography, Button } from '@material-ui/core';
import Layout from '../components/Layout'
import data from '../utils/Data';

export default function Home() {
  return (
    <Layout>
      <div>
        <h1 className="text-3xl">Style Club</h1>
        <Grid container spacing={3}>
          {data.products.map((product) => {
            return(
            <Grid item md={4} key={product.name}>
              <Card>
                <CardActionArea>
                  <CardMedia component="img" image={product.image} title={product.name}></CardMedia>
                  <CardContent>
                    <Typography>
                      {product.name}
                    </Typography>
                  </CardContent>
                </CardActionArea>
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
