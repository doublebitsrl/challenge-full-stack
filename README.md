# Coding Challenge Template

Welcome to our coding challenge! This repository serves as a template for creating and solving programming challenges with automated testing and AI-powered code review.

---

## 🧐 How This Works

This template provides:

1. **Automated Testing**: Hidden test suites that run when you submit your solution
2. **AI Code Review**: Intelligent feedback on your implementation
3. **Simple Structure**: Clean, focused environment for coding challenges
4. **Instant Feedback**: Results posted directly to your Pull Request

---

## 📁 Repository Structure

```
challenge-template/
├── src/
│   └── main.js       ← implement your solution here
├── package.json      ← project configuration (no tests visible)
├── workflows/
│   └── ci.yml        ← triggers automated testing & AI review
└── README.md         ← this file
```

---

## 🎯 Your Task

Open **`src/main.js`** and implement the required functions according to the challenge specifications.

The file currently contains a simple example:
- An `isEven()` function that demonstrates the expected code structure
- Comments showing where to implement your solution
- A "DO NOT MODIFY" section that must remain unchanged for tests to work

**Important:** Only modify the code **above** the "DO NOT modify" comment. The section below is required for our automated testing system.

---

## 🔧 How to Submit Your Solution

1. **Fork** this repository to your GitHub account
2. **Clone** your fork locally:
   ```bash
   git clone this-repo-url
   ```
3. **Implement** your solution in `src/main.js`
4. **Commit & push** your changes:
   ```bash
   git add .
   git commit -m "Implement solution"
   git push origin main
   ```
5. **Open a Pull Request** back to the original repository

## 🤖 Automated Feedback

Once you open your Pull Request, our GitHub Actions will automatically:

- ✅ **Run Hidden Tests**: Execute a comprehensive test suite against your code
- 📊 **Generate Results Table**: Display pass/fail status for each test case
- 🤖 **AI Code Review**: Provide intelligent feedback on:
  - Code quality and style
  - Performance considerations
  - Best practices
  - Potential improvements

You'll see all feedback as a comment on your PR within minutes—no need to run anything locally!

---

## 💡 General Tips

- **Read the challenge carefully**: Make sure you understand all requirements
- **Follow the function signatures**: Don't change function names or parameters
- **Handle edge cases**: Consider null, undefined, and boundary values
- **Write clean code**: Use meaningful variable names and add comments
- **Test manually**: Run your code with different inputs before submitting
- **Check constraints**: Follow any specified limitations (time, space, libraries)

---

## 🚀 Getting Started

1. Look for the specific challenge instructions (usually in comments within `main.js`)
2. Implement the required functions
3. Test your solution with various inputs
4. Submit your PR and wait for automated feedback
5. Iterate based on the feedback if needed

---

Good luck with your challenge! 🎉

If you encounter any technical issues, please open an issue in this repository.
```
accessibility-tracker-template/
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

1. **`async hashHtml(html: string): Promise<string>`**
   - Compute a SHA-256 hash of `html`.
   - Used to detect duplicates before sending.

2. **`sendIfNew(html: string, context: object): void`**
   - Call `hashHtml(html)` to check if this snippet was already sent.
   - If new, send `{ html, hash, context, url, timestamp }` to `/api/accessibility`:
     - Prefer `navigator.sendBeacon()`
     - Fallback to `fetch()`

3. **`observeDom(): void`**
   - Instantiate a `MutationObserver` on `document.body` (subtree).
   - For each added element node, call `sendIfNew(node.outerHTML, { type: 'mutation' })`.

4. **`trackUserActions(): void`**
   - Listen for:
     - `'click'`
     - `'focusin'`
     - `'input'`
     - `'keydown'` (when `e.key === 'Tab'`)
   - On each event, call `sendIfNew(e.target.outerHTML, { type: eventType })`.

5. **`initTracker(): void`**
   - Call `observeDom()` and `trackUserActions()` so the script starts automatically in the browser.

> **Tip:** Use a `Set` or `WeakSet` plus your hash function to avoid repeated sends.

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

- **No external libraries**: use native Web APIs (`MutationObserver`, `crypto.subtle`, `navigator.sendBeacon`).
- **Performance matter**: batch or throttle sends to at most once per 1–2 s.
- **Error handling**: guard against missing APIs or unsupported browsers.
- **Code style**: clean, modular, well-commented.

---

Good luck, and happy coding!
If you run into any issues, leave a comment on your PR.
