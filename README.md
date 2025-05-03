# Micro Frontend Host with Webpack and React

This project demonstrates how a Micro Frontend (MFE) **Host** application integrates remote micro frontends using **Webpack Module Federation** with **React**. The Host serves as the shell that loads and composes multiple independently deployed React apps (remotes) at runtime.

## 🧠 Concept Overview

**Micro Frontends** extend the microservices idea to the frontend, allowing teams to independently build, deploy, and scale parts of the UI.

**Webpack Module Federation** enables JavaScript applications to share code and load modules from each other dynamically during runtime.

This **Host** app:
- Declares itself as a consumer of remote components.
- Loads remote apps dynamically via `ModuleFederationPlugin`.
- Integrates remote components seamlessly into the main UI.

---

## 📁 Project Structure

```bash
host-app/
├── public/
│   └── index.html
├── src/
│   ├── App.jsx
│   ├── bootstrap.js
│   └── index.js
├── webpack.config.js
└── package.json
```

🔧 Webpack Configuration
The ModuleFederationPlugin in webpack.config.js is the key to enabling MFE.

```
new ModuleFederationPlugin({
  name: 'host',
  remotes: {
    remoteApp: 'remoteApp@http://localhost:3001/remoteEntry.js',
  },
  shared: {
    react: { singleton: true, requiredVersion: '^18.0.0' },
    'react-dom': { singleton: true, requiredVersion: '^18.0.0' },
  },
});

```