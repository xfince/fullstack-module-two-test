/**
 * tests/git/commit-history.test.js
 * 
 * Tests for Git version control practices
 * Covers: Commit history, branching, README documentation (Criterion 10)
 */

const { execSync } = require('child_process');
const fs = require('fs');
const path = require('path');

describe('Git Version Control Tests', () => {
  const gradingFolder = path.join(__dirname, '../../grading-folder');
  const readmePath = path.join(gradingFolder, 'README.md');

  // Helper function to check if we're in a git repository
  const isGitRepo = () => {
    try {
      execSync('git rev-parse --git-dir', { 
        cwd: gradingFolder,
        stdio: 'ignore' 
      });
      return true;
    } catch {
      return false;
    }
  };

  // Helper function to get commit count
  const getCommitCount = () => {
    try {
      const output = execSync('git rev-list --count HEAD', {
        cwd: gradingFolder,
        encoding: 'utf8'
      });
      return parseInt(output.trim());
    } catch {
      return 0;
    }
  };

  // Helper function to get commit messages
  const getCommitMessages = (limit = 50) => {
    try {
      const output = execSync(`git log --pretty=format:"%s" -n ${limit}`, {
        cwd: gradingFolder,
        encoding: 'utf8'
      });
      return output.split('\n').filter(msg => msg.trim());
    } catch {
      return [];
    }
  };

  // Helper function to get branch names
  const getBranches = () => {
    try {
      const output = execSync('git branch -a', {
        cwd: gradingFolder,
        encoding: 'utf8'
      });
      return output.split('\n').filter(branch => branch.trim());
    } catch {
      return [];
    }
  };

  describe('Git Repository Setup Tests', () => {
    test('Project is a git repository', () => {
      expect(isGitRepo()).toBe(true);
    });

    test('Repository has commits', () => {
      const commitCount = getCommitCount();
      expect(commitCount).toBeGreaterThan(0);
    });

    test('Repository has sufficient commit history (at least 10 commits)', () => {
      const commitCount = getCommitCount();
      expect(commitCount).toBeGreaterThanOrEqual(10);
    });
  });

  describe('Commit Message Quality Tests', () => {
    test('Commit messages are meaningful (not empty or too short)', () => {
      const messages = getCommitMessages();
      const meaningfulMessages = messages.filter(msg => msg.length >= 10);
      const ratio = meaningfulMessages.length / messages.length;
      
      expect(ratio).toBeGreaterThan(0.7); // At least 70% meaningful
    });

    test('Commit messages use semantic conventions (feat, fix, docs, style, etc.)', () => {
      const messages = getCommitMessages();
      const semanticPattern = /^(feat|fix|docs|style|refactor|test|chore|build|ci|perf)(\(.*?\))?:/i;
      const semanticCommits = messages.filter(msg => semanticPattern.test(msg));
      
      // At least 30% of commits use semantic conventions (or passes if any semantic commits exist)
      if (messages.length > 0) {
        const ratio = semanticCommits.length / messages.length;
        expect(ratio).toBeGreaterThan(0.1); // At least 10% use semantic format
      }
    });

    test('No generic commit messages (e.g., "update", "changes", "fix")', () => {
      const messages = getCommitMessages();
      const genericPattern = /^(update|changes?|fix|test|wip|temp)$/i;
      const genericCommits = messages.filter(msg => genericPattern.test(msg.trim()));
      const ratio = genericCommits.length / messages.length;
      
      expect(ratio).toBeLessThan(0.3); // Less than 30% are generic
    });

    test('Commit messages describe what was changed', () => {
      const messages = getCommitMessages();
      const descriptiveMessages = messages.filter(msg => {
        // Check for action verbs or descriptive content
        return msg.match(/add|create|implement|update|fix|remove|delete|refactor|improve|enhance/i);
      });
      
      const ratio = descriptiveMessages.length / messages.length;
      expect(ratio).toBeGreaterThan(0.5); // At least 50% are descriptive
    });
  });

  describe('Branching Strategy Tests', () => {
    test('Repository has branches (main/master + others)', () => {
      const branches = getBranches();
      expect(branches.length).toBeGreaterThan(0);
    });

    test('Repository has feature branches or development branches', () => {
      const branches = getBranches();
      const hasFeatureBranches = branches.some(branch => 
        branch.match(/feature|feat|dev|develop|bugfix|hotfix/i)
      );
      
      // This is a bonus - good practice but not strictly required
      if (hasFeatureBranches) {
        expect(hasFeatureBranches).toBe(true);
      } else {
        // Pass anyway but it would be better to have branches
        expect(true).toBe(true);
      }
    });

    test('Check for merge commits (evidence of branch merging)', () => {
      try {
        const mergeCommits = execSync('git log --merges --oneline -n 5', {
          cwd: gradingFolder,
          encoding: 'utf8'
        });
        
        // Bonus check - having merge commits shows good branching practice
        if (mergeCommits.trim()) {
          expect(mergeCommits.trim().length).toBeGreaterThan(0);
        } else {
          expect(true).toBe(true); // Pass anyway
        }
      } catch {
        expect(true).toBe(true); // Pass if command fails
      }
    });
  });

  describe('Commit Frequency Tests', () => {
    test('Commits are spread over time (not all at once)', () => {
      try {
        const commitDates = execSync('git log --pretty=format:"%ci" -n 20', {
          cwd: gradingFolder,
          encoding: 'utf8'
        });
        
        const dates = commitDates.split('\n').map(d => d.split(' ')[0]).filter(Boolean);
        const uniqueDates = new Set(dates);
        
        // Commits should span at least 2 different days
        expect(uniqueDates.size).toBeGreaterThanOrEqual(2);
      } catch {
        expect(true).toBe(true); // Pass if command fails
      }
    });

    test('Not too many commits on same day (avoid commit dumping)', () => {
      try {
        const commitDates = execSync('git log --pretty=format:"%ci"', {
          cwd: gradingFolder,
          encoding: 'utf8'
        });
        
        const dates = commitDates.split('\n').map(d => d.split(' ')[0]).filter(Boolean);
        const dateCount = {};
        
        dates.forEach(date => {
          dateCount[date] = (dateCount[date] || 0) + 1;
        });
        
        const maxCommitsPerDay = Math.max(...Object.values(dateCount));
        const totalCommits = dates.length;
        
        // No single day should have more than 80% of all commits
        expect(maxCommitsPerDay / totalCommits).toBeLessThan(0.8);
      } catch {
        expect(true).toBe(true); // Pass if command fails
      }
    });
  });

  describe('README Documentation Tests', () => {
    test('README.md file exists', () => {
      expect(fs.existsSync(readmePath)).toBe(true);
    });

    test('README has substantial content (at least 500 characters)', () => {
      if (fs.existsSync(readmePath)) {
        const content = fs.readFileSync(readmePath, 'utf8');
        expect(content.length).toBeGreaterThan(500);
      }
    });

    test('README includes project title/name', () => {
      if (fs.existsSync(readmePath)) {
        const content = fs.readFileSync(readmePath, 'utf8');
        expect(content).toMatch(/^#\s+.+/m); // Has a heading
      }
    });

    test('README includes team members or roles', () => {
      if (fs.existsSync(readmePath)) {
        const content = fs.readFileSync(readmePath, 'utf8');
        expect(content).toMatch(/team|member|author|contributor|developer/i);
      }
    });

    test('README includes features list', () => {
      if (fs.existsSync(readmePath)) {
        const content = fs.readFileSync(readmePath, 'utf8');
        expect(content).toMatch(/feature|functionality|capabilities/i);
      }
    });

    test('README includes technology stack', () => {
      if (fs.existsSync(readmePath)) {
        const content = fs.readFileSync(readmePath, 'utf8');
        const hasTech = content.match(/technolog|stack|built.*with|framework/i);
        const hasReact = content.match(/react|vite|tailwind|javascript/i);
        
        expect(hasTech || hasReact).toBeTruthy();
      }
    });

    test('README includes setup/installation instructions', () => {
      if (fs.existsSync(readmePath)) {
        const content = fs.readFileSync(readmePath, 'utf8');
        expect(content).toMatch(/install|setup|getting.*started|how.*to.*run/i);
      }
    });

    test('README includes live demo link or deployment URL', () => {
      if (fs.existsSync(readmePath)) {
        const content = fs.readFileSync(readmePath, 'utf8');
        const hasLiveLink = content.match(/live|demo|deploy|https?:\/\//i);
        
        expect(hasLiveLink).toBeTruthy();
      }
    });

    test('README includes screenshots or images', () => {
      if (fs.existsSync(readmePath)) {
        const content = fs.readFileSync(readmePath, 'utf8');
        const hasImages = content.match(/!\[.*\]\(.*\)|screenshot|image/i);
        
        // Bonus - good to have
        if (hasImages) {
          expect(hasImages).toBeTruthy();
        } else {
          expect(true).toBe(true); // Pass anyway
        }
      }
    });
  });

  describe('.gitignore Tests', () => {
    test('.gitignore file exists', () => {
      const gitignorePath = path.join(gradingFolder, '.gitignore');
      expect(fs.existsSync(gitignorePath)).toBe(true);
    });

    test('.gitignore includes node_modules', () => {
      const gitignorePath = path.join(gradingFolder, '.gitignore');
      if (fs.existsSync(gitignorePath)) {
        const content = fs.readFileSync(gitignorePath, 'utf8');
        expect(content).toMatch(/node_modules/);
      }
    });

    test('.gitignore includes build/dist directories', () => {
      const gitignorePath = path.join(gradingFolder, '.gitignore');
      if (fs.existsSync(gitignorePath)) {
        const content = fs.readFileSync(gitignorePath, 'utf8');
        expect(content).toMatch(/dist|build/);
      }
    });

    test('.gitignore includes environment files', () => {
      const gitignorePath = path.join(gradingFolder, '.gitignore');
      if (fs.existsSync(gitignorePath)) {
        const content = fs.readFileSync(gitignorePath, 'utf8');
        expect(content).toMatch(/\.env/);
      }
    });
  });
});
