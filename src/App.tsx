import React, {useEffect} from 'react';
import {Navigate, Route, Routes, useNavigate} from "react-router";

import {setCatalog, setFavorite} from './redux/slices/catalog-slice'
import {FavoritePage} from "./Pages/FavoritePage/FavoritePage";
import {CatalogService} from "./core/services/CatalogService";
import {useCatalog} from "./redux/hooks/useCatalog";
import {FooterMenu} from "./components/FooterMenu";
import {CatalogPage} from "./Pages/CatalogPage";
import {ElementPage} from "./Pages/ElementPage";
import {Catalog} from "./core/classes/Catalog";
import {useAppDispatch} from "./redux/hooks";
import {OrderPage} from "./Pages/OrderPage";

import './css/App.css';
import {OrderService} from "./core/services/OrderService";
import {setOrder} from "./redux/slices/order-slice";
import {TgService} from "./core/services/TgService";
import {setUser} from "./redux/slices/user-slice";
import {ProfilePage} from "./Pages/ProfilePage/ProfilePage";


function App() {
    const navigate = useNavigate()
    const dispatch = useAppDispatch()
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
        CatalogService.getFavorites()
            .then(f => dispatch(setFavorite(f)))
            .catch(console.error)
    }, [dispatch]);


    useEffect(() => {
        OrderService.loadOrder()
            .then(o => o && dispatch(setOrder(o)))
            .catch(console.error)
    }, [dispatch]);


    useEffect(() => {
        const u = TgService.getUser()
        if(u) dispatch(setUser(u))
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
                <Route path={'/order'} element={<OrderPage />}/>
                <Route path={'/favorite'} element={<FavoritePage />}/>
                <Route path={'/profile'} element={<ProfilePage />}/>
                <Route path={'*'} element={<Navigate to={'/'} />}/>
            </Routes>
            <FooterMenu />
        </>
    );
}

export default App;
