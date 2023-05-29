import { createSlice } from '@reduxjs/toolkit';

const initialState = {
  profiles: [],
};

const ProfileListSlice = createSlice({
  name: 'profiles',
  initialState,
  reducers: {
    // For creating a new profile
    addProfile: (state, action) => {
      state.profiles.push(action.payload);
    },
    // For updating the state
    editProfile: (state, action) => {
      const matchIndex = state.profiles.findIndex((item) => {
        return item.id === action.payload.id;
      });
      state.profiles.splice(matchIndex, 1, action.payload);
    },
    // For deleting a profile
    deleteProfile: (state, action) => {
      const matchIndex = state.profiles.findIndex((item) => {
        return item.id === action.payload.id;
      });
      state.profiles.splice(matchIndex, 1);
    },
  },
});

export const { addProfile, editProfile, deleteProfile } = ProfileListSlice.actions;

export default ProfileListSlice.reducer;
