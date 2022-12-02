import React from 'react'
import HomeMenu from '../shared/HomeMenu'
import './home.css'
import Button from '@mui/material/Button'
import { Link } from 'react-router-dom'
import Grid from '@mui/material/Grid'
import Card from '@mui/material/Card';
import CardActions from '@mui/material/CardActions';
import CardContent from '@mui/material/CardContent';
import CardMedia from '@mui/material/CardMedia';
import Typography from '@mui/material/Typography';
import tree from './tree.jpg'
import road from './road.jpg'
import wine from './wine.jpg'

//This card is for the tree information on the landing page
function TreeCard() {
  return (
    <Card sx={{ maxWidth: 345 }}>
      <CardMedia component="img" height="140" image={tree} alt="tree" />
      <CardContent>
        <Typography gutterBottom variant="h5" component="div">
          Reducing air pollution 
        </Typography>
        <Typography variant="body2" color="text.secondary">
        Transportation is one of the largest sources of air pollution in Canada. 
        The combustion of fossil fuels to power vehicles
        has major impacts on the environment and health of Canadians.
        </Typography>
      </CardContent>
      <Button 
        size="small" 
        href='https://www.canada.ca/en/environment-climate-change/services/air-pollution/sources/transportation.html'
        rel='noopener'
        target='_blank'
        >Learn More
      </Button>
    </Card>
  );
}

//This card is for the road information on the landing page
function RoadCard() {
  return (
    <Card sx={{ maxWidth: 345 }} >
      <CardMedia component="img" height="140" image={road} alt="road" />
      <CardContent>
        <Typography gutterBottom variant="h5" component="div">
          Best road trips in Canada 
        </Typography>
        <Typography variant="body2" color="text.secondary">
        At 9.8 million square kilometres, Canada is the world’s second largest country. 
        Which means the best way to see all of it is to hop in a car and drive.
        </Typography>
      </CardContent>
      <CardActions>
        <Button 
        size="small" 
        href='https://travel.destinationcanada.com/things-to-do/best-road-trips-in-canada'
        rel='noopener'
        target='_blank'
        >Learn More</Button>
      </CardActions>
    </Card>
  );
}

//This card is for the wine information on the landing page
function WineCard() {
  return (
    <Card sx={{ maxWidth: 345 }} >
      <CardMedia component="img" height="140" image={wine} alt="wine" />
      <CardContent>
        <Typography gutterBottom variant="h5" component="div">
          Impaired driving in Canada 
        </Typography>
        <Typography variant="body2" color="text.secondary">
        Driving under the influence of alcohol is dangerous and illegal. 
        Know what counts as impaired driving and the penalties you could face for it 
        before you get behind the wheel.
        </Typography>
      </CardContent>
      <CardActions>
        <Button 
        size="small" 
        href='https://www.justice.gc.ca/eng/cj-jp/sidl-rlcfa/'
        rel='noopener'
        target='_blank'
        >Learn More</Button>
      </CardActions>
    </Card>
  );
}

//Organize the data that is shown on the home page
const Home = () => {
  return (
    <div>
      <HomeMenu/>
      <div className="homeBackgroundColor">
        <div className="homePageText">
          <h2 className="welcomeText">Welcome to Carlord!</h2>
          <p className="searchText">Click below to rent the car of your choice</p>
          <Grid xs={12} className="contactRedirect">
            <div>
              <Button component = {Link} to= './carlisting' variant='outlined'>
                Get Started
              </Button>
            </div>
          </Grid>
        </div>
        <Grid className="cards">
          <TreeCard />
          <RoadCard />
          <WineCard />
        </Grid>
      </div>
    </div>
  )
}

export default Home