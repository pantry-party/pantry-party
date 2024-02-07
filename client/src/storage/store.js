import { configureStore } from '@reduxjs/toolkit'
import { pantryPartyApi } from './pantryPartyApi' 

export const store = configureStore({
    reducer: {
        [pantryPartyApi.reducerPath]: pantryPartyApi.reducer,
    },
    middleware: (getDefaultMiddleware) =>
    getDefaultMiddleware().concat(pantryPartyApi.middleware)
})