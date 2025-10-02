#!/usr/bin/env node

/**
 * Venice.ai API - Chat Completion Test
 * 
 * This script tests the basic chat completion endpoint.
 * 
 * Usage:
 *   export VENICE_API_KEY=your-api-key-here
 *   node test-chat.js
 */

const VENICE_API_KEY = process.env.VENICE_API_KEY;

if (!VENICE_API_KEY) {
  console.error('❌ Error: VENICE_API_KEY environment variable is not set');
  console.error('');
  console.error('Please set your API key:');
  console.error('  export VENICE_API_KEY=your-api-key-here');
  console.error('');
  console.error('Get your API key from: https://venice.ai/dashboard');
  process.exit(1);
}

async function testChatCompletion() {
  console.log('🚀 Testing Venice.ai Chat Completion API...\n');

  try {
    const response = await fetch('https://api.venice.ai/api/v1/chat/completions', {
      method: 'POST',
      headers: {
        'Authorization': `Bearer ${VENICE_API_KEY}`,
        'Content-Type': 'application/json',
      },
      body: JSON.stringify({
        model: 'venice-uncensored',
        messages: [
          {
            role: 'user',
            content: 'Hello! Say "Venice API is working!" if you can hear me.'
          }
        ],
        temperature: 0.7,
        max_completion_tokens: 100
      })
    });

    if (!response.ok) {
      const error = await response.json();
      console.error('❌ API Error:', error.error?.message || JSON.stringify(error));
      process.exit(1);
    }

    const data = await response.json();
    
    console.log('✅ Success! Response received:\n');
    console.log('Model:', data.model);
    console.log('Content:', data.choices[0].message.content);
    console.log('\nUsage:');
    console.log('  Prompt tokens:', data.usage.prompt_tokens);
    console.log('  Completion tokens:', data.usage.completion_tokens);
    console.log('  Total tokens:', data.usage.total_tokens);
    console.log('\n🎉 Venice.ai API is working correctly!');

  } catch (error) {
    console.error('❌ Error:', error.message);
    process.exit(1);
  }
}

testChatCompletion();
