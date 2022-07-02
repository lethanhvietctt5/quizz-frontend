import { createSlice, PayloadAction } from "@reduxjs/toolkit";
import Player from "../../types/player";

type GameState = {
    listPlayer: Player[];
}
const initState: GameState = {
    listPlayer: []
};

const gameSlice = createSlice({
    name: "game",
    initialState: initState,
    reducers: {
        reloadListPlayer: (state, action: PayloadAction<GameState>) => {
            state.listPlayer = action.payload.listPlayer;
        }
    },
});

const gameReducer = gameSlice.reducer;

export const { reloadListPlayer } = gameSlice.actions;

export default gameReducer;
