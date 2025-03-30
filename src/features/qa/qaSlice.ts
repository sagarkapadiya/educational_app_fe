import { createSlice, createAsyncThunk, PayloadAction } from '@reduxjs/toolkit';
import { API_ENDPOINTS } from '../../config/api';

interface QAState {
  questions: Question[];
  status: 'idle' | 'loading' | 'succeeded' | 'failed';
  historyStatus: 'idle' | 'loading' | 'succeeded' | 'failed';
  error: string | null;
}

export interface Question {
  question: string;
  answer: string;
  id?: string;
}

const initialState: QAState = {
  questions: [],
  status: 'idle',
  historyStatus: 'idle',
  error: null,
};

// Fetch question history
export const fetchQuestionHistory = createAsyncThunk(
  'qa/fetchHistory',
  async () => {
    const response = await fetch(API_ENDPOINTS.history);
    if (!response.ok) {
      throw new Error('Failed to fetch history');
    }
    const data = await response.json();
    return data.map((item: Question) => ({
      ...item,
      id: item.id || Date.now().toString(),
    }));
  }
);

// Submit new question
export const submitQuestion = createAsyncThunk(
  'qa/submitQuestion',
  async (question: string) => {
    const response = await fetch(API_ENDPOINTS.ask, {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify({ question }),
    });

    if (!response.ok) {
      const errorData = await response.json();
      throw new Error(errorData.error || 'Failed to submit question');
    }

    const data = await response.json();
    return {
      question,
      answer: data.answer,
      id: Date.now().toString(),
    };
  }
);

const qaSlice = createSlice({
  name: 'qa',
  initialState,
  reducers: {},
  extraReducers: (builder) => {
    builder
      // Handle question submission
      .addCase(submitQuestion.pending, (state) => {
        state.status = 'loading';
      })
      .addCase(submitQuestion.fulfilled, (state, action: PayloadAction<Question>) => {
        state.status = 'succeeded';
        state.questions = [...state.questions, action.payload];
      })
      .addCase(submitQuestion.rejected, (state, action) => {
        state.status = 'failed';
        state.error = action.error.message || 'Failed to submit question';
      })
      // Handle history fetching
      .addCase(fetchQuestionHistory.pending, (state) => {
        state.historyStatus = 'loading';
      })
      .addCase(fetchQuestionHistory.fulfilled, (state, action: PayloadAction<Question[]>) => {
        state.historyStatus = 'succeeded';
        state.questions = action.payload;
      })
      .addCase(fetchQuestionHistory.rejected, (state, action) => {
        state.historyStatus = 'failed';
        state.error = action.error.message || 'Failed to fetch history';
      });
  },
});

export default qaSlice.reducer;