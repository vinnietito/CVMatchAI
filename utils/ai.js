// server/utils/ai.js
const { Configuration, OpenAIApi } = require('openai');
require('dotenv').config();

const configuration = new Configuration({
  apiKey: process.env.OPENAI_API_KEY,
});
const openai = new OpenAIApi(configuration);

const analyzeWithAI = async (cv, jobDescription) => {
  const prompt = `
Compare the following CV and job description:
CV: ${cv}
Job Description: ${jobDescription}

1. Match percentage between CV and job (0-100%):
2. Skills matched:
3. Skills missing:
4. Suggestions to improve:
5. AI-generated professional cover letter tailored to the job:
`;

  const completion = await openai.createChatCompletion({
    model: 'gpt-3.5-turbo',
    messages: [{ role: 'user', content: prompt }],
    temperature: 0.7,
    max_tokens: 1000,
  });

  return { result: completion.data.choices[0].message.content };
};

module.exports = { analyzeWithAI };
