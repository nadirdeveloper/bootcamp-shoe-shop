import React from "react";
import {
  BrowserRouter as Router,
  Routes,
  Route,
  Link,
  Outlet,
  useParams
} from "react-router-dom";
import img1 from './images/banner.jpg';
import { makeStyles } from '@material-ui/core/styles';
import AppBar from '@material-ui/core/AppBar';
import Toolbar from '@material-ui/core/Toolbar';
import Typography from '@material-ui/core/Typography';
import Button from '@material-ui/core/Button';
import { AddShoppingCart } from '@material-ui/icons'
const useStyles = makeStyles((theme) => ({
  root: {
    flexGrow: 1,
  },
  menuButton: {
    marginRight: theme.spacing(2),
  },
  title: {
    flexGrow: 1,
    textAlign: "center"
  },
  mainHeader: {
    height: "100%",
    width: "100%",
  },
  mainContainer:{
    display:"flex",
    flexDirection:"row",
    flexWrap:"wrap",
    alignItems:"center",
    justifyItems:"center"
  }
    ,
  card:{
    height:"500px",
    width:"400px",
    margin:"50px",
    border:"1px solid black",
    boxShadow:"10px 10px 8px 10px #6665"
  },
  imgContainer:{
    height:300,
    width:"100%",
    overflow:"hidden",
  },
  cardImage:{
    height:"350px",
    width:"100%"
  },
  cardContent:{
    textAlign:"center",
  },
  cardName:{

  },
  cardPrice:{

  },
  fullImageCont:{
    textAlign:"center"
  }
}));
export default function App() {
  const classes = useStyles();
  return (
    <Router>
      <div className={classes.root}>
        <AppBar position="static">
          <Toolbar>
            <Typography variant="h6" className={classes.title}>
              <Link to="/">
              <AddShoppingCart /> Shoe Shop
            </Link>
          </Typography>
            <Link to="/" >
              <Button color="inherit">Home</Button>
            </Link>
            <Link to="products">
              <Button color="inherit">New Products</Button>
            </Link>
          </Toolbar>
        </AppBar>
      </div>

      <Routes>
        <Route path="/" element={<Home />} />
        <Route path="products" element={<Launch />}>
          <Route path="/" element={<LaunchIndex />} />
          <Route path=":slug" element={<LaunchShoe />} />
          <Route path="/new/:slug" element={<LaunchProduct />} />
        </Route>
        <Route path="*" element={<NotFound />} />
      </Routes>
    </Router>
  );
}

function NotFound() {
  const classes = useStyles();
  return (
    <div>
      <h1 className={classes.title}>Not found!</h1>
      <p className={classes.title}>Sorry your page was not found!</p>
    </div>
  );
}

function Home() {
  const classes = useStyles();
  return (
    <div>
      <img src={img1} alt="" className={classes.mainHeader} />
      <h1 className={classes.title}>Welcome To Our Shoe Shop !</h1>
      <div className={classes.mainContainer}>
      {Object.entries(shoes).map(([slug, { name, img, price }]) => (
        <div className={classes.card}>
          <div className={classes.imgContainer}>
            <img className={classes.cardImage} src={img} alt={name} />
          </div>
          <div className={classes.cardContent}>
            <h2 className={classes.cardName}>{name}</h2>
            <h2 className={classes.cardPrice}>$ {price}</h2>
            <Link to={"/products/"+slug}><Button variant="contained" style={{marginBottom:"20px"}} color="primary">Learn More</Button></Link> 
          </div>
        </div>
      ))}
      </div>
     
    </div>
  );
}

function Launch() {
  const classes = useStyles();
  return (
    <div>
      <h1 className={classes.title}>Product Name</h1>
      <Outlet />
    </div>
  );
}

function LaunchIndex() {
  const classes = useStyles();
  return (
    <div className={classes.mainContainer}>
      {Object.entries(newShoes).map(([slug, { name, img,price }]) => (
       <div className={classes.card}>
       <div className={classes.imgContainer}>
         <img className={classes.cardImage} src={img} alt={name} />
       </div>
       <div className={classes.cardContent}>
         <h2 className={classes.cardName}>{name}</h2>
         <h2 className={classes.cardPrice}>$ {price}</h2>
         <Link to={"/products/new/"+slug}><Button variant="contained" style={{marginBottom:"20px"}} color="primary">Learn More</Button></Link> 
       </div>
     </div>
      ))}
    </div>
  );
}

function LaunchShoe() {
  const classes = useStyles();
  const { slug } = useParams();
  const shoe = shoes[slug];

  if (!shoe) {
    return <h2>Not Found!</h2>;
  }

  const { name, img, price } = shoe;
  return (
    <div>
      <h2 className={classes.title}>{name}</h2>
      <div className={classes.fullImageCont}>
      <img src={img} alt={name} />
      </div>
      <h2 className={classes.title}>Price:</h2>
      <h2 className={classes.title}>$ {price}</h2> 
      <div style={{textAlign:"center"}}>
      <Link to="/"><Button variant="contained" style={{marginBottom:"20px"}} color="primary">See More</Button></Link> 
      </div>
    </div>
  );
}

function LaunchProduct() {
  const classes = useStyles();
  const { slug } = useParams();
  const shoe = newShoes[slug];

  if (!shoe) {
    return <h2>Not Found!</h2>;
  }

  const { name, img, price } = shoe;
  return (
    <div>
      <h2 className={classes.title}>{name}</h2>
      <div className={classes.fullImageCont}>
      <img src={img} alt={name} />
      </div>
      <h2 className={classes.title}>Price:</h2>
      <h2 className={classes.title}> $ {price}</h2> 
      <div style={{textAlign:"center"}}>
      <Link to="/products/"><Button variant="contained" style={{marginBottom:"20px"}} color="primary">See More</Button></Link> 
      </div>
    </div>
  );
}

const shoes = {
  "air-jordan-3-valor-blue": {
    name: "VALOUR BLUE",
    img:
      "https://secure-images.nike.com/is/image/DotCom/CT8532_104_A_PREM?$SNKRS_COVER_WD$&align=0,1",
    price: 12000,
  },
  "jordan-mars-270-london": {
    name: "JORDAN MARS 270 LONDON",
    img:
      "https://secure-images.nike.com/is/image/DotCom/CV3042_001_A_PREM?$SNKRS_COVER_WD$&align=0,1",
    price: 7000,
  },
  "air-jordan-1-zoom-racer-blue": {
    name: "RACER BLUE",
    img:
      "https://secure-images.nike.com/is/image/DotCom/CK6637_104_A_PREM?$SNKRS_COVER_WD$&align=0,1",
    price: 3000,
  },
  "air-jordan-1-nike-fly-3": {
   name: "Nike Zoom Fly 3",
   img:
     "https://static.nike.com/a/images/t_PDP_1728_v1/f_auto,b_rgb:f5f5f5/c8fc9ed5-8b84-437f-a2b8-daab62e9126a/zoom-fly-3-running-shoe-9SdJdh.jpg",
   price: 20000,
 },
 "air-jordan-1-nike-air-max": {
  name: "Nike Air Max Plus",
  img:
    "https://static.nike.com/a/images/t_PDP_864_v1/f_auto,b_rgb:f5f5f5/f5ce4856-476f-40e9-be52-ac6dcbe4fb26/air-max-plus-iii-shoe-pcRszz.jpg",
  price: 50000,
},
"air-jordan-1-nike-infinity-tour": {
 name: "Nike Infinity Tour",
 img:
   "https://static.nike.com/a/images/t_PDP_864_v1/f_auto,b_rgb:f5f5f5/bd851f24-2caf-45bd-a0e6-7214a3fe4cee/air-zoom-infinity-tour-golf-shoe-4RtwvS.jpg",
 price: 70000,
}
};

const newShoes = {
  "air-jordan-3-why-not": {
    name: "Jordan 'Why Not?' Zer0.3 SE",
    img:
      "https://static.nike.com/a/images/t_PDP_864_v1/f_auto,b_rgb:f5f5f5/b182b422-5edb-448f-bc7d-36a5e50a96ef/jordan-why-not-zer03-se-basketball-shoe-6rFm1r.jpg",
    price: 72000,
  },
  "jordan-nike-max-85": {
    name: "Nike Air Max 95",
    img:
      "https://static.nike.com/a/images/t_PDP_864_v1/f_auto,b_rgb:f5f5f5/0ca46b4a-a2cd-4cba-aaff-83185a91f222/air-max-95-shoe-sdjjnj.jpg",
    price: 17000,
  },
  "air-nike-max-special-edition": {
    name: "Nike Air Max 270 Special Edition",
    img:
      "https://static.nike.com/a/images/t_PDP_864_v1/f_auto,b_rgb:f5f5f5/4fa5642c-9005-4b22-b16a-471c822cd7e9/air-max-270-special-edition-shoe-WQh9VH.jpg",
    price: 7000,
  },
  "air-jordan-1-mid": {
   name: "Air Jordan 1 Mid",
   img:
     "https://static.nike.com/a/images/t_PDP_864_v1/f_auto,b_rgb:f5f5f5/e5bfd40a-373b-4934-a9f8-90135acc0c4a/air-jordan-1-mid-shoe-RRTg1P1y.jpg",
   price: 28000,
 },
 "air-jordan-1-nike-air-max-90": {
  name: "Nike Air Max 90",
  img:
    "https://static.nike.com/a/images/t_PDP_864_v1/f_auto,b_rgb:f5f5f5/a8860307-124b-4bf8-bd37-61b6952bed39/air-max-90-shoe-kn1phR.jpg",
  price: 10000,
},
"air-jordan-2-nike-infinity-tour": {
 name: "Nike Infinity Tour",
 img:
   "https://static.nike.com/a/images/t_PDP_864_v1/f_auto,b_rgb:f5f5f5/3b4e89f2-5bc0-4d5b-bfce-568368252c79/jordan-air-cadence-shoe-J6RZf2.jpg",
 price: 12000,
}
}
