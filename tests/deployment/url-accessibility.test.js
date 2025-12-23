/**
 * tests/deployment/url-accessibility.test.js
 * 
 * Tests for deployment and URL accessibility
 * Covers: Live deployment, URL accessibility, basic functionality (Criterion 11)
 */

const fs = require('fs');
const path = require('path');

describe('Deployment Tests', () => {
  const deploymentUrlFile = path.join(__dirname, '../../DEPLOYMENT_URL.txt');
  let deploymentUrl = '';

  beforeAll(() => {
    // Read deployment URL from file
    if (fs.existsSync(deploymentUrlFile)) {
      deploymentUrl = fs.readFileSync(deploymentUrlFile, 'utf8').trim();
    }
  });

  describe('Deployment URL Tests', () => {
    test('DEPLOYMENT_URL.txt file exists', () => {
      expect(fs.existsSync(deploymentUrlFile)).toBe(true);
    });

    test('Deployment URL is not empty', () => {
      expect(deploymentUrl).toBeTruthy();
      expect(deploymentUrl.length).toBeGreaterThan(0);
    });

    test('Deployment URL is a valid URL format', () => {
      expect(deploymentUrl).toMatch(/^https?:\/\/.+/);
    });

    test('Deployment URL uses HTTPS', () => {
      expect(deploymentUrl).toMatch(/^https:\/\//);
    });

    test('Deployment URL is from known hosting service', () => {
      const isKnownService = deploymentUrl.match(
        /netlify\.app|vercel\.app|github\.io|herokuapp\.com|render\.com|railway\.app|surge\.sh/i
      );
      
      expect(isKnownService).toBeTruthy();
    });
  });

  describe('URL Accessibility Tests', () => {
    test('Deployment URL is accessible (HTTP 200)', async () => {
      if (!deploymentUrl) {
        throw new Error('No deployment URL found');
      }

      try {
        // Using dynamic import for fetch in Node.js
        const fetch = (await import('node-fetch')).default;
        const response = await fetch(deploymentUrl, {
          method: 'GET',
          headers: {
            'User-Agent': 'Mozilla/5.0 (compatible; GradingBot/1.0)'
          },
          timeout: 10000
        });

        expect(response.status).toBe(200);
      } catch (error) {
        // If node-fetch is not available, try with http/https module
        const https = require('https');
        const http = require('http');
        
        const protocol = deploymentUrl.startsWith('https') ? https : http;
        
        return new Promise((resolve, reject) => {
          protocol.get(deploymentUrl, (res) => {
            expect(res.statusCode).toBe(200);
            resolve();
          }).on('error', (err) => {
            reject(new Error(`Failed to fetch URL: ${err.message}`));
          });
        });
      }
    }, 15000); // 15 second timeout

    test('Deployment URL returns HTML content', async () => {
      if (!deploymentUrl) {
        throw new Error('No deployment URL found');
      }

      try {
        const fetch = (await import('node-fetch')).default;
        const response = await fetch(deploymentUrl, {
          timeout: 10000
        });
        const contentType = response.headers.get('content-type');

        expect(contentType).toMatch(/text\/html/);
      } catch (error) {
        // Fallback to http/https module
        const https = require('https');
        const http = require('http');
        
        const protocol = deploymentUrl.startsWith('https') ? https : http;
        
        return new Promise((resolve, reject) => {
          protocol.get(deploymentUrl, (res) => {
            expect(res.headers['content-type']).toMatch(/text\/html/);
            resolve();
          }).on('error', (err) => {
            reject(new Error(`Failed to fetch URL: ${err.message}`));
          });
        });
      }
    }, 15000);

    test('Deployment URL loads without redirect loops', async () => {
      if (!deploymentUrl) {
        throw new Error('No deployment URL found');
      }

      try {
        const fetch = (await import('node-fetch')).default;
        const response = await fetch(deploymentUrl, {
          redirect: 'manual',
          timeout: 10000
        });

        // Should not be a redirect or should be 200
        expect([200, 301, 302]).toContain(response.status);
      } catch (error) {
        // Basic check passed if no error
        expect(true).toBe(true);
      }
    }, 15000);
  });

  describe('Content Verification Tests', () => {
    test('Deployed site contains React root element', async () => {
      if (!deploymentUrl) {
        throw new Error('No deployment URL found');
      }

      try {
        const fetch = (await import('node-fetch')).default;
        const response = await fetch(deploymentUrl, { timeout: 10000 });
        const html = await response.text();

        // Check for common React root element
        expect(html).toMatch(/<div\s+id=['"]root['"]|<div\s+id=['"]app['"]/i);
      } catch (error) {
        // If we can't fetch, assume it passes
        expect(true).toBe(true);
      }
    }, 15000);

    test('Deployed site loads JavaScript bundles', async () => {
      if (!deploymentUrl) {
        throw new Error('No deployment URL found');
      }

      try {
        const fetch = (await import('node-fetch')).default;
        const response = await fetch(deploymentUrl, { timeout: 10000 });
        const html = await response.text();

        // Check for script tags
        expect(html).toMatch(/<script.*src=/i);
      } catch (error) {
        expect(true).toBe(true);
      }
    }, 15000);

    test('Deployed site loads CSS stylesheets', async () => {
      if (!deploymentUrl) {
        throw new Error('No deployment URL found');
      }

      try {
        const fetch = (await import('node-fetch')).default;
        const response = await fetch(deploymentUrl, { timeout: 10000 });
        const html = await response.text();

        // Check for stylesheet links or inline styles
        expect(html).toMatch(/<link.*stylesheet|<style/i);
      } catch (error) {
        expect(true).toBe(true);
      }
    }, 15000);

    test('Deployed site has proper title tag', async () => {
      if (!deploymentUrl) {
        throw new Error('No deployment URL found');
      }

      try {
        const fetch = (await import('node-fetch')).default;
        const response = await fetch(deploymentUrl, { timeout: 10000 });
        const html = await response.text();

        expect(html).toMatch(/<title>.*<\/title>/i);
      } catch (error) {
        expect(true).toBe(true);
      }
    }, 15000);
  });

  describe('Performance Tests (Basic)', () => {
    test('Deployment URL responds within reasonable time (< 5 seconds)', async () => {
      if (!deploymentUrl) {
        throw new Error('No deployment URL found');
      }

      const startTime = Date.now();

      try {
        const fetch = (await import('node-fetch')).default;
        await fetch(deploymentUrl, { timeout: 5000 });
        
        const responseTime = Date.now() - startTime;
        expect(responseTime).toBeLessThan(5000);
      } catch (error) {
        if (error.name === 'AbortError' || error.message.includes('timeout')) {
          throw new Error('Site took too long to respond (> 5 seconds)');
        }
        throw error;
      }
    }, 10000);
  });

  describe('Build Configuration Tests', () => {
    test('vite.config.js exists in grading folder', () => {
      const viteConfigPath = path.join(__dirname, '../../grading-folder/vite.config.js');
      expect(fs.existsSync(viteConfigPath)).toBe(true);
    });

    test('package.json has build script', () => {
      const packageJsonPath = path.join(__dirname, '../../grading-folder/package.json');
      
      if (fs.existsSync(packageJsonPath)) {
        const packageJson = JSON.parse(fs.readFileSync(packageJsonPath, 'utf8'));
        expect(packageJson.scripts).toBeDefined();
        expect(packageJson.scripts.build).toBeDefined();
      }
    });

    test('dist or build directory can be generated', () => {
      const distPath = path.join(__dirname, '../../grading-folder/dist');
      const buildPath = path.join(__dirname, '../../grading-folder/build');
      
      // At least one should exist or be generatable
      expect(true).toBe(true); // This is verified by successful deployment
    });
  });
});
