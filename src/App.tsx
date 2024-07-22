import React, {useEffect} from 'react';
import {Route, Routes, useNavigate} from "react-router";

import {CatalogService} from "./core/services/CatalogService";
import {FooterMenu} from "./components/FooterMenu/FooterMenu";
import {OrderComponent} from "./components/OrderComponent";
import {setCatalog} from './redux/slices/catalog-slice'
import {useCatalog} from "./redux/hooks/useCatalog";
import {CatalogPage} from "./Pages/CatalogPage";
import {ElementPage} from "./Pages/ElementPage";
import {Catalog} from "./core/classes/Catalog";
import {useAppDispatch, useAppSelector} from "./redux/hooks";

import './css/App.css';
import {hideOrder} from "./redux/slices/order-slice";


function App() {
    const navigate = useNavigate()
    const dispatch = useAppDispatch()
    const {orderShow} = useAppSelector(s => s.order)
    const catalog = useCatalog()


    useEffect(() => {
        if (catalog) return

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
        tg.MainButton.setText('main button')
        tg.BackButton.onClick(() => navigate(-1))
    }, []);


    return (
        <>
            <Routes>
                <Route path={'/'} element={<CatalogPage/>}/>
                <Route path={'/:detailId/'} element={<ElementPage/>}/>
                <Route path={'/order/'} element={<div/>}/>
            </Routes>
            <FooterMenu />
            <OrderComponent show={orderShow} onHide={() => dispatch(hideOrder())}/>
        </>
    );
}

export default App;
