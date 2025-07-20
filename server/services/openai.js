const OpenAI = require('openai');
const { logger } = require('../utils/logger');

const openai = new OpenAI({
  apiKey: process.env.OPENAI_API_KEY
});

const COMMIT_STYLES = {
  conventional: {
    prompt: "Generate a conventional commit message",
    examples: "feat: add user authentication\nfix: resolve memory leak in cache\ndocs: update API documentation"
  },
  descriptive: {
    prompt: "Generate a descriptive commit message that explains what and why",
    examples: "Add user authentication system with JWT tokens\nFix memory leak in Redis cache by properly closing connections"
  },
  emoji: {
    prompt: "Generate a commit message with relevant emojis",
    examples: "✨ Add new user dashboard\n🐛 Fix login redirect issue\n📚 Update installation guide"
  },
  semantic: {
    prompt: "Generate a semantic commit message following Angular conventions",
    examples: "feat(auth): implement JWT authentication\nfix(cache): resolve memory leak\nchore(deps): update dependencies"
  },
  ticket: {
    prompt: "Generate a commit message with ticket/issue reference",
    examples: "[FEAT-123] Add user authentication\n[BUG-456] Fix memory leak in cache\n[DOC-789] Update API docs"
  }
};

async function generateCommitMessage(diff, style = 'conventional', customInstructions = '') {
  try {
    const styleConfig = COMMIT_STYLES[style] || COMMIT_STYLES.conventional;
    
    const systemPrompt = `You are a Git commit message generator. ${styleConfig.prompt}.
    
Examples of good commit messages in this style:
${styleConfig.examples}

Guidelines:
- Keep the subject line under 72 characters
- Use present tense ("add" not "added")
- Be concise but descriptive
- Focus on what and why, not how
${customInstructions ? `\nAdditional instructions: ${customInstructions}` : ''}`;

    const response = await openai.chat.completions.create({
      model: 'gpt-4-turbo-preview',
      messages: [
        {
          role: 'system',
          content: systemPrompt
        },
        {
          role: 'user',
          content: `Generate a commit message for the following git diff:\n\n${diff}`
        }
      ],
      temperature: 0.7,
      max_tokens: 200
    });

    const commitMessage = response.choices[0].message.content.trim();
    
    logger.info('Generated commit message', { style, length: commitMessage.length });
    
    return {
      message: commitMessage,
      style,
      tokensUsed: response.usage.total_tokens
    };
  } catch (error) {
    logger.error('Error generating commit message:', error);
    throw new Error('Failed to generate commit message');
  }
}

async function analyzeCommitHistory(commits, userId) {
  try {
    const analysis = await openai.chat.completions.create({
      model: 'gpt-4-turbo-preview',
      messages: [
        {
          role: 'system',
          content: 'Analyze the git commit history and provide insights about commit patterns, style consistency, and suggestions for improvement.'
        },
        {
          role: 'user',
          content: `Analyze these commit messages:\n\n${commits.map(c => c.message).join('\n')}`
        }
      ],
      temperature: 0.5,
      max_tokens: 500
    });

    return {
      analysis: analysis.choices[0].message.content,
      commitCount: commits.length,
      generatedAt: new Date().toISOString()
    };
  } catch (error) {
    logger.error('Error analyzing commit history:', error);
    throw new Error('Failed to analyze commit history');
  }
}

module.exports = {
  generateCommitMessage,
  analyzeCommitHistory,
  COMMIT_STYLES
};