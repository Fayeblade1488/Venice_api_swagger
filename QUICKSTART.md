# Venice.ai API - Quick Start Guide

## 🚀 Get Started in 5 Minutes

This guide will help you make your first API call to Venice.ai and understand the key features.

## 📋 Prerequisites

1. **API Key**: Get your API key from [Venice.ai Dashboard](https://venice.ai/dashboard)
2. **HTTP Client**: curl, JavaScript fetch, Python requests, etc.

## 🔑 Authentication

All requests require your API key in the Authorization header:
```
Authorization: Bearer YOUR_API_KEY
```

## 📡 Base URL
```
https://api.venice.ai/api/v1
```

---

## 💬 Your First Chat Request

### cURL Example
```bash
curl -X POST "https://api.venice.ai/api/v1/chat/completions" \
  -H "Authorization: Bearer YOUR_API_KEY" \
  -H "Content-Type: application/json" \
  -d '{
    "model": "venice-uncensored",
    "messages": [
      {
        "role": "user",
        "content": "Hello! What can you help me with?"
      }
    ],
    "temperature": 0.7,
    "max_completion_tokens": 100
  }'
```

### JavaScript Example
```javascript
const response = await fetch('https://api.venice.ai/api/v1/chat/completions', {
  method: 'POST',
  headers: {
    'Authorization': 'Bearer YOUR_API_KEY',
    'Content-Type': 'application/json',
  },
  body: JSON.stringify({
    model: 'venice-uncensored',
    messages: [
      {
        role: 'user',
        content: 'Hello! What can you help me with?'
      }
    ],
    temperature: 0.7,
    max_completion_tokens: 100
  })
});

const data = await response.json();
console.log(data.choices[0].message.content);
```

### Python Example
```python
import requests

response = requests.post(
    'https://api.venice.ai/api/v1/chat/completions',
    headers={
        'Authorization': 'Bearer YOUR_API_KEY',
        'Content-Type': 'application/json',
    },
    json={
        'model': 'venice-uncensored',
        'messages': [
            {
                'role': 'user',
                'content': 'Hello! What can you help me with?'
            }
        ],
        'temperature': 0.7,
        'max_completion_tokens': 100
    }
)

data = response.json()
print(data['choices'][0]['message']['content'])
```

---

## 🌊 Streaming Responses

For real-time responses, use streaming:

### cURL Streaming
```bash
curl -X POST "https://api.venice.ai/api/v1/chat/completions" \
  -H "Authorization: Bearer YOUR_API_KEY" \
  -H "Content-Type: application/json" \
  -H "Accept: text/event-stream" \
  --no-buffer \
  -d '{
    "model": "venice-uncensored",
    "messages": [{"role": "user", "content": "Tell me a story"}],
    "stream": true,
    "temperature": 0.8
  }'
```

### JavaScript Streaming
```javascript
const response = await fetch('https://api.venice.ai/api/v1/chat/completions', {
  method: 'POST',
  headers: {
    'Authorization': 'Bearer YOUR_API_KEY',
    'Content-Type': 'application/json',
  },
  body: JSON.stringify({
    model: 'venice-uncensored',
    messages: [{role: 'user', content: 'Tell me a story'}],
    stream: true,
    temperature: 0.8
  })
});

const reader = response.body.getReader();
const decoder = new TextDecoder();

while (true) {
  const { done, value } = await reader.read();
  if (done) break;
  
  const chunk = decoder.decode(value);
  const lines = chunk.split('\\n');
  
  for (const line of lines) {
    if (line.startsWith('data: ')) {
      const data = line.slice(6);
      if (data === '[DONE]') return;
      
      try {
        const parsed = JSON.parse(data);
        const content = parsed.choices?.[0]?.delta?.content;
        if (content) {
          process.stdout.write(content); // Real-time output
        }
      } catch (e) {
        // Skip invalid JSON
      }
    }
  }
}
```

---

## 🌐 Web Search Integration

Add web search to get current information:

```javascript
{
  "model": "venice-uncensored",
  "messages": [
    {
      "role": "user", 
      "content": "What are the latest AI developments this week?"
    }
  ],
  "venice_parameters": {
    "enable_web_search": "auto",
    "enable_web_citations": true
  },
  "stream": true
}
```

---

## 👁️ Vision (Image Analysis)

Analyze images with vision-capable models:

```javascript
{
  "model": "llama-3.3-70b", // Vision-capable model
  "messages": [
    {
      "role": "user",
      "content": [
        {
          "type": "text",
          "text": "What's in this image?"
        },
        {
          "type": "image_url",
          "image_url": {
            "url": "https://example.com/image.jpg"
          }
        }
      ]
    }
  ],
  "temperature": 0.7
}
```

---

## 🔧 Function Calling

Let the AI call your functions:

```javascript
{
  "model": "venice-uncensored",
  "messages": [
    {
      "role": "user",
      "content": "What's the weather like in Paris?"
    }
  ],
  "tools": [
    {
      "type": "function",
      "function": {
        "name": "get_weather",
        "description": "Get current weather for a location",
        "parameters": {
          "type": "object",
          "properties": {
            "location": {
              "type": "string",
              "description": "City name or coordinates"
            }
          },
          "required": ["location"]
        }
      }
    }
  ],
  "tool_choice": "auto"
}
```

---

## 🎭 Character Personas

Use Venice character personalities:

```javascript
{
  "model": "venice-uncensored",
  "messages": [
    {
      "role": "user",
      "content": "Explain quantum physics simply"
    }
  ],
  "venice_parameters": {
    "character_slug": "venice",
    "include_venice_system_prompt": true
  },
  "temperature": 0.9
}
```

---

## 🧠 Reasoning Models

Use models with explicit reasoning:

```javascript
{
  "model": "qwen-2.5-72b-reasoning",
  "messages": [
    {
      "role": "user",
      "content": "Solve this logic puzzle: If all roses are flowers and some flowers are red, can we conclude that some roses are red?"
    }
  ],
  "temperature": 0.1,
  "venice_parameters": {
    "disable_thinking": false,
    "strip_thinking_response": false
  }
}
```

---

## 📊 Response Format

All successful responses follow this structure:

```json
{
  "id": "chatcmpl-abc123",
  "object": "chat.completion",
  "created": 1677858240,
  "model": "venice-uncensored",
  "choices": [
    {
      "index": 0,
      "message": {
        "role": "assistant",
        "content": "Hello! I'm Venice, your private AI assistant..."
      },
      "finish_reason": "stop"
    }
  ],
  "usage": {
    "prompt_tokens": 10,
    "completion_tokens": 20,
    "total_tokens": 30
  },
  "venice_parameters": {
    "enable_web_search": "false",
    "enable_web_citations": false,
    "include_venice_system_prompt": true
  }
}
```

---

## ⚡ Key Features

### 🔒 **Privacy First**
- Zero data retention - your conversations are never stored
- No training on your data
- Private AI processing

### 🌊 **Streaming Support**
- Real-time response generation
- Server-Sent Events (SSE)
- Include usage statistics in final chunk

### 🔍 **Web Search**
- Real-time web search integration
- Automatic citation generation
- Current information access

### 👁️ **Vision Capabilities**
- Image analysis and description
- Multi-modal conversations
- Support for PNG, JPEG, WebP

### 🛠️ **Tool Integration**
- Function/tool calling
- Structured responses
- JSON schema validation

---

## 🚨 Error Handling

Always check for errors:

```javascript
if (!response.ok) {
  const error = await response.json();
  console.error('API Error:', error.error.message);
  return;
}
```

Common HTTP status codes:
- `400` - Bad Request (invalid parameters)
- `401` - Unauthorized (invalid API key)
- `429` - Rate Limited (too many requests)
- `500` - Server Error (temporary issue)

---

## 📚 Next Steps

1. **Explore the Full API**: Check `venice.openapi.v3.yaml` for complete documentation
2. **Rate Limits**: Monitor your usage with response headers
3. **Advanced Features**: Try different models, parameters, and integrations
4. **Production**: Implement proper error handling and retries

---

## 💡 Tips

- **Models**: `venice-uncensored` is great for general use
- **Temperature**: Lower (0.1-0.3) for focused responses, higher (0.7-1.0) for creative
- **Streaming**: Use for better user experience in chat applications  
- **Idempotency**: Use `Idempotency-Key` header for safe retries
- **Web Search**: Set to "auto" to let the AI decide when to search

---

## 🆘 Need Help?

- 📖 **Full Documentation**: See `README.md` for comprehensive details
- 🔄 **Changelog**: Check `CHANGELOG.md` for latest updates  
- 🌐 **Venice.ai Docs**: https://docs.venice.ai
- 💬 **Support**: support@venice.ai

---

**Happy Building! 🚀**