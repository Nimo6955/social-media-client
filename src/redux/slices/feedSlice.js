import {createSlice, createAsyncThunk} from '@reduxjs/toolkit';
import { axiosClient } from '../../Utils/axiosClient';
import { setLoading } from './appConfigSlice';
import { likeAndUnlikePost } from './postsSlice';

export const  getFeedData = createAsyncThunk('user/getFeedData', async (_, thankAPI) => {
    try {
        thankAPI.dispatch(setLoading(true));
        const response = await axiosClient.get('user/getFeedData')
        console.log('user Profile',response);
        return response.result
    } catch (e) {
        console.log(e);
        return Promise.reject(e)
    }finally{
        thankAPI.dispatch(setLoading(false));
    }
})

export const folloAndUnfollowUser = createAsyncThunk('user/followAndUnfollow', async (body, thankAPI)=>{
    try {
        thankAPI.dispatch(setLoading(true));
        const response = await axiosClient.post('user/follow', body)
        console.log('follow data',response);
        return response.result.user
    } catch (e) {
        console.log(e);
        return Promise.reject(e)
    }finally{
        thankAPI.dispatch(setLoading(false));
    }
})


const feedSlice = createSlice({
    name: 'feedSlice',
    initialState: {
       feedData: {}
    },
    extraReducers: (builder) => {
        builder.addCase(getFeedData.fulfilled, (state, action) =>{
            state.feedData = action?.payload
        })
        .addCase(likeAndUnlikePost.fulfilled, (state, action)=> {
            const post = action?.payload;


            const index = state?.feedData?.posts?.findIndex(item => item._id == post._id)
            if(index != undefined && index != -1){
                state.feedData.posts[index] = post
            }
        })
       .addCase(folloAndUnfollowUser.fulfilled, (state, action)=>{
         const user = action?.payload;
         const index = state?.feedData?.followings?.findIndex(item => item._id === user._id)
            if(index != -1){
                state?.feedData?.followings?.splice(index, 1)

            }else{
                state?.feedData?.followings?.push(user)

            }
       })
    }

})

export default feedSlice.reducer;