// lib/reducers/betReducer.ts
import { createSlice, PayloadAction } from '@reduxjs/toolkit';
// Define a type for the slice state
interface Data {
    accountBalance : {
        currencyCode: string,
        balance: string,
        realBalance: string | null,
        bonusBalance: string | null
    },
    betLevels: Array<string>;
}

interface CounterState {
  data: Data;
  error: string | null;
}
// Define the initial state using that type
const initialState: CounterState = {
    data: {
        accountBalance : {
            currencyCode: "EUR",
            balance: "50000",
            realBalance: null,
            bonusBalance: null
        },
        betLevels:  ["20", "40", "60", "80", "100", "120", "140", "160", "180", "200", "300", "400", "500", "600", "700", "800", "900", "1000"]
    },   
    error: null,
  };


const authSlice = createSlice({
    name: "auth",
    initialState,
    reducers :{        
        authSuccess(state, action: PayloadAction<any>) {
            state.data = action.payload;
            state.error = null;
        },
        authFailure(state, action: PayloadAction<string>) {
            state.error = action.payload;
        }
    }
});
export const { authSuccess, authFailure } = authSlice.actions;
export default authSlice.reducer;