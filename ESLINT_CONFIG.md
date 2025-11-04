# ESLint Configuration

## Configuration File

The project uses ESLint 9 with the new **flat config format** (`eslint.config.mjs`).

## Code Style Rules

### Indentation
- **4 spaces** (not tabs)
- Switch cases are indented 1 level

### Quotes
- **Single quotes** for strings
- Double quotes allowed when escaping would be needed

### Semicolons
- **No semicolons** (semi: never)

### Spacing
- **Object curly spacing**: Required (e.g., `{ foo: 'bar' }`)
- **Array bracket spacing**: Not allowed (e.g., `[1, 2, 3]`)

### Other Rules
- **Comma dangle**: Never use trailing commas
- **Multiple empty lines**: Maximum 1 blank line
- **End of file**: Must end with newline

## Scripts

```bash
# Check for linting errors
bun run lint

# Auto-fix linting errors
bun run lint:fix
```

## Files Ignored

- `.next/**` - Build output
- `node_modules/**` - Dependencies
- `out/**` - Export output
- `build/**` - Build directory
- `*.config.js` - Config files
- `*.config.mjs` - Config files

## Example Formatted Code

### Before
```typescript
import { useState } from "react";

const Component = () => {
  const [state, setState] = useState("");
  
  
  return <div>Hello</div>;
};
```

### After
```typescript
import { useState } from 'react'

const Component = () => {
    const [state, setState] = useState('')

    return <div>Hello</div>
}
```

## Integration with Next.js

The configuration extends `next/core-web-vitals` which includes:
- React best practices
- React Hooks rules
- Next.js specific rules
- Accessibility rules

## Dependencies

- `eslint@^9.39.1` - Core ESLint
- `eslint-config-next@^15.5.6` - Next.js config
- `@eslint/eslintrc@^3.3.1` - Compatibility layer for flat config

## Migration from Old Config

The project was migrated from:
- `.eslintrc.json` → `eslint.config.mjs`
- ESLint 8 → ESLint 9
- Old RC format → Flat config format

## Applied to All Files

All TypeScript and TSX files in the following directories have been formatted:
- ✅ `app/**/*.{ts,tsx}`
- ✅ `src/**/*.{ts,tsx}`

## Prettier Removed

This project **does not use Prettier**. All formatting is handled by ESLint rules.

---

**Note:** Run `bun run lint:fix` after making code changes to ensure consistent formatting.

