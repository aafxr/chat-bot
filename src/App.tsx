import React, {useEffect} from 'react';
import {Navigate, Route, Routes, useNavigate} from "react-router";

import {setCatalog, setFavorite} from './redux/slices/catalog-slice'
import {FavoritePage} from "./Pages/FavoritePage/FavoritePage";
import {CatalogService} from "./core/services/CatalogService";
import {OrderService} from "./core/services/OrderService";
import {setOrder} from "./redux/slices/order-slice";
import {useCatalog} from "./redux/hooks/useCatalog";
import {FooterMenu} from "./components/FooterMenu";
import {ProfilePage} from "./Pages/ProfilePage";
import {CatalogPage} from "./Pages/CatalogPage";
import {ElementPage} from "./Pages/ElementPage";
import {useInitUser} from "./hooks/useInitUser";
import {TestApiPage} from "./Pages/TestApiPage";
import {Catalog} from "./core/classes/Catalog";
import {useAppDispatch} from "./redux/hooks";
import {OrderPage} from "./Pages/OrderPage";
import {Noop} from "./Pages/Noop/Noop";

import './css/App.css';
import {NewCompanyPage} from "./Pages/NewCompanyPage/NewCompanyPage";


function App() {
    const navigate = useNavigate()
    const dispatch = useAppDispatch()
    const catalog = useCatalog()

    useInitUser()


    useEffect(() => {
        if (catalog) return

        const handleService = (e?: Error, c?: Catalog) =>
            e ? console.error(e) : (c && dispatch(setCatalog(c)))

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
        const tg = Telegram.WebApp
        tg.BackButton.onClick(() => navigate(-1))
        tg.disableVerticalSwipes()
    }, []);




    return (
        <>
            <CatalogPage/>
            <Routes>
                <Route path={'/'} element={<Noop/>}/>
                <Route path={'/:detailId/'} element={<ElementPage/>}/>
                <Route path={'/order'} element={<OrderPage/>}/>
                <Route path={'/favorite'} element={<FavoritePage/>}/>
                <Route path={'/profile'} element={<ProfilePage/>}/>
                <Route path={'/newCompany'} element={<NewCompanyPage/>}/>
                <Route path={'/Teleeeg_bot/test'} element={<TestApiPage/>}/>
                <Route path={'*'} element={<Navigate to={'/'}/>}/>
            </Routes>
            <FooterMenu/>
        </>
    );
}

export default App;
