/**
 * tests/frontend/routing.test.js
 * 
 * Tests for React Router implementation
 * Covers: Menu pages routing, dynamic routes, navigation (Criterion 4)
 */

const fs = require('fs');
const path = require('path');

describe('React Router Tests', () => {
  const gradingFolder = path.join(__dirname, '../../grading-folder');
  const pagesPath = path.join(gradingFolder, 'src/pages');
  const appPath = path.join(gradingFolder, 'src/App.jsx');

  // Helper functions
  const fileExists = (filePath) => fs.existsSync(filePath);
  const readFile = (filePath) => {
    if (fileExists(filePath)) {
      return fs.readFileSync(filePath, 'utf8');
    }
    return '';
  };

  describe('Router Configuration Tests', () => {
    test('App.jsx file exists', () => {
      expect(fileExists(appPath)).toBe(true);
    });

    test('App.jsx imports React Router components', () => {
      const content = readFile(appPath);
      expect(content).toMatch(/from ['"]react-router-dom['"]/);
      expect(content).toMatch(/BrowserRouter|Router|Routes|Route/);
    });

    test('App.jsx has Routes configuration', () => {
      const content = readFile(appPath);
      expect(content).toMatch(/<Routes>/);
      expect(content).toMatch(/<Route/);
    });
  });

  describe('Menu Pages Tests (Criterion 4)', () => {
    test('Pages directory exists', () => {
      expect(fileExists(pagesPath)).toBe(true);
    });

    test('Starters page exists', () => {
      const startersPage = path.join(pagesPath, 'Starterspage.jsx');
      const altStartersPage = path.join(pagesPath, 'StartersPage.jsx');
      
      expect(fileExists(startersPage) || fileExists(altStartersPage)).toBe(true);
    });

    test('Main Dishes page exists', () => {
      const mainDishesPage = path.join(pagesPath, 'MainDishesPage.jsx');
      const altMainDishesPage = path.join(pagesPath, 'Maindishes.jsx');
      
      expect(fileExists(mainDishesPage) || fileExists(altMainDishesPage)).toBe(true);
    });

    test('Drinks page exists', () => {
      const drinksPage = path.join(pagesPath, 'DrinksPage.jsx');
      const altDrinksPage = path.join(pagesPath, 'Drinks.jsx');
      
      expect(fileExists(drinksPage) || fileExists(altDrinksPage)).toBe(true);
    });

    test('Desserts page exists', () => {
      const dessertsPage = path.join(pagesPath, 'DessertsPage.jsx');
      const altDessertsPage = path.join(pagesPath, 'Desserts.jsx');
      
      expect(fileExists(dessertsPage) || fileExists(altDessertsPage)).toBe(true);
    });

    test('At least 4 menu category pages exist', () => {
      if (fileExists(pagesPath)) {
        const pages = fs.readdirSync(pagesPath).filter(f => f.endsWith('.jsx') || f.endsWith('.js'));
        expect(pages.length).toBeGreaterThanOrEqual(4);
      } else {
        throw new Error('Pages directory does not exist');
      }
    });
  });

  describe('Dynamic Routing Tests', () => {
    test('App.jsx has routes for menu categories', () => {
      const content = readFile(appPath);
      const hasStartersRoute = content.match(/path=['"]\/starters|starters['"]/i);
      const hasMainDishesRoute = content.match(/path=['"]\/maindishes|main.*dishes['"]/i);
      const hasDrinksRoute = content.match(/path=['"]\/drinks['"]/i);
      const hasDessertsRoute = content.match(/path=['"]\/desserts['"]/i);
      
      const routeCount = [hasStartersRoute, hasMainDishesRoute, hasDrinksRoute, hasDessertsRoute]
        .filter(Boolean).length;
      
      expect(routeCount).toBeGreaterThanOrEqual(3);
    });

    test('Routes use clean URL structure', () => {
      const content = readFile(appPath);
      // Check for clean paths without query strings or complex patterns
      const hasCleanPaths = content.match(/path=['"]\/\w+['"]/g);
      
      expect(hasCleanPaths).toBeTruthy();
      expect(hasCleanPaths.length).toBeGreaterThan(0);
    });
  });

  describe('Page Component Data Integration', () => {
    const checkPageHasDataMapping = (pagePath) => {
      const content = readFile(pagePath);
      return content.match(/\.map\(|dishes|data|menuCategories/i);
    };

    test('Starters page maps over data array', () => {
      const startersPage = path.join(pagesPath, 'Starterspage.jsx');
      const altStartersPage = path.join(pagesPath, 'StartersPage.jsx');
      
      const content = readFile(startersPage) + readFile(altStartersPage);
      expect(content).toMatch(/\.map\(|dishes|data/i);
    });

    test('Main Dishes page maps over data array', () => {
      const mainDishesPage = path.join(pagesPath, 'MainDishesPage.jsx');
      const altMainDishesPage = path.join(pagesPath, 'Maindishes.jsx');
      
      const content = readFile(mainDishesPage) + readFile(altMainDishesPage);
      expect(content).toMatch(/\.map\(|dishes|data/i);
    });

    test('Drinks page maps over data array', () => {
      const drinksPage = path.join(pagesPath, 'DrinksPage.jsx');
      
      const content = readFile(drinksPage);
      expect(content).toMatch(/\.map\(|dishes|data/i);
    });

    test('Desserts page maps over data array', () => {
      const dessertsPage = path.join(pagesPath, 'DessertsPage.jsx');
      
      const content = readFile(dessertsPage);
      expect(content).toMatch(/\.map\(|dishes|data/i);
    });
  });

  describe('Navigation Implementation', () => {
    test('App.jsx uses React Router navigation components', () => {
      const content = readFile(appPath);
      expect(content).toMatch(/Link|Navigate|useNavigate|NavLink/);
    });

    test('Header has navigation links to pages', () => {
      const headerPath = path.join(gradingFolder, 'src/components/Header.jsx');
      const content = readFile(headerPath);
      
      expect(content).toMatch(/Link|to=['"]\/|href=['"]\/|navigate/i);
    });

    test('Pages have category filtering capability', () => {
      if (fileExists(pagesPath)) {
        const pages = fs.readdirSync(pagesPath).filter(f => f.endsWith('.jsx'));
        let hasFiltering = false;

        pages.forEach(page => {
          const content = readFile(path.join(pagesPath, page));
          if (content.match(/filter|category|useState/i)) {
            hasFiltering = true;
          }
        });

        expect(hasFiltering).toBe(true);
      }
    });
  });
});
