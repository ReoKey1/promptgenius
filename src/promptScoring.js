/**
 * Prompt Quality Scoring Algorithm
 * Analyzes prompts and provides a 1-100 quality score with optimization suggestions
 */

export function calculateQualityScore(promptText) {
    if (!promptText || promptText.trim().length === 0) {
        return 0;
    }

    let score = 0;
    const factors = [];

    // Factor 1: Length (0-15 points)
    const wordCount = promptText.trim().split(/\s+/).length;
    if (wordCount >= 50) {
        score += 15;
        factors.push({ name: 'length', points: 15, status: 'excellent' });
    } else if (wordCount >= 30) {
        score += 12;
        factors.push({ name: 'length', points: 12, status: 'good' });
    } else if (wordCount >= 15) {
        score += 8;
        factors.push({ name: 'length', points: 8, status: 'fair' });
    } else {
        score += 3;
        factors.push({ name: 'length', points: 3, status: 'poor' });
    }

    // Factor 2: Specificity (0-20 points)
    const specificityKeywords = [
        'specific', 'detailed', 'exactly', 'precisely', 'particular',
        'format:', 'style:', 'tone:', 'length:', 'audience:',
        'include:', 'must:', 'should:', 'example:', 'such as'
    ];
    const specificityCount = specificityKeywords.filter(keyword => 
        promptText.toLowerCase().includes(keyword)
    ).length;
    
    if (specificityCount >= 5) {
        score += 20;
        factors.push({ name: 'specificity', points: 20, status: 'excellent' });
    } else if (specificityCount >= 3) {
        score += 15;
        factors.push({ name: 'specificity', points: 15, status: 'good' });
    } else if (specificityCount >= 1) {
        score += 8;
        factors.push({ name: 'specificity', points: 8, status: 'fair' });
    } else {
        score += 0;
        factors.push({ name: 'specificity', points: 0, status: 'poor' });
    }

    // Factor 3: Context (0-15 points)
    const contextKeywords = [
        'context:', 'background:', 'situation:', 'scenario:',
        'you are', 'act as', 'role:', 'perspective:', 'as a'
    ];
    const hasContext = contextKeywords.some(keyword => 
        promptText.toLowerCase().includes(keyword)
    );
    
    if (hasContext) {
        score += 15;
        factors.push({ name: 'context', points: 15, status: 'excellent' });
    } else {
        score += 0;
        factors.push({ name: 'context', points: 0, status: 'poor' });
    }

    // Factor 4: Output Format (0-15 points)
    const formatKeywords = [
        'format:', 'structure:', 'organize', 'list', 'bullet points',
        'numbered', 'table', 'json', 'markdown', 'html', 'csv',
        'paragraph', 'essay', 'article', 'report', 'summary'
    ];
    const hasFormat = formatKeywords.some(keyword => 
        promptText.toLowerCase().includes(keyword)
    );
    
    if (hasFormat) {
        score += 15;
        factors.push({ name: 'format', points: 15, status: 'excellent' });
    } else {
        score += 0;
        factors.push({ name: 'format', points: 0, status: 'poor' });
    }

    // Factor 5: Examples (0-15 points)
    const exampleKeywords = [
        'example:', 'for example', 'such as', 'like:', 'similar to',
        'e.g.', 'for instance', 'here\'s an example'
    ];
    const hasExamples = exampleKeywords.some(keyword => 
        promptText.toLowerCase().includes(keyword)
    );
    
    if (hasExamples) {
        score += 15;
        factors.push({ name: 'examples', points: 15, status: 'excellent' });
    } else {
        score += 0;
        factors.push({ name: 'examples', points: 0, status: 'poor' });
    }

    // Factor 6: Constraints (0-10 points)
    const constraintKeywords = [
        'limit', 'maximum', 'minimum', 'no more than', 'at least',
        'within', 'between', 'approximately', 'around', 'words',
        'characters', 'sentences', 'paragraphs', 'avoid', 'don\'t',
        'exclude', 'without'
    ];
    const constraintCount = constraintKeywords.filter(keyword => 
        promptText.toLowerCase().includes(keyword)
    ).length;
    
    if (constraintCount >= 3) {
        score += 10;
        factors.push({ name: 'constraints', points: 10, status: 'excellent' });
    } else if (constraintCount >= 1) {
        score += 5;
        factors.push({ name: 'constraints', points: 5, status: 'fair' });
    } else {
        score += 0;
        factors.push({ name: 'constraints', points: 0, status: 'poor' });
    }

    // Factor 7: Clarity (0-10 points)
    // Check for question marks, clear instructions
    const hasClearInstructions = /\b(write|create|generate|explain|describe|analyze|summarize|list)\b/i.test(promptText);
    const sentences = promptText.split(/[.!?]+/).filter(s => s.trim().length > 0);
    const avgSentenceLength = promptText.length / Math.max(sentences.length, 1);
    
    if (hasClearInstructions && avgSentenceLength < 150) {
        score += 10;
        factors.push({ name: 'clarity', points: 10, status: 'excellent' });
    } else if (hasClearInstructions) {
        score += 6;
        factors.push({ name: 'clarity', points: 6, status: 'good' });
    } else {
        score += 2;
        factors.push({ name: 'clarity', points: 2, status: 'poor' });
    }

    // Cap score at 100
    score = Math.min(100, Math.round(score));

    return score;
}

export function generateSuggestions(promptText, currentScore) {
    const suggestions = [];

    // Check length
    const wordCount = promptText.trim().split(/\s+/).length;
    if (wordCount < 30) {
        suggestions.push({
            id: 'length',
            title: 'Add more detail',
            description: `Your prompt has ${wordCount} words. Aim for 30-50 words for better results. Add more context, constraints, or examples.`,
            impact: 'high'
        });
    }

    // Check for context
    const contextKeywords = ['context:', 'background:', 'you are', 'act as', 'role:'];
    const hasContext = contextKeywords.some(k => promptText.toLowerCase().includes(k));
    if (!hasContext) {
        suggestions.push({
            id: 'context',
            title: 'Add context or role',
            description: 'Define who the AI should act as or provide background context. Example: "Act as a professional copywriter..." or "Context: This is for a tech startup..."',
            impact: 'high'
        });
    }

    // Check for output format
    const formatKeywords = ['format:', 'structure:', 'list', 'bullet points', 'table'];
    const hasFormat = formatKeywords.some(k => promptText.toLowerCase().includes(k));
    if (!hasFormat) {
        suggestions.push({
            id: 'format',
            title: 'Specify output format',
            description: 'Tell the AI how to structure the response. Example: "Format: Bullet points" or "Structure: Introduction, 3 main points, conclusion"',
            impact: 'medium'
        });
    }

    // Check for examples
    const exampleKeywords = ['example:', 'for example', 'such as', 'like:'];
    const hasExamples = exampleKeywords.some(k => promptText.toLowerCase().includes(k));
    if (!hasExamples && wordCount > 20) {
        suggestions.push({
            id: 'examples',
            title: 'Include examples',
            description: 'Provide examples of what you want. This helps the AI understand your expectations better.',
            impact: 'medium'
        });
    }

    // Check for constraints
    const constraintKeywords = ['limit', 'maximum', 'minimum', 'avoid', 'don\'t', 'exclude'];
    const hasConstraints = constraintKeywords.some(k => promptText.toLowerCase().includes(k));
    if (!hasConstraints) {
        suggestions.push({
            id: 'constraints',
            title: 'Add constraints',
            description: 'Set boundaries for the AI. Example: "Maximum 500 words" or "Avoid technical jargon" or "Don\'t include personal opinions"',
            impact: 'low'
        });
    }

    // Check for specificity
    const specificityKeywords = ['specific', 'detailed', 'exactly', 'precisely'];
    const hasSpecificity = specificityKeywords.some(k => promptText.toLowerCase().includes(k));
    if (!hasSpecificity) {
        suggestions.push({
            id: 'specificity',
            title: 'Be more specific',
            description: 'Use words like "specific", "detailed", "exactly", "precisely" to guide the AI toward more targeted responses.',
            impact: 'medium'
        });
    }

    // Check for clear action verbs
    const actionVerbs = ['write', 'create', 'generate', 'explain', 'describe', 'analyze', 'summarize'];
    const hasActionVerb = actionVerbs.some(v => promptText.toLowerCase().includes(v));
    if (!hasActionVerb) {
        suggestions.push({
            id: 'action',
            title: 'Start with a clear action verb',
            description: 'Begin your prompt with a clear instruction: "Write...", "Create...", "Generate...", "Explain...", etc.',
            impact: 'high'
        });
    }

    // Sort by impact
    const impactOrder = { high: 0, medium: 1, low: 2 };
    suggestions.sort((a, b) => impactOrder[a.impact] - impactOrder[b.impact]);

    // Return top 5 suggestions
    return suggestions.slice(0, 5);
}

export function getScoreRating(score) {
    if (score >= 80) return { rating: 'Excellent', color: '#10b981', description: 'Your prompt is well-optimized!' };
    if (score >= 60) return { rating: 'Good', color: '#3b82f6', description: 'Your prompt is solid with room for improvement.' };
    if (score >= 40) return { rating: 'Fair', color: '#f59e0b', description: 'Your prompt needs optimization.' };
    return { rating: 'Poor', color: '#ef4444', description: 'Your prompt needs significant improvement.' };
}

export function analyzePromptFactors(promptText) {
    const factors = [];

    // Length analysis
    const wordCount = promptText.trim().split(/\s+/).length;
    factors.push({
        name: 'Length',
        score: wordCount >= 30 ? 100 : Math.round((wordCount / 30) * 100),
        details: `${wordCount} words (target: 30-50)`
    });

    // Specificity analysis
    const specificityKeywords = ['specific', 'detailed', 'exactly', 'precisely', 'format:', 'style:', 'tone:'];
    const specificityCount = specificityKeywords.filter(k => promptText.toLowerCase().includes(k)).length;
    factors.push({
        name: 'Specificity',
        score: Math.min(100, specificityCount * 25),
        details: `${specificityCount} specificity indicators found`
    });

    // Context analysis
    const contextKeywords = ['context:', 'background:', 'you are', 'act as', 'role:'];
    const hasContext = contextKeywords.some(k => promptText.toLowerCase().includes(k));
    factors.push({
        name: 'Context',
        score: hasContext ? 100 : 0,
        details: hasContext ? 'Context provided' : 'No context provided'
    });

    // Format analysis
    const formatKeywords = ['format:', 'structure:', 'list', 'bullet points', 'table'];
    const hasFormat = formatKeywords.some(k => promptText.toLowerCase().includes(k));
    factors.push({
        name: 'Output Format',
        score: hasFormat ? 100 : 0,
        details: hasFormat ? 'Format specified' : 'No format specified'
    });

    // Examples analysis
    const exampleKeywords = ['example:', 'for example', 'such as', 'like:'];
    const hasExamples = exampleKeywords.some(k => promptText.toLowerCase().includes(k));
    factors.push({
        name: 'Examples',
        score: hasExamples ? 100 : 0,
        details: hasExamples ? 'Examples provided' : 'No examples provided'
    });

    return factors;
}

