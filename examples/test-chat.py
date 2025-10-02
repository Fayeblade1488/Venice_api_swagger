#!/usr/bin/env python3

"""
Venice.ai API - Chat Completion Test

This script tests the basic chat completion endpoint.

Usage:
    export VENICE_API_KEY=your-api-key-here
    python3 test-chat.py
"""

import os
import sys
import requests
import json

VENICE_API_KEY = os.getenv('VENICE_API_KEY')

if not VENICE_API_KEY:
    print('❌ Error: VENICE_API_KEY environment variable is not set', file=sys.stderr)
    print('', file=sys.stderr)
    print('Please set your API key:', file=sys.stderr)
    print('  export VENICE_API_KEY=your-api-key-here', file=sys.stderr)
    print('', file=sys.stderr)
    print('Get your API key from: https://venice.ai/dashboard', file=sys.stderr)
    sys.exit(1)

def test_chat_completion():
    print('🚀 Testing Venice.ai Chat Completion API...\n')

    try:
        response = requests.post(
            'https://api.venice.ai/api/v1/chat/completions',
            headers={
                'Authorization': f'Bearer {VENICE_API_KEY}',
                'Content-Type': 'application/json',
            },
            json={
                'model': 'venice-uncensored',
                'messages': [
                    {
                        'role': 'user',
                        'content': 'Hello! Say "Venice API is working!" if you can hear me.'
                    }
                ],
                'temperature': 0.7,
                'max_completion_tokens': 100
            },
            timeout=30
        )

        if not response.ok:
            try:
                error = response.json()
                error_field = error.get("error", {})
                if isinstance(error_field, dict):
                    error_msg = error_field.get("message", json.dumps(error))
                else:
                    error_msg = str(error_field)
            except Exception:
                error_msg = f"HTTP {response.status_code}: {response.text}"
            print(f'❌ API Error: {error_msg}', file=sys.stderr)
            sys.exit(1)

        data = response.json()
        
        print('✅ Success! Response received:\n')
        print(f'Model: {data["model"]}')
        print(f'Content: {data["choices"][0]["message"]["content"]}')
        print('\nUsage:')
        print(f'  Prompt tokens: {data["usage"]["prompt_tokens"]}')
        print(f'  Completion tokens: {data["usage"]["completion_tokens"]}')
        print(f'  Total tokens: {data["usage"]["total_tokens"]}')
        print('\n🎉 Venice.ai API is working correctly!')

    except requests.exceptions.RequestException as error:
        print(f'❌ Error: {error}', file=sys.stderr)
        sys.exit(1)
    except Exception as error:
        print(f'❌ Error: {error}', file=sys.stderr)
        sys.exit(1)

if __name__ == '__main__':
    test_chat_completion()
