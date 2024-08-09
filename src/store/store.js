import { configureStore } from '@reduxjs/toolkit'
import marketplace from "../store/marketplaceStore";
import provider from "../store/providerStore";
import vault from '../store/vaultStore';
import nft from '../store/nftStore';

export default configureStore({
  reducer: {
    provider,
    marketplace,
    vault,
    nft
  },
    middleware: getDefaultMiddleware =>
    getDefaultMiddleware({
        serializableCheck: false
    })
})