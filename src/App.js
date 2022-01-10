import './App.css';
import {BrowserRouter as Router,Routes, Route} from 'react-router-dom'
import Header from './containers/Header'
import ProductListing from './containers/ProductListing';
import ProductDetail from './containers/ProductDetail';
import MyCounter from './components/MyCounter';
import CounterContextProvider from './contexts/CounterContext';
import ComponentA from './components/ComponentA';

function App() {

  return (
    <CounterContextProvider>
      <div className="App">
        <Router>
          <Header />
          <Routes>
            <Route path="/" exact element={<ProductListing />}></Route>
            <Route path="/product/:productId" exact element={<ProductDetail />}></Route>
            <Route>404 Not Found!</Route>
          </Routes>
        </Router>
        
          <h3>Context API</h3>
          <MyCounter />
          <ComponentA />
      </div>
    </CounterContextProvider>
  );
}

export default App;