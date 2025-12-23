#!/usr/bin/env node

/**
 * run-grading.js
 * 
 * Main orchestrator script that runs the complete grading pipeline
 */

const { execSync } = require('child_process');
const fs = require('fs');
const path = require('path');

// Color codes for terminal output
const colors = {
  reset: '\x1b[0m',
  bright: '\x1b[1m',
  green: '\x1b[32m',
  red: '\x1b[31m',
  yellow: '\x1b[33m',
  blue: '\x1b[34m',
  cyan: '\x1b[36m'
};

function log(message, color = 'reset') {
  console.error(colors[color] + message + colors.reset);
}

function logSection(title) {
  log('\n' + '='.repeat(60), 'cyan');
  log(title, 'bright');
  log('='.repeat(60) + '\n', 'cyan');
}

async function runGrading() {
  const startTime = Date.now();
  
  log('🎓 MODULE 2 AUTOMATED GRADING SYSTEM', 'bright');
  log('━'.repeat(60), 'cyan');
  
  // Check prerequisites
  logSection('📋 Checking Prerequisites');
  
  if (!fs.existsSync('grading-folder')) {
    log('❌ Error: grading-folder not found', 'red');
    log('Please ensure student project is in grading-folder/', 'yellow');
    process.exit(1);
  }
  log('✅ grading-folder exists', 'green');
  
  if (!fs.existsSync('rubric.json')) {
    log('❌ Error: rubric.json not found', 'red');
    process.exit(1);
  }
  log('✅ rubric.json exists', 'green');
  
  if (!fs.existsSync('DEPLOYMENT_URL.txt')) {
    log('⚠️  Warning: DEPLOYMENT_URL.txt not found', 'yellow');
    log('Deployment tests will be skipped', 'yellow');
  } else {
    log('✅ DEPLOYMENT_URL.txt exists', 'green');
  }
  
  if (!process.env.OPENAI_API_KEY) {
    log('⚠️  Warning: OPENAI_API_KEY not set', 'yellow');
    log('GPT evaluation will be skipped', 'yellow');
  } else {
    log('✅ OPENAI_API_KEY configured', 'green');
  }
  
  // Step 1: Run Unit Tests
  logSection('🧪 Step 1/3: Running Unit Tests');
  try {
    execSync('node grading-scripts/run-unit-tests.js > unit-test-results.json', {
      stdio: 'inherit'
    });
    log('✅ Unit tests completed', 'green');
  } catch (error) {
    log('❌ Unit tests failed or had errors', 'red');
    log('Continuing with available data...', 'yellow');
  }
  
  // Step 2: Run GPT Evaluation
  if (process.env.OPENAI_API_KEY) {
    logSection('🤖 Step 2/3: Running GPT-4o Evaluation');
    try {
      execSync('node grading-scripts/gpt-evaluator.js > gpt-evaluation.json', {
        stdio: 'inherit'
      });
      log('✅ GPT evaluation completed', 'green');
    } catch (error) {
      log('❌ GPT evaluation failed', 'red');
      log('Error: ' + error.message, 'yellow');
      log('Continuing with unit test results only...', 'yellow');
    }
  } else {
    log('⏭️  Skipping GPT evaluation (no API key)', 'yellow');
  }
  
  // Step 3: Generate Report
  logSection('📊 Step 3/3: Generating Final Report');
  try {
    execSync('node grading-scripts/generate-report.js', {
      stdio: 'inherit'
    });
    log('✅ Report generated', 'green');
  } catch (error) {
    log('❌ Report generation failed', 'red');
    log('Error: ' + error.message, 'yellow');
    process.exit(1);
  }
  
  // Final Summary
  const endTime = Date.now();
  const duration = ((endTime - startTime) / 1000).toFixed(2);
  
  logSection('🎉 Grading Complete!');
  log(`Total Time: ${duration} seconds`, 'cyan');
  log('\n📄 Output Files:', 'bright');
  log('  • GRADING_REPORT.md - Detailed grading report', 'green');
  log('  • grading-report.json - JSON format results', 'green');
  log('  • unit-test-results.json - Test execution data', 'green');
  if (process.env.OPENAI_API_KEY) {
    log('  • gpt-evaluation.json - GPT evaluation data', 'green');
  }
  
  log('\n✨ View GRADING_REPORT.md for complete results', 'bright');
  log('━'.repeat(60) + '\n', 'cyan');
  
  // Show grade if available
  if (fs.existsSync('grading-report.json')) {
    const report = JSON.parse(fs.readFileSync('grading-report.json', 'utf8'));
    log(`📈 FINAL GRADE: ${report.total_score.toFixed(1)}/${report.max_score} (${report.percentage}%) - ${report.letter_grade}`, 'bright');
    
    if (report.letter_grade === 'A' || report.letter_grade === 'A-') {
      log('🌟 Excellent work!', 'green');
    } else if (report.letter_grade.startsWith('B')) {
      log('👍 Good job!', 'green');
    } else if (report.letter_grade.startsWith('C')) {
      log('✓ Passing grade', 'yellow');
    } else {
      log('⚠️  Needs improvement', 'yellow');
    }
  }
  
  log('');
}

// Run the grading pipeline
if (require.main === module) {
  runGrading().catch(error => {
    log('❌ Fatal error: ' + error.message, 'red');
    process.exit(1);
  });
}

module.exports = { runGrading };
