import { configureStore } from '@reduxjs/toolkit'
import { pantryPartyApi } from './pantryPartyApi' 
import slice from './slice'

export const store = configureStore({
    reducer: {
        state: slice,
        [pantryPartyApi.reducerPath]: pantryPartyApi.reducer,
    },
    middleware: (getDefaultMiddleware) =>
    getDefaultMiddleware().concat(pantryPartyApi.middleware)
})