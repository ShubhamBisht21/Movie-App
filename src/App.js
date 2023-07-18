import { fetchDataFromApi } from './utils/api';
import { useEffect } from 'react';
import './App.css';

import { useSelector,useDispatch } from 'react-redux';
import { getApiConfigurations,getGenres } from './store/homeSlice';


import Header from './components/header/Header';
import Footer from './components/footer/Footer';
import Home from './pages/home/Home';
import Details from './pages/details/Details';
import SearchResult from './pages/searchResult/SearchResult';
import Explore from './pages/explore/Explore';
import PageNotFound from './pages/404/PageNotFound';

import { BrowserRouter,Route,Routes } from 'react-router-dom';


function App() {

  const dispatch = useDispatch();
  const {url }= useSelector((state) => state.home);

  useEffect(() => {
    fetchApiConfig();
    genresCall();
  },[]);

  const fetchApiConfig = () => {
    fetchDataFromApi('/configuration').then((res) => {
      console.log(res);
      const url = {
        backdrop:res.images.secure_base_url + 'original',
        poster:res.images.secure_base_url + 'original',
        profile:res.images.secure_base_url + 'original',
      }
      dispatch(getApiConfigurations(url));
    })
  }

  const genresCall = async () => {
    let promises = []
    let endPoints = ['tv','movie']
    let allGenres = {}

    endPoints.forEach((url) => {
      promises.push(fetchDataFromApi(`/genre/${url}/list`))
    })

    const data = await Promise.all(promises);
    data.map(({genres}) => {
      return genres.map((item) => (allGenres[item.id] = item))
    })

    dispatch(getGenres(allGenres))
  }
  return (
      <BrowserRouter>
      <Header />
        <Routes>
          <Route path='/' element={<Home />}></Route>
          <Route path='/:mediaType/:id' element={<Details />}></Route>
          <Route path='/search/:query' element={<SearchResult />}></Route>
          <Route path='/explore/:mediaType' element={<Explore />}></Route>
          <Route path='*' element={<PageNotFound />}></Route>
        </Routes>
        <Footer />
      </BrowserRouter>
  );
}

export default App;
