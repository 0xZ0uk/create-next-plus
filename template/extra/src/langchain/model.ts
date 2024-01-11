import { ChatOpenAI } from "@langchain/openai";

const env = Bun.env;

export const model = new ChatOpenAI({
	openAIApiKey: env.OPENAI_API_KEY,
});
