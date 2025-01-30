"use client"

import { cn } from "@/lib/utils"
import { useChat } from "ai/react"
import { ArrowUpIcon, ChevronDownIcon, ChevronUpIcon } from "lucide-react"
import { Button } from "@/components/ui/button"
import { Tooltip, TooltipContent, TooltipTrigger } from "@/components/ui/tooltip"
import { AutoResizeTextarea } from "@/components/autoresize-textarea"
import { useState } from "react"
import type React from "react"

export function ChatForm({ className, ...props }: React.ComponentProps<"form">) {
  const { messages, input, setInput, append, isLoading } = useChat()

  const [hiddenReasonings, setHiddenReasonings] = useState<Record<string, boolean>>({})

  const handleSubmit = (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault()
    if (!input.trim()) return
    void append({ content: input, role: "user" })
    setInput("")
  }

  const handleKeyDown = (e: React.KeyboardEvent<HTMLTextAreaElement>) => {
    if (e.key === "Enter" && !e.shiftKey) {
      e.preventDefault()
      handleSubmit(e as unknown as React.FormEvent<HTMLFormElement>)
    }
  }

  const toggleReasoning = (messageId: string) => {
    setHiddenReasonings((prev) => ({
      ...prev,
      [messageId]: !prev[messageId],
    }))
  }

  const header = (
    <header className="flex min-h-[40vh] flex-col items-center justify-center px-4 text-center">
      <div className="max-w-[24rem] space-y-4">
        <h1 className="bg-gradient-to-r from-gray-800 to-gray-600 bg-clip-text text-2xl font-semibold tracking-tight text-transparent">
          DeepSeek R1 Chat
        </h1>
        <p className="text-muted-foreground text-sm leading-relaxed">
          Powered by <span className="font-medium text-foreground">Groq</span> and{" "}
          <span className="font-medium text-foreground">DeepSeek</span>
        </p>
        <div className="text-muted-foreground/80 text-xs">
          Begin your conversation...
        </div>
      </div>
    </header>
  )

  const messageList = (
    <div className="flex flex-col gap-3 px-2 py-4 sm:px-4">
      {messages.map((message) => (
        <div
          key={message.id}
          data-role={message.role}
          className={`group relative max-w-[85%] sm:max-w-[75%] px-3 py-2 text-sm transition-all ${message.role === "assistant"
            ? "self-start ml-1 sm:ml-2 rounded-3xl rounded-bl-lg bg-gradient-to-br from-[#e9e9eb] to-[#f3f3f3] text-black"
            : "self-end mr-1 sm:mr-2 rounded-3xl rounded-br-lg bg-gradient-to-br from-[#0a84ff] to-[#007AFF] text-white"
            }`}
        >
          {message.role === "assistant" && message.reasoning && message.reasoning.trim() !== "" && (
            <div className="mb-2">
              <Button
                variant="ghost"
                size="sm"
                onClick={() => toggleReasoning(message.id)}
                className="flex items-center gap-1.5 text-xs font-medium text-gray-600 hover:bg-gray-100 rounded-full px-3 py-1 transition-colors"
              >
                {hiddenReasonings[message.id] ? (
                  <>
                    <ChevronDownIcon size={14} />
                    <span className="opacity-90">Show Reasoning</span>
                  </>
                ) : (
                  <>
                    <ChevronUpIcon size={14} />
                    <span className="opacity-90">Hide Reasoning</span>
                  </>
                )}
              </Button>
              {!hiddenReasonings[message.id] && (
                <div className="mt-2 rounded-xl bg-gray-50 p-3 transition-all duration-200">
                  <div className="text-xs text-gray-600 leading-relaxed">
                    {message.reasoning}
                  </div>
                </div>
              )}
            </div>
          )}
          <div className="leading-relaxed">{message.content}</div>
        </div>
      ))}
    </div>
  )

  return (
    <main
      className={cn(
        "ring-none mx-auto flex h-[100dvh] w-full max-w-[40rem] flex-col items-stretch border-none bg-[#ffffff]",
        className,
      )}
      {...props}
    >
      <div className="flex-1 overflow-y-auto scrollbar-thin scrollbar-thumb-gray-200 scrollbar-track-transparent px-4 py-4 sm:px-6">
        <div className="mx-auto h-full w-full max-w-2xl">
          {messages.length ? messageList : header}
        </div>
      </div>

      <div className="mt-4">
        <form
          onSubmit={handleSubmit}
          className="border-input bg-[#f5f5f5] min-h-4 focus-within:ring-ring/10 relative mx-4 mb-4 flex items-center rounded-[20px] px-3 py-1.5 pr-8 text-sm focus-within:outline-none focus-within:ring-2 focus-within:ring-offset-0"
        >
          <AutoResizeTextarea
            onKeyDown={handleKeyDown}
            onChange={(v) => setInput(v)}
            value={input}
            placeholder="Enter a message"
            className="placeholder:text-muted-foreground flex-1 bg-transparent focus:outline-none"
            disabled={isLoading}
          />
          <Tooltip>
            <TooltipTrigger asChild>
              <Button
                type="submit"
                variant="ghost"
                size="sm"
                className="absolute bottom-1 right-1 size-6 rounded-full"
                disabled={isLoading || !input.trim()}
              >
                <ArrowUpIcon size={16} />
              </Button>
            </TooltipTrigger>
            <TooltipContent sideOffset={12}>Submit</TooltipContent>
          </Tooltip>
        </form>
      </div>
    </main>
  )
}