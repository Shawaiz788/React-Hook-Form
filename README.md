# 📋 React Hook Form in Expo & React Native

A clean, high-performance reference implementation of **React Hook Form** inside an **Expo** React Native application. This project demonstrates how to build robust forms, handle inputs cleanly using the `<Controller>` wrapper, enforce validation rules, and display user-friendly validation errors.

---

## 🚀 Tech Stack & Badges
![React Native](https://img.shields.io/badge/react_native-%2320232a.svg?style=for-the-badge&logo=react&logoColor=%2361DAFB)
![Expo](https://img.shields.io/badge/expo-%23000000.svg?style=for-the-badge&logo=expo&logoColor=white)
![React Hook Form](https://img.shields.io/badge/React%20Hook%20Form-%23EC5990.svg?style=for-the-badge&logo=reacthookform&logoColor=white)
![TypeScript](https://img.shields.io/badge/typescript-%23007ACC.svg?style=for-the-badge&logo=typescript&logoColor=white)

---

## 📖 Table of Contents
1. [About the Project](#-about-the-project)
2. [Setup & Installation](#-setup--installation)
3. [Key Concepts & Implementation](#-key-concepts--implementation)
4. [Validations & Error Handling](#-validations--error-handling)
5. [Running the Application](#-running-the-application)

---

## ℹ️ About the Project

Forms are a critical part of most mobile applications, yet handling input state changes, validation, and visual error states in React Native can quickly lead to complex state trees and poor rendering performance. 

This project demonstrates the **best-practice approach** to managing forms in React Native using **React Hook Form**. By utilizing uncontrolled inputs registered via the `Controller` wrapper, we keep the UI fluid and re-renders minimized.

### Key Features
* ⚡ **Optimized Re-renders**: Component updates are isolated to individual fields instead of the whole page on every keystroke.
* 🛡️ **Rule-Based Validation**: Implements required fields, minimum/maximum lengths, and email format regex patterns.
* 🚨 **Dynamic Error States**: Instantly informs users when inputs do not meet validation constraints.
* 🎨 **Native UI Styling**: Custom input designs with feedback using standard React Native elements.

---

## 🛠️ Setup & Installation

### Step 1: Install Package Dependencies
Install `react-hook-form` in the project root:
```bash
npm install react-hook-form
# OR
yarn add react-hook-form
# OR
bun add react-hook-form
```

### Step 2: Native iOS Configuration (Crucial)
> [!IMPORTANT]
> Because React Native depends on native iOS modules for core utilities, whenever you add libraries or packages to projects that contain native folders (or use prebuild/bare flows), you must update your CocoaPods dependencies.
> 
> After installing `react-hook-form`, navigate to the `ios` directory and run `pod install`:
> ```bash
> cd ios && pod install && cd ..
> ```
> *Note: If you are using standard **Expo Go** managed workflow without a local `ios/` folder, Expo handles native dependencies automatically under the hood, but this step is mandatory if you eject or use custom dev clients.*

---

## 🔍 Key Concepts & Implementation

The core form logic resides inside [index.tsx](file:///c:/Users/lenovo/Desktop/Internship/ReactHookForm/react-hook-form/app/(tabs)/index.tsx).

We import `useForm` and `Controller` from `react-hook-form`:
```typescript
import { useForm, Controller } from 'react-hook-form';
```

### Form Initialization
We initialize our hook inside the component:
```typescript
const {
  control,
  handleSubmit,
  formState: { errors }
} = useForm();
```

* **`control`**: The object containing methods for registering components into React Hook Form. This is passed to individual `Controller` wrapper elements.
* **`handleSubmit`**: A function wrapper that resolves form validation before executing the custom submit handler.
* **`errors`**: An object containing current validation errors, keyed by field name.

---

## 🚨 Validations & Error Handling

React Native input elements like `<TextInput>` do not support standard web validation APIs, so the `<Controller>` acts as a middleman to wire input handlers (`onChangeText`, `onBlur`) back to React Hook Form.

### Username Field (Required, Length Limits)
```tsx
<Controller
  name="username"
  control={control}
  rules={{ required: true, minLength: 3, maxLength: 12 }}
  render={({ field: { onChange, onBlur, value } }) => (
    <TextInput
      placeholder="Enter your name"
      style={styles.input}
      onBlur={onBlur}
      onChangeText={onChange}
      value={value}
    />
  )}
/>

{errors.username && <Text style={styles.textError}>Name is required</Text>}
```

### Email Field (Required, Format Regex Verification)
```tsx
<Controller
  name="email"
  control={control}
  rules={{ required: true, pattern: /^\S+@\S+$/i }}
  render={({ field: { onChange, onBlur, value } }) => (
    <TextInput
      placeholder="Enter your email"
      style={styles.input}
      onBlur={onBlur}
      onChangeText={onChange}
      value={value}
    />
  )}
/>

{errors.email && <Text style={styles.textError}>Enter a valid Email</Text>}
```

---

## 🚀 Running the Application

1. Install project-level dependencies:
   ```bash
   npm install
   ```
2. Start the Expo Development Server:
   ```bash
   npx expo start
   ```
3. Run on your desired platform:
   * Press `i` to open in the **iOS Simulator**
   * Press `a` to open in the **Android Emulator**
   * Scan the QR code with your phone using **Expo Go** (iOS Camera app or Android Expo Go app)
