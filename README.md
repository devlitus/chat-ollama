# Chat Bot Project

A modern chat interface built with Astro, TypeScript, and Ollama integration. This project features a responsive UI with dark/light theme support, image upload capabilities, and both text and vision-based AI interactions.

## 🚀 Features

- **Real-time Chat Interface**: Smooth, responsive chat experience
- **Dark/Light Theme**: Automatic theme detection with manual toggle
- **Image Support**: Upload and process images in conversations
- **AI Integration**:
  - Text-based chat using `llama3.2`
  - Vision capabilities using `llama3.2-vision`
- **Responsive Design**: Works seamlessly across different screen sizes
- **TypeScript Support**: Full type safety throughout the application
- **Stream Responses**: Real-time streaming of AI responses

## 🛠️ Tech Stack

- **Framework**: [Astro](https://astro.build)
- **Styling**: [Tailwind CSS](https://tailwindcss.com)
- **AI Integration**: [Ollama](https://ollama.ai)
- **Testing**: Vitest
- **Language**: TypeScript

## 📦 Project Structure

```
/
├── src/
│   ├── components/         # UI Components
│   │   ├── ChatForm.astro
│   │   ├── ChatHeader.astro
│   │   ├── ChatMessage.astro
│   │   └── Icons/
│   ├── handlers/          # Business Logic
│   │   ├── chatHandler.ts
│   │   ├── imageHandler.ts
│   │   └── visionHandler.ts
│   ├── layouts/
│   │   └── Layout.astro
│   ├── libs/             # Utilities and Helpers
│   │   ├── chatFormHandler.ts
│   │   └── getChatMessage.ts
│   ├── types/           # TypeScript Definitions
│   │   └── chat.ts
│   └── pages/
│       └── index.astro
```

## 🚀 Getting Started

1. **Clone the repository**

```bash
git clone <repository-url>
cd chat-bot
```

2. **Install dependencies**

```bash
npm install
```

3. **Set up Ollama**

- Make sure you have Ollama installed and running
- Download required models:

```bash
ollama pull llama3.2
ollama pull llama3.2-vision
```

4. **Start the development server**

```bash
npm run dev
```

5. **Build for production**

```bash
npm run build
```

## 📝 Available Commands

| Command                 | Action                                      |
| :---------------------- | :------------------------------------------ |
| `npm install`           | Installs dependencies                       |
| `npm run dev`           | Starts local dev server at `localhost:4321` |
| `npm run build`         | Build your production site to `./dist/`     |
| `npm run preview`       | Preview your build locally                  |
| `npm test`              | Run tests                                   |
| `npm run test:ui`       | Run tests with UI                           |
| `npm run test:coverage` | Generate test coverage report               |

## 🔧 Configuration

### TypeScript Configuration

The project uses a strict TypeScript configuration with custom path aliases for better import organization. Check `tsconfig.json` for details.

### Testing Configuration

Tests are configured using Vitest with the following features:

- Happy-DOM environment
- Coverage reporting
- Custom path aliases matching the main configuration

## 🎨 Features in Detail

### Chat Interface

- Real-time message streaming
- Message history management
- Error handling and display
- Smooth scrolling to latest messages

### Image Handling

- Image upload and preview
- Base64 encoding for API compatibility
- File type validation
- Preview management

### Theme Management

- System theme detection
- Manual theme toggle
- Persistent theme preference
- Smooth transitions

## 📚 API Integration

The project integrates with Ollama's API for both text and vision capabilities:

### Text Chat

- Model: `llama3.2:latest`
- Features:
  - Message streaming
  - Chat history management
  - Configurable temperature and top_p parameters

### Vision Chat

- Model: `llama3.2-vision:latest`
- Features:
  - Image processing
  - Base64 validation
  - Spanish language responses
  - Error handling

## 🤝 Contributing

Contributions are welcome! Please feel free to submit a Pull Request.

## 📄 License

This project is licensed under the MIT License - see the LICENSE file for details.
