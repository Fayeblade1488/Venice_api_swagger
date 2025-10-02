# Venice.ai API - Live Test Examples

This directory contains runnable test scripts to verify that the Venice.ai API is working correctly with your API key.

## 🔑 Setup

Before running any tests, you need to set your Venice.ai API key as an environment variable:

```bash
export VENICE_API_KEY=your-api-key-here
```

Alternatively, you can copy `.env.example` to `.env` and set your API key there (if using a tool that loads .env files):

```bash
cp .env.example .env
# Edit .env and add your actual API key
```

Get your API key from the [Venice.ai Dashboard](https://venice.ai/dashboard).

> **⚠️ Security Note**: Never commit your API key to version control. These scripts read the key from environment variables only. The `.env` file is already in `.gitignore`.

## 🧪 Available Tests

### 1. Basic Chat Completion

Test the basic chat completion endpoint with a simple message.

**JavaScript (Node.js 18+)**:
```bash
node test-chat.js
```

**Python 3**:
```bash
python3 test-chat.py
```

**Bash/cURL**:
```bash
bash test-chat.sh
```

### 2. Streaming Chat

Test the streaming API to see real-time token generation.

**JavaScript**:
```bash
node test-streaming.js
```

## 📋 Requirements

### For JavaScript tests:
- Node.js 18+ (for native fetch support)
- No additional packages required

### For Python tests:
- Python 3.6+
- `requests` library: `pip install requests`

### For Bash tests:
- bash
- curl
- jq (for JSON parsing)

## 🎯 What These Tests Verify

✅ API endpoint connectivity  
✅ Authentication with your API key  
✅ Basic chat completion functionality  
✅ Streaming response handling  
✅ Response parsing and error handling  

## 📊 Expected Output

All tests should output:
- ✅ Success confirmation
- The model used
- The AI's response content
- Token usage statistics

Example:
```
🚀 Testing Venice.ai Chat Completion API...

✅ Success! Response received:

Model: venice-uncensored
Content: Venice API is working! How can I assist you today?

Usage:
  Prompt tokens: 15
  Completion tokens: 12
  Total tokens: 27

🎉 Venice.ai API is working correctly!
```

## ❌ Troubleshooting

### "VENICE_API_KEY environment variable is not set"
Make sure you've exported your API key:
```bash
export VENICE_API_KEY=your-api-key-here
```

### "401 Unauthorized"
Your API key is invalid or expired. Get a new one from [Venice.ai Dashboard](https://venice.ai/dashboard).

### "429 Rate Limited"
You've exceeded your rate limit. Wait a moment and try again.

### Node.js fetch not available
Make sure you're using Node.js 18 or later, which includes native fetch support.

### Python requests module not found
Install the requests library:
```bash
pip install requests
```

### Bash jq not found
Install jq for JSON parsing:
- **Ubuntu/Debian**: `sudo apt-get install jq`
- **macOS**: `brew install jq`
- **Other**: See [jq installation guide](https://stedolan.github.io/jq/download/)

## 🔒 Security Best Practices

1. **Never hardcode API keys** in scripts or commit them to version control
2. **Use environment variables** for sensitive credentials
3. **Rotate API keys regularly** in production environments
4. **Monitor your usage** through the Venice.ai dashboard
5. **Use `.env` files** with proper `.gitignore` entries for local development

## 📚 Next Steps

After verifying your API works:
1. Check the [OpenAPI Specification](https://github.com/Fayeblade1488/Venice_api_swagger/blob/main/venice.openapi.v3.yaml) for complete API documentation
2. Read the [Quick Start Guide](https://docs.venice.ai/quickstart) for more examples
3. Explore advanced features like web search, vision, and function calling
4. Review the [README](../README.md) for SDK generation and integration options

## 💬 Support

- 📖 **Documentation**: [docs.venice.ai](https://docs.venice.ai)
- 💬 **Support**: support@venice.ai
- 🐛 **Issues**: [GitHub Issues](https://github.com/Fayeblade1488/Venice_api_swagger/issues)

---

**Happy Testing! 🚀**
