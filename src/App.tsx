import React, {useEffect, useState} from 'react';
import {Route, Routes} from "react-router";

import {CatalogService} from "./core/services/CatalogService";
import {CatalogPage} from "./Pages/CatalogPage/CatalogPage";
import {Catalog} from "./core/classes/Catalog";

import './css/App.css';


function App() {
    const [catalog, setCatalog] = useState<Catalog>()


    useEffect(() => {
        function handleService(e?: Error, c?: Catalog) {
            if (e) {
                console.error(e)
                return
            }
            if (c) {
                setCatalog(c)
            }
        }

        CatalogService
            .getCatalog(handleService)
            .catch(console.error)
    }, []);


    useEffect(() => {
        // @ts-ignore
        const tg: any = window.Telegram.WebApp
        tg.SettingsButton.show()

        tg.SettingsButton.onClick(() => {
            tg.showConfirm('settings btn clicked', (ok: boolean) => {
                if(ok) tg.showAlert('Done!')
                else tg.showAlert('Cancel!')
            })
        })

        tg.MainButton.setText('main button')
        tg.MainButton.show()
    }, []);


    console.log(catalog)


    if (!catalog) return null

    return (
        <Routes>
            <Route path={'/'} element={<CatalogPage catalog={catalog}/>}/>
            <Route path={'/:detailId/'} element={<div/>}/>
            <Route path={'/order/'} element={<div/>}/>
        </Routes>
    );
}

export default App;