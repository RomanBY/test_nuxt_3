export type DefaultCocktailType = 'margarita' | 'mojito' | 'a1' | 'kir'
type CocktailInstructionLang = 'ES' | 'DE' | 'FR' | 'IT' | 'ZH-HANS' | 'ZH-HANT'

export interface CocktailResponseContract {
    drinks: CocktailContract[] | null
}

export interface CocktailContract extends Record<`strInstructions${CocktailInstructionLang}`, string | null> {
    idDrink: string
    strDrink: string
    strDrinkAlternate: string | null
    strTags: string
    strVideo: string | null
    strCategory: string
    strIBA: string
    strAlcoholic: string
    strGlass: string
    strInstructions: string | null
    strDrinkThumb: string | null
    [key: `strIngredient${number}`]: string | null
    [key: `strMeasure${number}`]: string | null
    strImageSource: string | null
    strImageAttribution: string
    strCreativeCommonsConfirmed: 'Yes' | 'No'
    dateModified: string
}

export interface IngredientContract {
    measure: string | null
    ingredient: string | null
}

export interface CocktailModelContract {
    getTitle (): string
    getImg (): string
    getCategory (): string
    getAlcoholic (): string
    getGlass (): string
    getInstructions (): string
    getIngredients (): IngredientContract[]
}