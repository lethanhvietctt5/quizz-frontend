import { createSlice, PayloadAction } from '@reduxjs/toolkit';
import Player from 'types/player';
import Question from 'types/question';

type GameState = {
  reportId?: string;
  isHost: boolean;
  questions: Array<Question>;
  players: Array<Player>;
  currentQuestion: number;
  currentAns: string;
  canIncrease: boolean;
};

const initState: GameState = {
  reportId: undefined,
  isHost: false,
  questions: [],
  players: [],
  currentQuestion: 0,
  currentAns: '',
  canIncrease: false,
};

const gameSlice = createSlice({
  name: 'game',
  initialState: initState,
  reducers: {
    setReportId: (state, action: PayloadAction<string>) => {
      state.reportId = action.payload;
    },

    setHost: (state, action: PayloadAction<boolean>) => {
      state.isHost = action.payload;
    },

    setListQuestions: (state, action: PayloadAction<Array<Question>>) => {
      state.questions = action.payload;
    },

    setListPlayers: (state, action: PayloadAction<Array<Player>>) => {
      state.players = action.payload;
      state.players = state.players.filter(player => player.status === 1);
    },

    removePlayer: (state, action: PayloadAction<string>) => {
      state.players = state.players.filter(player => player.player_id !== action.payload);
    },

    setAns: (state, action: PayloadAction<string>) => {
      state.currentAns = action.payload;
    },

    nextQuesion: state => {
      if (state.canIncrease) {
        state.currentQuestion++;
        state.canIncrease = false;
        state.currentAns = '';
      }
    },

    canInc: state => {
      state.canIncrease = true;
    },

    resetGame: state => {
      state.reportId = undefined;
      state.isHost = false;
      state.questions = [];
      state.players = [];
      state.currentQuestion = 0;
      state.currentAns = '';
      state.canIncrease = false;
    },
  },
});

const gameReducer = gameSlice.reducer;

export const {
  setHost,
  setListPlayers,
  setReportId,
  setListQuestions,
  setAns,
  nextQuesion,
  canInc,
  resetGame,
  removePlayer,
} = gameSlice.actions;

export default gameReducer;
