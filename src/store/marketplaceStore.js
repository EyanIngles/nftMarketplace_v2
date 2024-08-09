import { createSlice } from '@reduxjs/toolkit';

export const marketplace = createSlice({
    name: 'marketplace',
    initialState: {
        mContract: null,
        checkNftBalance: 0,
        importNftContract: null,

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
    }
})

export const { setMarketContract, setNftBalance, setImportNftContract } = marketplace.actions;

export default marketplace.reducer;