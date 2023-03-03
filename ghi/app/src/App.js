import { BrowserRouter, Routes, Route } from 'react-router-dom';
import MainPage from './MainPage';
import Nav from './Nav';
import HatsList from './HatsList';
import HatForm from './HatForm';
import ShoesList from './ShoesList';
import ShoeForm from './ShoeForm';



function App(props) {
  if (props.hats === undefined){
    return null;
  }
  return (
    <>
      <BrowserRouter>
        <Nav />
          <Routes>
            <Route index element={<MainPage />} />

            <Route path="hats/new" element={<HatForm />} />
            <Route path="hats" element={<HatsList hats={props.hats} />} />

            <Route path="shoes/new" element={<ShoeForm />} />
            <Route path="shoes" element={<ShoesList shoes={props.shoes} />} />

          </Routes>
        </BrowserRouter>
      </>
  );
}


export default App;
