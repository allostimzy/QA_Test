# Task 3: Test Design

## Login System - Automated Test Cases

When testing a login system for a web application. Below are at least 10 test cases that would be included in an automated test suite:

1. **Valid credentials** - User can successfully log in with correct username and password
2. **Invalid password** - User cannot log in with correct username but wrong password
3. **Invalid username** - User cannot log in with username that doesn't exist
4. **Empty username field** - System should display validation error when username is blank
5. **Empty password field** - System should display validation error when password is blank
6. **Both fields empty** - System should display appropriate error when both fields are submitted empty
7. **SQL injection attempt and XSS attempt** - System safely handles SQL and script injection injection attempts in input fields for security
8. **Redirect after login** - User is redirected to correct page (e.g., dashboard) after successful login
9. **Password visibility toggle** - Show/hide password toggle works correctly
10. **Case sensitivity** - Username/password validation respects or ignores case based on SRS or PRD (Requirement Documents)
