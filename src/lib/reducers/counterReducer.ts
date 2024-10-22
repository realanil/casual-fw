// lib/reducers/counterReducer.ts
import { createSlice, PayloadAction } from '@reduxjs/toolkit';
// Define a type for the slice state

interface CounterState {
  value: number;
}
// Define the initial state using that type

const initialState: CounterState = {
  value: 0,
};

const counterSlice = createSlice({
  name: 'counter',
    // `createSlice` will infer the state type from the `initialState` argument

  initialState,
  reducers: {
    increment(state, action: PayloadAction<any>) {
      console.log("pppppppp=>", state.value, action)
      state.value += 1;
    },
    decrement(state, action: PayloadAction<any>) {
      console.log("pppppppp=>", state, action)
      state.value -= 1;
    },
    // setCount(state, action: PayloadAction<number>) {
    //   state.value = action.payload;
    // },
  },
});

export const { increment, decrement, } = counterSlice.actions;
export default counterSlice.reducer;