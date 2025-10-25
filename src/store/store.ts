import { configureStore } from "@reduxjs/toolkit";
import taskTabSlice from "./activeTaskTab";

const store = configureStore({
    reducer: {
        taskTabState: taskTabSlice.reducer
    }
})

export default store