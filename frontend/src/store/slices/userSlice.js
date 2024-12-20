import { createSlice } from '@reduxjs/toolkit';

const initialState = {
    id : null,
    name: null,
    role: null
}

export const userSlice = createSlice({
    name:'user',
    initialState,
    reducers : {
        addUser : (state, action)=>{
            state.id = action.payload.email;
            state.name = action.payload.name;
            state.role = action.payload.role
        },
        removeUser : (state)=>{
            state.id = null;
            state.name = null;
            state.role = null
        }
    }
})

export const {addUser, removeUser} = userSlice.actions;

export default userSlice.reducer;