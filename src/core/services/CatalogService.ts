import {Catalog} from "../classes/Catalog";
import {CbWithErrorType} from "../../types/CbWithErrorType";
import {DB} from "../db/DB";
import {CatalogArticlesType} from "../../types/CatalogArticlesType";
import {StoreName} from "../../types/StoreName";
import {CatalogItem} from "../classes/CatalogItem";
import {CatalogSection} from "../classes/CatalogSection";
import {fetchCatalog} from "../../api/fetchCatalog";
import {ProductDetails} from "../classes/ProductDetails";
import {fetchElementDetail} from "../../api/fetchElementDetail";
import {fetchRelatedProducts} from "../../api/fetchRelatedProducts";
import {FavoriteType} from "../../types/FavoriteType";
import {TgService} from "./TgService";
import {Simulate} from "react-dom/test-utils";
import error = Simulate.error;


const ARTICLES_KEY = 'articles'
const FAVORITE_KEY = 'favorites'


export class CatalogService {
    static async getCatalog(cb: CbWithErrorType<Catalog>) {
        let isLoad = false
        this._loadCatalogLocal()
            .then(c => {
                if (c && !isLoad) cb(undefined, c)
            })


        this._loadCatalog()
            .then(c => {
                if (c) {
                    isLoad = true
                    cb(undefined, c)
                }
            })
            .catch(e => cb(e))
    }


    private static async _loadCatalogLocal() {
        const articles = await DB.getStoreItem<CatalogArticlesType>(ARTICLES_KEY)
        if (!articles) return

        const items = (await DB.getAll<CatalogItem>(StoreName.ITEMS))
        if (!items.length) return

        const elements = items.reduce<Catalog['elements']>((a, e) => {
            a[e.id] = new CatalogItem(e)
            return a
        }, {})

        let sections = (await DB.getAll<CatalogSection>(StoreName.SECTIONS)).map(e => new CatalogSection(e))
        if (!sections.length) return

        return new Catalog({elements, articles, sections})
    }


    private static async _loadCatalog() {
        const response = await fetchCatalog()

        if (response) {
            let {elements, articles, sections} = response
            const catalog = new Catalog({articles, sections, elements})
            new Promise(async () => {
                await DB.setStoreItem(ARTICLES_KEY, catalog.articles)
                for (const el of Object.values(catalog.elements)) {
                    await DB.update(StoreName.ITEMS, el)
                }

                for (const el of catalog.sections) {
                    await DB.update(StoreName.SECTIONS, el)
                }
            }).catch(console.error)
            return catalog
        }
    }


    static async getProductDetails(item: CatalogItem | undefined, cb: CbWithErrorType<ProductDetails>) {
        if(!item) return

        DB.getOne<ProductDetails>(StoreName.PRODUCT_DETAILS, item.id)
            .then(pd => cb(undefined, pd ? new ProductDetails(pd) : undefined))
            .catch(e => cb(e))

        fetchElementDetail(item)
            .then(pd => {
                if (pd) {
                    pd = new ProductDetails(pd)
                    pd.id = item.id
                    DB.update(StoreName.PRODUCT_DETAILS, pd)
                    cb(undefined, pd)
                }
            })
            .catch(e => cb(e))
    }


    static async relatedProducts(pd: ProductDetails, cb: CbWithErrorType<ProductDetails[]>) {
        fetchRelatedProducts(pd)
            .then(p => {
                if (!p) return
                p = p.map(e => new ProductDetails(e))
                cb(undefined, p)

            })
            .catch(e => cb(e))
    }


    static async addFavorite(el: CatalogItem) {
        const fav = await DB.getStoreItem<FavoriteType>(FAVORITE_KEY) || {}
        fav[el.id] = el.id
        TgService.setCloudItem<FavoriteType>(FAVORITE_KEY, fav).catch(console.error)
        await DB.setStoreItem(FAVORITE_KEY, fav)
    }


    static async removeFavorite(el: CatalogItem) {
        const fav = await DB.getStoreItem<FavoriteType>(FAVORITE_KEY)
        if (fav) {
            delete fav[el.id]
            TgService.setCloudItem<FavoriteType>(FAVORITE_KEY, fav).catch(console.error)
            await DB.setStoreItem(FAVORITE_KEY, fav)
        }
    }


    static async getFavorites() {
        let f: FavoriteType | undefined = undefined

        try {
            f = await TgService.getCloudItem<FavoriteType>(FAVORITE_KEY)

        } catch (e) {
            console.error(e)
        }
        if (f) {
            DB.setStoreItem(FAVORITE_KEY, f).catch(console.error)
            return f
        }

        f = await DB.getStoreItem<FavoriteType>(FAVORITE_KEY) || {}
        return f
    }


}