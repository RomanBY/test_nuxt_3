import {DefaultCocktailType} from "~/app/Modules/Cocktail/Contaracts";

export default defineNuxtRouteMiddleware((to) => {
    const defaultTypes: DefaultCocktailType[] = ['margarita', 'kir', 'a1', 'mojito']
    if (!to.params.slug || !defaultTypes.includes(<DefaultCocktailType>to.params.slug)) {
        return abortNavigation({
            statusCode: 404,
            message: 'Wrong path'
        })
    }
})