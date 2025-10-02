#!/usr/bin/env node

/**
 * Venice.ai API - Streaming Chat Completion Test
 * 
 * This script tests the streaming chat completion endpoint.
 * 
 * Usage:
 *   export VENICE_API_KEY=your-api-key-here
 *   node test-streaming.js
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

async function testStreamingChat() {
  console.log('🚀 Testing Venice.ai Streaming API...\n');

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
            content: 'Tell me a very short joke about AI.'
          }
        ],
        stream: true,
        temperature: 0.8
      })
    });

    if (!response.ok) {
      const error = await response.json();
      console.error('❌ API Error:', error.error?.message || JSON.stringify(error));
      process.exit(1);
    }

    console.log('✅ Streaming response:\n');
    process.stdout.write('AI: ');

    const reader = response.body.getReader();
    const decoder = new TextDecoder();
    let fullContent = '';

    while (true) {
      const { done, value } = await reader.read();
      if (done) break;
      
      const chunk = decoder.decode(value);
      const lines = chunk.split('\n');
      
      for (const line of lines) {
        if (line.startsWith('data: ')) {
          const data = line.slice(6);
          if (data === '[DONE]') {
            process.stdout.write('\n');
            console.log('\n🎉 Streaming completed successfully!');
            console.log(`Total content length: ${fullContent.length} characters`);
            return;
          }
          
          try {
            const parsed = JSON.parse(data);
            const content = parsed.choices?.[0]?.delta?.content;
            if (content) {
              process.stdout.write(content);
              fullContent += content;
            }
          } catch (e) {
            // Skip invalid JSON
          }
        }
      }
    }

  } catch (error) {
    console.error('❌ Error:', error.message);
    process.exit(1);
  }
}

testStreamingChat();
