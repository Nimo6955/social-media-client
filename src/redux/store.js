import {configureStore} from '@reduxjs/toolkit'
import appConfigReduser from './slices/appConfigSlice'
import postsReducer from './slices/postsSlice'
import feedDataReducer from './slices/feedSlice'


export default configureStore({
    reducer: {
        appConfigReduser,
        postsReducer,
        feedDataReducer
    }
})