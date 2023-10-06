import {configureStore} from '@reduxjs/toolkit'
import appConfigReduser from './slices/appConfigSlice'
import postsReducer from './slices/postsSlice'
import feedDataReducer from './slices/feedSlice'
import darkModereducer from './slices/darkModeSlice'


export default configureStore({
    reducer: {
        appConfigReduser,
        postsReducer,
        feedDataReducer,
        darkMode: darkModereducer
    }
})