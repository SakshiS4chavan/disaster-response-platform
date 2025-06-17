import axios from 'axios';

export const extractLocationFromText = async (description) => {
  try {
    const prompt = `Extract location from: "${description}"`;
    const response = await axios.post(
      'https://generativelanguage.googleapis.com/v1beta/models/gemini-pro:generateContent',
      {
        contents: [{ parts: [{ text: prompt }] }]
      },
      {
        headers: {
          'Content-Type': 'application/json',
          Authorization: `Bearer ${process.env.GEMINI_API_KEY}`
        }
      }
    );

    const result = response.data.candidates?.[0]?.content?.parts?.[0]?.text;
    return result?.trim();
  } catch (err) {
    console.error('Gemini location extraction failed:', err.message);
    return null;
  }
};
