type Question = {
  question_id: string;
  game_id: string;
  content: string;
  ans_A: string;
  ans_B: string;
  ans_C: string;
  ans_D: string;
  correct_ans: string;
  duration_sec: number;
};

export default Question;
