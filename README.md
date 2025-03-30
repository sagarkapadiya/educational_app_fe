# Educational Q&A Web App

A React-based Educational Q&A platform that allows users to submit questions and receive answers. Built with modern web technologies and best practices.

## Features

- Clean and intuitive user interface
- Real-time question submission
- State management with Redux Toolkit
- Responsive design with Tailwind CSS
- TypeScript for type safety

## Tech Stack

- React
- Redux Toolkit
- TypeScript
- Tailwind CSS
- Vite
- Lucide React (for icons)

## Getting Started

### Prerequisites

- Node.js (v20 or higher)
- npm or yarn

### Installation

1. Clone the repository:
```bash
git clone https://github.com/sagarkapadiya/educational_app_fe.git
```

2. Navigate to the project directory:
```bash
cd educational_app_fe
```

3. Install dependencies:
```bash
npm install
```

### Development

To start the development server:

```bash
npm run dev
```

The application will be available at `http://localhost:5173`

### Building for Production

To create a production build:

```bash
npm run build
```

The built files will be in the `dist` directory.

## Project Structure

```
src/
├── app/
│   └── store.ts           # Redux store configuration
├── components/
│   ├── QuestionForm.tsx   # Question submission form
│   └── QuestionList.tsx   # Display list of Q&As
├── features/
│   └── qa/
│       └── qaSlice.ts     # Redux slice for Q&A functionality
├── App.tsx                # Main application component
└── main.tsx              # Application entry point
```

## Contributing

1. Fork the repository
2. Create your feature branch (`git checkout -b feature/AmazingFeature`)
3. Commit your changes (`git commit -m 'Add some AmazingFeature'`)
4. Push to the branch (`git push origin feature/AmazingFeature`)
5. Open a Pull Request

## License

This project is licensed under the MIT License - see the LICENSE file for details.
