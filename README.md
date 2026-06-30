# 📋 React Hook Form in Expo & React Native

A clean, high-performance reference implementation of **React Hook Form** inside an **Expo** React Native application. This repository showcases form management, custom reusable input controllers, and advanced schema validation.

---

## 🌿 Branches Overview

This repository is split into two branches to demonstrate different levels of form architecture:

### 1. `main` Branch


https://github.com/user-attachments/assets/18e4fa0a-e39a-450f-8e65-10d05c4df9da


* **Approach**: Simple inline forms.
* **Validation**: Implements validation inline inside `<Controller>` components using React Hook Form's local `rules` object.
* **Component Design**: Form inputs and validation logic are declared directly within [index.tsx](file:///c:/Users/lenovo/Desktop/Internship/ReactHookForm/react-hook-form/app/(tabs)/index.tsx).

### 2. `CustomInputComponent` Branch 

https://github.com/user-attachments/assets/751688a2-bed2-4cd4-b5b5-c1139efe0462



* **Approach**: Advanced modular architecture.
* **Validation**: Centralized schema validation using **Yup** and **Yup Resolver** (`@hookform/resolvers/yup`).
* **Component Design**: Extracted reusable inputs into [FormInputController.tsx](file:///c:/Users/lenovo/Desktop/Internship/ReactHookForm/react-hook-form/components/controllers/FormInputController.tsx) to promote DRY principles and maintain clean views.

---

## 🚀 Tech Stack
![React Native](https://img.shields.io/badge/react_native-%2320232a.svg?style=for-the-badge&logo=react&logoColor=%2361DAFB)
![Expo](https://img.shields.io/badge/expo-%23000000.svg?style=for-the-badge&logo=expo&logoColor=white)
![React Hook Form](https://img.shields.io/badge/React%20Hook%20Form-%23EC5990.svg?style=for-the-badge&logo=reacthookform&logoColor=white)
![Yup](https://img.shields.io/badge/yup-%23EC5990.svg?style=for-the-badge&logo=yup&logoColor=white)
![TypeScript](https://img.shields.io/badge/typescript-%23007ACC.svg?style=for-the-badge&logo=typescript&logoColor=white)

---

## 🛠️ Setup & Installation

### Step 1: Install Package Dependencies
Install the required packages in your project root:
```bash
npm install react-hook-form @hookform/resolvers yup
# OR
yarn add react-hook-form @hookform/resolvers yup
```

### Step 2: Native iOS Configuration (Crucial)
> [!IMPORTANT]
> Because React Native depends on native iOS modules for core utilities, whenever you add libraries or packages to projects that contain native folders, you must update your CocoaPods dependencies:
> ```bash
> cd ios && pod install && cd ..
> ```
> *Note: If you are using standard **Expo Go** managed workflow without a local `ios/` folder, Expo handles native dependencies automatically under the hood.*

---

## 🔑 CustomInputComponent Architecture

On the `CustomInputComponent` branch, we split form validation and input views into modular files.

### 1. Reusable Form Controller: `FormInputController`
Inputs are wrapped inside a generic reusable controller component ([FormInputController.tsx](file:///c:/Users/lenovo/Desktop/Internship/ReactHookForm/react-hook-form/components/controllers/FormInputController.tsx)). It handles state binding, styling, and error display dynamically.

```tsx
import React, { FC } from 'react'
import { Control, Controller, FieldErrors } from 'react-hook-form'
import { StyleSheet, Text, TextInput, TextInputProps } from 'react-native'

interface FormInputControllerProps {
    control: Control<any>
    errors?: FieldErrors<any>
    name: string
    placeholder: string
    props?: TextInputProps
}

const FormInputController: FC<FormInputControllerProps> = ({
    control,
    errors,
    name,
    placeholder,
    props
}) => {
    const error = errors?.[name]

    return (
        <>
            <Controller
                name={name}
                control={control}
                render={({ field: { onChange, onBlur, value } }) => (
                    <TextInput
                        placeholder={placeholder}
                        style={styles.input}
                        onBlur={onBlur}
                        onChangeText={onChange}
                        value={value}
                        {...props}
                    />
                )}
            />
            {error && (
                <Text style={styles.textError}>
                    {error.message as string}
                </Text>
            )}
        </>
    )
}
```

### 2. Validation Schema: `authSchema.ts`
Validation rules are centralized and declared in a declarative Yup schema inside [authSchema.ts](file:///c:/Users/lenovo/Desktop/Internship/ReactHookForm/react-hook-form/constants/schemas/authSchema.ts):

```typescript
import * as yup from "yup"

export const formSchema = yup.object({
    username: yup.string()
        .required("Username is required")
        .min(3, "Username must be at least 3 characters")
        .max(12, "Username must be at most 12 characters"),
    email: yup.string()
        .email("Email is invalid")
        .required("Email is required"),
    password: yup.string()
        .required("Password is required")
        .min(3, "Password must be at least 3 characters")
        .max(12, "Password must be at most 12 characters"),
})
```

### 3. Binding Everything: `index.tsx`
We connect the `formSchema` to React Hook Form using `yupResolver` inside [index.tsx](file:///c:/Users/lenovo/Desktop/Internship/ReactHookForm/react-hook-form/app/(tabs)/index.tsx):

```tsx
import FormInputController from '@/components/controllers/FormInputController'
import { formSchema } from '@/constants/schemas/authSchema'
import { yupResolver } from '@hookform/resolvers/yup'
import React from 'react'
import { useForm } from 'react-hook-form'
import { Alert, StyleSheet, Text, TouchableOpacity, View } from 'react-native'

const Index = () => {
  const {
    control,
    handleSubmit,
    formState: { errors }
  } = useForm({
    resolver: yupResolver(formSchema)
  })

  const submit = (data: any) => {
    Alert.alert("Form Submitted", JSON.stringify(data))
  }

  return (
    <View style={styles.container}>
      <Text>React Hook Form Example</Text>

      <FormInputController
        control={control}
        name="username"
        placeholder="Username"
        errors={errors}
      />

      <FormInputController
        control={control}
        name="email"
        placeholder="Enter Your Email"
        errors={errors}
      />

      <FormInputController
        control={control}
        name="password"
        placeholder="Enter Your Password"
        props={{ secureTextEntry: true }}
        errors={errors}
      />

      <TouchableOpacity onPress={handleSubmit(submit)} style={styles.button}>
        <Text style={styles.buttonText}>Submit</Text>
      </TouchableOpacity>
    </View>
  )
}
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
   * Scan the QR code using the **Expo Go** application
