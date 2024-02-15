
'use client'
import { createSlice,createAsyncThunk } from '@reduxjs/toolkit';

interface State { 
    currentUser: null | object ,
    
}

const initialState : State = {
    currentUser:null,
    

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
    },
    extraReducers: (builder) => {
        builder   
    },
    


});

export const { setCurrentUser} = userSlice.actions;
export default userSlice.reducer;