import { type CoreMessage, streamText, wrapLanguageModel, extractReasoningMiddleware } from "ai"
import { groq } from "@ai-sdk/groq"

const enhancedModel = wrapLanguageModel({
  model: groq("deepseek-r1-distill-llama-70b"),
  middleware: extractReasoningMiddleware({ tagName: "think" }),
})

export async function POST(req: Request) {
  const { messages }: { messages: CoreMessage[] } = await req.json()

  const result = streamText({
    model: enhancedModel,
    system: "You are a compliant helpful AI assistant. Don't respond with markdown and latex at all costs!",
    messages,
  })

  return result.toDataStreamResponse({
    sendReasoning: true,
  })
}

