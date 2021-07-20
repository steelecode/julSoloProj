import './App.css';
import { Router } from '@reach/router';
import axios from 'axios';
import AllBaskets from './components/AllBaskets';
import BasketDetails from './components/BasketDetails';
import CreateBasket from './components/CreateBasket';
import EditBasket from './components/EditBasket';
import LogReg from './views/LogReg';

function App() {
  const logout = () => {
    axios.post("http://localhost:8000/api/users/logout", {}, {
      withCredentials: true
    })
      .then((res) => {
        console.log(res.data);
      })
      .catch((err) => {
        console.log(err);
      })
  }
  return (
    <div className="App">
      <h1>Planet X</h1>
      <h2>Apothecary and Candle Shop</h2>
      <Router>
        <AllBaskets default />
        <CreateBasket path="/baskets/new" />
        <BasketDetails path="/baskets/:id" />
        <EditBasket path="/baskets/:id/edit" />
        <LogReg path="/loginRegister" />
      </Router>
      <button onClick={logout}>Logout</button>
    </div>
  );
}

export default App;
