import { createSlice } from "@reduxjs/toolkit";

const initialState = {
    token: localStorage.getItem("token")
        ? JSON.parse(localStorage.getItem("token"))
        : null,
    company: localStorage.getItem("company")
        ? JSON.parse(localStorage.getItem("company"))
        : null,
};

const companySlice = createSlice({
    name: "company",
    initialState: initialState,
    reducers: {
        setCompany(state, actions) {
            state.company = actions.payload;
            localStorage.setItem("company", JSON.stringify(actions.payload));
        },

        setToken(state, actions) {
            state.token = actions.payload;
            localStorage.setItem("token", JSON.stringify(actions.payload));
        },

        logout(state) {
            state.token = null;
            state.company = null;
            localStorage.removeItem("token");
            localStorage.removeItem("company");
        },
    },
});

export const { setCompany, setToken, logout } = companySlice.actions;

export default companySlice.reducer;
