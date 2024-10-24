import { createAsyncThunk, createSlice } from "@reduxjs/toolkit";
import { getAllApplicationforApproval, getAllApproval } from "./adminApi";

// Async thunk to fetch agent data
export const applicationForApproval = createAsyncThunk(
  "agents/applicationForApproval",
  async (typeData, { rejectWithValue }) => {
    try {
      const response = await getAllApplicationforApproval(typeData);
      return response;
    } catch (error) {
      return rejectWithValue(
        error.response ? error.response.data : "Failed to fetch agent data"
      );
    }
  }
);
export const agentStudentApprovals = createAsyncThunk(
  "agents/agentStudentApprovals",
  async (typeData, { rejectWithValue }) => {
    try {
      const response = await getAllApproval(typeData);
      return response;
    } catch (error) {
      return rejectWithValue(
        error.response ? error.response.data : "Failed to fetch agent data"
      );
    }
  }
);

const adminSlice = createSlice({
  name: "admin",
  initialState: {
    approvals: null,
    applications: null,
    tabType: "",
    status: "idle",
    error: null,
    updateState: false
  },
  reducers: {
    setTabType: (state, action)=>{
      state.updateState = !state.updateState
      state.tabType = action.payload
    }

  },
  extraReducers: (builder) => {
    builder
      .addCase(applicationForApproval.pending, (state) => {
        state.status = "loading";
      })
      .addCase(applicationForApproval.fulfilled, (state, action) => {
        state.status = "succeeded";
        state.applications = action.payload;
      })
      .addCase(applicationForApproval.rejected, (state, action) => {
        state.status = "failed";
        state.error = action.payload || action.error.message;
      })
      .addCase(agentStudentApprovals.pending, (state) => {
        state.status = "loading";
      })
      .addCase(agentStudentApprovals.fulfilled, (state, action) => {
        state.status = "succeeded";
        state.approvals = action.payload;
      })
      .addCase(agentStudentApprovals.rejected, (state, action) => {
        state.status = "failed";
        state.error = action.payload || action.error.message;
      });
  },
});
export const {setTabType} = adminSlice.actions
export default adminSlice.reducer;
