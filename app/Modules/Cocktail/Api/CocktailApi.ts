import { AxiosInstance } from 'axios'
import BaseApi from "~/app/Modules/Api/BaseApi";
import {DefaultCocktailType} from "~/app/Modules/Cocktail/Contaracts";

class CocktailApi extends BaseApi {
    protected MAIN_PATH = '/api/json/v1/1/search.php'

    constructor (protected customClient?: AxiosInstance) {
        super(customClient)
    }

    public async getCocktailsByType<T> (type: DefaultCocktailType) {
        const res = await this.get<T>(this.MAIN_PATH, { s: type })
        return res
    }
}

export default new CocktailApi()