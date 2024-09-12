import React, {useEffect, useState} from 'react';
import {Navigate, Route, Routes, useNavigate} from "react-router";

import {SelectStoreHouseModal} from "./components/modals/SelectStoreHouseModal";
import {setCatalog, setFavorite} from './redux/slices/catalog-slice'
import {FavoritePage} from "./Pages/FavoritePage/FavoritePage";
import {CatalogService} from "./core/services/CatalogService";
import {ConfirmOrderPage} from "./Pages/ConfirmOrderPage";
import {ProfileEditePage} from "./Pages/ProfileEditePage";
import {ErrorService} from "./core/services/ErrorService";
import {CompaniesPage} from "./Pages/CompaniesPage";
import {useCatalog} from "./redux/hooks/useCatalog";
import {setBasket} from "./redux/slices/user-slice";
import {TgService} from "./core/services/TgService";
import {ProfilePage} from "./Pages/ProfilePage";
import {CatalogPage} from "./Pages/CatalogPage";
import {ElementPage} from "./Pages/ElementPage";
import {useInitUser} from "./hooks/useInitUser";
import {CompanyEdit} from "./Pages/CompanyEdit";
import {Catalog} from "./core/classes/Catalog";
import {BasketPage} from "./Pages/BasketPage";
import {useAppDispatch} from "./redux/hooks";
import {OrderPage} from "./Pages/OrderPage";
import {Noop} from "./Pages/Noop/Noop";
import {store} from "./redux/store";


import './css/App.css';


function App() {
    const navigate = useNavigate()
    const dispatch = useAppDispatch()
    const catalog = useCatalog()
    /** storehouse select modal open */
    const [shsOpen, setSHSOpen] = useState(false)

    useInitUser()


    // отобраажение модального окна с выбором склада
    useEffect(() => {
        setTimeout(() => {
            setSHSOpen(!store.getState().user.app_user?.storehouseId)
        }, 4000)
    }, []);



    useEffect(() => {
        if (catalog) return

        const handleService = (e?: Error, c?: Catalog) =>
            e ? console.error(e) : (c && dispatch(setCatalog(c)))

        CatalogService
            .getCatalog(handleService)
            .catch(ErrorService.handleError)
    },  [dispatch]);


    useEffect(() => {
        CatalogService.getFavorites()
            .then(f => dispatch(setFavorite(f)))
            .catch(ErrorService.handleError)
    }, [dispatch]);


    // useEffect(() => {
    //     OrderService.loadOrders()
    //         .then(o => o && dispatch(setOrders(o)))
    //         .catch(ErrorService.handleError)
    // }, [dispatch]);


    useEffect(() => {
        const tg = Telegram.WebApp
        tg.BackButton.onClick(() => navigate(-1))
        tg.disableVerticalSwipes()
        tg.expand()
    }, []);


    useEffect(() => {
        TgService.getBasket()
            .then(b => dispatch(setBasket(b)))
            .catch(ErrorService.handleError)
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
                <Route path={'/profile/edite'} element={<ProfileEditePage/>}/>
                <Route path={'/companies'} element={<CompaniesPage/>}/>
                <Route path={'/company/:companyID'} element={<CompanyEdit/>}/>
                <Route path={'/company/new'} element={<CompanyEdit/>}/>
                <Route path={'/basket'} element={<BasketPage/>}/>
                <Route path={'/confirmOrder'} element={<ConfirmOrderPage/>}/>
                <Route path={'*'} element={<Navigate to={'/'}/>}/>
            </Routes>
            <SelectStoreHouseModal open={shsOpen} onOpenChange={setSHSOpen}/>
        </>
    );
}

export default App;
