# Venice.ai OpenAPI Specification v3.0.0

<p align="center">
  <a href="https://venice.ai" target="_blank">
    <img src="https://raw.githubusercontent.com/Fayeblade1488/Venice_api_swagger/main/.github/banner.svg" alt="Venice API Banner">
  </a>
</p>

<p align="center">
    Production-ready OpenAPI definition for the Venice.ai API. This repository hosts the canonical spec used to generate SDKs, publish reference docs, and validate compatibility.
</p>

<p align="center">
    <a href="https://github.com/Fayeblade1488/Venice_api_swagger/blob/main/LICENSE">
        <img src="https://img.shields.io/github/license/Fayeblade1488/Venice_api_swagger?style=for-the-badge" alt="License">
    </a>
    <a href="https://github.com/Fayeblade1488/Venice_api_swagger/tags">
        <img src="https://img.shields.io/github/v/tag/Fayeblade1488/Venice_api_swagger?style=for-the-badge&sort=semver" alt="Version">
    </a>
    <a href="https://github.com/Fayeblade1488/Venice_api_swagger/actions/workflows/lint.yml">
        <img src="https://img.shields.io/github/actions/workflow/status/Fayeblade1488/Venice_api_swagger/lint.yml?branch=main&style=for-the-badge" alt="Lint Status">
    </a>
</p>

---

## TL;DR

-   **Spec lives in**: `venice.openapi.v3.yaml`
-   **Lint and preview locally** using the provided `lint.sh` script.
-   **Generate SDKs** via `openapi-generator`
-   **Publish docs** with your preferred pipeline (Swagger UI / Redoc)

---

## Contents

```
.
├─ venice.openapi.v3.yaml       # The complete OpenAPI specification
├─ .spectral.yaml               # Configuration for the Spectral linter
├─ lint.sh                      # Script to run local validation
├─ package.json                 # Node.js dependencies for linting
└─ README.md                    # This file
```

## Quick Start

### Validate in Browser (Zero Install)

1.  Open **[editor.swagger.io](https://editor.swagger.io)**
2.  Import `venice.openapi.v3.yaml`
3.  Confirm no errors; warnings are documented in comments where applicable.

### Local Validation (Recommended)

A `lint.sh` script is provided to simplify local validation. It runs both Spectral and Redocly linters to ensure the OpenAPI specification is valid and adheres to style guidelines.

**Prerequisites:**
- Make sure `npm` is installed.
- Install the required Node.js dependencies:
  ```bash
  npm install
  ```

**Usage:**
To run the linters, execute the script from the root of the repository:
```bash
./lint.sh
```
This will validate the `venice.openapi.v3.yaml` file and report any errors or warnings.

### Local Preview with Swagger UI

```bash
# Option A: Serve with Docker (swaggerapi/swagger-ui)
docker run -p 8080:8080 -e SWAGGER_JSON=/tmp/spec.yaml \
  -v "$PWD/venice.openapi.v3.yaml":/tmp/spec.yaml swaggerapi/swagger-ui

# Option B: Redoc (static)
npx @redocly/cli build-docs venice.openapi.v3.yaml -o docs/index.html
```

## Generate SDKs

Using `openapi-generator` (Java-based tool):

```bash
# Install (one-time)
brew install openapi-generator   # macOS
# or: docker pull openapitools/openapi-generator-cli

# Typescript (fetch)
openapi-generator generate \
  -i venice.openapi.v3.yaml \
  -g typescript-fetch \
  -o sdk/typescript

# Python
openapi-generator generate \
  -i venice.openapi.v3.yaml \
  -g python \
  -o sdk/python
```

**Notes:**

-   File upload endpoints are modeled with `oneOf` for binary (multipart), byte (base64 in JSON), and uri. Your generator should map these appropriately.
-   Chat completion response `role` is restricted to `assistant` for OpenAI compatibility.

## Mock Server (Optional)

```bash
docker run -p 4010:4010 -v "$PWD/venice.openapi.v3.yaml:/tmp/spec.yaml" stoplight/prism:4 \
  mock -h 0.0.0.0 /tmp/spec.yaml
```

## 🔧 Technical Specifications

### **Validation Status**
-  **OpenAPI 3.0.0 Compliant**
-  **0 Critical Errors**
-  **6 Warnings** (related to example validation)
-  **Ready for Production Use**

### **Enhanced Features**

#### **1. Schema Quality**
- Fixed nullable field handling across all schemas
- Improved type definitions with proper constraints
- Enhanced validation rules for request/response models
- Consistent schema structure throughout

#### **2. Operation Documentation**
- **Summary & Description**: Clear, feature-rich descriptions
- **Parameters**: Fully documented with examples and constraints
- **Request Body**: 6 comprehensive examples covering:
  - Simple chat completion
  - Streaming with web search
  - Vision-enabled conversations
  - Function calling
  - Character persona interactions
  - Reasoning model usage
- **Responses**: Detailed success/error responses with headers
- **Headers**: Rate limiting, compression, request IDs

#### **3. Code Samples**
Comprehensive `x-codeSamples` covering:

**cURL Examples:**
```bash
# Simple Chat
curl -X POST "https://api.venice.ai/api/v1/chat/completions" \
  -H "Authorization: Bearer {VENICE_API_KEY}" \
  -H "Content-Type: application/json" \
  -d '{"model": "venice-uncensored", "messages": [...]}'

# Streaming with Web Search
curl -X POST "https://api.venice.ai/api/v1/chat/completions" \
  -H "Accept: text/event-stream" \
  --no-buffer \
  -d '{"stream": true, "venice_parameters": {"enable_web_search": "auto"}}'
```

**JavaScript Examples:**
```javascript
// Basic Chat
const response = await fetch('https://api.venice.ai/api/v1/chat/completions', {
  method: 'POST',
  headers: {'Authorization': 'Bearer {VENICE_API_KEY}'},
  body: JSON.stringify({model: 'venice-uncensored', messages: [...]})
});

// Server-Sent Events Streaming
const reader = response.body.getReader();
// ... complete SSE implementation
```

**Python Examples:**
```python
# Simple Chat
response = requests.post(
    'https://api.venice.ai/api/v1/chat/completions',
    headers={'Authorization': 'Bearer {VENICE_API_KEY}'},
    json={'model': 'venice-uncensored', 'messages': [...]}
)

# Vision Chat with Images
# Function Calling
# SSE Streaming
# ... complete implementations
```

#### **4. Developer Experience**

**Tag Organization:**
```yaml
x-tagGroups:
  - name: Core AI Services
    tags: [Chat, Image, Audio, Speech, Embeddings]
  - name: Platform  
    tags: [Models, Characters, Billing, API Keys]
  - name: Experimental
    tags: [Preview]
```

**Enhanced Documentation:**
- Private AI guarantee prominently featured
- Zero-retention policy clearly explained
- Feature capabilities well documented
- Rate limiting and authentication details
- Comprehensive error handling guidance

## Usage Instructions

### **For API Documentation Tools**
1. Use `venice.openapi.v3.yaml` with Redoc, Swagger UI, or similar tools
2. The specification includes `x-logo` and styling information
3. Tag groups provide logical navigation structure

### **For Code Generation**
- All schemas are properly defined for client generation
- Examples provide realistic integration patterns
- Error handling is comprehensively documented

### **For Developer Integration**
- Copy code samples and replace `{VENICE_API_KEY}` with actual API key
- Examples demonstrate all major Venice features
- Authentication and error handling patterns included

## Quality Metrics

| Metric | Status | Details |
|--------|--------|---------|
| **Validation** | ✅ | 0 errors, 6 minor warnings |
| **Coverage** | ✅ | Complete `/chat/completions` documentation |
| **Examples** | ✅ | 6 request + 8 code samples |
| **Error Handling** | ✅ | All HTTP status codes documented |
| **Authentication** | ✅ | Bearer token with examples |
| **Features** | ✅ | Streaming, vision, tools, web search |


## Notes

- **API Key Placeholder**: All code samples use `{VENICE_API_KEY}` placeholder
- **Production Ready**: Specification validates without errors
- **Comprehensive Coverage**: All major Venice features documented
- **Best Practices**: Follows OpenAPI 3.0.0 standards and conventions

---

**Created**: 2025-09-26  
**Version**: 3.0.0