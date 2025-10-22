/**
 * Calculate quality score for a prompt (0-100)
 * Based on best practices for prompt engineering
 */
function calculateQualityScore(content) {
  let score = 0;
  const maxScore = 100;

  if (!content || typeof content !== 'string') {
    return 0;
  }

  const wordCount = content.trim().split(/\s+/).length;
  const charCount = content.length;

  // 1. Length check (20 points)
  // Optimal length: 50-200 words
  if (wordCount >= 50 && wordCount <= 200) {
    score += 20;
  } else if (wordCount >= 30 && wordCount < 50) {
    score += 15;
  } else if (wordCount > 200 && wordCount <= 300) {
    score += 15;
  } else if (wordCount >= 20 && wordCount < 30) {
    score += 10;
  } else if (wordCount > 300) {
    score += 10;
  } else {
    score += 5;
  }

  // 2. Specificity check (20 points)
  // Look for specific details, numbers, examples
  const specificityIndicators = [
    /\d+/, // Contains numbers
    /for example|such as|like|including/i, // Contains examples
    /specifically|exactly|precisely/i, // Specific language
    /"[^"]+"/g, // Contains quotes
    /\[.*?\]/g // Contains brackets/placeholders
  ];

  let specificityScore = 0;
  specificityIndicators.forEach(indicator => {
    if (indicator.test(content)) {
      specificityScore += 4;
    }
  });
  score += Math.min(specificityScore, 20);

  // 3. Structure check (20 points)
  // Look for clear structure: sections, lists, formatting
  const structureIndicators = [
    /\n\n/, // Paragraph breaks
    /^[-*•]\s/m, // Bullet points
    /^\d+\.\s/m, // Numbered lists
    /:\s*\n/m, // Colons followed by newlines
    /^#{1,6}\s/m // Markdown headers
  ];

  let structureScore = 0;
  structureIndicators.forEach(indicator => {
    if (indicator.test(content)) {
      structureScore += 4;
    }
  });
  score += Math.min(structureScore, 20);

  // 4. Context check (20 points)
  // Look for context-setting words
  const contextIndicators = [
    /you are|act as|imagine|pretend/i, // Role setting
    /context|background|scenario/i, // Context setting
    /goal|objective|purpose|aim/i, // Goal setting
    /audience|reader|user/i, // Audience specification
    /tone|style|voice|format/i // Style specification
  ];

  let contextScore = 0;
  contextIndicators.forEach(indicator => {
    if (indicator.test(content)) {
      contextScore += 4;
    }
  });
  score += Math.min(contextScore, 20);

  // 5. Constraints check (20 points)
  // Look for clear constraints and requirements
  const constraintIndicators = [
    /must|should|required|necessary/i, // Requirements
    /do not|don't|avoid|never/i, // Negative constraints
    /limit|maximum|minimum|at least|no more than/i, // Limits
    /format|structure|length/i, // Format constraints
    /include|contain|use/i // Inclusion requirements
  ];

  let constraintScore = 0;
  constraintIndicators.forEach(indicator => {
    if (indicator.test(content)) {
      constraintScore += 4;
    }
  });
  score += Math.min(constraintScore, 20);

  // Ensure score is between 0 and 100
  return Math.min(Math.max(Math.round(score), 0), maxScore);
}

/**
 * Get improvement suggestions based on quality score
 */
function getImprovementSuggestions(content, score) {
  const suggestions = [];

  if (!content || typeof content !== 'string') {
    return ['Add content to your prompt'];
  }

  const wordCount = content.trim().split(/\s+/).length;

  // Length suggestions
  if (wordCount < 30) {
    suggestions.push('Add more detail to your prompt (aim for 50-200 words)');
  } else if (wordCount > 300) {
    suggestions.push('Consider shortening your prompt for clarity (aim for 50-200 words)');
  }

  // Specificity suggestions
  if (!/\d+/.test(content)) {
    suggestions.push('Add specific numbers or quantities for better results');
  }
  if (!/for example|such as|like|including/i.test(content)) {
    suggestions.push('Include examples to clarify your intent');
  }

  // Structure suggestions
  if (!/\n\n/.test(content) && wordCount > 50) {
    suggestions.push('Break your prompt into paragraphs for better structure');
  }
  if (!/^[-*•]\s|^\d+\.\s/m.test(content) && wordCount > 80) {
    suggestions.push('Use bullet points or numbered lists to organize requirements');
  }

  // Context suggestions
  if (!/you are|act as|imagine|pretend/i.test(content)) {
    suggestions.push('Set a clear role or persona (e.g., "You are a marketing expert...")');
  }
  if (!/goal|objective|purpose|aim/i.test(content)) {
    suggestions.push('Specify the goal or desired outcome');
  }
  if (!/tone|style|voice|format/i.test(content)) {
    suggestions.push('Define the tone or style you want (e.g., professional, casual, technical)');
  }

  // Constraint suggestions
  if (!/must|should|required|necessary/i.test(content)) {
    suggestions.push('Add clear requirements using words like "must" or "should"');
  }
  if (!/do not|don\'t|avoid|never/i.test(content) && wordCount > 50) {
    suggestions.push('Specify what to avoid or exclude');
  }

  // If score is high, give positive feedback
  if (score >= 80) {
    return ['Excellent prompt! Your prompt follows best practices.'];
  } else if (score >= 60) {
    return suggestions.slice(0, 3); // Top 3 suggestions
  }

  return suggestions.slice(0, 5); // Top 5 suggestions
}

module.exports = {
  calculateQualityScore,
  getImprovementSuggestions
};

