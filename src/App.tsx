import React, {useEffect} from 'react';
import {Navigate, Route, Routes, useNavigate} from "react-router";

import {setCatalog, setFavorite} from './redux/slices/catalog-slice'
import {FavoritePage} from "./Pages/FavoritePage/FavoritePage";
import {CatalogService} from "./core/services/CatalogService";
import {OrderService} from "./core/services/OrderService";
import {ConfirmOrderPage} from "./Pages/ConfirmOrderPage";
import {CompaniesPage} from "./Pages/CompaniesPage";
import {useCatalog} from "./redux/hooks/useCatalog";
import {setBasket, setOrders} from "./redux/slices/user-slice";
import {TgService} from "./core/services/TgService";
import {ProfilePage} from "./Pages/ProfilePage";
import {CatalogPage} from "./Pages/CatalogPage";
import {ElementPage} from "./Pages/ElementPage";
import {useInitUser} from "./hooks/useInitUser";
import {TestApiPage} from "./Pages/TestApiPage";
import {CompanyEdit} from "./Pages/CompanyEdit";
import {Catalog} from "./core/classes/Catalog";
import {BasketPage} from "./Pages/BasketPage";
import {useAppDispatch} from "./redux/hooks";
import {OrderPage} from "./Pages/OrderPage";
import {Noop} from "./Pages/Noop/Noop";


import './css/App.css';


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
        OrderService.loadOrders()
            .then(o => o && dispatch(setOrders(o)))
            .catch(console.error)
    }, [dispatch]);


    useEffect(() => {
        const tg = Telegram.WebApp
        tg.BackButton.onClick(() => navigate(-1))
        tg.disableVerticalSwipes()
    }, []);


    useEffect(() => {
        TgService.getBasket()
            .then(b => dispatch(setBasket(b)))
            .catch(console.error)
    }, [])




    return (
        <>
            <CatalogPage/>
            <Routes>
                <Route path={'/'} element={<Noop/>}/>
                <Route path={'/:detailId/'} element={<ElementPage/>}/>
                <Route path={'/orders'} element={<OrderPage/>}/>
                <Route path={'/favorite'} element={<FavoritePage/>}/>
                <Route path={'/profile'} element={<ProfilePage/>}/>
                <Route path={'/Telegram_bot/test'} element={<TestApiPage/>}/>
                <Route path={'/companies'} element={<CompaniesPage/>}/>
                <Route path={'/company/:companyID'} element={<CompanyEdit/>}/>
                <Route path={'/company/new'} element={<CompanyEdit/>}/>
                <Route path={'/basket'} element={<BasketPage/>}/>
                <Route path={'/confirmOrder'} element={<ConfirmOrderPage/>}/>
                <Route path={'*'} element={<Navigate to={'/'}/>}/>
            </Routes>
        </>
    );
}

export default App;
