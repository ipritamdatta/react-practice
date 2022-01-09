1) npm run start
2) remove all files from public except favicon.ico and index.html
3) remove setupTests.js,reportWebVitals.js, logo.svg, index.css, App.test.js from src folder.
4) Make your index.js clean like this: 

```
import React from 'react';
import ReactDOM from 'react-dom';
import App from './App';

ReactDOM.render(
  <React.StrictMode>
    <App />
  </React.StrictMode>,
  document.getElementById('root')
);
```

5) Add in index.html of public folder: 

```
<link rel="stylesheet" href="https://cdnjs.cloudflare.com/ajax/libs/semantic-ui/2.4.1/semantic.min.css" integrity="sha512-8bHTC73gkZ7rZ7vpqUQThUDhqcNFyYi2xgDgPDHc+GXVGHXq+xPjynxIopALmOPqzo9JZj0k6OqqewdGO3EsrQ==" crossorigin="anonymous" referrerpolicy="no-referrer" />
```

6) npm install redux react-redux

and, 

    npm install react-router-dom

7) Create folders: 
src->redux, src->actions, src->contants,src->reducers,

8) Create file: 
src->redux->store.js, src->actions->productActions.js,src->actions->action-types.js

###### Action
9) In contants->action-types.js write: 
```
export const ActionTypes = {
    "SET_PRODUCTS":"SET_PRODUCTS",
    "SELECTED_PRODUCT":"SELECTED_PRODUCT",
    "REMOVE_SELECTED_PRODUCT":"REMOVE_SELECTED_PRODUCT"
};
```

10) In productActions.js file write: 

```
import {ActionTypes} from '../contants/action-types'

export const setProducts = (products) => {
    return {
        type: ActionTypes.SET_PRODUCTS,
        payload: products
    }
}

export const selectedProduct = (product) => {
    return {
        type: ActionTypes.SELECTED_PRODUCT,
        payload: product
    }
}

```

###### REDUCER ()
11) Create file: 

reducers->index.js, reducers->productReducer.js

doing from: 
https://www.youtube.com/watch?v=0W6i5LYKCSI&t=747s 10:19

12) In productReducer.js file write: 

```
import { ActionTypes } from "../contants/action-types"

const initialState = {
    products: [{
        id: 1,
        title: "Pritam",
        category: "Developer"
    }]
}


export const productReducer = (state = initialState, {type, payload}) => {
    // here {type, payload} came from action by destructuring

    switch(type) {
        case ActionTypes.SET_PRODUCTS:
            return state;
        default: 
            return state;
    }
    
}
```

###### NOTE: When you are creating a project you can have multiple reducers. and to combine those reducers
###### we need to go to reducers->index.js file.

13) Inside reducers->index.js file write: 

```
import { combineReducers } from "redux";
import { productReducer } from "./productReducer";

export const reducers = combineReducers({
    allProducts: productReducer //key: value pair, you can define multiple reducers like productReducer, testReducer etc.
})

```

###### STORE

1) Inside src->redux->store.js file write: 
```
import {createStore} from 'redux'
import reducers from './reducers/index'

const store = createStore(
    reducers,
    {},
    window.__REDUX_DEVTOOLS_EXTENSION__ && window.__REDUX_DEVTOOLS_EXTENSION__()
);

export default store;
```
2) In src->index.js write: 

```
import React from 'react';
import ReactDOM from 'react-dom';
import App from './App';
import {Provider} from 'react-redux';
import store from './redux/store'

ReactDOM.render(
  <React.StrictMode>
    <Provider store={store}>
      <App />
    </Provider>
  </React.StrictMode>,
  document.getElementById('root')
);
```

###### To get the products

1) Create files: 

containers->Header.js, containers->ProductComponent.js, containers->ProductDetail.js, containers->ProductListing.js

2) Inside containers->Header.js file write: 

```
import React from 'react';

const Header = () => {
    return (
        //ui fixed menu
        <div className="ui  menu">
            <div className="ui container center">
                <h2>FakeShop</h2>
            </div>
        </div>
    )
}

export default Header;
```

3) In containers->ProductComponent.js write:

```
import React from 'react';

const ProductComponent = () => {
    return (
        <div>
            <h1>Product Component</h1>
        </div>
    )
}

export default ProductComponent;
```

In containers->ProductListing.js write:

```
import React from 'react';

const ProductListing = () => {
    return (
        <div>
            <h1>Product Listing</h1>
        </div>
    )
}

export default ProductListing;
```

In containers->ProductDetail.js write:

```
import React from 'react';

const ProductDetail = () => {
    return (
        <div>
            <h1>Product Detail</h1>
        </div>
    )
}

export default ProductDetail;
```

4) In App.js write:

```
import './App.css';
import {BrowserRouter as Router,Routes, Route} from 'react-router-dom'
import Header from './containers/Header'
import ProductListing from './containers/ProductListing';
import ProductDetail from './containers/ProductDetail';

function App() {
  return (
    <div className="App">
      <Router>
        <Header />
        <Routes>
          <Route path="/" exact element={<ProductListing />}></Route>
          <Route path="/product/:productId" exact element={<ProductDetail />}></Route>
          <Route>404 Not Found!</Route>
        </Routes>
      </Router>
    </div>
  );
}

export default App;

```

###### Show details in containers->ProductListing.js

1) Inside productListing.js write: 

```
import React from 'react';
import {useSelector} from 'react-redux'
import ProductComponent from "./ProductComponent"

const ProductListing = () => {
    const products = useSelector((state) => state);

    console.log(products);

    return (
        <div className="ui grid container">
            <ProductComponent />
        </div>
    )
}

export default ProductListing;
```

2) Inside containers->ProductComponent.js write: 

```
import React from 'react';
import { useSelector } from 'react-redux';

const ProductComponent = () => {

    const products = useSelector((state) => state.allProducts.products);
    //const {id, title} = products[0]; //for static data. remove this when getting real data from server
    console.log(products);

    return (
        <div className='four column wide'>
            <div className="ui link cards">
                <div className="card">
                    <div className="image">
                        <img src="https://picsum.photos/200"/>
                    </div>
                    <div className="content">
                        <div className="header">
                            //{title}
                        </div>
                    </div>
                </div>
            </div>
        </div>
    )
}

export default ProductComponent;
```

###### Make an API Call

1) Go to : https://fakestoreapi.com/docs
npm install axios --save

2) In containers->ProductListing.js write: 

```
import React, {useEffect} from 'react';
import axios from 'axios';
import {useSelector, useDispatch} from 'react-redux';
import ProductComponent from "./ProductComponent";
import {setProducts} from '../redux/actions/productActions';

const ProductListing = () => {
    const products = useSelector((state) => state);
    // console.log(products);
    const dispatch = useDispatch();

    const fetchProducts = async () => {
        const response = await axios
            .get("https://fakestoreapi.com/products")
            .catch((err) => {
                console.log("Err", err);
            });

        dispatch(setProducts(response.data));
    };

    useEffect(() => {
        fetchProducts();
    }, []);

    return (
        <div className="ui grid container">
            <ProductComponent />
        </div>
    )
}

export default ProductListing;
```


Now go to reducers->ProductReducer.js write:

```
import { ActionTypes } from "../contants/action-types"

const initialState = {
    products: []
}


export const productReducer = (state = initialState, {type, payload}) => {
    // here {type, payload} came from action by destructuring

    switch(type) {
        case ActionTypes.SET_PRODUCTS:
            return {
                ...state,
                products: payload
            };
        default: 
            return state;
    }
    
}
```

3) Inside containers->ProductComponent.js write: 

```
import React from 'react';
import {Link} from 'react-router-dom';
import { useSelector } from 'react-redux';

const ProductComponent = () => {

    const products = useSelector((state) => state.allProducts.products);
    // console.log(products);
    const renderList = products.map((product) => {
        const {id, title, image, price, category} = product;
        return (
            <div className="four wide column" key={id}>
                <Link to={`/product/${id}`}>
                    <div className="ui link cards">
                        <div className="card">
                            <div className="image">
                                <img src="https://picsum.photos/200" alt={title} />
                            </div>
                            <div className="content">
                                <div className="header">{title}</div>
                                <div className="meta">$ {price}</div>
                                <div className="meta">{category}</div>
                            </div>
                        </div>
                    </div>
                </Link>
            </div>
        );
    });

    return (
        <>{renderList}</>
    );
};

export default ProductComponent;
```

4) Inside reducers->productReducer.js write: 

```
export const selectedProductReducer = (state={}, {type, payload}) => {
    switch(type)
    {
        case ActionTypes.SELECTED_PRODUCT:
            return {
                ...state,
                ...payload
            }
        default: 
            return state;
    }
}
```

And add this selectedProductReducer in reducers->index.js file:

```
import { combineReducers } from "redux";
import { productReducer,selectedProductReducer } from "./productReducer";

const reducers = combineReducers({
    allProducts: productReducer, //key: value pair, you can define multiple reducers like productReducer, testReducer etc.
    product: selectedProductReducer
})

export default reducers;
```

5) Inside containers->ProductDetail.js write: 

```
import React, {useEffect} from 'react';
import {useParams} from "react-router-dom";
import axios from "axios";
import {useDispatch, useSelector} from "react-redux"
import { selectedProduct } from '../redux/actions/productActions';

const ProductDetail = () => {
    const product = useSelector((state) => state.product);
    const {image, title, price, category, description} = product;
    const {productId} = useParams();
    const dispatch = useDispatch();

    const fetchProductDetail = async () => {
        const response = await axios.get(`https://fakestoreapi.com/products/${productId}`)
                    .catch((err) => {
                        console.log("Err ",err);
                    });

        dispatch(selectedProduct(response.data));
    }

    useEffect(() => {
        if(productId && productId !== "") fetchProductDetail();
    }, [productId]);

    return (
        <div className='ui grid container'>
            {Object.keys(product).length === 0 ? (
                <div>...Loading</div>
            ) : (
                <div className="ui placeholder segment">
                    <div className="ui two column stackable center aligned grid">
                        <div className="ui vertical divider">AND</div>
                        <div className="middle aligned row">
                            <div className="column lp">
                                <img className='ui fluid image' src="https://picsum.photos/200"/>
                            </div>
                            <div className="column rp">
                                <h1>{title}</h1>
                                <h2>
                                    <a className="ui teal tag label">{price}</a>
                                </h2>
                                <h3 className="ui brown block header">{category}</h3>
                                <p>{description}</p>
                                <div className="ui vertical animated button" tabIndex="0">
                                    <div className="hidden content">
                                        <i className="shop icon"></i>
                                    </div>
                                    <div className="visible content">Add to Cart</div>
                                </div>
                            </div>
                        </div>
                    </div>
                </div>
            )}
        </div>
    )
}

export default ProductDetail;
```

###### Remove selected product

1) In productActions.js file add: 

```
export const removeSelectedProduct = () => {
    return {
        type: ActionTypes.REMOVE_SELECTED_PRODUCT
    }
}
```

2) in reducers->productReducer.js write:

```
export const selectedProductReducer = (state={}, {type, payload}) => {
    switch(type)
    {
        case ActionTypes.SELECTED_PRODUCT:
            return {
                ...state,
                ...payload
            }
        case ActionTypes.REMOVE_SELECTED_PRODUCT:
            return { }
        default: 
            return state;
    }
}
```

3) In containers->ProductDetail.js write the above portion: 

```
import React, {useEffect} from 'react';
import {useParams} from "react-router-dom";
import axios from "axios";
import {useDispatch, useSelector} from "react-redux"
import { selectedProduct, removeSelectedProduct } from '../redux/actions/productActions';

const ProductDetail = () => {
    const product = useSelector((state) => state.product);
    const {image, title, price, category, description} = product;
    const {productId} = useParams();
    const dispatch = useDispatch();

    const fetchProductDetail = async () => {
        const response = await axios.get(`https://fakestoreapi.com/products/${productId}`)
                    .catch((err) => {
                        console.log("Err ",err);
                    });

        dispatch(selectedProduct(response.data));
    }

    useEffect(() => {
        if(productId && productId !== "") fetchProductDetail();

        return () => {
            dispatch(removeSelectedProduct());
        }
    }, [productId]);
```