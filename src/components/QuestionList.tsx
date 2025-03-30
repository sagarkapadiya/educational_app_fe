import React, { useEffect } from 'react';
import { useSelector, useDispatch } from 'react-redux';
import { RootState } from '../app/store';
import { fetchQuestionHistory } from '../features/qa/qaSlice';
import { AppDispatch } from '../app/store';
import ReactMarkdown from 'react-markdown';
import remarkGfm from 'remark-gfm';
import rehypeRaw from 'rehype-raw';
import rehypeMathjax from 'rehype-mathjax';
import remarkMath from 'remark-math';

const QuestionList: React.FC = () => {
  const dispatch = useDispatch<AppDispatch>();
  const { questions, status, historyStatus } = useSelector((state: RootState) => state.qa);

  useEffect(() => {
    if (historyStatus === 'idle') {
      dispatch(fetchQuestionHistory());
    }
  }, [dispatch, historyStatus]);

  if (status === 'loading') {
    return (
      <div className="w-full max-w-2xl space-y-4">
        {questions.map((qa) => (
          <div key={qa.id} className="bg-white p-4 rounded-lg shadow">
            <div className="mb-2">
              <h3 className="font-semibold text-gray-800 mb-2">{qa.question}</h3>
              <hr />
            </div>
            <div className="text-gray-600 prose max-w-none">
              <ReactMarkdown
                remarkPlugins={[remarkGfm, remarkMath]}
                rehypePlugins={[rehypeRaw, rehypeMathjax]}
              >
                {qa.answer}
              </ReactMarkdown>
            </div>
          </div>
        ))}
        <div className="bg-white p-4 rounded-lg shadow animate-pulse">
          <div className="mb-2">
            <div className="h-4 bg-gray-200 rounded w-3/4 mb-2"></div>
            <hr />
          </div>
          <div className="space-y-2">
            <div className="h-3 bg-gray-200 rounded w-full"></div>
            <div className="h-3 bg-gray-200 rounded w-5/6"></div>
            <div className="h-3 bg-gray-200 rounded w-4/6"></div>
          </div>
        </div>
      </div>
    );
  }

  if (historyStatus === 'loading') {
    return (
      <div className="w-full max-w-2xl space-y-4">
        {Array.from({ length: 3 }).map((_, index) => (
          <div key={index} className="bg-white p-4 rounded-lg shadow animate-pulse">
            <div className="mb-2">
              <div className="h-4 bg-gray-200 rounded w-3/4 mb-2"></div>
              <hr />
            </div>
            <div className="space-y-2">
              <div className="h-3 bg-gray-200 rounded w-full"></div>
              <div className="h-3 bg-gray-200 rounded w-5/6"></div>
              <div className="h-3 bg-gray-200 rounded w-4/6"></div>
            </div>
          </div>
        ))}
      </div>
    );
  }

  if (questions.length === 0) {
    return (
      <div className="w-full max-w-2xl text-center text-gray-500">
        No questions yet. Be the first to ask!
      </div>
    );
  }

  return (
    <div className="w-full max-w-2xl space-y-4">
      {questions.map((qa) => (
        <div key={qa.id} className="bg-white p-4 rounded-lg shadow">
          <div className="mb-2">
            <h3 className="font-semibold text-gray-800 mb-2">{qa.question}</h3>
            <hr />
          </div>
          <div className="text-gray-600 prose max-w-none">
            <ReactMarkdown
              remarkPlugins={[remarkGfm, remarkMath]}
              rehypePlugins={[rehypeRaw, rehypeMathjax]}
            >
              {qa.answer}
            </ReactMarkdown>
          </div>
        </div>
      ))}
    </div>
  );
};

export default QuestionList;