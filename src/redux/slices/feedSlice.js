import {createSlice, createAsyncThunk} from '@reduxjs/toolkit';
import { axiosClient } from '../../Utils/axiosClient';
import { setLoading } from './appConfigSlice';
import { likeAndUnlikePost } from './postsSlice';
// const Comments = require("../models/comments");

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
export const bookmarkPost = createAsyncThunk("post/bookmarkPost", async(body, thankAPI) => {
    try {
        thankAPI.dispatch(setLoading(true));
        const response = await axiosClient.post('posts/bookmarkPost', body)
        console.log(response);
            return response.result.post
            
        } catch (e) {
            return Promise.reject(e)
        }finally{
            thankAPI.dispatch(setLoading(false));
    }
})

export const commentOnPost = createAsyncThunk("post/commentOnPost", async(body, thankAPI) => {
    try {
        thankAPI.dispatch(setLoading(true));
        const response = await axiosClient.post('posts/commentOnPost', body)
        console.log('comment', response);
        thankAPI.dispatch(getFeedData())
            return response.result.post
            
        } catch (e) {
            // console.log(e);
            return Promise.reject(e)
        }finally{
            thankAPI.dispatch(setLoading(false));
    }
})
export const deleteMyComment = createAsyncThunk("post/deleteMyComment", async(body, thankAPI) => {
    try {
        thankAPI.dispatch(setLoading(true));
        const response = await axiosClient.delete('posts/deleteComment',{data: body})
        
        console.log('Body', body);
        console.log('comment', response);
            return response.result.post
            
        } catch (e) {
            // console.log(e);
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


            const index = state?.feedData?.posts?.findIndex(item => item._id === post._id)
            if(index !== undefined && index !== -1){
                state.feedData.posts[index] = post
            }
        })
       .addCase(folloAndUnfollowUser.fulfilled, (state, action)=>{
         const user = action?.payload;
         const index = state?.feedData?.followings?.findIndex(item => item._id === user._id)
            if(index !== -1){
                state?.feedData?.followings?.splice(index, 1)

            }else{
                state?.feedData?.followings?.push(user)

            }
       }).addCase(bookmarkPost.fulfilled, (state, action)=> {
        const post = action.payload;
        const index = state?.feedData?.bookmarks?.findIndex((item) => item._id === post?._id)
        if(index !== -1){
            state?.feedData?.bookmarks?.splice(index, 1)

        }else{
            state?.feedData?.bookmarks?.push(post)

        }
    })
    .addCase(commentOnPost.fulfilled, (state, action)=> {
        const post = action.payload;
        const comment = action?.meta?.arg;
        console.log(post);
        const index = state?.feedData?.posts?.findIndex((item) => item._id === post?._id)

        const customPost = {
            comment: comment?.comment,
            commentsName: comment?.commentsName,
            commentsImage: comment?.commentsImage
        }
        console.log(index);
        if(index !== -1){
            state?.feedData?.posts?.[index]?.comments?.push(customPost)
            
        }
        // const post = action.payload;
        // const comment = action?.meta?.arg;
        // console.log(post);
        // const index = state?.feedData?.posts?.findIndex((item) => item._id === post?._id)
        // console.log(index);
        // if(index !== -1){
        //     state?.feedData?.posts?.[index]?.comments?.push(comment)
        // }
    })
    .addCase(deleteMyComment.fulfilled, (state, action)=> {
        const post = action.payload;
        // console.log('comments',comments);

        
        const comment = action?.meta?.arg;
        console.log('comment',comment);

        const currentPost = state?.feedData?.posts?.findIndex((item) => item._id === post?._id)
        console.log('currentPost',currentPost);

        const index = state?.feedData?.posts?.[currentPost]?.comments?.findIndex(item => item._id === comment.commentsId)
        console.log('index',index);
        if(index !== -1){
            state?.feedData?.posts?.[currentPost]?.comments?.splice(index, 1)
        }
    })
    }

})

export default feedSlice.reducer;