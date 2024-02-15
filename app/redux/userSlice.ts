
'use client'
import { createSlice,createAsyncThunk } from '@reduxjs/toolkit';

type User = {
    name: string;
    email: string;
    sub: string;
    id: number;
    password: string;
    balance: number;
    createdAt: string;
    iat: number;
    exp: number;
    jti: string;
  };

interface State { 
    currentUser: null | User ,
    allUsers: null | User[]
    
}

const initialState : State = {
    currentUser:null,
    allUsers:null
    

};

// export const likeSongAsync = createAsyncThunk(
//     'song/likeSong',
//     async (data) => {
//         console.log("The data is" ,data)
//         let url = "/api/likeSong";
        
//         const response = await fetch(url, {
//             method: 'POST',
//             headers: {
//                 'Content-Type': 'application/json',
//                 // Add any additional headers if needed
//             },
//             body:JSON.stringify(data)
//         });
//         const d = await response.json();
//         console.log(d);
//         return d;
//     }
// );





export const userSlice = createSlice({
    name: 'user',
    initialState,
    // The `reducers` field lets us define reducers and generate associated actions
    reducers: {
        
        setCurrentUser:(state,action) => {
            
            state.currentUser = action.payload
        },
        setAllUser:(state,action) => {
            
            state.allUsers = action.payload
        },
        updateUserBalance:(state,action) => {
            
            if(state.currentUser) {
                state.currentUser.balance = action.payload;
            }
        },
    },
    extraReducers: (builder) => {
        builder   
    },
    


});

export const { setCurrentUser,setAllUser,updateUserBalance} = userSlice.actions;
export default userSlice.reducer;