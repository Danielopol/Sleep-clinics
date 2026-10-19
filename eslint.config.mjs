import { defineConfig, globalIgnores } from "eslint/config";
import nextVitals from "eslint-config-next/core-web-vitals";
import nextTs from "eslint-config-next/typescript";

export default defineConfig([
  ...nextVitals,
  ...nextTs,
  {
    // Findings that existed before lint was wired up. Kept visible as warnings
    // so `npm run lint` still fails on new errors; fix them and promote back.
    rules: {
      "react/no-unescaped-entities": "warn",
      "@typescript-eslint/no-explicit-any": "warn",
      "react-hooks/set-state-in-effect": "warn",
      "react-hooks/purity": "warn",
    },
  },
  globalIgnores([
    ".next/**",
    "out/**",
    "build/**",
    "node_modules/**",
    "next-env.d.ts",
    "data/**",
    "public/**",
    "scripts/**",
    ".claude/**",
    ".playwright-mcp/**",
    ".wrangler/**",
    "supabase/**",
    "docs/**",
    "extract-clinics.js",
    "__pycache__/**",
  ]),
]);
