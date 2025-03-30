import React, { useState } from 'react';
import { Send } from 'lucide-react';
import { useDispatch, useSelector } from 'react-redux';
import { submitQuestion } from '../features/qa/qaSlice';
import { AppDispatch, RootState } from '../app/store';

const QuestionForm: React.FC = () => {
  const [question, setQuestion] = useState('');
  const dispatch = useDispatch<AppDispatch>();
  const { status, error } = useSelector((state: RootState) => state.qa);

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    if (question.trim()) {
      await dispatch(submitQuestion(question));
      setQuestion('');
    }
  };

  return (
    <div className="w-full max-w-2xl">
      {error && (
        <div className="mb-4 p-4 bg-red-100 text-red-700 rounded-lg">
          {error}
        </div>
      )}
      <form onSubmit={handleSubmit} className="flex gap-2">
        <input
          type="text"
          value={question}
          onChange={(e) => setQuestion(e.target.value)}
          placeholder="Ask your question..."
          className="flex-1 px-4 py-2 rounded-lg border border-gray-300 focus:outline-none focus:ring-2 focus:ring-blue-500"
          disabled={status === 'loading'}
        />
        <button
          type="submit"
          className={`px-4 py-2 bg-blue-500 text-white rounded-lg transition-colors ${
            status === 'loading'
              ? 'opacity-50 cursor-not-allowed'
              : 'hover:bg-blue-600'
          }`}
          disabled={status === 'loading'}
        >
          <Send className="w-5 h-5" />
        </button>
      </form>
    </div>
  );
};

export default QuestionForm;