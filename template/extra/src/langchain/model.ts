import { ChatOpenAI } from "@langchain/openai";

const env = process.env;

export const model = new ChatOpenAI({
	openAIApiKey: env.OPENAI_API_KEY,
});
