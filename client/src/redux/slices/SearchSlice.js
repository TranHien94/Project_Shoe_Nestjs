import { createSlice } from "@reduxjs/toolkit"


const initialState = {
    search:"",
    searchResults:[]
}
const SearchSlice = createSlice({
    name: "search",
    initialState,
    reducers: {
        setSearch: (state, action) => {
            state.search= action.payload
        },
        setSearchResults: (state, action) => {
            state.searchResults = action.payload
        }
    }
})

export const { setSearchResults, setSearch } = SearchSlice.actions
export default SearchSlice.reducer