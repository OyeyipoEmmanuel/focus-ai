import { createSlice } from "@reduxjs/toolkit";

const taskTabSlice = createSlice({
  name: "activeTaskTab",
  initialState: {
    tab: "All"
  },
  reducers: {
    updateTab: (state, action) => {
        state.tab = action.payload
    },
  },
});

export const taskTabActions = taskTabSlice.actions

export default taskTabSlice
