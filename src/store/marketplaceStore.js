import { createSlice } from '@reduxjs/toolkit';

export const marketplace = createSlice({
    name: 'marketplace',
    initialState: {
        mContract: null,
        checkNftBalance: 0,
        importNftContract: null,
        getTokenIds: [],

    },
    reducers: {
        setMarketContract: (state, action) => {
            state.mContract = action.payload
        },
        setNftBalance: (state, action) => {
            state.checkNftBalance = action.payload
        },
        setImportNftContract: (state, action) => {
            state.importNftContract = action.payload
        },
        setGetTokenIds: (state, action) => {
            state.getTokenIds = action.payload
        },
    }
})

export const { setMarketContract, setNftBalance, setImportNftContract, setGetTokenIds } = marketplace.actions;

export default marketplace.reducer;