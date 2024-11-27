import { createSlice, createAsyncThunk } from '@reduxjs/toolkit';
import toast from 'react-hot-toast';
// export const fetchUsers: any = createAsyncThunk(
//   'users/updatedUserDetails',
//   async(body: any, thunkApi) => {
//     const response = await fetch('/api/user', {
//       method: 'POST',
//       body,
//     });

//     const data = await response.json();
//     if (data?.status === 200) {
//       toast.success('profile updated successfully!');
//     }
//     return data;
//   }
// );

const initialState = {
  userDetails: {},
  loading: false,
  value: 10,
};

const userSlice:any = createSlice({
  name: 'users',
  initialState,
  reducers: {},
  // extraReducers: (builder) => {
  //   builder.addCase(fetchUsers.fulfilled, (state: any, action: any) => {
  //     state.loading = false;
  //     state.userDetails = action.payload.updatedUserDetails;
  //   });
  //   builder.addCase(fetchUsers.pending, (state, action) => {
  //     state.loading = true;
  //   });
  // },
});

export default userSlice;
