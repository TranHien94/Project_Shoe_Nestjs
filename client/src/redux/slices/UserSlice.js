import { createSlice } from "@reduxjs/toolkit";


const initialState = {
    isLogin: false,
    data: ''
}

const UserSlice = createSlice({
    name: "user",
    initialState,
    reducers: {
        setLoginData: (state, action) => {
            localStorage.setItem("token", action.payload.accessToken);
            return {
                isLogin: true,
                data: action.payload
            }
        },
        setLogoutData: (state) => {
            localStorage.removeItem("token");
            return {
                isLogin: false,
                data: null
            }
        }
    }
})

export const {setLoginData, setLogoutData}=UserSlice.actions
export default UserSlice.reducer