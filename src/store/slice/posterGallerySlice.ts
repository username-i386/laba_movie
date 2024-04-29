import { PayloadAction, createSlice } from "@reduxjs/toolkit";

export interface IPoster {
    movieId: number
    posterUrl: string
}
interface IPopsterGalleryState {
    posters: IPoster[]
}
const initialState: IPopsterGalleryState = {
    posters: []
};

const posterGallerySlice = createSlice({
    name: 'posterGallery',
    initialState,
    reducers: {
        setPosters: (state: IPopsterGalleryState, action: PayloadAction<IPoster>): void => {
            state.posters.push(action.payload);
        },
        removePosters: (state: IPopsterGalleryState): void => {
            state.posters = [];
        },
    },
});

export const { setPosters, removePosters } = posterGallerySlice.actions;
export default posterGallerySlice.reducer;