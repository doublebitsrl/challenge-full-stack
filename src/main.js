/**
 * FULL-STACK DEVELOPER CHALLENGE
 *
 * Implement the 5 functions below according to the specifications in README.md
 *
 * You can add comments to explain your code and create helper functions if needed.
 * Do not modify the lines after the comment "DO NOT modify the following lines after this comment".
 *
 * Functions to implement:
 * 1. filterAndSearchUsers - Data filtering & search (backend processing)
 * 2. formatApiResponse - API response formatting (REST patterns)
 * 3. validateAndHashPassword - Authentication & security
 * 4. rateLimiter - Rate limiting logic (performance & scalability)
 * 5. routeMatcher - URL routing (frontend routing logic)
 **/

// Example function (already implemented) - keep this as reference
module.exports.isEven = function isEven(num) {
  console.log("IS EVEN FUNCTION CALLED");
  // Return true if the number is even, false otherwise
  if (num === undefined || num === null) {
    throw new TypeError('Input cannot be null or undefined');
  }
  if (typeof num !== 'number') {
    throw new TypeError('Input must be a number');
  }

  return num % 2 === 0;
}

// 1. 🔍 Data Filtering & Search - Backend data processing
module.exports.filterAndSearchUsers = function filterAndSearchUsers(users, searchTerm, filters) {
  // TODO: Implement user search and filtering system
  // - Filter users based on searchTerm (name/email, case-insensitive)
  // - Apply filters: { role?, active?, registeredAfter? }
  // - Return results sorted by name (A-Z)

  if (!Array.isArray(users)) {
    return [];
  }

  if (!filters) {
    filters = {};
  }

  let filteredUsers = users.filter(user => {
    // Search term filtering (case-insensitive name/email)
    if (searchTerm && typeof searchTerm === 'string' && searchTerm.trim()) {
      const searchLower = searchTerm.toLowerCase().trim();
      const nameMatch = user.name && user.name.toLowerCase().includes(searchLower);
      const emailMatch = user.email && user.email.toLowerCase().includes(searchLower);
      if (!nameMatch && !emailMatch) {
        return false;
      }
    }

    // Role filter
    if (filters.role && user.role !== filters.role) {
      return false;
    }

    // Active filter
    if (filters.active !== undefined && user.active !== filters.active) {
      return false;
    }

    // RegisteredAfter filter
    if (filters.registeredAfter && user.registeredAt) {
      const userDate = new Date(user.registeredAt);
      const filterDate = new Date(filters.registeredAfter);
      if (userDate <= filterDate) {
        return false;
      }
    }

    return true;
  });

  // Sort by name (A-Z)
  filteredUsers.sort((a, b) => {
    const nameA = a.name || '';
    const nameB = b.name || '';
    return nameA.localeCompare(nameB);
  });

  return filteredUsers;
}

// 2. 📊 API Response Formatter - RESTful API design patterns
module.exports.formatApiResponse = function formatApiResponse(data, statusCode, metadata) {
  // TODO: Create standardized API response format
  // - Include success boolean (true if statusCode < 400)
  // - Add auto-generated message based on status code
  // - Include timestamp in metadata
  // - Return: { success, statusCode, data, metadata, message }

  // Status code to message mapping
  const statusMessages = {
    200: 'OK',
    201: 'Created',
    204: 'No Content',
    400: 'Bad Request',
    401: 'Unauthorized',
    403: 'Forbidden',
    404: 'Not Found',
    409: 'Conflict',
    422: 'Unprocessable Entity',
    429: 'Too Many Requests',
    500: 'Internal Server Error',
    502: 'Bad Gateway',
    503: 'Service Unavailable'
  };

  const success = statusCode < 400;
  const message = statusMessages[statusCode] || (success ? 'Success' : 'Error');

  // Create metadata with timestamp
  const responseMetadata = {
    timestamp: new Date().toISOString(),
    ...(metadata || {})
  };

  return {
    success,
    statusCode,
    data,
    metadata: responseMetadata,
    message
  };
}

// 3. 🔐 Authentication Helper - Security & validation
module.exports.validateAndHashPassword = function validateAndHashPassword(password, requirements) {
  // TODO: Validate password against requirements and create simple hash
  // - Check minLength, requireUppercase, requireNumbers, requireSpecialChars
  // - For hashing: sum of (ASCII code * position + 1) for each character
  // - Return: { isValid, errors[], hash }

  const errors = [];

  // Check if password is provided and is a string
  if (!password || typeof password !== 'string') {
    errors.push('Password must be a non-empty string');
    return { isValid: false, errors, hash: null };
  }

  // Check minimum length
  if (requirements.minLength && password.length < requirements.minLength) {
    errors.push(`Password must be at least ${requirements.minLength} characters long`);
  }

  // Check for uppercase letters
  if (requirements.requireUppercase && !/[A-Z]/.test(password)) {
    errors.push('Password must contain at least one uppercase letter');
  }

  // Check for numbers
  if (requirements.requireNumbers && !/[0-9]/.test(password)) {
    errors.push('Password must contain at least one number');
  }

  // Check for special characters
  if (requirements.requireSpecialChars && !/[!@#$%^&*()_+\-=\[\]{};':"\\|,.<>\/?~`]/.test(password)) {
    errors.push('Password must contain at least one special character');
  }

  const isValid = errors.length === 0;

  // Create hash if valid
  let hash = null;
  if (isValid) {
    let hashSum = 0;
    for (let i = 0; i < password.length; i++) {
      const asciiCode = password.charCodeAt(i);
      hashSum += asciiCode * (i + 1);
    }
    hash = hashSum.toString();
  }

  return { isValid, errors, hash };
}

// 4. ⚡ Rate Limiting Logic - Performance & scalability
module.exports.rateLimiter = function rateLimiter(windowMs, maxRequests) {
  // TODO: Return a function that implements rate limiting
  // - Track requests per user within time windows
  // - Returned function takes (userId, timestamp)
  // - Returns: { allowed, remainingRequests, resetTime }

  // Store request counts per user
  const userRequests = new Map();

  return function(userId, timestamp) {
    const now = timestamp || Date.now();

    if (!userRequests.has(userId)) {
      // First request for this user
      userRequests.set(userId, {
        count: 1,
        windowStart: now,
        resetTime: now + windowMs
      });
      return {
        allowed: true,
        remainingRequests: maxRequests - 1,
        resetTime: now + windowMs
      };
    }

    const userData = userRequests.get(userId);

    // Check if we're in a new window
    if (now >= userData.resetTime) {
      // Reset the window
      userData.count = 1;
      userData.windowStart = now;
      userData.resetTime = now + windowMs;

      return {
        allowed: true,
        remainingRequests: maxRequests - 1,
        resetTime: userData.resetTime
      };
    }

    // Check if within current window and limit exceeded
    if (userData.count >= maxRequests) {
      // Rate limit exceeded
      return {
        allowed: false,
        remainingRequests: 0,
        resetTime: userData.resetTime
      };
    }

    // Allow the request and increment counter
    userData.count++;

    return {
      allowed: true,
      remainingRequests: maxRequests - userData.count,
      resetTime: userData.resetTime
    };
  };
}

// 5. 🌐 URL Router - Frontend routing logic
module.exports.routeMatcher = function routeMatcher(routes, path) {
  // TODO: Match URL path against route patterns
  // - Support static routes: /users
  // - Support dynamic routes: /users/:id
  // - Support wildcards: /docs/*
  // - Parse query strings: ?tab=profile&page=1
  // - Return: { route, params, query } or null

  if (!Array.isArray(routes) || !path || typeof path !== 'string') {
    return null;
  }

  // Parse query string
  const [pathname, queryString] = path.split('?');
  const query = {};

  if (queryString) {
    queryString.split('&').forEach(param => {
      const [key, value] = param.split('=');
      if (key) {
        query[decodeURIComponent(key)] = value ? decodeURIComponent(value) : '';
      }
    });
  }

  // Try to match each route
  for (const route of routes) {
    const params = {};
    let isMatch = false;

    // Handle wildcard routes
    if (route.path.endsWith('/*')) {
      const basePath = route.path.slice(0, -2); // Remove /*
      if (pathname.startsWith(basePath)) {
        isMatch = true;
      }
    }
    // Handle dynamic routes with parameters
    else if (route.path.includes(':')) {
      const routeParts = route.path.split('/');
      const pathParts = pathname.split('/');

      if (routeParts.length === pathParts.length) {
        isMatch = true;

        for (let i = 0; i < routeParts.length; i++) {
          const routePart = routeParts[i];
          const pathPart = pathParts[i];

          if (routePart.startsWith(':')) {
            // Dynamic parameter
            const paramName = routePart.slice(1);
            params[paramName] = pathPart;
          } else if (routePart !== pathPart) {
            // Static part doesn't match
            isMatch = false;
            break;
          }
        }
      }
    }
    // Handle exact static routes
    else {
      if (route.exact !== false && route.exact !== undefined) {
        // Explicit exact matching
        isMatch = pathname === route.path;
      } else {
        // Non-exact matching (prefix matching) - when exact is false or undefined
        isMatch = pathname.startsWith(route.path);
      }
    }

    if (isMatch) {
      return {
        route,
        params,
        query
      };
    }
  }

  return null;
}

/* *********
  *
  *  DO NOT modify the following lines after this comment, otherwise the tests will fail.
  *  If you need to add code, do it before this comment.
  *  If you need to remove code, do it before this comment.
  *  If you need to change code, do it before this comment.
  *  If you need to add comments, do it before this comment.
  *  If you need to change comments, do it before this comment.
  *
********* */

