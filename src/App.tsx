import React, {useEffect, useState} from 'react';
import './App.css';
import {Catalog} from "./core/classes/Catalog";
import {CatalogService} from "./core/services/CatalogService";

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
    <div className="App">

    </div>
  );
}

export default App;
