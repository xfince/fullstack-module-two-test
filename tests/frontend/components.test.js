/**
 * tests/frontend/components.test.js
 * 
 * Tests for React components functionality
 * Covers: Header, Hero, Signature Dishes, Reservation Form, Chatbot, Footer
 */

const fs = require('fs');
const path = require('path');

describe('Frontend Components Tests', () => {
  const gradingFolder = path.join(__dirname, '../../grading-folder');
  const componentsPath = path.join(gradingFolder, 'src/components');

  // Helper function to check if file exists
  const fileExists = (filePath) => fs.existsSync(filePath);

  // Helper function to read file content
  const readFile = (filePath) => {
    if (fileExists(filePath)) {
      return fs.readFileSync(filePath, 'utf8');
    }
    return '';
  };

  describe('Header Component Tests (Criterion 1)', () => {
    const headerPath = path.join(componentsPath, 'Header.jsx');

    test('Header.jsx file exists', () => {
      expect(fileExists(headerPath)).toBe(true);
    });

    test('Header uses useEffect hook for sticky navbar', () => {
      const content = readFile(headerPath);
      expect(content).toMatch(/useEffect/);
      expect(content).toMatch(/scroll/i);
    });

    test('Header has dropdown menu structure', () => {
      const content = readFile(headerPath);
      expect(content).toMatch(/dropdown/i);
      expect(content).toMatch(/menu/i);
    });

    test('Header has dark/light theme toggle', () => {
      const content = readFile(headerPath);
      expect(content).toMatch(/theme|dark|light/i);
      expect(content).toMatch(/localStorage/);
    });

    test('Header has navigation links', () => {
      const content = readFile(headerPath);
      const hasHomeLink = content.match(/home/i);
      const hasSignatureLink = content.match(/signature/i);
      const hasReservationLink = content.match(/reservation/i);
      
      expect(hasHomeLink || hasSignatureLink || hasReservationLink).toBeTruthy();
    });
  });

  describe('Hero Component Tests (Criterion 2)', () => {
    const heroPath = path.join(componentsPath, 'Hero.jsx');

    test('Hero.jsx file exists', () => {
      expect(fileExists(heroPath)).toBe(true);
    });

    test('Hero has carousel/slider functionality', () => {
      const content = readFile(heroPath);
      expect(content).toMatch(/carousel|slider|slide/i);
    });

    test('Hero has autoplay mechanism using state/useEffect', () => {
      const content = readFile(heroPath);
      const hasAutoplay = content.match(/autoplay|setInterval|setTimeout/i);
      const hasUseEffect = content.match(/useEffect/);
      
      expect(hasAutoplay || hasUseEffect).toBeTruthy();
    });

    test('Hero has typewriter animation', () => {
      const content = readFile(heroPath);
      expect(content).toMatch(/typewriter|typing|animation/i);
    });

    test('Hero has transition effects', () => {
      const content = readFile(heroPath);
      expect(content).toMatch(/transition|fade|animate/i);
    });
  });

  describe('Signature Dishes Component Tests (Criterion 3)', () => {
    const signaturePath = path.join(componentsPath, 'Signature.jsx');
    const dishesPath = path.join(componentsPath, 'Dishes.jsx');
    const dataPath = path.join(gradingFolder, 'src/Data/dishes.js');

    test('Signature.jsx or Dishes.jsx file exists', () => {
      const signatureExists = fileExists(signaturePath);
      const dishesExists = fileExists(dishesPath);
      
      expect(signatureExists || dishesExists).toBe(true);
    });

    test('Data file exists for dishes', () => {
      expect(fileExists(dataPath)).toBe(true);
    });

    test('Component loads dishes dynamically from data', () => {
      const signatureContent = readFile(signaturePath);
      const dishesContent = readFile(dishesPath);
      const combinedContent = signatureContent + dishesContent;
      
      expect(combinedContent).toMatch(/import.*dishes|from.*data|dishes\.js/i);
    });

    test('Component has load more functionality', () => {
      const signatureContent = readFile(signaturePath);
      const dishesContent = readFile(dishesPath);
      const combinedContent = signatureContent + dishesContent;
      
      expect(combinedContent).toMatch(/load.*more|show.*more|view.*more/i);
    });

    test('Component has filter functionality', () => {
      const signatureContent = readFile(signaturePath);
      const dishesContent = readFile(dishesPath);
      const combinedContent = signatureContent + dishesContent;
      
      expect(combinedContent).toMatch(/filter|category/i);
    });

    test('Component has hover tooltip or description display', () => {
      const signatureContent = readFile(signaturePath);
      const dishesContent = readFile(dishesPath);
      const combinedContent = signatureContent + dishesContent;
      
      expect(combinedContent).toMatch(/tooltip|hover|description|price/i);
    });
  });

  describe('Reservation Form Component Tests (Criterion 5)', () => {
    const formPath = path.join(componentsPath, 'Form.jsx');

    test('Form.jsx file exists', () => {
      expect(fileExists(formPath)).toBe(true);
    });

    test('Form has required input fields', () => {
      const content = readFile(formPath);
      const hasName = content.match(/name/i);
      const hasEmail = content.match(/email/i);
      const hasPhone = content.match(/phone/i);
      const hasGuests = content.match(/guest/i);
      const hasDate = content.match(/date/i);
      
      expect(hasName && hasEmail).toBeTruthy();
      expect(hasPhone || hasGuests || hasDate).toBeTruthy();
    });

    test('Form has validation logic', () => {
      const content = readFile(formPath);
      expect(content).toMatch(/validation|validate|error|required/i);
    });

    test('Form has email regex validation', () => {
      const content = readFile(formPath);
      expect(content).toMatch(/email.*regex|regex.*email|@.*\.|\..*@/i);
    });

    test('Form has character counter', () => {
      const content = readFile(formPath);
      expect(content).toMatch(/character.*count|count.*character|length|maxLength/i);
    });

    test('Form saves to localStorage', () => {
      const content = readFile(formPath);
      expect(content).toMatch(/localStorage/);
    });

    test('Form has success message', () => {
      const content = readFile(formPath);
      expect(content).toMatch(/success|submitted|thank.*you|confirmation/i);
    });
  });

  describe('Chatbot Component Tests (Criterion 6)', () => {
    const chatPath = path.join(componentsPath, 'ChatPopup.jsx');
    const altChatPath = path.join(componentsPath, 'Chatbot.jsx');

    test('ChatPopup.jsx or Chatbot.jsx file exists', () => {
      const chatExists = fileExists(chatPath);
      const altChatExists = fileExists(altChatPath);
      
      expect(chatExists || altChatExists).toBe(true);
    });

    test('Chatbot has floating button', () => {
      const content = readFile(chatPath) + readFile(altChatPath);
      expect(content).toMatch(/floating|fixed|button/i);
    });

    test('Chatbot has scrollable chat area', () => {
      const content = readFile(chatPath) + readFile(altChatPath);
      expect(content).toMatch(/scroll|overflow|chat.*area|messages/i);
    });

    test('Chatbot has loading/typing indicator', () => {
      const content = readFile(chatPath) + readFile(altChatPath);
      expect(content).toMatch(/typing|loading|bot.*is|placeholder/i);
    });
  });

  describe('Footer Component Tests (Criterion 7)', () => {
    const footerPath = path.join(componentsPath, 'Footer.jsx');

    test('Footer.jsx file exists', () => {
      expect(fileExists(footerPath)).toBe(true);
    });

    test('Footer has dynamic opening hours logic', () => {
      const content = readFile(footerPath);
      expect(content).toMatch(/open|closed|hours/i);
      expect(content).toMatch(/Date|time|hour/i);
    });

    test('Footer has social media links', () => {
      const content = readFile(footerPath);
      expect(content).toMatch(/social|facebook|twitter|instagram|linkedin/i);
    });

    test('Footer has contact information', () => {
      const content = readFile(footerPath);
      expect(content).toMatch(/contact|phone|email|address/i);
    });
  });

  describe('JavaScript Functionality Tests (Criterion 8)', () => {
    const allComponents = fs.existsSync(componentsPath) 
      ? fs.readdirSync(componentsPath).filter(f => f.endsWith('.jsx'))
      : [];

    test('Project uses React hooks (useState, useEffect)', () => {
      let hasUseState = false;
      let hasUseEffect = false;

      allComponents.forEach(file => {
        const content = readFile(path.join(componentsPath, file));
        if (content.includes('useState')) hasUseState = true;
        if (content.includes('useEffect')) hasUseEffect = true;
      });

      expect(hasUseState).toBe(true);
      expect(hasUseEffect).toBe(true);
    });

    test('Project has localStorage implementation', () => {
      let hasLocalStorage = false;

      allComponents.forEach(file => {
        const content = readFile(path.join(componentsPath, file));
        if (content.includes('localStorage')) hasLocalStorage = true;
      });

      expect(hasLocalStorage).toBe(true);
    });

    test('Project has event handlers', () => {
      let hasEventHandlers = false;

      allComponents.forEach(file => {
        const content = readFile(path.join(componentsPath, file));
        if (content.match(/onClick|onChange|onSubmit|onHover/)) {
          hasEventHandlers = true;
        }
      });

      expect(hasEventHandlers).toBe(true);
    });

    test('Project has form validation logic', () => {
      const formContent = readFile(path.join(componentsPath, 'Form.jsx'));
      expect(formContent).toMatch(/validation|validate|error|regex/i);
    });

    test('Project has filter/category functionality', () => {
      let hasFilter = false;

      allComponents.forEach(file => {
        const content = readFile(path.join(componentsPath, file));
        if (content.match(/filter|category/i)) {
          hasFilter = true;
        }
      });

      expect(hasFilter).toBe(true);
    });
  });
});
