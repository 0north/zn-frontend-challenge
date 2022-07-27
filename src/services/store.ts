import React from "react"

import { configureStore } from '@reduxjs/toolkit'
import { portsReducer } from './ports-reducer'
import { voyageReducer } from './voyage-reducer'

export const store = configureStore({
    reducer: {
        ports: portsReducer,
        voyage: voyageReducer,
    }
})

export type RootState = ReturnType<typeof store.getState>
export type AppDispatch = typeof store.dispatch