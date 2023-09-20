import {createSlice, createAsyncThunk} from '@reduxjs/toolkit';
import { axiosClient } from '../../Utils/axiosClient';

export const getMyInfo = createAsyncThunk('user/getMyInfo', async (body, thankAPI) => {
    try {
        thankAPI.dispatch(setLoading(true));
        const response = await axiosClient.get('user/getMyInfo')
        // console.log(response);
        return response.result
    } catch (e) {
        // console.log(e);
        return Promise.reject(e)
    }finally{
        thankAPI.dispatch(setLoading(false));
    }
})
export const updateMyProfile = createAsyncThunk('user/updateMyProfile', async (body, thankAPI) => {
    try {
        thankAPI.dispatch(setLoading(true));
        const response = await axiosClient.put('/user/', body)
        console.log(response);
        return response.result
    } catch (e) {
        console.log(e);
        return Promise.reject(e)
    }finally{
        thankAPI.dispatch(setLoading(false));
    }
})



const appConfigSlice = createSlice({
    name: 'appConfigSlice',
    initialState: {
        isLoading : false,
        myProfile: null,
        toastData : {}
    },
    reducers :{
        setLoading : (state, action) =>{
            state.isLoading = action.payload;
        },
        showToast : (state, action) => {
            state.toastData = action.payload
        }
    },
    extraReducers: (builder) => {
        builder.addCase(getMyInfo.fulfilled, (state, action) =>{
            state.myProfile = action?.payload?.user
        })
        .addCase(updateMyProfile.fulfilled, (state, action) =>{
            state.myProfile = action?.payload?.user
        })
    }

})

export default appConfigSlice.reducer;

export const {setLoading, showToast} = appConfigSlice.actions;