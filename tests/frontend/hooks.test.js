/**
 * tests/frontend/hooks.test.js
 * 
 * Tests for React Hooks implementation
 * Covers: useState, useEffect, useRef usage across components
 */

const fs = require('fs');
const path = require('path');

describe('React Hooks Tests', () => {
  const gradingFolder = path.join(__dirname, '../../grading-folder');
  const componentsPath = path.join(gradingFolder, 'src/components');
  const pagesPath = path.join(gradingFolder, 'src/pages');

  // Helper functions
  const fileExists = (filePath) => fs.existsSync(filePath);
  const readFile = (filePath) => {
    if (fileExists(filePath)) {
      return fs.readFileSync(filePath, 'utf8');
    }
    return '';
  };

  const getAllJSXFiles = () => {
    const files = [];
    
    if (fileExists(componentsPath)) {
      const componentFiles = fs.readdirSync(componentsPath)
        .filter(f => f.endsWith('.jsx') || f.endsWith('.js'))
        .map(f => path.join(componentsPath, f));
      files.push(...componentFiles);
    }
    
    if (fileExists(pagesPath)) {
      const pageFiles = fs.readdirSync(pagesPath)
        .filter(f => f.endsWith('.jsx') || f.endsWith('.js'))
        .map(f => path.join(pagesPath, f));
      files.push(...pageFiles);
    }
    
    return files;
  };

  describe('useState Hook Tests', () => {
    test('Project imports useState from React', () => {
      const files = getAllJSXFiles();
      let hasUseState = false;

      files.forEach(file => {
        const content = readFile(file);
        if (content.match(/import.*useState.*from ['"]react['"]/)) {
          hasUseState = true;
        }
      });

      expect(hasUseState).toBe(true);
    });

    test('Components use useState for state management', () => {
      const files = getAllJSXFiles();
      let useStateCount = 0;

      files.forEach(file => {
        const content = readFile(file);
        const matches = content.match(/useState\(/g);
        if (matches) {
          useStateCount += matches.length;
        }
      });

      expect(useStateCount).toBeGreaterThan(0);
    });

    test('Header uses useState for theme toggle', () => {
      const headerPath = path.join(componentsPath, 'Header.jsx');
      const content = readFile(headerPath);
      
      expect(content).toMatch(/useState/);
      expect(content).toMatch(/theme|dark|light/i);
    });

    test('Form uses useState for form data', () => {
      const formPath = path.join(componentsPath, 'Form.jsx');
      const content = readFile(formPath);
      
      expect(content).toMatch(/useState/);
    });

    test('Hero/Carousel uses useState for slide management', () => {
      const heroPath = path.join(componentsPath, 'Hero.jsx');
      const content = readFile(heroPath);
      
      const hasUseState = content.includes('useState');
      const hasSlideLogic = content.match(/slide|current|index|active/i);
      
      expect(hasUseState || hasSlideLogic).toBeTruthy();
    });
  });

  describe('useEffect Hook Tests', () => {
    test('Project imports useEffect from React', () => {
      const files = getAllJSXFiles();
      let hasUseEffect = false;

      files.forEach(file => {
        const content = readFile(file);
        if (content.match(/import.*useEffect.*from ['"]react['"]/)) {
          hasUseEffect = true;
        }
      });

      expect(hasUseEffect).toBe(true);
    });

    test('Components use useEffect for side effects', () => {
      const files = getAllJSXFiles();
      let useEffectCount = 0;

      files.forEach(file => {
        const content = readFile(file);
        const matches = content.match(/useEffect\(/g);
        if (matches) {
          useEffectCount += matches.length;
        }
      });

      expect(useEffectCount).toBeGreaterThan(0);
    });

    test('Header uses useEffect for sticky navbar', () => {
      const headerPath = path.join(componentsPath, 'Header.jsx');
      const content = readFile(headerPath);
      
      expect(content).toMatch(/useEffect/);
      expect(content).toMatch(/scroll/i);
    });

    test('Header uses useEffect for theme persistence', () => {
      const headerPath = path.join(componentsPath, 'Header.jsx');
      const content = readFile(headerPath);
      
      const hasUseEffect = content.includes('useEffect');
      const hasLocalStorage = content.includes('localStorage');
      const hasTheme = content.match(/theme|dark|light/i);
      
      expect(hasUseEffect && (hasLocalStorage || hasTheme)).toBe(true);
    });

    test('Hero uses useEffect for autoplay', () => {
      const heroPath = path.join(componentsPath, 'Hero.jsx');
      const content = readFile(heroPath);
      
      const hasUseEffect = content.includes('useEffect');
      const hasInterval = content.match(/setInterval|setTimeout/);
      
      expect(hasUseEffect || hasInterval).toBeTruthy();
    });

    test('useEffect hooks have dependency arrays', () => {
      const files = getAllJSXFiles();
      let properUseEffectUsage = false;

      files.forEach(file => {
        const content = readFile(file);
        // Check for useEffect with dependency array pattern
        if (content.match(/useEffect\([^)]+\),\s*\[/)) {
          properUseEffectUsage = true;
        }
      });

      expect(properUseEffectUsage).toBe(true);
    });
  });

  describe('useRef Hook Tests (Optional)', () => {
    test('Check if project uses useRef for DOM references', () => {
      const files = getAllJSXFiles();
      let hasUseRef = false;

      files.forEach(file => {
        const content = readFile(file);
        if (content.match(/useRef|ref=/)) {
          hasUseRef = true;
        }
      });

      // This is optional, so we just log the result
      if (hasUseRef) {
        expect(hasUseRef).toBe(true);
      } else {
        expect(true).toBe(true); // Pass anyway as useRef is optional
      }
    });
  });

  describe('Custom Hooks or Advanced Patterns (Bonus)', () => {
    test('Check for useContext usage (bonus)', () => {
      const files = getAllJSXFiles();
      let hasUseContext = false;

      files.forEach(file => {
        const content = readFile(file);
        if (content.includes('useContext')) {
          hasUseContext = true;
        }
      });

      // Bonus check - not required
      if (hasUseContext) {
        expect(hasUseContext).toBe(true);
      } else {
        expect(true).toBe(true); // Pass anyway
      }
    });

    test('Check for useMemo or useCallback (bonus)', () => {
      const files = getAllJSXFiles();
      let hasOptimizationHooks = false;

      files.forEach(file => {
        const content = readFile(file);
        if (content.match(/useMemo|useCallback/)) {
          hasOptimizationHooks = true;
        }
      });

      // Bonus check - not required
      if (hasOptimizationHooks) {
        expect(hasOptimizationHooks).toBe(true);
      } else {
        expect(true).toBe(true); // Pass anyway
      }
    });
  });

  describe('Hook Best Practices', () => {
    test('Hooks are called at top level of components', () => {
      const files = getAllJSXFiles();
      let hasProperHookUsage = true;

      files.forEach(file => {
        const content = readFile(file);
        // Check if hooks are not inside conditions (basic check)
        const hasConditionalHooks = content.match(/if\s*\([^)]*\)\s*{[^}]*use(State|Effect|Ref)/);
        if (hasConditionalHooks) {
          hasProperHookUsage = false;
        }
      });

      expect(hasProperHookUsage).toBe(true);
    });

    test('Component functions are properly named (PascalCase)', () => {
      const files = getAllJSXFiles();
      let properNaming = false;

      files.forEach(file => {
        const content = readFile(file);
        // Check for function or const component declarations
        if (content.match(/function [A-Z]\w+|const [A-Z]\w+\s*=/)) {
          properNaming = true;
        }
      });

      expect(properNaming).toBe(true);
    });
  });
});
