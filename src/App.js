import Navbar from './Navbar';
import Home from './Home';
import { BrowserRouter as Router, Route, Switch} from 'react-router-dom'
import Create from "./Create";
import BlogDetails from './BlogDetails';
import NotFound from './NotFound';
import {useSelector, useDispatch} from 'react-redux'
import {bindActionCreators} from 'redux';
import {actionCreators} from "./state/index"

function App(){

    const account   = useSelector((state) => state.account);
    const dispatch  = useDispatch();

    const {depositMoney, withdrawMoney} = bindActionCreators(actionCreators, dispatch);

    return (
      <Router>
        <div className="App">
            <Navbar />
            <div className="content">
              <Switch>
                <Route exact path="/">
                  <Home />
                </Route>
                <Route path="/create">
                  <Create />
                </Route>
                <Route path="/blogs/:id">
                  <BlogDetails />
                </Route>
                <Route path="*">
                  <NotFound />
                </Route>
              </Switch>
            </div>
            <div style={{textAlign: "center"}}>
              <h1>{account}</h1>
              <button onClick={() => depositMoney(1000)}>Deposit</button>
              <button onClick={() => withdrawMoney(1000)}>Withdraw</button>
            </div>
        </div>
      </Router>
    )
}

export default App;