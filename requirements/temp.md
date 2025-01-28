### Prompt for Cursor AI Editor

#### **Objective**
Maintain the current project structure as it is, but add support for authentication in the following way:

1. Replace the existing authentication mechanism (if any) with Supabase Authentication.
2. Add a **Sign In** and **Sign Up** page to the project.
3. Ensure these pages include the following authentication options:
   - Email and Password (basic credentials-based sign-in/sign-up).
   - **Google Authentication** (via Supabase OAuth provider).

#### **Requirements**
- **Sign In Page**:
  - A form with inputs for Email and Password.
  - A button to sign in via Google.
  - Handle errors (e.g., incorrect email/password or Google login issues) gracefully with appropriate UI messages.

- **Sign Up Page**:
  - A form to register users with Email and Password.
  - A button to sign up via Google.
  - Display error messages for invalid inputs (e.g., existing email, weak password).

- **Supabase Integration**:
  - Use Supabase's `auth` module for handling both email/password and Google OAuth.
  - Ensure environment variables are used to securely store Supabase credentials (e.g., API URL and API key).

- **UI Design**:
  - Keep the UI consistent with the current project styling.
  - Use responsive design for both desktop and mobile views.

- **Folder Structure**:
  - Maintain the existing folder structure.
  - Add a `components/auth/` folder for reusable authentication components.
  - Add pages for `sign-in` and `sign-up` in the appropriate directory.

#### **Additional Notes**
- If any reusable components (like buttons or input fields) already exist in the project, use them to ensure consistency.
- Ensure the implementation works seamlessly across browsers and devices.
- Test the Google sign-in/sign-up flow thoroughly to ensure reliability.
