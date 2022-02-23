import React, { useState, useEffect } from "react";
import './App.css';
import 'bulma/css/bulma.min.css';
import { Link } from 'react-router-dom';
import { useParams } from 'react-router-dom';
import prodImg from './imgs/sample.png';
import { Input } from "@material-ui/core";

import ShoppingCartIcon from '@material-ui/icons/ShoppingCart';

import { Card } from 'semantic-ui-react'

/*********** Home page */
function Header() {
    return (
        <header className="App-header">
            High Range of Products
        </header>
    )
}

function Footer(props) {
    // console.log(props);
    return (
        <p>React Application | &copy; { props.year }</p>
    );
}

function AppNav() {
    return (
        <>
            <nav className="columns is-centered mt-1">
                <div className="navbar-brand">
                    <Link className="navbar-item" to="all-categories"><button className="button is-link">All Categories</button></Link>
                    <Link className="navbar-item" to="my-profile"><button className="button is-link">My Profile</button></Link>
                </div>
            </nav>
            <div style={ { margin: '2rem' } }>
                <h1>Welcome to the Online Store</h1>
            </div>
        </>
    );
}

/* Home component, the landing page with the navigation menu for 'all categories' and 'my profile' pages */
export function Home() {
    return (
        <div className="App">
            <Header />
            <AppNav />
            <Footer year={ new Date().getFullYear() } />
        </div>
    );
}

/*********** Cart page */
/* Cart component for customer to make the payment */
export function Cart() {
    return (
        <>
            <h2>Welcome to your CART for payment</h2>
            <div className="navbar-brand">
                <Link className="navbar-item" to="/"><button className="button is-link">Home</button></Link>
            </div>
        </>
    );
}

/*********** My Profile page */
export function MyProfile() {
    return (
        <>
            <div>MyProfile Page</div>
            <div className="navbar-brand">
                <Link className="navbar-item" to="/"><button className="button is-link">Home</button></Link>
            </div>
            <Footer year={ new Date().getFullYear() } />
        </>
    );
}

/*********** All Categories page */
/* Below component is to fetch all the categories and display onto web page: */

export function AllCats() {
    const [data, setData] = useState(null);

    useEffect(() => {
        fetch(`https://fakestoreapi.com/products/categories`)
            .then((res) => res.json())
            .then(setData)
    }, []);

    if (data) {
        return (
            <>
                <header className="App-header"> All Catergories </header>
                {/* <Category cats={ cats } /> */ }
                {/* <div>{ JSON.stringify(data) }</div> */ }

                <div className="container navbar-brand" style={ { flexDirection: 'row-reverse' } }>
                    <React.StrictMode>
                        <Link className="navbar-item" to="/"><button className="button is-link">Home</button></Link>
                        <Link className="navbar-item" to="/products-list"><button className="button is-link">All Products</button></Link>
                    </React.StrictMode>
                </div>

                <section className="container desktop" style={ { height: '100vh', flexDirection: 'row', alignItems: 'center' } }>
                    { data.map((d) => (
                        // <Category key={ d } data={ d } />
                        <div className="column" style={ { width: '20%', float: 'right' } }>
                            <div className="card" key={ d }>
                                <Link className="navbar-item" to={ `/all-products/${d}` }><div>{ d }</div></Link>
                                <div className="card-image">
                                    <figure className="image">
                                        <img src={ prodImg } alt="prod img" />
                                    </figure>
                                </div>
                            </div>
                        </div>
                    )) }
                </section>

                <Footer year={ new Date().getFullYear() } />
            </>
        );
    }
    return <header className="App-header"> Loading data . . . . . </header>
}

// function Category(props) {
//     return (
//         <div className="tile is-parent">
//             <img src="../imgs/sample.png" alt="prodcut img" />
//             <Link className="navbar-item" to="/all-products/:category"><div>{ props.data }</div></Link>
//         </div>
//     );
// }

/*********** Product Details page */
/* Below component is to fetch the specific product details by passing its product id as the route parameter */
export function ProductDetail() {
    const [prod, setProd] = useState({ data: null });
    const { prod_id } = useParams();

    useEffect(() => {
        fetch(`https://fakestoreapi.com/products/${prod_id}`)
            .then((res) => res.json())
            .then(setProd)
    }, []);

    if (prod) {
        return (
            <>
                <header className="App-header"> Product Details</header>
                <div className="navbar-brand">
                    <Link className="navbar-item" to="/"><button className="button is-link">Home</button></Link>
                </div>
                <div className="card">
                    <h2 className="title is-4"><b>Product:</b> { prod.title }</h2>
                    <div><b>Price:</b> { prod.price }</div>
                    <div className="media-content"><b>Description:</b> { prod.description }</div>
                    <div><b>Category:</b> { prod.category }</div>
                    <button className="button is-link">Add To Cart</button>
                    <Link className="navbar-item" to="/cart"><span><ShoppingCartIcon className="material-icons md-48" /></span></Link>
                    <div className="card-image">
                        <figure style={ { maxWidth: '100%', height: 'auto' } }>
                            <img src={ prod.image } alt={ prod.title } />
                        </figure>
                    </div>

                </div>
                <Footer year={ new Date().getFullYear() } />
            </>
        );
    }
    return <header className="App-header"> Loading data . . . . . </header>

}

/*********** All Products page */
/* Below component for fetching products of a specific category and display to web page */
export function AllProducts() {
    const [allprods, setAllProds] = useState(null);
    const { category } = useParams();
    // console.log(category);
    // const params = useParams();

    useEffect(() => {
        fetch(`https://fakestoreapi.com/products/category/${category}`)
            .then((res) => res.json())
            .then(setAllProds)
    }, []);
    // console.log(allprods);

    if (allprods) {
        // console.log(allprods);
        return (
            <div>
                <header className="App-header"> All Products </header>
                <ul>
                    { allprods.map((prod) => (
                        <Link className="navbar-item" to={ `/product/${prod.id}` }><li key={ prod.id }>{ prod.title }</li></Link>
                    )) }
                </ul>
                <div className="navbar-brand">
                    <Link className="navbar-item" to="/"><button className="button is-link">Home</button></Link>
                </div>
                {/* <div>{ JSON.stringify(params) }</div> */ }
            </div>
        );
    }
    return <header className="App-header"> Loading data . . . . . </header>
}

/*********** Products List page */
/* Below component is to fetch all the products of all categories for search feature */
export function ProductsList() {
    const [apiData, setApiData] = useState([]);
    const [searchItem, setSearchItem] = useState('');
    const [filteredResults, setFilteredResults] = useState([]);
    console.log(searchItem);

    useEffect(() => {
        fetch(`https://fakestoreapi.com/products`)
            .then((res) => res.json())
            .then(setApiData)
    }, []);

    /* for searching with btn */
    // const searchProds = () => {
    //     const result = apiData.filter((prod) => {
    //         return Object.values(prod).join('').toLowerCase().includes(searchItem.toLowerCase())
    //     });
    //     console.log(result);
    // }
    const searchProds = (value) => {
        setSearchItem(value)
        if (searchItem !== '') {
            const result = apiData.filter((item) => {
                return Object.values(item).join('').toLowerCase().includes(searchItem.toLowerCase())
            })
            setFilteredResults(result);
        }
        else {
            setFilteredResults(apiData);
        }
    }

    return (
        <section>
            <div className="container" style={ { display: 'flex', alignItems: 'center' } }>
                <Input icon="search" placeholder="enter product name..." onChange={ (e) => setSearchItem(e.target.value) } />
                <button className="button is-link" style={ { marginLeft: 20 } } onClick={ searchProds }>Enter</button>
                <div className="navbar-brand">
                    <Link className="navbar-item" to="/all-categories"><button className="button is-link">All Categories</button></Link>
                </div>
            </div>

            <Card.Group prodsPerRow={ 3 } style={ { marginTop: 20 } }>
                { searchItem.length > 1 ? (
                    filteredResults.map((prod) => {
                        return (
                            <Card>
                                <Card.Content>
                                    <Card.Header>{ prod.title }</Card.Header>
                                </Card.Content>
                            </Card>
                        )
                    })
                ) : (
                    apiData.map((prod) => {
                        return (
                            <Card>
                                <Card.Content>
                                    <Card.Header>Product: { prod.title }</Card.Header>
                                    <Card.Description>
                                        <img src={ prod.image } alt="prod" style={ { width: '50px' } } />
                                    </Card.Description>
                                </Card.Content>
                            </Card>
                        )
                    })
                ) }
            </Card.Group>
        </section>
    )
}
