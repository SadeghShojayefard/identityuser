# IdentityUser

A lightweight and ready-to-use **User Authentication Starter Kit** for Next.js applications.
IdentityUser helps you quickly scaffold a fully functional authentication system into your project — including models, validation schemas, services, utilities, and optional NextAuth integration.

Perfect for developers who want a clean, modular, and production-ready user system with minimal setup.

---

## ✨ Features

* ✔ Auto-copy authentication boilerplate into your project
* ✔ Built-in Zod validation
* ✔ Resend-ready to send email to user 
* ✔ Mongoose user model
* ✔ Password hashing with bcrypt
* ✔ NextAuth-ready structure
* ✔ Zero configuration — just install & run one command
* ✔ Fully TypeScript-compatible
* ✔ Clean and maintainable folder structure

---
---
## 🔐 Advanced Authentication & Security (New in v0.4.0)

IdentityUser v0.4.0 introduces major improvements to authentication flows, password policies, and session handling — making it suitable for production-grade and enterprise-level applications.

### 🔑 Authentication Methods

IdentityUser now supports **four secure login methods**:

- **Username / Email + Password**
- **Two-Factor Authentication (TOTP)**
- **Recovery Code Login**
- **OTP Login (Email / Phone)**

Each method is fully isolated, rate-limited, and hardened against brute-force attacks.

---

### 🧠 Smart Two-Factor Authentication

- **Remember This Device**
  - Trusted browsers can bypass 2FA challenges for a configurable period
  - Ideal for personal devices while maintaining strong security

- **Fallback Login**
  - If 2FA or recovery codes fail (lost device, expired codes)
  - User can securely log in and automatically disable 2FA
  - Prevents permanent account lockout

---

### 📱 OTP-Based Login

- Login using **one-time passwords** (OTP)
- Supports **email or phone number**
- Secure, time-limited, and rate-limited

---

### 🚦 Login Throttling & Protection

- Advanced **login throttling**
- Protects against brute-force and credential-stuffing attacks
- Fully configurable rate limits

---

### 🧾 Persistent Sessions & Remember Me

Session behavior is now smarter and configurable:

- ❌ Without "Remember Me":
  - Automatic logout after **1 hour**
- ✅ With "Remember Me":
  - Session persists up to **7 days**

JWT & Session configuration:
- `jwt.maxAge`: **7 days**
- `session.maxAge`: **1 day**
- `session.updateAge`: **30 minutes**

---

### 🔐 Advanced Password Policies

- **Password Complexity Rules**
  - Enforced strength requirements
- **Password History**
  - Prevents reuse of previous passwords
- **Password Expiration**
  - Forces password change after a defined period
  - Expired passwords redirect users to a mandatory reset flow

---

### 🔒 Security-First Design

- Clear separation between **authentication** and **authorization**
- Policy-based access control after login
- No insecure partial-login states
---
---

## 🔗 Related Links & Resources

Here are all related resources for the **IdentityUser** package:

### 📦 NPM Package
https://www.npmjs.com/package/identityuser

### 🧩 Core Repository (Source Code)
https://github.com/SadeghShojayefard/identityuser

### 🧪 Sample Project (Test Environment)
A full working Next.js project demonstrating how to use the package:

https://github.com/SadeghShojayefard/identityusers_sample

### 📄 Full Documentation (PDF)
Complete setup guide and technical explanation:
https://github.com/SadeghShojayefard/identityusers_sample/blob/main/IdentityUser_Documentation.pdf

---
---

# 📦 Installation

Run the following command inside your Next.js project:

```
npm install identityuser
```

---

# 🚀 Initialize the Authentication Module

IdentityUser includes a CLI tool that copies the entire `src/identityUser` folder into your project.

Run:

```
npx identityuser
```

After running this command, a folder like this will appear inside your project:

Note: If a folder named src/identityUser already exists in your project, the CLI will not overwrite it. Instead it will create a new folder with a numeric suffix (identityUser-2, identityUser-3, …) to avoid conflicts. You may need to adjust imports or merge files manually after running the CLI.

```
src/
 └── identityUser/
      ├── api/
      ├── components/
      ├── helper/
      ├── lib/
      ├── providers/
      ├── Type/
      └── validation/
```

---

# 📚 Required Dependencies

IdentityUser relies on several peer dependencies that **must be installed manually** (npm does not auto-install peerDependencies).

Install all required packages with:

```  
npm install next-auth bcrypt mongoose zod @conform-to/zod @conform-to/react resend @upstash/ratelimit @upstash/redis otplib qrcode
```

> 🔹 If you're using TypeScript, also install to get the bycrypt and :

```
npm install -D @types/bcrypt @types/qrcode

```

---

# 🧠 Zod Validation Note

If you are using **Zod v4**, the `required_error` field has been removed.

So instead of:

```
z.string({ required_error: "Please fill the Username field first" })
```

Use:

```
z.string({ error: "Please fill the Username field first" })
```

Or use `.min()` / `.email()` / `.max()` validation messages directly.

IdentityUser’s internal schemas follow Zod v4 syntax.

---

# 📁 Folder Structure (Generated After Init)

A full authentication starter pack will be added to:

```
src/identityUser/
```

Including:
app folder
```
📦src
 ┣ 📂app
 ┃ ┗ 📂api
 ┃ ┃ ┣ 📂auth
 ┃ ┃ ┃ ┗ 📂[...nextauth]
 ┃ ┃ ┃ ┃ ┗ 📜route.ts
 ┃ ┃ ┗ 📂session
 ┃ ┃ ┃ ┗ 📂update
 ┃ ┃ ┃ ┃ ┗ 📜route.ts
```
identityUser folder
```
📦src
 ┗ 📂identityUser
 ┃ ┣ 📂api
 ┃ ┃ ┗ 📂auth
 ┃ ┃ ┃ ┗ 📂[...nextauth]
 ┃ ┃ ┃ ┃ ┣ 📜authHelpers.ts
 ┃ ┃ ┃ ┃ ┗ 📜options.ts
 ┃ ┣ 📂components
 ┃ ┃ ┗ 📂sessionWatcher
 ┃ ┃ ┃ ┗ 📜SessionWatcher.tsx
 ┃ ┣ 📂helper
 ┃ ┃ ┣ 📜claimsAction.ts
 ┃ ┃ ┣ 📜roleAction.ts
 ┃ ┃ ┣ 📜sharedFunction.ts
 ┃ ┃ ┣ 📜signInAction.ts
 ┃ ┃ ┣ 📜signUpformAction.ts
 ┃ ┃ ┗ 📜userAction.ts
 ┃ ┣ 📂lib
 ┃ ┃ ┣ 📂models
 ┃ ┃ ┃ ┣ 📜identityUser_claims.ts
 ┃ ┃ ┃ ┣ 📜identityUser_passwordHistory.ts
 ┃ ┃ ┃ ┣ 📜identityUser_roleClaims.ts
 ┃ ┃ ┃ ┣ 📜identityUser_roles.ts
 ┃ ┃ ┃ ┣ 📜identityUser_Tokens.ts
 ┃ ┃ ┃ ┣ 📜identityUser_userClaims.ts
 ┃ ┃ ┃ ┣ 📜identityUser_userRoles.ts
 ┃ ┃ ┃ ┗ 📜identityUser_users.ts
 ┃ ┃ ┣ 📂utils
 ┃ ┃ ┃ ┗ 📜rateLimit.ts
 ┃ ┃ ┣ 📜authGuard.ts
 ┃ ┃ ┣ 📜db.ts
 ┃ ┃ ┗ 📜session.ts
 ┃ ┣ 📂providers
 ┃ ┃ ┗ 📜SessionProvider.tsx
 ┃ ┣ 📂Type
 ┃ ┃ ┗ 📜next-auth.d.ts
 ┃ ┗ 📂validation
 ┃ ┃ ┣ 📜addUserValidation.ts
 ┃ ┃ ┣ 📜changeEmailValidation.ts
 ┃ ┃ ┣ 📜changeNameValidation.ts
 ┃ ┃ ┣ 📜changePassword.ts
 ┃ ┃ ┣ 📜ChangePasswordUserValidation.ts
 ┃ ┃ ┣ 📜changePhoneNumebrValidation.ts
 ┃ ┃ ┣ 📜changeUserNameValidation.ts
 ┃ ┃ ┣ 📜claimsValidation.ts
 ┃ ┃ ┣ 📜deleteValidation.ts
 ┃ ┃ ┣ 📜emailVerifyValidation.ts
 ┃ ┃ ┣ 📜fallbackValidation.ts
 ┃ ┃ ┣ 📜forgetPasswordValidation.ts
 ┃ ┃ ┣ 📜otpValidation.ts
 ┃ ┃ ┣ 📜phoneVerifyValidation.ts
 ┃ ┃ ┣ 📜resetPasswordValidation.ts
 ┃ ┃ ┣ 📜signInOTPValidation.ts
 ┃ ┃ ┣ 📜signInValidation.ts
 ┃ ┃ ┣ 📜signUpValidation.ts
 ┃ ┃ ┣ 📜twoStepEnableValidation.ts
 ┃ ┃ ┣ 📜updateClaimsValidation.ts
 ┃ ┃ ┣ 📜userRoleUpdateValidation.ts
 ┃ ┃ ┣ 📜userRoleValidation.ts
 ┃ ┃ ┣ 📜usersAddValidation.ts
 ┃ ┃ ┣ 📜usersEditValidation.ts
 ┃ ┃ ┣ 📜verify2FAValidation.ts
 ┃ ┃ ┗ 📜verify2StepValidation.ts
```

---

# 🛠 Example Usage

### ✔ Get Roles

```ts
export async function getRolesForAddUserAction() {

    try {
        await dbConnect();

        const roles = await IdentityUser_Roles.find({}, `name`)
            .lean<{ _id: mongoose.Types.ObjectId; name: string }[]>()
            .exec();


        return {
            status: "success",
            payload: roles.map((role) => ({
                id: role._id.toString(),
                name: role.name,
            })),
        } as const;
    } catch (error) {
        console.error('Error fetching roles:', error);
        return {
            status: 'error',
            payload: [],
        } as const;
    }
}
```

### ✔ Hashing a password

```ts
export const hashPassword = async (password: string) => {
    const salt = await bcrypt.genSalt(10);
    const hash = await bcrypt.hash(password, salt);
    return hash;
}
```


### ✔ Add New Claim
```ts
export async function addClaimAction(prevState: unknown, formData: FormData) {
    if (!(await hasClaim("add-Claims"))) {
        return {
            status: 'error',
            payload: {
                message: 'no access for this action',
            },
        } as const;
    }


    const subMission = parseWithZod(formData, {
        schema: claimsSchema(),
    });

    if (subMission.status !== "success") {
        return subMission.reply();
    }


    try {
        // connect to database
        await dbConnect();
        // Create new claim and save to database
        const { claimType, claimValue, description } = subMission.value;
        await IdentityUser_Claims.create({
            claimType,
            claimValue,
            description
        });

        // Revalidate the page
        revalidatePath('/cmsClaims');

        return {
            status: 'success',
            payload: {
                message: '',
            },
        } as const;
    } catch (error) {
        console.error('Error saving contact form:', error);
        return {
            status: 'error',
            payload: {
                message: '',
            },
        } as const;
    }
}
```

---

# 🔧 Compatibility

IdentityUser supports:

* **Next.js 15+**
* **Node 18+**
* **React 18+**
* **TypeScript or JavaScript**

Tested with Next.js **15** and **16**.

---

# 📌 Upgrade Note (Next.js 15 → 16)

If you want to upgrade an older Next 15 project, run:

```
npm install next@latest react@latest react-dom@latest
```

Then update your `tsconfig.json` or `next.config.js` if needed.
I can guide you step-by-step — just ask when ready.

---

# 🤝 Contributing

Contributions, issues, and feature requests are welcome.

---

# 👤 Author

**Sadegh Shojayefard**

* GitHub: [https://github.com/SadeghShojayefard](https://github.com/SadeghShojayefard)
* Website: [https://sadegh-shojayee-fard.vercel.app/](https://sadegh-shojayee-fard.vercel.app/)
* Telegram: [https://t.me/link_lover1](https://t.me/link_lover1)
* Email: [sadeghshojayefard@gmail.com](mailto:sadeghshojayefard@gmail.com)

---

# 📜 Changelog

## 0.4.0 – Advanced Authentication, Sessions & Password Policies

**Release Date:** 2025-12-13

This release significantly enhances authentication security, session handling, and password management.  
IdentityUser is now suitable for complex real-world authentication scenarios.

---

## 🔐 New Authentication Features

- Remember trusted devices during Two-Factor Authentication
- Fallback login to safely disable 2FA when access is lost
- OTP-based login using email or phone number
- Support for four authentication credentials:
  - Password
  - TOTP 2FA
  - Recovery Codes
  - OTP Code

---

## 🛡 Security Improvements

- Advanced login throttling
- Improved credential isolation and verification flow
- Hardened authentication pipelines

---

## 🧾 Session Management

- Persistent sessions with configurable expiration
- Automatic logout after 1 hour without "Remember Me"
- Extended sessions up to 7 days with "Remember Me"
- Optimized JWT & session update behavior

---

## 🔑 Password Policies

- Enforced password complexity rules
- Password history to prevent reuse
- Password expiration with mandatory reset flow

---

## ❗ Breaking Behavior Changes

- Authentication flow is now policy-driven after login
- Expired passwords block access until changed
- Session behavior differs based on "Remember Me" selection
---
---

## 0.3.0 – Full Verification System, Forgot Password, and TOTP 2FA

**Release Date:** 2025-12-05

This release introduces the most advanced security features added to IdentityUser so far.  
A complete verification system is now available, including password recovery, email/phone verification, and full TOTP-based two-factor authentication.

---

## 🔐 New Authentication & Security Features

| Feature             | Description                                   |
|--------------------|-----------------------------------------------|
| Forgot Password     | Reset password via email or phone OTP         |
| Email Verification  | Verify user email with a sending token to email         |
| Phone Verification  | Verify phone number with OTP                  |
| OTP Login           | Two-step login with TOTP 2FA          |
| TOTP 2FA            | Authenticator app support (Google Authenticator, Authy, etc.) |
| Recovery Codes      | Backup codes for emergency login             |

---

## 🆕 New Actions Added

### 🔑 Password Recovery
- `forgotPasswordRequestAction`  
- `createEmailPasswordResetTokenAction`  
- `sendPasswordResetEmail`  
- `resetForgetPasswordAction`  
- `createPhonePasswordResetTokenAction`  
- `verifyOtpAction`  

### 📧 Email Verification
- `createEmailVerificationToken`  
- `sendVerifyTokenForEmail`  
- `verifyEmailToken`  

### 📱 Phone Verification
- `creatPhoneVerificationOTP`  
- `verifyPhoneAction`  


### 🛡 TOTP Two-Factor Authentication
- `generate2FASecretAction`  
- `generateQRCodeAction`  
- `verify2FAAction`  
- `verifyLogin2FAAction`  
- `verifyRecoveryCodeAction`  
---

## 🧩 Internal Improvements

- Added new fields to the User model:  
  - `twoFactorSecret`  
  - `recoveryCodes`  
-Add new table for save and manage token:
 -  `identityUser_Tokens`

---

## ❗ Breaking Changes

None.  
Version 0.3.0 introduces multiple new features but does not break backwards compatibility with version 0.2.0.

---
0.2.0 – Major Action Updates, Bug Fixes

Release date: 2025-11-26

## 📂 Installer Improvements (New)

The installer is now fully smart and collision-safe:

✔ If the identityuser folder already exists, a new version is automatically created:
identityuser, identityuser-2, identityuser-3, ...

✔ All internal imports are automatically rewritten:
from @/identityuser/...
to @/identityuser-2/... (or the correct version)

✔ The NextAuth route file is always rewritten with the correct import path.

Result: multiple installations without conflicts, no broken imports, and no accidental file overwrites.

---

This update improves naming consistency, fixes several bugs, adds new helper methods, and introduces multiple new user-related actions.

## 🔄 Action Renames (Breaking Changes)

For better readability and consistency:

	
| Old Name  | New Name |
| ------------- | ------------- |
| changePasswordAction  |	resetPasswordAction|
| changePasswordProfileAction   |  changePasswordAction  |
| checkEmailExistAction   | 	checkUserExistByEmailAction   |

## 🆕 New User Existence Check Actions

These actions help verify whether a user exists based on ID, email, or phone number:

* checkUserExistByIdAction
* checkUserExistByPhoneNumberAction
* checkUserExistByEmailAction (renamed)

Shared logic has been moved into a reusable helper:
* checkUserExistResult

Note: Phone-number checks should only be used when your project requires phone numbers to be unique.

## 🛠 Improved Get User Actions

Bug fixes & improved filtering logic:
* getUserByIdAction (bug fixed)
* getUserByUsernameAction (bug fixed)

Newly added:
* getUserByPhoneNumberAction
* getUserByEmailAction

Shared helper added:
* getUserDataSharedFunction

Note: Phone-number lookup should only be enabled when the phone number must remain unique.

## 🧩 User Update Enhancements

* Fixed several bugs in UserUpdateAction
* Added duplicate-phone-number validation
* Improved consistency and error-handling

## ✏️ New Profile Update Actions

Two new actions were added for updating user fields:
* changeUserNameAction
* changeEmailAction

## 🔐 New Security & Admin Actions

Manually lock or unlock a user: 
* LockUnlockUserAction

Manually reset the security stamp: 
* resetSecurityStampAction

## 🔢 Versioning Notes

The version was updated from:

0.1.8 → 0.2.0


Because:

* Multiple breaking changes
* Several new actions
* Internal refactoring and bug fixes
* No major architectural overhaul (so no 1.0.0 yet)

---
## 🔐 Security

This package follows responsible security practices.

Minimum supported versions:
- React >= 19.2.1
- Next.js >= 15.5.7

If older versions are detected during installation, a warning will be shown.
This does not block installation but upgrading is strongly recommended.
---

# 📄 License

MIT License — free for personal and commercial use.

---

# ⭐ Support

If you like this package, don't forget to **star the GitHub repo**.



















