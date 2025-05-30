# CLAUDE.md

This file provides guidance to Claude Code (claude.ai/code) when working with code in this repository.

## Project Overview

This is an n8n node package for Level365 API integration. It allows n8n workflows to interact with Level365's telephony system to retrieve call records, call recordings, user information, queue data, phone numbers, dial plans, and domain details.

## Key Files and Structure

- `credentials/level365Api.credentials.ts` - Contains API authentication logic
- `nodes/level365/level365.node.ts` - Main node implementation
- `nodes/level365/resources/` - Contains operation definitions for different API resources:
  - `call.ts` - Call-related operations (get call, get all calls, get call recording)
  - `user.ts` - User-related operations (get user info, get all users)
  - `queue.ts` - Queue-related operations (get queue info, get all queues)
  - `number.ts` - Phone number operations (get number info, get all numbers)
  - `dialplan.ts` - Dial plan operations (get dial plan, get all dial plans)
  - `domain.ts` - Domain operations (get domain info, get domain with usage info, check if domain exists)

## API Details

- Base URL: `https://api.365sip.com/ns-api/v2`
- Authentication: Bearer token authentication with an API key
- Reference Documentation: <https://core1-dev.365sip.com/ns-api/webroot/openapi/>
- OpenAPI Spec: <https://core1-dev.365sip.com/ns-api/webroot/openapi/openapi.php>
- Resources:
  - Calls: `/call/{call_id}`, `/domains/{domain}/cdrs`, `/domains/{domain}/recordings/{call_id}`
  - Users: `/domains/{domain}/users/{exten}`, `/domains/{domain}/users`
  - Queues: `/domains/{domain}/callqueues/{queue}`, `/domains/{domain}/callqueues`
  - Phone Numbers: `/domains/{domain}/phonenumbers/{number}`, `/domains/{domain}/phonenumbers`
  - Dial Plans: `/domains/{domain}/dialplans/{dialplan}/dialrules/{dialplan_id}`, `/domains/{domain}/dialplans/{dialplan}/dialrules`
  - Domains: `/domains/{domain}`, `/domains/{domain}/billing`, `/domains/{domain}/count`

## Development Commands

```bash
# Install dependencies
pnpm install

# Build the package
pnpm build

# Development mode with watch
pnpm dev

# Format code
pnpm format

# Lint code
pnpm lint

# Fix linting issues
pnpm lintfix

# Prepare for publishing
pnpm prepublishOnly
```

## Testing Locally

To test the node locally with n8n:

1. Build the package: `pnpm run build`
2. Create a symbolic link: `pnpm link`
3. Navigate to your n8n installation directory and run: `pnpm link n8n-nodes-level365`
4. Restart n8n

`pnpm run build && pnpm link`

## Node Usage

When using this node in n8n:

1. Configure the Level365 API credentials with your API key
2. Specify the domain of your Level365 account
3. Select the resource (Call, User, Queue, Phone Number, etc)
4. Choose an operation for the selected resource
5. Fill in the required parameters for the chosen operation
