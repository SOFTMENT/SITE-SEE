import { createSlice } from "@reduxjs/toolkit"

const initialState = {
    userData:null
}
export const userSlice = createSlice({
    name:"user",
    initialState,
    reducers:{
        setUserData:(state,action)=>{
            let data = action.payload
            data ={
                ...data,
                createdAt : data.createdAt.toDate().toDateString()
            }
            state.userData = data
        }
    }
})
export const {setUserData} = userSlice.actions
export default userSlice.reducer