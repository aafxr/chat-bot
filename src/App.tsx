import React, {useEffect, useState} from 'react';
import './css/App.css';
import {Catalog} from "./core/classes/Catalog";
import {CatalogService} from "./core/services/CatalogService";
import {Route, Routes} from "react-router";
import {CatalogPage} from "./Pages/CatalogPage/CatalogPage";

function App() {
  const [catalog, setCatalog] = useState<Catalog>()


  useEffect(() => {
    function handleService(e?: Error, c?: Catalog){
      if(e){
        console.error(e)
        return
      }
      if(c){
        setCatalog(c)
      }
    }
    CatalogService
        .getCatalog(handleService)
        .catch(console.error)
  }, []);


  console.log(catalog)



  return (
      <Routes>
        <Route path={'/'} element={<CatalogPage />} />
        <Route path={'/:detailId/'} element={<CatalogPage />} />
        <Route path={'/order/'} element={<CatalogPage />} />
      </Routes>
  );
}

export default App;
