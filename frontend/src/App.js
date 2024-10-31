import { BrowserRouter, Routes, Route } from 'react-router-dom';
import Home from './Home';
import Navbar from './Navbar';
import AddNewItem from './AddNewItem';


function App() {
  return (
    <div>
      <BrowserRouter>
        <Navbar />
        <Routes>
          <Route
            path='/'
            element={<Home />}
          />
          <Route
            path='/addnewitem'
            element={<AddNewItem />}
          />
        </Routes>
      </BrowserRouter>
    </div>
  );
}

export default App;
