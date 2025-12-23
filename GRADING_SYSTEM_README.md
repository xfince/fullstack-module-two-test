# Module 2 Automated Grading System

Automated grading system for Module 2 React/Vite restaurant website projects.

## 📋 Overview

This grading system evaluates student projects based on 11 criteria covering:
- Frontend components (Header, Hero, Signature Dishes, Menu Pages, Form, Chatbot, Footer)
- React implementation (hooks, routing, state management)
- JavaScript functionality (10 sub-features)
- Responsiveness
- Git version control
- Deployment

**Total Points**: 49  
**Passing Grade**: 30 (61%)

## 🚀 Quick Start

### Prerequisites
- Node.js 18+ 
- npm or yarn
- OpenAI API key (for GPT evaluation)

### Installation

```bash
# Install dependencies
npm install

# Install grading folder dependencies
cd grading-folder
npm install
cd ..
```

### Configuration

1. Copy `.env.example` to `.env`:
```bash
cp .env.example .env
```

2. Add your OpenAI API key to `.env`:
```
OPENAI_API_KEY=your_key_here
```

3. Ensure `DEPLOYMENT_URL.txt` contains the student's deployment URL

### Running Grading

```bash
# Run complete grading (unit tests + GPT + report)
npm run grade

# Run individual steps
npm run grade:unit      # Unit tests only
npm run grade:gpt       # GPT evaluation only
npm run grade:report    # Generate report only

# Run all tests with coverage
npm test:all
```

## 📁 Project Structure

```
.
├── grading-folder/          # Student project to grade
│   ├── src/
│   │   ├── components/      # React components
│   │   ├── pages/           # Page components
│   │   ├── Data/            # Data files
│   │   └── App.jsx          # Main app
│   ├── package.json
│   └── vite.config.js
├── tests/                   # Test files
│   ├── frontend/
│   │   ├── components.test.js
│   │   ├── routing.test.js
│   │   └── hooks.test.js
│   ├── integration/
│   │   └── data-flow.test.js
│   ├── deployment/
│   │   ├── url-accessibility.test.js
│   │   └── functionality.test.js
│   └── git/
│       └── commit-history.test.js
├── grading-scripts/
│   ├── run-unit-tests.js    # Runs all tests
│   ├── gpt-evaluator.js     # GPT evaluation
│   ├── generate-report.js   # Final report
│   ├── code-summarizer.js   # Code analysis
│   └── analyze-git-history.js
├── rubric.json              # Grading rubric
├── package.json
├── jest.config.js
└── DEPLOYMENT_URL.txt       # Student's deployment URL
```

## 📊 Grading Criteria

### Criterion 1: Header & Navigation (4 points)
- Sticky navigation using useEffect
- Dropdown menu with 4+ categories
- Dark/Light mode toggle with localStorage
- Quick navigation links

### Criterion 2: Hero Section/Carousel (4 points)
- Full-width carousel with images
- Autoplay slider
- Typewriter animation
- Smooth transitions

### Criterion 3: Signature Dishes Section (5 points)
- Dynamic loading from data file
- Load more functionality
- Filter by category
- Hover tooltips
- Smooth state transitions

### Criterion 4: Menu Pages/React Router (5 points)
- Dynamic routing for categories
- Pages map over data arrays
- Category filtering per page
- Seamless navigation
- Clean URL structure

### Criterion 5: Reservation Form (5 points)
- All required fields
- Form validation (email regex)
- Character counter
- localStorage persistence
- Success message

### Criterion 6: Chatbot Section (3 points)
- Floating button
- Scrollable chat area
- Loading/typing indicator

### Criterion 7: Footer (4 points)
- Dynamic open/closed hours logic
- Social media links
- Contact information
- Clean, consistent design

### Criterion 8: JavaScript Functionality (10 points)
Each sub-feature worth 1 point:
1. Sticky Navbar
2. Dropdown Menu Hover
3. Dark/Light Toggle
4. Carousel Autoplay
5. Typewriter Animation
6. Load More Dishes
7. Filter by Category
8. Form Validation
9. Save to localStorage
10. Dynamic Open/Closed Logic

### Criterion 9: Responsiveness (4 points)
- Desktop, tablet, mobile layouts
- Nav adapts for mobile
- Images scale properly
- Touch-friendly UI

### Criterion 10: Git & GitHub (3 points)
- Semantic commits
- Branching strategy
- Complete README with team, features, tech stack

### Criterion 11: Deployment (2 points)
- Successfully deployed
- Live URL accessible and functional

## 🧪 Test Files

### Frontend Tests
- **components.test.js**: Tests all component functionality
- **routing.test.js**: Tests React Router implementation
- **hooks.test.js**: Tests useState, useEffect usage

### Integration Tests
- **data-flow.test.js**: Tests data loading, filtering, state management

### Deployment Tests
- **url-accessibility.test.js**: Tests deployment URL and accessibility
- **functionality.test.js**: Tests deployed site functionality

### Git Tests
- **commit-history.test.js**: Tests commit quality, branching, README

## 📈 Evaluation Methods

- **Unit Tests**: Automated tests checking functionality existence
- **GPT-4o Semantic**: AI evaluation of code quality and implementation
- **Hybrid**: Combination of unit tests + GPT evaluation

## 🎯 Grade Scale

| Grade | Points | Percentage |
|-------|--------|------------|
| A     | 44.1-49 | 90-100%   |
| A-    | 41.6-44 | 85-89%    |
| B+    | 39.2-41.5 | 80-84%  |
| B     | 36.75-39.1 | 75-79% |
| B-    | 34.3-36.7 | 70-74%  |
| C+    | 31.85-34.2 | 65-69% |
| C     | 29.4-31.8 | 60-64%  |
| C-    | 26.95-29.3 | 55-59% |
| D     | 24.5-26.9 | 50-54%  |
| F     | 0-24.4 | <50%       |

## 📝 Output Files

After grading, the following files are generated:

- `GRADING_REPORT.md` - Detailed markdown report
- `grading-report.json` - JSON format results
- `unit-test-results.json` - Test execution results
- `gpt-evaluation.json` - GPT evaluation results
- `code-summaries.json` - Code analysis
- `git-analysis.json` - Git history analysis

## 🔧 Troubleshooting

### Tests Failing
- Ensure student project is in `grading-folder/`
- Check that `npm install` was run in grading-folder
- Verify file structure matches expected layout

### GPT Evaluation Failing
- Check OpenAI API key is set correctly
- Verify API key has credits
- Check internet connection

### Deployment Tests Failing
- Ensure `DEPLOYMENT_URL.txt` contains valid URL
- Check URL is accessible (not localhost)
- Verify site is actually deployed

## 📞 Support

For issues or questions, refer to the grading system documentation or contact the course administrators.

## 📄 License

MIT License - Educational Use
