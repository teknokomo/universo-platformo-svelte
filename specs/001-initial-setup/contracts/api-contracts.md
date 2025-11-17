# API Contracts: Initial Setup and Architecture

**Feature**: 001-initial-setup  
**Date**: 2025-11-17  
**Status**: Complete

## Overview

This document defines the API contracts for configuration and package management endpoints. Since this is infrastructure setup, these are primarily administrative and development-time APIs rather than end-user facing APIs.

---

## Configuration API

### GET /api/config/environment

**Description**: Retrieve current environment configuration (sanitized, no secrets)

**Authentication**: Optional (returns public config only if unauthenticated)

**Request**: None

**Response**: 200 OK
```typescript
{
  "success": true,
  "data": {
    "environment": "development" | "staging" | "production",
    "features": {
      "authentication": boolean,
      "database": boolean
    },
    "version": string // Application version
  }
}
```

**Error Responses**:
- 500 Internal Server Error: Configuration unavailable

**Example**:
```json
{
  "success": true,
  "data": {
    "environment": "development",
    "features": {
      "authentication": true,
      "database": true
    },
    "version": "0.1.0"
  }
}
```

---

### POST /api/config/validate

**Description**: Validate environment configuration without applying it

**Authentication**: Required (admin only)

**Request Body**:
```typescript
{
  "environment": "development" | "staging" | "production",
  "supabase": {
    "url": string, // URL format
    "anonKey": string // Non-empty
  },
  "authentication": {
    "sessionSecret": string, // Min 32 chars
    "sessionMaxAge": number, // Positive integer
    "tokenRefreshThreshold": number // Positive integer
  }
}
```

**Response**: 200 OK
```typescript
{
  "success": true,
  "data": {
    "valid": boolean,
    "errors": Array<{
      "field": string,
      "message": string
    }>
  }
}
```

**Error Responses**:
- 400 Bad Request: Invalid request body
- 401 Unauthorized: Missing or invalid authentication
- 403 Forbidden: Insufficient permissions

**Example**:
```json
{
  "success": true,
  "data": {
    "valid": false,
    "errors": [
      {
        "field": "authentication.sessionSecret",
        "message": "Must be at least 32 characters"
      }
    ]
  }
}
```

---

## Package Management API

### GET /api/packages

**Description**: List all packages in the workspace

**Authentication**: Optional (development mode only)

**Query Parameters**:
- `type` (optional): Filter by package type - `frontend | backend | shared | config`
- `search` (optional): Search packages by name

**Response**: 200 OK
```typescript
{
  "success": true,
  "data": Array<{
    "name": string,
    "type": "frontend" | "backend" | "shared" | "config",
    "version": string,
    "path": string,
    "hasBase": boolean,
    "dependencies": Record<string, string>,
    "scripts": {
      "build": string,
      "dev": string,
      "test": string,
      "lint": string
    }
  }>
}
```

**Error Responses**:
- 500 Internal Server Error: Failed to read workspace

**Example**:
```json
{
  "success": true,
  "data": [
    {
      "name": "@universo/types",
      "type": "shared",
      "version": "0.1.0",
      "path": "packages/universo-types",
      "hasBase": true,
      "dependencies": {
        "zod": "catalog:"
      },
      "scripts": {
        "build": "tsdown",
        "dev": "tsdown --watch",
        "test": "vitest",
        "lint": "eslint src"
      }
    }
  ]
}
```

---

### GET /api/packages/:name

**Description**: Get detailed information about a specific package

**Authentication**: Optional (development mode only)

**Path Parameters**:
- `name`: Package name (e.g., `@universo/types`)

**Response**: 200 OK
```typescript
{
  "success": true,
  "data": {
    "name": string,
    "type": "frontend" | "backend" | "shared" | "config",
    "version": string,
    "path": string,
    "hasBase": boolean,
    "dependencies": Record<string, string>,
    "peerDependencies": Record<string, string>,
    "scripts": Record<string, string>,
    "exports": Record<string, any>,
    "readme": {
      "en": string, // Path to English README
      "ru": string  // Path to Russian README
    }
  }
}
```

**Error Responses**:
- 404 Not Found: Package does not exist
- 500 Internal Server Error: Failed to read package

---

### POST /api/packages/validate

**Description**: Validate package structure and configuration

**Authentication**: Optional (development mode only)

**Request Body**:
```typescript
{
  "packagePath": string // Relative path to package
}
```

**Response**: 200 OK
```typescript
{
  "success": true,
  "data": {
    "valid": boolean,
    "checks": {
      "hasBase": boolean,
      "hasPackageJson": boolean,
      "hasTsConfig": boolean,
      "hasReadme": boolean,
      "hasReadmeRu": boolean,
      "readmeLineCountMatch": boolean,
      "namingConvention": boolean,
      "requiredScripts": boolean
    },
    "errors": Array<{
      "check": string,
      "message": string
    }>
  }
}
```

**Error Responses**:
- 400 Bad Request: Invalid package path
- 404 Not Found: Package does not exist

**Example**:
```json
{
  "success": true,
  "data": {
    "valid": false,
    "checks": {
      "hasBase": true,
      "hasPackageJson": true,
      "hasTsConfig": true,
      "hasReadme": true,
      "hasReadmeRu": false,
      "readmeLineCountMatch": false,
      "namingConvention": true,
      "requiredScripts": true
    },
    "errors": [
      {
        "check": "hasReadmeRu",
        "message": "Missing Russian README file"
      },
      {
        "check": "readmeLineCountMatch",
        "message": "Cannot verify line count without Russian README"
      }
    ]
  }
}
```

---

## Documentation API

### GET /api/docs

**Description**: List all documentation files in the repository

**Authentication**: Optional

**Query Parameters**:
- `type` (optional): Filter by type - `readme | guide | api | specification`
- `validated` (optional): Filter by validation status - `true | false`

**Response**: 200 OK
```typescript
{
  "success": true,
  "data": Array<{
    "path": string,
    "pathRu": string,
    "type": "readme" | "guide" | "api" | "specification",
    "lineCount": number,
    "lineCountRu": number,
    "validated": boolean,
    "lastModified": string // ISO datetime
  }>
}
```

---

### GET /api/docs/validate

**Description**: Validate all bilingual documentation in repository

**Authentication**: Optional (development mode only)

**Response**: 200 OK
```typescript
{
  "success": true,
  "data": {
    "totalDocs": number,
    "validDocs": number,
    "invalidDocs": number,
    "errors": Array<{
      "path": string,
      "pathRu": string,
      "issue": "missing_translation" | "line_count_mismatch",
      "details": string
    }>
  }
}
```

**Example**:
```json
{
  "success": true,
  "data": {
    "totalDocs": 10,
    "validDocs": 8,
    "invalidDocs": 2,
    "errors": [
      {
        "path": "packages/universo-types/README.md",
        "pathRu": "packages/universo-types/README-RU.md",
        "issue": "line_count_mismatch",
        "details": "English: 120 lines, Russian: 118 lines"
      }
    ]
  }
}
```

---

## Health Check API

### GET /api/health

**Description**: Health check endpoint for monitoring

**Authentication**: None

**Response**: 200 OK
```typescript
{
  "success": true,
  "data": {
    "status": "healthy",
    "timestamp": string, // ISO datetime
    "version": string,
    "services": {
      "database": "connected" | "disconnected" | "unknown",
      "authentication": "available" | "unavailable"
    }
  }
}
```

**Example**:
```json
{
  "success": true,
  "data": {
    "status": "healthy",
    "timestamp": "2025-11-17T09:30:00Z",
    "version": "0.1.0",
    "services": {
      "database": "connected",
      "authentication": "available"
    }
  }
}
```

---

## Common Error Response Format

All API endpoints follow consistent error response format:

```typescript
{
  "success": false,
  "error": {
    "code": string, // Machine-readable error code
    "message": string, // Human-readable message
    "details"?: unknown // Optional additional details
  }
}
```

**Common Error Codes**:
- `INVALID_REQUEST`: Request body or parameters invalid
- `UNAUTHORIZED`: Authentication required
- `FORBIDDEN`: Insufficient permissions
- `NOT_FOUND`: Resource does not exist
- `INTERNAL_ERROR`: Server error
- `VALIDATION_FAILED`: Data validation failed

**Example**:
```json
{
  "success": false,
  "error": {
    "code": "VALIDATION_FAILED",
    "message": "Package name must start with @universo/ scope",
    "details": {
      "field": "name",
      "provided": "my-package"
    }
  }
}
```

---

## API Client Usage

```typescript
// packages/universo-api-client/base/src/clients/config.client.ts
import { ConfigurationSchema } from '@universo/types';

export class ConfigClient {
  async getEnvironment() {
    const response = await this.http.get('/api/config/environment');
    return response.data;
  }
  
  async validateConfig(config: Configuration) {
    const validated = ConfigurationSchema.parse(config);
    const response = await this.http.post('/api/config/validate', validated);
    return response.data;
  }
}

// packages/universo-api-client/base/src/clients/package.client.ts
export class PackageClient {
  async listPackages(params?: { type?: string; search?: string }) {
    const response = await this.http.get('/api/packages', { params });
    return response.data;
  }
  
  async getPackage(name: string) {
    const response = await this.http.get(`/api/packages/${encodeURIComponent(name)}`);
    return response.data;
  }
  
  async validatePackage(packagePath: string) {
    const response = await this.http.post('/api/packages/validate', { packagePath });
    return response.data;
  }
}
```

---

## Notes

**Development Mode APIs**: 
- Package management and validation APIs are primarily for development tooling
- May be disabled or restricted in production environments
- Useful for IDE integrations and development dashboards

**Future Extensions**:
- Build status endpoints (when CI/CD integrated)
- Dependency graph visualization endpoints
- Real-time package update notifications via WebSocket
- Package publishing and registry management

**Security Considerations**:
- Configuration endpoints must sanitize secrets
- Admin-only endpoints require proper authorization
- Rate limiting should be applied to validation endpoints
- CORS configuration must be environment-specific
