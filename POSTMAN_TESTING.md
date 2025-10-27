# Calendar Invite API - Postman Testing Guide

This guide provides instructions for testing the Calendar Invite API endpoints using Postman.

## Server Setup

1. Start the server:
   ```bash
   npm run start:dev
   ```
   The server will run on `http://localhost:3000`

## API Endpoints

### 1. Generate Google Calendar URL

**Endpoint:** `POST /calendar/generate-url`

**Description:** Creates a Google Calendar event URL from event details.

**Request Body:**
```json
{
  "title": "Team Meeting",
  "description": "Weekly team sync meeting",
  "startDate": "2024-01-15T14:00:00Z",
  "endDate": "2024-01-15T15:00:00Z",
  "location": "Conference Room A",
  "timezone": "America/New_York"
}
```

**Expected Response:**
```json
{
  "success": true,
  "data": {
    "googleCalendarUrl": "https://calendar.google.com/calendar/render?action=TEMPLATE&text=Team+Meeting&details=Weekly+team+sync+meeting&location=Conference+Room+A&dates=20240115T140000Z/20240115T150000Z",
    "event": {
      "title": "Team Meeting",
      "description": "Weekly team sync meeting",
      "startDate": "2024-01-15T14:00:00Z",
      "endDate": "2024-01-15T15:00:00Z",
      "location": "Conference Room A",
      "timezone": "America/New_York"
    }
  }
}
```

### 2. Generate Short Google Calendar URL

**Endpoint:** `POST /calendar/generate-short-url`

**Description:** Creates a Google Calendar event URL and generates a short URL for it.

**Request Body:**
```json
{
  "title": "Project Review",
  "description": "Quarterly project review meeting",
  "startDate": "2024-01-20T09:00:00Z",
  "endDate": "2024-01-20T10:30:00Z",
  "location": "Zoom Meeting",
  "timezone": "UTC"
}
```

**Expected Response:**
```json
{
  "success": true,
  "data": {
    "googleCalendarUrl": "https://calendar.google.com/calendar/render?action=TEMPLATE&text=Project+Review&details=Quarterly+project+review+meeting&location=Zoom+Meeting&dates=20240120T090000Z/20240120T103000Z",
    "shortUrl": "http://localhost:3000/s/AbC123",
    "event": {
      "title": "Project Review",
      "description": "Quarterly project review meeting",
      "startDate": "2024-01-20T09:00:00Z",
      "endDate": "2024-01-20T10:30:00Z",
      "location": "Zoom Meeting",
      "timezone": "UTC"
    }
  }
}
```

### 3. Get All Short URLs

**Endpoint:** `GET /calendar/short-urls`

**Description:** Retrieves all created short URL mappings.

**Expected Response:**
```json
{
  "success": true,
  "data": [
    {
      "shortCode": "AbC123",
      "originalUrl": "https://calendar.google.com/calendar/render?action=TEMPLATE&text=Project+Review&details=Quarterly+project+review+meeting&location=Zoom+Meeting&dates=20240120T090000Z/20240120T103000Z",
      "createdAt": "2024-01-15T10:30:00.000Z"
    }
  ]
}
```

### 4. Redirect Short URL

**Endpoint:** `GET /s/{shortCode}`

**Description:** Redirects to the original Google Calendar URL.

**Example:** `GET /s/AbC123`

**Expected Response:** HTTP 302 redirect to the original Google Calendar URL.

## Postman Collection JSON

Here's a ready-to-import Postman collection:

```json
{
  "info": {
    "name": "Calendar Invite API",
    "description": "API for generating Google Calendar event URLs and short URLs",
    "schema": "https://schema.getpostman.com/json/collection/v2.1.0/collection.json"
  },
  "item": [
    {
      "name": "Generate Calendar URL",
      "request": {
        "method": "POST",
        "header": [
          {
            "key": "Content-Type",
            "value": "application/json"
          }
        ],
        "body": {
          "mode": "raw",
          "raw": "{\n  \"title\": \"Team Meeting\",\n  \"description\": \"Weekly team sync meeting\",\n  \"startDate\": \"2024-01-15T14:00:00Z\",\n  \"endDate\": \"2024-01-15T15:00:00Z\",\n  \"location\": \"Conference Room A\",\n  \"timezone\": \"America/New_York\"\n}"
        },
        "url": {
          "raw": "{{baseUrl}}/calendar/generate-url",
          "host": ["{{baseUrl}}"],
          "path": ["calendar", "generate-url"]
        }
      }
    },
    {
      "name": "Generate Short Calendar URL",
      "request": {
        "method": "POST",
        "header": [
          {
            "key": "Content-Type",
            "value": "application/json"
          }
        ],
        "body": {
          "mode": "raw",
          "raw": "{\n  \"title\": \"Project Review\",\n  \"description\": \"Quarterly project review meeting\",\n  \"startDate\": \"2024-01-20T09:00:00Z\",\n  \"endDate\": \"2024-01-20T10:30:00Z\",\n  \"location\": \"Zoom Meeting\",\n  \"timezone\": \"UTC\"\n}"
        },
        "url": {
          "raw": "{{baseUrl}}/calendar/generate-short-url",
          "host": ["{{baseUrl}}"],
          "path": ["calendar", "generate-short-url"]
        }
      }
    },
    {
      "name": "Get All Short URLs",
      "request": {
        "method": "GET",
        "header": [],
        "url": {
          "raw": "{{baseUrl}}/calendar/short-urls",
          "host": ["{{baseUrl}}"],
          "path": ["calendar", "short-urls"]
        }
      }
    },
    {
      "name": "Test Short URL Redirect",
      "request": {
        "method": "GET",
        "header": [],
        "url": {
          "raw": "{{baseUrl}}/s/AbC123",
          "host": ["{{baseUrl}}"],
          "path": ["s", "AbC123"]
        }
      }
    }
  ],
  "variable": [
    {
      "key": "baseUrl",
      "value": "http://localhost:3000"
    }
  ]
}
```

## Testing Steps

1. **Import Collection:**
   - Copy the JSON above
   - Open Postman
   - Click "Import" → "Raw text"
   - Paste the JSON and import

2. **Set Environment:**
   - The collection uses `{{baseUrl}}` variable
   - Set it to `http://localhost:3000` in your environment

3. **Test Flow:**
   1. Start with "Generate Calendar URL" to test basic functionality
   2. Use "Generate Short Calendar URL" to create a short URL
   3. Copy the shortCode from the response
   4. Test the redirect by visiting the short URL in browser or using "Test Short URL Redirect"
   5. Use "Get All Short URLs" to see all created mappings

## Sample Test Cases

### Test Case 1: Basic Event
```json
{
  "title": "Doctor Appointment",
  "startDate": "2024-02-01T10:00:00Z",
  "endDate": "2024-02-01T11:00:00Z"
}
```

### Test Case 2: All-day Event
```json
{
  "title": "Company Holiday",
  "startDate": "2024-12-25T00:00:00Z",
  "endDate": "2024-12-26T00:00:00Z",
  "description": "Christmas Day - Office Closed"
}
```

### Test Case 3: Event with Location
```json
{
  "title": "Client Meeting",
  "description": "Quarterly business review",
  "startDate": "2024-01-30T15:30:00Z",
  "endDate": "2024-01-30T16:30:00Z",
  "location": "123 Business Street, City, State 12345"
}
```

## Browser Testing

After generating a short URL, you can test it directly in your browser:

1. Copy the `shortUrl` from the API response
2. Paste it in your browser address bar
3. You should be redirected to Google Calendar with the event pre-filled
4. Click "Save" to add the event to your calendar

## Troubleshooting

- **Server not starting:** Make sure you have run `npm install` first
- **404 errors:** Verify the server is running on port 3000
- **Short URL not working:** Check that the shortCode exists using the "Get All Short URLs" endpoint
- **Calendar not opening:** Verify the generated Google Calendar URL is properly formatted