import {CocktailContract, CocktailModelContract, IngredientContract} from "~/app/Modules/Cocktail/Contaracts";
import Model from "~/app/Models/Model";

export default class CocktailModel extends Model<CocktailContract> implements CocktailModelContract {
    getInstructions(): string {
        return this.get('strInstructions') || 'No instruction'
    }

    getTitle(): string {
        return this.get('strDrink')
    }

    getGlass(): string {
        return this.get('strGlass')
    }

    getAlcoholic(): string {
        return this.get('strAlcoholic')
    }

    getCategory(): string {
        return this.get('strCategory')
    }

    getImg(): string {
        return this.get('strDrinkThumb') || ''
    }

    getIngredients(): IngredientContract[] {
        const ingredientKey = 'strIngredient'
        const measureKey = 'strMeasure'
        const arr: IngredientContract[] = Object.entries(this.data).filter(([key, val]) => key.startsWith(ingredientKey)).map(([key, val]) => {
            const keyNumber = +key.replace(/[^0-9]/g,"")
            return {
                ingredient: val as string | null,
                measure: this.get(`strMeasure${keyNumber}`) || null
            }
        })
        return arr.filter(el => el.ingredient)
    }
}