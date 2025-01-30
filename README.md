# DeepSeek R1 Chat Template

An open-source AI chatbot template built for DeepSeek R1 model, featuring reasoning explanations and clean & modern UI.

## Tech Stack

- **Framework:** Next.js 14 (App Router)
- **Deployment:** Vercel
- **Styling:** Tailwind CSS
- **UI Components:** shadcn/ui
- **AI Provider:** [Groq](https://console.groq.com)

## Features

- 🧠 DeepSeek R1 Integration
- 💭 Reasoning UI
- 🎨 Clean & Modern UI

## Installation

1. Clone the repository:
```bash
git clone https://github.com/zaidmukaddam/open-r1-chat-template.git
cd open-r1-chat-template
```

2. Install dependencies:
```bash
bun install
```

3. Copy the example environment file:
```bash
cp .env.example .env.local
```

4. Add your Groq API key to 

.env.local:
```bash
GROQ_API_KEY=your-api-key-here
```

Get your API key from [Groq Console](https://console.groq.com)

## Running Locally

```bash
bun dev
```

Open [http://localhost:3000](http://localhost:3000) in your browser.

## Deploy your own

Deploy using [Vercel](https://vercel.com):

[![Deploy with Vercel](https://vercel.com/button)](https://vercel.com/new/clone?repository-url=https%3A%2F%2Fgithub.com%2Fzaidmukaddam%2Fopen-r1-chat-template&env=GROQ_API_KEY&envDescription=Enter%20your%20Groq%20API%20key&envLink=https%3A%2F%2Fconsole.groq.com)

## License

Licensed under the [MIT license](https://github.com/zaidmukaddam/open-r1-chat-template/blob/main/LICENSE.md).