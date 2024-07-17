import React, {useEffect, useState} from 'react';
import {Route, Routes} from "react-router";

import {CatalogService} from "./core/services/CatalogService";
import {setCatalog} from './redux/slices/catalog-slice'
import {CatalogPage} from "./Pages/CatalogPage";
import {ElementPage} from "./Pages/ElementPage";
import {Catalog} from "./core/classes/Catalog";
import {useAppDispatch} from "./redux/hooks";

import './css/App.css';


function App() {
    const dispatch = useAppDispatch()
    const [isShow, setIsShow] = useState(false)


    useEffect(() => {
        function handleService(e?: Error, c?: Catalog) {
            if (e) {
                console.error(e)
                return
            }
            if (c) {
                dispatch(setCatalog(c))
            }
        }

        CatalogService
            .getCatalog(handleService)
            .catch(console.error)
    }, [dispatch]);


    useEffect(() => {
        // @ts-ignore
        const tg: any = window.Telegram.WebApp
        tg.SettingsButton.show()

        tg.SettingsButton.onClick(() => {
            tg.showConfirm('settings btn clicked', (ok: boolean) => {
                if (ok) tg.showAlert('Done!')
                else tg.showAlert('Cancel!')
            })
        })

        tg.MainButton.setText('main button')
        tg.MainButton.show()

    }, []);


    useEffect(() => {
        // @ts-ignore
        const tg: any = window.Telegram.WebApp
        tg.MainButton.onClick(() => {
            tg.SettingsButton[isShow ? 'show' : 'hide']?.()
            setIsShow(!isShow)
        })
    }, [isShow]);


    return (
        <Routes>
            <Route path={'/'} element={<CatalogPage/>}/>
            <Route path={'/:detailId/'} element={<ElementPage/>}/>
            <Route path={'/order/'} element={<div/>}/>
        </Routes>
    );
}

export default App;
