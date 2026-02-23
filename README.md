# CV Analyzer - AI-Powered Resume Review Application

A professional Vue 3 application that uses AI to analyze resumes/CVs and compare them against job descriptions.

## 🌟 Features

### Review CV Mode
- Upload CV (PDF/DOCX)
- AI-powered analysis with LiquidAI
- Detailed issue detection with severity levels
- Inline suggestions for improvement
- Accept/Reject individual suggestions
- Beautiful CV preview

### Compare CV vs JD Mode
- Upload both CV and Job Description
- AI comparison analysis
- Match score breakdown (Skills, Experience, Overall)
- Matched requirements with evidence
- Missing requirements with detailed reasons
- Visual score indicators

## 🛠️ Tech Stack

- **Framework**: Vue 3 with Composition API
- **Language**: TypeScript
- **State Management**: Pinia
- **Build Tool**: Vite
- **PDF Parser**: PDF.js
- **DOCX Parser**: Mammoth.js
- **HTTP Client**: Axios
- **AI API**: LiquidAI (LFM 2.5-1.2B-Thinking model - FREE)

## 📦 Installation

```bash
# Install dependencies
npm install

# Run development server
npm run dev

# Build for production
npm run build

# Preview production build
npm run preview

# Type check
npm run type-check
```

## 🚀 Getting Started

1. **Install dependencies**:
   ```bash
   npm install
   ```

2. **Start development server**:
   ```bash
   npm run dev
   ```

3. **Open browser** at `http://localhost:5173`

4. **Upload your CV** and start analyzing!

## 📁 Project Structure

```
cv-analyzer-vue/
├── src/
│   ├── assets/           # Global styles
│   │   └── main.css
│   ├── components/       # Vue components
│   │   ├── AppHeader.vue
│   │   ├── TabNavigation.vue
│   │   ├── FileUpload.vue
│   │   ├── LoadingSpinner.vue
│   │   ├── ErrorMessage.vue
│   │   ├── CVPreview.vue
│   │   ├── IssuesPanel.vue
│   │   └── CompareResults.vue
│   ├── views/           # Page views
│   │   ├── ReviewView.vue
│   │   └── CompareView.vue
│   ├── stores/          # Pinia stores
│   │   └── cvStore.ts
│   ├── services/        # Business logic
│   │   ├── fileParser.ts
│   │   └── aiService.ts
│   ├── types/           # TypeScript types
│   │   └── cv.ts
│   ├── prompts/         # AI prompts
│   │   ├── review.ts
│   │   └── compare.ts
│   ├── schemas/         # JSON schemas
│   │   ├── review.schema.json
│   │   └── compare.schema.json
│   ├── App.vue          # Root component
│   └── main.ts          # Entry point
├── index.html
├── package.json
├── tsconfig.json
├── vite.config.ts
└── README.md
```

## 🎨 Design Philosophy

- **Editorial/Magazine meets Brutalist aesthetic**
- **Color Palette**: Deep navy + Electric cyan
- **Typography**: Outfit (display) + JetBrains Mono (code/data)
- **Layout**: Asymmetric grid with clear hierarchy
- **Animations**: Smooth, purposeful transitions

## 🔧 Architecture

### State Management (Pinia)
- Centralized state for CV, JD, and analysis results
- Reactive computed properties
- Clean action methods

### Service Layer
- **FileParserService**: Extract and parse PDF/DOCX files
- **AIService**: Communicate with LiquidAI API

### Component Structure
- **Smart Components** (Views): Connected to store
- **Dumb Components**: Pure presentation

### Type Safety
- Full TypeScript coverage
- Strict type checking
- Interface definitions for all data structures

## 📝 Coding Standards

Following the requirements document:

1. **State-driven**: UI renders based on state only
2. **Side-effect isolation**: API calls in watch/onMounted
3. **Single source of truth**: No duplicate state
4. **Composition API**: Setup function pattern
5. **Computed properties**: Pure logic, no async
6. **Watch**: For API calls and side effects
7. **Type safety**: TypeScript throughout

## 🔒 API Configuration

The application uses LiquidAI's free API endpoint:
- **Endpoint**: `https://openrouter.ai/api/v1/chat/completions`
- **Model**: `liquid/lfm-2.5-1.2b-thinking:free`
- **No API key required** for the free tier

## 🌐 Browser Support

- Chrome/Edge (latest)
- Firefox (latest)
- Safari (latest)

## 📄 License

MIT License

## 🤝 Contributing

Contributions are welcome! Please feel free to submit a Pull Request.

## 🐛 Known Issues

- Large PDF files (>5MB) may take longer to parse
- Complex DOCX formatting might not be preserved
- AI responses may vary in quality

## 🔮 Future Enhancements

- [ ] CV versioning and history
- [ ] Diff viewer (old vs new)
- [ ] Export to PDF/DOCX
- [ ] Multiple AI model support
- [ ] Custom prompt templates
- [ ] Batch processing
- [ ] User authentication
- [ ] Save analysis results

## 📧 Support

For issues and questions, please open an issue on GitHub.

---

Built with ❤️ using Vue 3 + TypeScript + AI
