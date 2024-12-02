import { OpenAI } from "openai";

const openai = new OpenAI({
  // apiKey: process.env.OPENAI_API_KEY,
  apiKey:
    "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",
  dangerouslyAllowBrowser: true,
});
export default openai;
