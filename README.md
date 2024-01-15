# AI Assisted Search
This project attempts to use the OpenAI LLM `gpt-3.5-turbo` to parse a natural language query into a structured shape used to search a known dataset. This approach allows a user to type a sentence and automate the process of manually setting serch and filter values.

### Advantages
* **Simple** - This is a relatively straight-forward approach to using LLM AI in real-world application
* **Speedy** - The AI processing of the search query to query structure is typically sub-second.
* **Secure** - This approach provides only enough information to the AI LLM to translate the user's query. The dataset is never sent to the AI provider.

### Limitations
* **Reliability** - The translation of natural language query is still somewhat unreliable. Accuracy may be improved through further prompt engineering, and potentially through fine-tuning. The translation process seems to work for about 9 out of 10 queries. 
* **Intelligence** - Since this approach does not send the actual data to the LLM, there is very limited ability for the AI to provide insights beyond the simple mapping process.

## Getting Started

After cloning this repo, you will need to setup an `API_KEY` in for your development environment. The easiest way to do this is to create a `.env` file the root of the application and add [your OpenAI API Key](https://platform.openai.com/api-keys)

#### Example `.env` file
```environment
API_KEY = abcd...efhg
```

Once the API Key has been added, you can run the application like any other Next.js app. Then open [http://localhost:3000](http://localhost:3000) with your browser to use the application.
```bash
npm run dev
# or
yarn dev
# or
pnpm dev
# or
bun dev
```

## Tweaking the search
There are two primary methods for modifying the search capabilities. Configurable settings that allow for runtime customization of the AI search, and prompt engineering that allows you as the software engineer to modify the way the AI behaves for all users.

### Settings
The application has a [settings page]([http://localhost:3000/settigns) that allows configuration of the prompt. This page demonstrates how you can build in user specific configurations, so that the search can be modified for a user's specific needs

### Prompt engineering
As an engineer you may want to improve the search for all users by modifying the prompt. The base prompt is stored in `/app/products/ai-prompt.ts`. Open this file and hack away 👨‍💻