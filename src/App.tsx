import React from 'react';
import { Provider } from 'react-redux';
import { store } from './app/store';
import QuestionForm from './components/QuestionForm';
import QuestionList from './components/QuestionList';
import { HelpCircle } from 'lucide-react';

function App() {
  return (
    <Provider store={store}>
      <div className="min-h-screen bg-gray-100">
        <header className="bg-white shadow">
          <div className="max-w-7xl mx-auto px-4 py-6">
            <div className="flex items-center gap-2">
              <HelpCircle className="w-8 h-8 text-blue-500" />
              <h1 className="text-3xl font-bold text-gray-900">Educational Q&A</h1>
            </div>
          </div>
        </header>
        
        <main className="max-w-7xl mx-auto px-4 py-8">
          <div className="flex flex-col items-center gap-8">
            <QuestionForm />
            <QuestionList />
          </div>
        </main>
      </div>
    </Provider>
  );
}

export default App;