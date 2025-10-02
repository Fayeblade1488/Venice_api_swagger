#!/usr/bin/env bash

#
# Venice.ai API - Chat Completion Test
#
# This script tests the basic chat completion endpoint using curl.
#
# Usage:
#   export VENICE_API_KEY=your-api-key-here
#   bash test-chat.sh
#

set -euo pipefail

if [ -z "${VENICE_API_KEY:-}" ]; then
  echo "❌ Error: VENICE_API_KEY environment variable is not set" >&2
  echo "" >&2
  echo "Please set your API key:" >&2
  echo "  export VENICE_API_KEY=your-api-key-here" >&2
  echo "" >&2
  echo "Get your API key from: https://venice.ai/dashboard" >&2
  exit 1
fi

echo "🚀 Testing Venice.ai Chat Completion API..."
echo ""

payload=$(cat <<EOF
{
  "model": "venice-uncensored",
  "messages": [
    {
      "role": "user",
      "content": "Hello! Say \"Venice API is working!\" if you can hear me."
    }
  ],
  "temperature": 0.7,
  "max_completion_tokens": 100
}
EOF
)

response=$(curl -s -w "\n%{http_code}" -X POST "https://api.venice.ai/api/v1/chat/completions" \
  -H "Authorization: Bearer ${VENICE_API_KEY}" \
  -H "Content-Type: application/json" \
  -d "$payload")

http_code=$(echo "$response" | tail -n1)
body=$(echo "$response" | head -n-1)

if [ "$http_code" -ne 200 ]; then
  echo "❌ API Error (HTTP $http_code):" >&2
  echo "$body" | jq -r '.error.message // "Unknown error"' >&2
  exit 1
fi

echo "✅ Success! Response received:"
echo ""
echo "Model: $(echo "$body" | jq -r '.model')"
echo "Content: $(echo "$body" | jq -r '.choices[0].message.content')"
echo ""
echo "Usage:"
echo "  Prompt tokens: $(echo "$body" | jq -r '.usage.prompt_tokens')"
echo "  Completion tokens: $(echo "$body" | jq -r '.usage.completion_tokens')"
echo "  Total tokens: $(echo "$body" | jq -r '.usage.total_tokens')"
echo ""
echo "🎉 Venice.ai API is working correctly!"
