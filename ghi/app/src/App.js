import { BrowserRouter, Routes, Route } from 'react-router-dom';
import MainPage from './MainPage';
import Nav from './Nav';
import HatsList from './HatsList';
import HatForm from './HatForm';




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
          </Routes>
        </BrowserRouter>
      </>
  );
}


export default App;
