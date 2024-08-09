import { createSlice } from '@reduxjs/toolkit';

export const provider = createSlice({
    name: 'provider',
    initialState: {
        provider: null,
        network: null,
        account: null,
    },
    reducers: {
        setProvider: (state, action) => {
            state.provider = action.payload
        },
        setNetwork: (state, action) => {
            state.network = action.payload
        },
        setAccount: (state, action) => {
            state.account = action.payload
        },
    }
})

export const { setProvider, setNetwork, setAccount } = provider.actions;

export default provider.reducer;