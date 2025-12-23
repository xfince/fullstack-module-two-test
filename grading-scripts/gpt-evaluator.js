/**
 * grading-scripts/gpt-evaluator.js
 * 
 * Uses GPT-4o to evaluate code quality and semantic aspects
 */

const fs = require('fs');
const path = require('path');
const OpenAI = require('openai');

const openai = new OpenAI({
  apiKey: process.env.OPENAI_API_KEY
});

async function evaluateWithGPT() {
  console.error('🤖 Starting GPT-4o Evaluation...\n');

  if (!process.env.OPENAI_API_KEY) {
    console.error('❌ OPENAI_API_KEY environment variable not set');
    process.exit(1);
  }

  // Load rubric
  const rubric = JSON.parse(fs.readFileSync('rubric.json', 'utf8'));
  
  // Load code summaries
  let codeSummaries = {};
  if (fs.existsSync('code-summaries.json')) {
    codeSummaries = JSON.parse(fs.readFileSync('code-summaries.json', 'utf8'));
  }

  // Load unit test results
  let unitTestResults = {};
  if (fs.existsSync('unit-test-results.json')) {
    unitTestResults = JSON.parse(fs.readFileSync('unit-test-results.json', 'utf8'));
  }

  const evaluation = {
    timestamp: new Date().toISOString(),
    model: 'gpt-4o',
    criteria_evaluations: {},
    metadata: {
      total_api_calls: 0,
      total_tokens_used: 0,
      evaluation_time_ms: 0
    }
  };

  const startTime = Date.now();

  // Get criteria that need GPT evaluation
  const gptCriteria = rubric.criteria.filter(c => 
    c.evaluation_method === 'gpt_semantic' || 
    c.evaluation_method === 'hybrid'
  );

  console.error(`📋 Evaluating ${gptCriteria.length} criteria with GPT-4o\n`);

  // Batch criteria into groups to minimize API calls (Module 2 - React/Vite)
  const batches = [
    // Batch 1: Header & Hero Components
    gptCriteria.filter(c => ['criterion_1', 'criterion_2'].includes(c.id)),
    
    // Batch 2: Signature Dishes & Menu Pages
    gptCriteria.filter(c => ['criterion_3', 'criterion_4'].includes(c.id)),
    
    // Batch 3: Form & Chatbot & Footer
    gptCriteria.filter(c => ['criterion_5', 'criterion_6', 'criterion_7'].includes(c.id)),
    
    // Batch 4: JavaScript Functionality & Responsiveness
    gptCriteria.filter(c => ['criterion_8', 'criterion_9'].includes(c.id)),
    
    // Batch 5: Git & Documentation
    gptCriteria.filter(c => ['criterion_10'].includes(c.id))
  ].filter(batch => batch.length > 0);

  for (let i = 0; i < batches.length; i++) {
    const batch = batches[i];
    console.error(`📦 Processing Batch ${i + 1}/${batches.length} (${batch.length} criteria)...`);

    for (const criterion of batch) {
      try {
        console.error(`   Evaluating: ${criterion.title}`);
        
        const result = await evaluateCriterion(criterion, codeSummaries, unitTestResults, rubric);
        evaluation.criteria_evaluations[criterion.id] = result;
        evaluation.metadata.total_api_calls++;
        evaluation.metadata.total_tokens_used += result.tokens_used || 0;

        console.error(`   ✅ Score: ${result.score}/${criterion.max_points}`);
        
        // Small delay to avoid rate limits
        await new Promise(resolve => setTimeout(resolve, 1000));
      } catch (error) {
        console.error(`   ❌ Error evaluating ${criterion.title}:`, error.message);
        evaluation.criteria_evaluations[criterion.id] = {
          criterion_id: criterion.id,
          score: 0,
          error: error.message,
          evaluation_failed: true
        };
      }
    }
    
    console.error();
  }

  evaluation.metadata.evaluation_time_ms = Date.now() - startTime;

  console.error('✨ GPT Evaluation Complete!\n');
  console.error(`📊 Statistics:`);
  console.error(`   Total API Calls: ${evaluation.metadata.total_api_calls}`);
  console.error(`   Total Tokens: ${evaluation.metadata.total_tokens_used}`);
  console.error(`   Time: ${(evaluation.metadata.evaluation_time_ms / 1000).toFixed(2)}s\n`);

  // Output JSON (ONLY JSON to stdout)
  console.log(JSON.stringify(evaluation, null, 2));

  return evaluation;
}

async function evaluateCriterion(criterion, codeSummaries, unitTestResults, rubric) {
  const isHybrid = criterion.evaluation_method === 'hybrid';
  
  // Build context for GPT
  let context = buildContext(criterion, codeSummaries, unitTestResults);
  
  // Build prompt
  const prompt = `You are an expert code reviewer evaluating a student's full-stack project for an academic course.

**Criterion**: ${criterion.title}
**ID**: ${criterion.id}
**Max Points**: ${criterion.max_points}
**Evaluation Method**: ${criterion.evaluation_method}

**Scoring Levels**:
${criterion.max_points === 10 ? `
- Excellent (9-10 points): ${criterion.levels.Excellent}
- Good (7-8 points): ${criterion.levels.Good}
- Fair (5-6 points): ${criterion.levels.Fair}
- Poor (1-4 points): ${criterion.levels.Poor}
` : criterion.max_points === 5 ? `
- Excellent (4.5-5 points): ${criterion.levels.Excellent}
- Good (3.5-4.4 points): ${criterion.levels.Good}
- Fair (2.5-3.4 points): ${criterion.levels.Fair}
- Poor (1-2.4 points): ${criterion.levels.Poor}
` : criterion.max_points === 3 ? `
- Excellent (3 points): ${criterion.levels.Excellent}
- Good (2-2.9 points): ${criterion.levels.Good}
- Fair (1.5-1.9 points): ${criterion.levels.Fair}
- Poor (1-1.4 points): ${criterion.levels.Poor}
` : criterion.max_points === 2 ? `
- Excellent (2 points): ${criterion.levels.Excellent}
- Good (1.5-1.9 points): ${criterion.levels.Good}
- Fair (1-1.4 points): ${criterion.levels.Fair}
- Poor (0.5-0.9 points): ${criterion.levels.Poor}
` : `
- Excellent (4 points): ${criterion.levels.Excellent}
- Good (3 points): ${criterion.levels.Good}
- Fair (2 points): ${criterion.levels.Fair}
- Poor (1 point): ${criterion.levels.Poor}
`}

**Evaluation Instructions**: ${criterion.gpt_instructions}

${isHybrid ? `**Unit Test Results**:
- Tests Passed: ${unitTestResults.criteria_scores?.[criterion.id]?.passed || 0}
- Tests Failed: ${unitTestResults.criteria_scores?.[criterion.id]?.failed || 0}
- Test Score: ${unitTestResults.criteria_scores?.[criterion.id]?.score || 0}/${criterion.max_points}
` : ''}

**Code Analysis**:
${context}

**Your Task**:
Analyze the provided information and assign a score between 1.0 and ${criterion.max_points}.0 (decimals allowed for in-between cases).
${isHybrid ? `Note: The unit test score is ${unitTestResults.criteria_scores?.[criterion.id]?.score || 0}. You should evaluate the semantic/qualitative aspects and your score will be weighted at ${criterion.gpt_weight * 100}% while unit tests are weighted at ${criterion.unit_test_weight * 100}%.` : ''}

Provide your response in JSON format:
{
  "score": <number between 1.0 and ${criterion.max_points}.0>,
  "level_achieved": "<Poor/Fair/Good/Excellent or combination>",
  "justification": "<detailed explanation of score>",
  "strengths": ["<specific strength 1>", "<specific strength 2>", ...],
  "weaknesses": ["<specific weakness 1>", "<specific weakness 2>", ...],
  "improvements": ["<specific improvement 1>", "<specific improvement 2>", ...],
  "files_analyzed": ["<file1>", "<file2>", ...]
}`;

  try {
    const response = await openai.chat.completions.create({
      model: 'gpt-4o',
      messages: [
        {
          role: 'system',
          content: 'You are an expert full-stack development instructor evaluating student projects. Provide fair, constructive feedback with specific examples.'
        },
        {
          role: 'user',
          content: prompt
        }
      ],
      temperature: 0.3,
      response_format: { type: 'json_object' }
    });

    const gptResponse = JSON.parse(response.choices[0].message.content);
    
    let finalScore = gptResponse.score;
    
    // Calculate weighted score for hybrid criteria
    if (isHybrid) {
      const unitScore = unitTestResults.criteria_scores?.[criterion.id]?.score || 0;
      const gptScore = gptResponse.score;
      
      finalScore = (unitScore * criterion.unit_test_weight) + (gptScore * criterion.gpt_weight);
      finalScore = parseFloat(finalScore.toFixed(2));
      
      gptResponse.hybrid_calculation = {
        unit_test_score: unitScore,
        unit_test_weight: criterion.unit_test_weight,
        gpt_score: gptScore,
        gpt_weight: criterion.gpt_weight,
        final_score: finalScore
      };
    }

    return {
      criterion_id: criterion.id,
      criterion_title: criterion.title,
      score: finalScore,
      max_points: criterion.max_points,
      gpt_score: gptResponse.score,
      level_achieved: gptResponse.level_achieved,
      justification: gptResponse.justification,
      strengths: gptResponse.strengths || [],
      weaknesses: gptResponse.weaknesses || [],
      improvements: gptResponse.improvements || [],
      files_analyzed: gptResponse.files_analyzed || [],
      tokens_used: response.usage?.total_tokens || 0,
      ...(isHybrid && { hybrid_calculation: gptResponse.hybrid_calculation })
    };
  } catch (error) {
    throw new Error(`GPT API error: ${error.message}`);
  }
}

function buildContext(criterion, codeSummaries, unitTestResults) {
  let context = '';
  
  // Module 2 specific context building (React/Vite project)
  if (criterion.id === 'criterion_1') {
    // Header & Navigation
    context += '**Header Component**:\n';
    if (codeSummaries.frontend?.components) {
      const headerComponent = codeSummaries.frontend.components.find(c => 
        c.file_name.toLowerCase().includes('header')
      );
      if (headerComponent) {
        context += `- ${headerComponent.file_name} (${headerComponent.lines} lines)\n`;
        context += `  Hooks: ${headerComponent.hooks_used?.join(', ') || 'none'}\n`;
        if (headerComponent.key_snippets?.length > 0) {
          context += `  Key code:\n\`\`\`\n${headerComponent.key_snippets[0]}\n\`\`\`\n`;
        }
      }
    }
  } else if (criterion.id === 'criterion_2') {
    // Hero Section
    context += '**Hero/Carousel Component**:\n';
    if (codeSummaries.frontend?.components) {
      const heroComponent = codeSummaries.frontend.components.find(c => 
        c.file_name.toLowerCase().includes('hero') || c.file_name.toLowerCase().includes('carousel')
      );
      if (heroComponent) {
        context += `- ${heroComponent.file_name} (${heroComponent.lines} lines)\n`;
        context += `  Hooks: ${heroComponent.hooks_used?.join(', ') || 'none'}\n`;
        if (heroComponent.key_snippets?.length > 0) {
          context += `  Key code:\n\`\`\`\n${heroComponent.key_snippets[0]}\n\`\`\`\n`;
        }
      }
    }
  } else if (criterion.id === 'criterion_3') {
    // Signature Dishes
    context += '**Signature Dishes Component**:\n';
    if (codeSummaries.frontend?.components) {
      const signatureComponent = codeSummaries.frontend.components.find(c => 
        c.file_name.toLowerCase().includes('signature') || c.file_name.toLowerCase().includes('dishes')
      );
      if (signatureComponent) {
        context += `- ${signatureComponent.file_name} (${signatureComponent.lines} lines)\n`;
        context += `  Hooks: ${signatureComponent.hooks_used?.join(', ') || 'none'}\n`;
      }
    }
    context += '\n**Data Files**:\n';
    if (codeSummaries.data) {
      codeSummaries.data.forEach(dataFile => {
        context += `- ${dataFile.file_name} (${dataFile.lines} lines)\n`;
      });
    }
  } else if (criterion.id === 'criterion_4') {
    // Menu Pages & Routing
    context += '**Page Components**:\n';
    if (codeSummaries.frontend?.pages) {
      codeSummaries.frontend.pages.forEach(page => {
        context += `- ${page.file_name} (${page.lines} lines)\n`;
      });
    }
    context += '\n**App.jsx (Router Configuration)**:\n';
    if (codeSummaries.frontend?.app) {
      context += `Routes configured: ${codeSummaries.frontend.app.routes_count || 'unknown'}\n`;
    }
  } else if (criterion.id === 'criterion_5') {
    // Reservation Form
    context += '**Form Component**:\n';
    if (codeSummaries.frontend?.components) {
      const formComponent = codeSummaries.frontend.components.find(c => 
        c.file_name.toLowerCase().includes('form') || c.file_name.toLowerCase().includes('reservation')
      );
      if (formComponent) {
        context += `- ${formComponent.file_name} (${formComponent.lines} lines)\n`;
        context += `  Hooks: ${formComponent.hooks_used?.join(', ') || 'none'}\n`;
        if (formComponent.key_snippets?.length > 0) {
          context += `  Key code:\n\`\`\`\n${formComponent.key_snippets[0]}\n\`\`\`\n`;
        }
      }
    }
  } else if (criterion.id === 'criterion_6') {
    // Chatbot
    context += '**Chatbot Component**:\n';
    if (codeSummaries.frontend?.components) {
      const chatComponent = codeSummaries.frontend.components.find(c => 
        c.file_name.toLowerCase().includes('chat') || c.file_name.toLowerCase().includes('bot')
      );
      if (chatComponent) {
        context += `- ${chatComponent.file_name} (${chatComponent.lines} lines)\n`;
        context += `  Hooks: ${chatComponent.hooks_used?.join(', ') || 'none'}\n`;
      }
    }
  } else if (criterion.id === 'criterion_7') {
    // Footer
    context += '**Footer Component**:\n';
    if (codeSummaries.frontend?.components) {
      const footerComponent = codeSummaries.frontend.components.find(c => 
        c.file_name.toLowerCase().includes('footer')
      );
      if (footerComponent) {
        context += `- ${footerComponent.file_name} (${footerComponent.lines} lines)\n`;
        context += `  Hooks: ${footerComponent.hooks_used?.join(', ') || 'none'}\n`;
      }
    }
  } else if (criterion.id === 'criterion_8') {
    // JavaScript Functionality
    context += '**Overall JavaScript Implementation**:\n';
    context += `Total Components: ${codeSummaries.frontend?.components?.length || 0}\n`;
    context += `Total Pages: ${codeSummaries.frontend?.pages?.length || 0}\n`;
    context += `Total Lines: ${codeSummaries.statistics?.total_lines || 0}\n\n`;
    
    context += '**Hooks Usage Across Components**:\n';
    if (codeSummaries.frontend?.components) {
      const hooksUsage = {};
      codeSummaries.frontend.components.forEach(comp => {
        (comp.hooks_used || []).forEach(hook => {
          hooksUsage[hook] = (hooksUsage[hook] || 0) + 1;
        });
      });
      Object.entries(hooksUsage).forEach(([hook, count]) => {
        context += `- ${hook}: ${count} components\n`;
      });
    }
  } else if (criterion.id === 'criterion_9') {
    // Responsiveness
    context += '**Styling and Responsiveness**:\n';
    context += `Tailwind Config: ${codeSummaries.config?.has_tailwind ? 'Yes' : 'No'}\n`;
    context += `CSS Files: ${codeSummaries.styles?.length || 0}\n\n`;
    
    context += '**Component Structure**:\n';
    if (codeSummaries.frontend?.components) {
      codeSummaries.frontend.components.slice(0, 5).forEach(comp => {
        context += `- ${comp.file_name}: ${comp.has_responsive_classes ? 'Has responsive classes' : 'Check needed'}\n`;
      });
    }
  } else if (criterion.id === 'criterion_10') {
    // Git & Documentation
    context += '**README Documentation**:\n';
    if (codeSummaries.documentation) {
      const readme = codeSummaries.documentation.find(d => 
        d.file_name.toLowerCase().includes('readme')
      );
      if (readme) {
        context += `- ${readme.file_name} (${readme.lines} lines, ${readme.word_count} words)\n`;
        context += `  Preview: ${readme.preview}\n\n`;
      }
    }
    
    context += '**Git Information**:\n';
    if (codeSummaries.git) {
      context += `Commit count: ${codeSummaries.git.commit_count || 'unknown'}\n`;
      context += `Branch count: ${codeSummaries.git.branch_count || 'unknown'}\n`;
    }
  } else {
    // Generic context
    context += `**Project Overview**:\n`;
    context += `Frontend Components: ${codeSummaries.frontend?.components?.length || 0}\n`;
    context += `Frontend Pages: ${codeSummaries.frontend?.pages?.length || 0}\n`;
    context += `Total Lines of Code: ${codeSummaries.statistics?.total_lines || 0}\n`;
  }
  
  return context;
}

// Run if called directly
if (require.main === module) {
  evaluateWithGPT()
    .then(results => {
      process.exit(0);
    })
    .catch(error => {
      console.error('Fatal error:', error);
      process.exit(1);
    });
}

module.exports = { evaluateWithGPT };