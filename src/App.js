import Footer from './components/Footer';
import Navbar from './components/Navbar';
import Home from './components/Home';
import Places from './components/core/Places';
import './App.css';
import { BrowserRouter, Route, Switch } from 'react-router-dom';

function App() {
  return (
    <BrowserRouter>
      <div className="App">
        <Switch>
          <Route exact path="/">
            <Navbar/>
            <Home/>
            <Footer/>
          </Route>
          <Route path="/places/:id">
            <Places/>
          </Route>
        </Switch>
      </div>
    </BrowserRouter>
  );
}

export default App;