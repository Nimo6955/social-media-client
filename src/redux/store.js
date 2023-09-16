import {configureStore} from '@reduxjs/toolkit'
import appConfigReduser from './slices/appConfigSlice'
import postsReducer from './slices/postsSlice'


export default configureStore({
    reducer: {
        appConfigReduser,
        postsReducer
    }
})