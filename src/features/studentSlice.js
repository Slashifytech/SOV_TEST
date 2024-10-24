import {
    createAsyncThunk,
    createSlice,
  } from "@reduxjs/toolkit";
import { getPersonalInfo, getStudentInfo } from "./studentApi";


  export const getStudentData = createAsyncThunk(
    "students/getStudentData",
    async (id, { rejectWithValue }) => {
      try {
        const response = await getPersonalInfo(id);
        return response;
      } catch (error) {
        return rejectWithValue(error.response);
      }
    }
  );
  export const studentInfo = createAsyncThunk(
    "students/studentInfo",
    async (id, { rejectWithValue }) => {
      try {
        const response = await getStudentInfo(id);
        return response;
      } catch (error) {
        return rejectWithValue(error.response);
      }
    }
  );
  
  
  

  const studentSlice = createSlice({
    name: 'student',
    initialState: {
      studentInformation:[],
      studentInfoData:[],
      studentOtp: null,
      status: 'idle',
      error: null,

    },
    reducers: {
      setStudentOtp: (state, action) =>{
        state.studentOtp = action.payload
      }
    },
    extraReducers: (builder) => {
      builder
        .addCase(getStudentData.pending, (state) => {
          state.status = "loading";
        })
        .addCase(getStudentData.fulfilled, (state, action) => {
          state.status = "succeeded";
          state.studentInformation = action.payload; 
        })
        .addCase(getStudentData.rejected, (state, action) => {
          state.status = "failed";
          state.error = action.error.message || action.error.data.message;
        })   .addCase(studentInfo.pending, (state) => {
          state.status = "loading";
        })
        .addCase(studentInfo.fulfilled, (state, action) => {
          state.status = "succeeded";
          state.studentInfoData = action.payload; 
        })
        .addCase(studentInfo.rejected, (state, action) => {
          state.status = "failed";
          state.error = action.error.message || action.error.data.message;
        });
    },
  });

  export const {setStudentOtp} = studentSlice.actions
export default  studentSlice.reducer 