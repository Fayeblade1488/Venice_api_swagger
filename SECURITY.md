# Security Policy

## Reporting a Vulnerability

Please do not report security vulnerabilities through public GitHub issues. Instead, please report them to our private vulnerability disclosure program.

We will make every effort to quickly resolve the issue.

## Policy

- Do not include secrets in examples.
- Endpoints that accept files are validated; clients should prefer multipart for large media.

## Using the Test Scripts Securely

The `examples/` directory contains test scripts that require a Venice.ai API key. Follow these security best practices:

1. **Never commit API keys** - API keys should only be stored in environment variables or local `.env` files (which are gitignored)
2. **Use environment variables** - Set `VENICE_API_KEY` as an environment variable: `export VENICE_API_KEY=your-key`
3. **Rotate keys regularly** - Regularly rotate API keys used in production environments
4. **Monitor usage** - Track API usage through the Venice.ai dashboard to detect unauthorized access
5. **Limit key permissions** - If possible, use API keys with the minimum required permissions

All test scripts are designed to read API keys from environment variables only and will never prompt for or store keys in files.

