import {createSlice, createAsyncThunk} from '@reduxjs/toolkit';
import { axiosClient } from '../../Utils/axiosClient';
import { setLoading } from './appConfigSlice';

export const  getUserProfile = createAsyncThunk('user/getUserProfile', async (body, thankAPI) => {
    try {
        thankAPI.dispatch(setLoading(true));
        const response = await axiosClient.post('user/getUserProfile', body)
        console.log('user Profile',response);
        return response.result
    } catch (e) {
        // console.log(e);
        return Promise.reject(e)
    }finally{
        thankAPI.dispatch(setLoading(false));
    }
})


const postsSlice = createSlice({
    name: 'postsSlice',
    initialState: {
       userProfile: {}
    },
    extraReducers: (builder) => {
        builder.addCase(getUserProfile.fulfilled, (state, action) =>{
            state.userProfile = action?.payload
        })
       
    }

})

export default postsSlice.reducer;