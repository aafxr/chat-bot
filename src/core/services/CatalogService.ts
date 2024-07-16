import {Catalog} from "../classes/Catalog";
import {CbWithErrorType} from "../../types/CbWithErrorType";
import {DB} from "../db/DB";
import {CatalogArticlesType} from "../../types/CatalogArticlesType";
import {StoreName} from "../../types/StoreName";
import {CatalogItem} from "../classes/CatalogItem";
import {CatalogSection} from "../classes/CatalogSection";
import {fetchCatalog} from "../../api/fetchCatalog";


const ARTICLES_KEY = 'articles'


export class CatalogService {
    static async getCatalog(cb: CbWithErrorType<Catalog>) {
        let catalog = await this._loadCatalogLocal()

        if (catalog) cb(undefined, catalog)

        this._loadCatalog()
            .then(c => c && cb(undefined, c))
            .catch(e => cb(e))
    }



    private static async _loadCatalogLocal() {
        const articles = await DB.getStoreItem<CatalogArticlesType>(ARTICLES_KEY)
        if (!articles) return

        let elements = (await DB.getAll<CatalogItem>(StoreName.ITEMS)).reduce<Catalog['elements']>((a, e) => {
            a[e.id] = new CatalogItem(e)
            return a
        }, {})
        if (!elements.length) return

        let sections = (await DB.getAll<CatalogSection>(StoreName.SECTIONS)).map(e => new CatalogSection(e))
        if (!sections.length) return

        return new Catalog({elements, articles, sections})
    }



    private static async _loadCatalog() {
        const response = await fetchCatalog()

        if (response) {
            let {elements, articles, sections} = response
            const catalog = new Catalog({articles, sections, elements})
            await DB.setStoreItem(ARTICLES_KEY, catalog.articles)
            for (const el of Object.values(catalog.elements)){
                await DB.update(StoreName.ITEMS, el)
            }

            for (const el of catalog.sections){
                await DB.update(StoreName.SECTIONS, el)
            }
            return catalog
        }
    }


}