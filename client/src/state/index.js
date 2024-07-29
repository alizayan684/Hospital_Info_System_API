import {createSlice} from '@reduxjs/toolkit'

const initialState={
    uesr:null,
    token:null,
    activites:[],
    mode:'light',
}

export const authSlice = createSlice({
    name: 'auth',
    initialState,
    reducers:{
        setMode: (state) => {
            state.mode = state.mode === "dark" ?  "light": "dark";
        },
        setLogin:(state,action)=>{
            state.user=action.payload.user;
            state.token=action.payload.token;
            state.role=action.payload.role;
        },
        setLogout:(state)=>{
            state.user=null;
            state.token=null;
            state.role=null
        },
    }
})

export const { setMode,setLogin,setLogout,setActivies,setActiviy} =authSlice.actions
export default authSlice.reducer