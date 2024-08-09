import { createSlice } from '@reduxjs/toolkit';

export const vault = createSlice({
    name: 'vault',
    initialState: {
        vContract: null,
    },
    reducers: {
        setVaultContract: (state, action) => {
            state.vContract = action.payload
        },
    }
})

export const { setVaultContract } = vault.actions;

export default vault.reducer;