# 🚀 Full-Stack Developer Challenge

Welcome to the **Full-Stack Developer Challenge**! This comprehensive assessment tests your abilities across frontend, backend, and database concepts through a series of practical coding problems.

---

## 🧐 How This Works

This challenge provides:

1. **Multi-Domain Assessment**: Tests covering frontend, backend, algorithms, and data processing
2. **Automated Testing**: Hidden test suites that validate your solutions comprehensively
3. **AI Code Review**: Intelligent feedback on code quality, performance, and best practices
4. **Real-World Scenarios**: Problems inspired by actual full-stack development challenges
5. **Instant Feedback**: Results posted directly to your Pull Request

---

## 📁 Repository Structure

```
challenge-full-stack/
├── src/
│   └── main.js       ← implement your solution here
├── package.json      ← project configuration (no tests visible)
├── workflows/
│   └── ci.yml        ← triggers automated testing & AI review
└── README.md         ← this file (challenge specifications)
```

---

## 🎯 Challenge Overview

You are tasked with implementing **5 core functions** that demonstrate full-stack development skills:

1. **🔍 Data Filtering & Search** - Backend data processing
2. **📊 API Response Formatter** - RESTful API design patterns
3. **🔐 Authentication Helper** - Security & validation
4. **⚡ Rate Limiting Logic** - Performance & scalability
5. **🌐 URL Router** - Frontend routing logic

**Important:** Only modify the code **above** the "DO NOT modify" comment in `src/main.js`. The section below is required for our automated testing system.

---

---

## � Detailed Function Specifications

### 1. 🔍 `filterAndSearchUsers(users, searchTerm, filters)`

**Purpose**: Implement a user search and filtering system commonly used in admin dashboards.

**Parameters**:
- `users` (Array): Array of user objects with properties: `id`, `name`, `email`, `role`, `active`, `registeredAt`
- `searchTerm` (String): Search term to match against name or email (case-insensitive)
- `filters` (Object): Filter criteria: `{ role?: string, active?: boolean, registeredAfter?: Date }`

**Returns**: Array of filtered user objects, sorted by name (A-Z)

**Example**:
```javascript
const users = [
  { id: 1, name: "John Doe", email: "john@example.com", role: "admin", active: true, registeredAt: new Date("2023-01-15") },
  { id: 2, name: "Jane Smith", email: "jane@example.com", role: "user", active: false, registeredAt: new Date("2023-06-20") }
];

filterAndSearchUsers(users, "john", { active: true })
// Returns: [{ id: 1, name: "John Doe", ... }]
```

---

### 2. 📊 `formatApiResponse(data, statusCode, metadata)`

**Purpose**: Create a standardized API response format used across microservices.

**Parameters**:
- `data` (Any): The response payload
- `statusCode` (Number): HTTP status code
- `metadata` (Object): Optional metadata: `{ total?: number, page?: number, limit?: number, timestamp?: Date }`

**Returns**: Formatted response object with structure:
```javascript
{
  success: boolean,      // true if statusCode < 400
  statusCode: number,
  data: any,
  metadata: {
    timestamp: string,   // ISO string
    ...otherMetadata
  },
  message: string       // Auto-generated based on status code
}
```

**Example**:
```javascript
formatApiResponse([{id: 1}], 200, { total: 1, page: 1 })
// Returns: { success: true, statusCode: 200, data: [{id: 1}], metadata: {...}, message: "OK" }
```

---

### 3. 🔐 `validateAndHashPassword(password, requirements)`

**Purpose**: Implement secure password validation and hashing for user registration.

**Parameters**:
- `password` (String): The password to validate and hash
- `requirements` (Object): Validation rules: `{ minLength: number, requireUppercase: boolean, requireNumbers: boolean, requireSpecialChars: boolean }`

**Returns**: Object with validation result and hash:
```javascript
{
  isValid: boolean,
  errors: string[],      // Array of validation error messages
  hash: string | null    // Simple hash if valid (multiply ASCII codes by position + 1, then sum)
}
```

**Example**:
```javascript
validateAndHashPassword("MyPass123!", { minLength: 8, requireUppercase: true, requireNumbers: true, requireSpecialChars: true })
// Returns: { isValid: true, errors: [], hash: "12345" }
```

---

### 4. ⚡ `rateLimiter(windowMs, maxRequests)`

**Purpose**: Create a rate limiting function for API endpoints.

**Returns**: A function that tracks requests and determines if they should be allowed.

The returned function takes `(userId, timestamp)` and returns:
```javascript
{
  allowed: boolean,
  remainingRequests: number,
  resetTime: number      // Timestamp when window resets
}
```

**Parameters**:
- `windowMs` (Number): Time window in milliseconds
- `maxRequests` (Number): Maximum requests allowed per window

**Example**:
```javascript
const limiter = rateLimiter(60000, 5); // 5 requests per minute
limiter("user123", Date.now())
// Returns: { allowed: true, remainingRequests: 4, resetTime: timestamp }
```

---

### 5. 🌐 `routeMatcher(routes, path)`

**Purpose**: Implement a client-side router for single-page applications.

**Parameters**:
- `routes` (Array): Array of route objects: `{ path: string, component: string, exact?: boolean }`
- `path` (String): Current URL path to match

**Returns**: Matching route object with extracted parameters, or null if no match
```javascript
{
  route: object,         // The matched route
  params: object,        // Extracted path parameters (e.g., :id)
  query: object          // Parsed query string parameters
}
```

**Route Patterns**:
- Static: `/users`
- Dynamic: `/users/:id`
- Wildcard: `/docs/*`
- Query strings: `/search?q=term&page=1`

**Example**:
```javascript
const routes = [
  { path: "/users/:id", component: "UserDetail", exact: true },
  { path: "/users", component: "UserList", exact: true }
];

routeMatcher(routes, "/users/123?tab=profile")
// Returns: { route: {...}, params: { id: "123" }, query: { tab: "profile" } }
```

---

## � How to Submit Your Solution

1. **Fork** this repository to your GitHub account
2. **Clone** your fork locally:
   ```bash
   git clone https://github.com/yourusername/challenge-full-stack.git
   cd challenge-full-stack
   ```
3. **Implement** your solution in `src/main.js`
4. **Test locally** (optional):
   ```bash
   node -e "const funcs = require('./src/main.js'); console.log(funcs.filterAndSearchUsers([], '', {}));"
   ```
5. **Commit & push** your changes:
   ```bash
   git add .
   git commit -m "Implement full-stack challenge solution"
   git push origin main
   ```
6. **Open a Pull Request** back to the original repository

## 🤖 Automated Feedback

Once you open your Pull Request, our GitHub Actions will automatically:

- ✅ **Run Comprehensive Tests**: Execute 50+ test cases covering:
  - **Functionality**: Correct implementation of all requirements
  - **Edge Cases**: Null values, empty arrays, invalid inputs
  - **Performance**: Efficiency with large datasets
  - **Security**: Input validation and safe operations
- 📊 **Generate Results Table**: Detailed pass/fail status for each function
- 🤖 **AI Code Review**: Intelligent feedback on:
  - Code quality and readability
  - Full-stack best practices
  - Performance optimizations
  - Security considerations
  - Scalability patterns

You'll see all feedback as a comment on your PR within minutes—no need to run anything locally!

---

## 💡 Tips for Success

### General Guidelines
- **Read specifications carefully**: Each function has specific requirements and return formats
- **Handle edge cases**: Consider null/undefined values, empty arrays, invalid inputs
- **Write clean code**: Use meaningful variable names and add comments
- **Think about performance**: Some functions will be tested with large datasets
- **Follow the patterns**: Each function demonstrates different full-stack concepts

### Specific Hints
1. **filterAndSearchUsers**: Use `Array.filter()` and `Array.sort()`. Make search case-insensitive.
2. **formatApiResponse**: Create a status code to message mapping. Handle timestamps properly.
3. **validateAndHashPassword**: Build validation step by step. For hashing, sum character codes multiplied by position.
4. **rateLimiter**: Use closures to maintain state. Track windows per user.
5. **routeMatcher**: Parse path parameters with regex. Handle query strings with URLSearchParams logic.

### Performance Considerations
- Optimize for **O(n)** or **O(n log n)** complexity where possible
- Use efficient data structures (Map/Set when appropriate)
- Avoid nested loops unless necessary
- Cache computed values when beneficial

---

## 🧪 What We're Testing

| Function | Test Categories | Key Areas |
|----------|----------------|-----------|
| `filterAndSearchUsers` | Filtering, Searching, Sorting | Data processing, Array methods |
| `formatApiResponse` | API Design, Data Structure | REST patterns, Error handling |
| `validateAndHashPassword` | Security, Validation | Input validation, Basic cryptography |
| `rateLimiter` | Performance, State Management | Closures, Time-based logic |
| `routeMatcher` | Frontend Routing, Parsing | Regex, URL handling |

---

## 🚀 Getting Started

1. Open `src/main.js` and review the existing `isEven` function as an example
2. Implement the five required functions according to the specifications above
3. Test each function with the provided examples
4. Consider edge cases and error handling
5. Submit your PR and wait for automated feedback
6. Iterate based on feedback if needed

---

## 🏆 Evaluation Criteria

Your solution will be evaluated on:

- **Correctness** (40%): Does it work according to specifications?
- **Code Quality** (25%): Is it readable, maintainable, and well-structured?
- **Edge Case Handling** (20%): Does it handle invalid/unexpected inputs gracefully?
- **Performance** (15%): Is it efficient with large datasets?

---

**Good luck with your full-stack challenge!** 🎉

This challenge tests real-world skills you'll use daily as a full-stack developer. Take your time, think through each problem, and don't hesitate to ask questions in your PR if you need clarification.

If you encounter any technical issues, please open an issue in this repository.
```
challenge-template/
├── src/
│   └── main.js       ← implement your solution here
├── package.json         ← no tests here; CI will run hidden tests
└── .github/
└── workflows/
└── ci.yml       ← triggers automated tests & AI review
```

---

## 🎯 Your Tasks

Open **`src/main.js`** and implement the following exported functions:

1. **`function isEven(num: number): boolean`**
    - Returns `true` if the number is even, `false` otherwise.
2. **``**
    - description of the second function

---

## 🔧 How to Submit

1. **Fork** this repository.
2. **Implement** the four functions in `src/main.js`.
3. **Commit & push** your changes to your fork.
4. **Open a Pull Request** back to this repo.

As soon as you open your PR, our GitHub Action will:

- Pull in our hidden test suite
- Run all tests against your implementation
- Post a **Markdown table** of pass/fail results
- Generate a short **AI review** of your code

You’ll see the feedback as a comment on your PR—no need to run anything locally.

---

## ℹ️ Tips & Constraints

- **Performance matter**: batch or throttle sends to at most once per 1–2 s.
- **Error handling**: guard against missing APIs or unsupported browsers.
- **Code style**: clean, modular, well-commented.

---

Good luck, and happy coding!
If you run into any issues, leave a comment on your PR.
