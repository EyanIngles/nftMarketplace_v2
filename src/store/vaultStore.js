import { createSlice } from '@reduxjs/toolkit';

export const vault = createSlice({
    name: 'vault',
    initialState: {
        vContract: null,
        listNft: null,
    },
    reducers: {
        setVaultContract: (state, action) => {
            state.vContract = action.payload
        },
        setListNft: (state, action) => {
            state.listNft = action.payload
        },
    }
})

export const { setVaultContract, setListNft } = vault.actions;

export default vault.reducer;