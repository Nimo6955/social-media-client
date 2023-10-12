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

export const likeAndUnlikePost = createAsyncThunk("post/likeAndUnlike", async(body, thankAPI) => {
    try {
        thankAPI.dispatch(setLoading(true));
        const response = await axiosClient.post('posts/like', body)
        
            return response.result.post
            
        } catch (e) {
            // console.log(e);
            return Promise.reject(e)
        }finally{
            thankAPI.dispatch(setLoading(false));
    }
})
export const deletePost = createAsyncThunk("post/deletePost", async(body, thankAPI) => {
    try {
        thankAPI.dispatch(setLoading(true));
        const response = await axiosClient.delete('/posts/delete',{data: body})
        console.log(response);
        return response.result.post

        
    } catch (e) {
        console.log(e);
        return Promise.reject(e)
    }finally{
        thankAPI.dispatch(setLoading(false));
    }
})
export const updatePost = createAsyncThunk("post/updatePost", async(body, thankAPI) => {
    try {
        thankAPI.dispatch(setLoading(true));
        const response = await axiosClient.put('/posts/', body)
        console.log(response);
        return response.result.post

        
    } catch (e) {
        console.log(e);
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
        .addCase(likeAndUnlikePost.fulfilled, (state, action)=> {
            const post = action.payload;
            const index = state?.userProfile?.posts?.findIndex(item => item._id === post._id)
            if(index !== undefined && index !== -1){
                state.userProfile.posts[index] = post
            }
        })
        .addCase(deletePost.fulfilled, (state, action) => {
            const post = action.payload;
            const index = state?.userProfile?.posts?.findIndex(item => item._id === post._id)
            if(index !== -1){
                state?.userProfile?.posts?.splice(index, 1)

            }
        })
        .addCase(updatePost.fulfilled , (state, action) =>{
            const post = action.payload;
            const index = state?.userProfile?.posts?.findIndex(item => item._id === post._id)
            if(index !== undefined && index !== -1){
                state.userProfile.posts[index] = post
            }
        })
       
    }

})

export default postsSlice.reducer;