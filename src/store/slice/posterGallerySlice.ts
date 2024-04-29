import { PayloadAction, createSlice } from "@reduxjs/toolkit";

export interface IPoster {
    movieId: number
    posterUrl: string
}
const initialState: IPoster[] = [];

const posterGallerySlice = createSlice({
    name: 'posterGallery',
    initialState,
    reducers: {
        setPosters: (state: IPoster[], action: PayloadAction<IPoster>): void => {
            state.push(action.payload);
        },
        removePosters: (state: IPoster[]): void => {
            state = [];
        },
    },
});

export const { setPosters, removePosters } = posterGallerySlice.actions;
export default posterGallerySlice.reducer;