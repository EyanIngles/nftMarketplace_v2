import { createSlice } from '@reduxjs/toolkit';

export const nft = createSlice({
    name: 'nft',
    initialState: {
        nContract: null,
        mintNft: 0,
        mintCost: 0,
    },
    reducers: {
        setNftContract: (state, action) => {
            state.nContract = action.payload
        },
        setMintNft: (state, action) => {
            state.mintNft = action.payload
        },
        setNftMintCost: (state, action) => {
            state.mintCost = action.payload
        },
    }
})

export const { setNftContract, setMintNft, setNftMintCost } = nft.actions;

export default nft.reducer;