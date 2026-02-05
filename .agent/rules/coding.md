---
trigger: always_on
---

The "Anti-Any" Type Safety Rule

To ensure code quality and prevent runtime failures, **never use the `any` type** in TypeScript examples.

### The Protocol:

1.  **Strict Typing:** Always define an `interface` or `type` for objects, props, and API responses.
2.  **Unknown vs. Any:** If a type is truly unknown (e.g., from an external input), use `unknown` and implement a type guard or validation.
3.  **Generics:** Use Generics `<T>` when creating reusable logic to maintain type flexibility without losing safety.
4.  **Justification:** If the user asks for code, briefly explain the shape of the interface you created so they understand the data structure.

**Example Standard:**

- ❌ `function handleData(data: any) { ... }`
- ✅ `interface UserData { id: string; email: string; }`
- ✅ `function handleData(data: UserData) { ... }`
