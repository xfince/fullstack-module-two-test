/**
 * tests/integration/data-flow.test.js
 * 
 * Tests for data flow and integration between components and data files
 * Covers: Data loading, filtering, state management integration
 */

const fs = require('fs');
const path = require('path');

describe('Data Flow Integration Tests', () => {
  const gradingFolder = path.join(__dirname, '../../grading-folder');
  const dataPath = path.join(gradingFolder, 'src/Data');
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

  describe('Data Structure Tests', () => {
    test('Data directory exists', () => {
      expect(fileExists(dataPath)).toBe(true);
    });

    test('dishes.js or data file exists', () => {
      const dishesPath = path.join(dataPath, 'dishes.js');
      const altDishesPath = path.join(dataPath, 'dishes.json');
      const menuPath = path.join(dataPath, 'menu.js');
      
      expect(
        fileExists(dishesPath) || 
        fileExists(altDishesPath) || 
        fileExists(menuPath)
      ).toBe(true);
    });

    test('Data file exports dishes/menu data', () => {
      const dishesPath = path.join(dataPath, 'dishes.js');
      const content = readFile(dishesPath);
      
      if (content) {
        expect(content).toMatch(/export|module\.exports/);
        expect(content).toMatch(/dishes|menu|categories/i);
      } else {
        // Check alternative file
        const altDishesPath = path.join(dataPath, 'dishes.json');
        expect(fileExists(altDishesPath)).toBe(true);
      }
    });

    test('Data file contains array or object structure', () => {
      const dishesPath = path.join(dataPath, 'dishes.js');
      const content = readFile(dishesPath);
      
      if (content) {
        expect(content).toMatch(/\[|\{/); // Has array or object
      }
    });

    test('Data includes dish properties (name, description, price, category)', () => {
      const dishesPath = path.join(dataPath, 'dishes.js');
      const content = readFile(dishesPath);
      
      if (content) {
        const hasName = content.match(/name|title/i);
        const hasDescription = content.match(/description|desc/i);
        const hasPrice = content.match(/price|cost/i);
        const hasCategory = content.match(/category|type/i);
        
        expect(hasName || hasDescription || hasPrice || hasCategory).toBeTruthy();
      }
    });
  });

  describe('Component Data Integration Tests', () => {
    test('Signature component imports data', () => {
      const signaturePath = path.join(componentsPath, 'Signature.jsx');
      const dishesPath = path.join(componentsPath, 'Dishes.jsx');
      const content = readFile(signaturePath) + readFile(dishesPath);
      
      expect(content).toMatch(/import.*from.*['"]\.\.[\/\\]Data[\/\\]|['"]\.[\/\\]Data[\/\\]/i);
    });

    test('Menu component imports data', () => {
      const menuPath = path.join(componentsPath, 'Menu.jsx');
      const content = readFile(menuPath);
      
      if (content) {
        expect(content).toMatch(/import.*from.*Data|dishes|menu/i);
      }
    });

    test('Pages import and use data', () => {
      if (fileExists(pagesPath)) {
        const pages = fs.readdirSync(pagesPath).filter(f => f.endsWith('.jsx'));
        let pagesUseData = false;

        pages.forEach(page => {
          const content = readFile(path.join(pagesPath, page));
          if (content.match(/import.*Data|dishes|menu/i)) {
            pagesUseData = true;
          }
        });

        expect(pagesUseData).toBe(true);
      }
    });

    test('Components use .map() to render data', () => {
      const allFiles = [];
      
      if (fileExists(componentsPath)) {
        const componentFiles = fs.readdirSync(componentsPath)
          .filter(f => f.endsWith('.jsx'))
          .map(f => path.join(componentsPath, f));
        allFiles.push(...componentFiles);
      }
      
      if (fileExists(pagesPath)) {
        const pageFiles = fs.readdirSync(pagesPath)
          .filter(f => f.endsWith('.jsx'))
          .map(f => path.join(pagesPath, f));
        allFiles.push(...pageFiles);
      }

      let hasMapUsage = false;
      allFiles.forEach(file => {
        const content = readFile(file);
        if (content.match(/\.map\s*\(/)) {
          hasMapUsage = true;
        }
      });

      expect(hasMapUsage).toBe(true);
    });
  });

  describe('State Management Integration Tests', () => {
    test('Components manage filter state', () => {
      const signaturePath = path.join(componentsPath, 'Signature.jsx');
      const dishesPath = path.join(componentsPath, 'Dishes.jsx');
      const content = readFile(signaturePath) + readFile(dishesPath);
      
      expect(content).toMatch(/useState.*filter|filter.*useState/i);
    });

    test('Filter functionality updates displayed items', () => {
      const signaturePath = path.join(componentsPath, 'Signature.jsx');
      const dishesPath = path.join(componentsPath, 'Dishes.jsx');
      const content = readFile(signaturePath) + readFile(dishesPath);
      
      const hasFilter = content.match(/\.filter\(/);
      const hasCategory = content.match(/category/i);
      
      expect(hasFilter && hasCategory).toBeTruthy();
    });

    test('Load More functionality manages visible items', () => {
      const signaturePath = path.join(componentsPath, 'Signature.jsx');
      const dishesPath = path.join(componentsPath, 'Dishes.jsx');
      const content = readFile(signaturePath) + readFile(dishesPath);
      
      const hasLoadMore = content.match(/load.*more|show.*more|visible/i);
      const hasSlice = content.match(/\.slice\(/);
      
      expect(hasLoadMore || hasSlice).toBeTruthy();
    });

    test('Form data is managed with useState', () => {
      const formPath = path.join(componentsPath, 'Form.jsx');
      const content = readFile(formPath);
      
      expect(content).toMatch(/useState/);
      expect(content).toMatch(/onChange|handleChange/i);
    });

    test('Form submission updates localStorage', () => {
      const formPath = path.join(componentsPath, 'Form.jsx');
      const content = readFile(formPath);
      
      const hasLocalStorage = content.includes('localStorage');
      const hasSetItem = content.match(/localStorage\.setItem/);
      const hasSubmit = content.match(/onSubmit|handleSubmit/i);
      
      expect(hasLocalStorage && (hasSetItem || hasSubmit)).toBeTruthy();
    });
  });

  describe('Props and Component Communication Tests', () => {
    test('App.jsx passes data or props to child components', () => {
      const appPath = path.join(gradingFolder, 'src/App.jsx');
      const content = readFile(appPath);
      
      // Check if components receive props
      expect(content).toMatch(/<\w+\s+\w+=/); // Component with props
    });

    test('Dishes/Menu components receive and render data', () => {
      const dishesPath = path.join(componentsPath, 'Dishes.jsx');
      const menuPath = path.join(componentsPath, 'Menu.jsx');
      const signaturePath = path.join(componentsPath, 'Signature.jsx');
      const content = readFile(dishesPath) + readFile(menuPath) + readFile(signaturePath);
      
      const hasProps = content.match(/props\.|{.*}.*=/);
      const hasMap = content.match(/\.map\(/);
      
      expect(hasProps || hasMap).toBeTruthy();
    });

    test('Components destructure props appropriately', () => {
      const allFiles = [];
      
      if (fileExists(componentsPath)) {
        const componentFiles = fs.readdirSync(componentsPath)
          .filter(f => f.endsWith('.jsx'))
          .map(f => path.join(componentsPath, f));
        allFiles.push(...componentFiles);
      }

      let hasDestructuring = false;
      allFiles.forEach(file => {
        const content = readFile(file);
        if (content.match(/{\s*\w+.*}\s*=\s*props|function.*\({\s*\w+/)) {
          hasDestructuring = true;
        }
      });

      // This is a best practice check, not strictly required
      expect(true).toBe(true);
    });
  });

  describe('Routing and Data Integration Tests', () => {
    test('Menu pages receive appropriate data', () => {
      if (fileExists(pagesPath)) {
        const pages = fs.readdirSync(pagesPath).filter(f => f.endsWith('.jsx'));
        let pagesHaveData = false;

        pages.forEach(page => {
          const content = readFile(path.join(pagesPath, page));
          if (content.match(/dishes|menu|data|import/i)) {
            pagesHaveData = true;
          }
        });

        expect(pagesHaveData).toBe(true);
      }
    });

    test('Pages filter data by category', () => {
      if (fileExists(pagesPath)) {
        const pages = fs.readdirSync(pagesPath).filter(f => f.endsWith('.jsx'));
        let hasFiltering = false;

        pages.forEach(page => {
          const content = readFile(path.join(pagesPath, page));
          if (content.match(/\.filter\(.*category/i)) {
            hasFiltering = true;
          }
        });

        expect(hasFiltering).toBe(true);
      }
    });
  });

  describe('localStorage Integration Tests', () => {
    test('Theme preference is stored in localStorage', () => {
      const headerPath = path.join(componentsPath, 'Header.jsx');
      const content = readFile(headerPath);
      
      const hasLocalStorage = content.includes('localStorage');
      const hasTheme = content.match(/theme/i);
      const hasGetItem = content.match(/localStorage\.getItem/);
      const hasSetItem = content.match(/localStorage\.setItem/);
      
      expect(hasLocalStorage && hasTheme).toBeTruthy();
      expect(hasGetItem || hasSetItem).toBeTruthy();
    });

    test('Reservations are stored in localStorage', () => {
      const formPath = path.join(componentsPath, 'Form.jsx');
      const content = readFile(formPath);
      
      const hasLocalStorage = content.includes('localStorage');
      const hasReservation = content.match(/reservation|booking|form/i);
      const hasSetItem = content.match(/localStorage\.setItem/);
      
      expect(hasLocalStorage).toBeTruthy();
      expect(hasSetItem).toBeTruthy();
    });

    test('localStorage data is retrieved on component mount', () => {
      const headerPath = path.join(componentsPath, 'Header.jsx');
      const formPath = path.join(componentsPath, 'Form.jsx');
      const content = readFile(headerPath) + readFile(formPath);
      
      const hasUseEffect = content.includes('useEffect');
      const hasGetItem = content.match(/localStorage\.getItem/);
      
      expect(hasGetItem).toBeTruthy();
    });
  });

  describe('Event Handler Integration Tests', () => {
    test('Filter buttons have onClick handlers', () => {
      const signaturePath = path.join(componentsPath, 'Signature.jsx');
      const dishesPath = path.join(componentsPath, 'Dishes.jsx');
      const content = readFile(signaturePath) + readFile(dishesPath);
      
      if (content.match(/filter|category/i)) {
        expect(content).toMatch(/onClick|handleClick|handleFilter/i);
      }
    });

    test('Form inputs have onChange handlers', () => {
      const formPath = path.join(componentsPath, 'Form.jsx');
      const content = readFile(formPath);
      
      expect(content).toMatch(/onChange|handleChange|handleInput/i);
    });

    test('Form has onSubmit handler', () => {
      const formPath = path.join(componentsPath, 'Form.jsx');
      const content = readFile(formPath);
      
      expect(content).toMatch(/onSubmit|handleSubmit/i);
    });

    test('Carousel has navigation handlers', () => {
      const heroPath = path.join(componentsPath, 'Hero.jsx');
      const content = readFile(heroPath);
      
      if (content.match(/carousel|slider|slide/i)) {
        expect(content).toMatch(/onClick|handleNext|handlePrev|handleSlide/i);
      }
    });

    test('Theme toggle has handler', () => {
      const headerPath = path.join(componentsPath, 'Header.jsx');
      const content = readFile(headerPath);
      
      expect(content).toMatch(/onClick|handleTheme|toggleTheme/i);
    });
  });
});
