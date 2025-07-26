
# 🎮 TV Games Platform

A modular and scalable **multiplayer game platform** built with **React + TypeScript**, designed for TVs (Receivers) and mobile phones (Controllers). The Receiver acts as the host of the game and players join by scanning a QR code. The system uses **Google Cast SDK** for TV integration and **Ably** for real-time communication.

---

## 📺 Overview

- The **TV (Receiver)** is the game host and renders the main game UI.
- Up to **6 mobile players (Controllers)** can join by scanning a QR code.
- The first player to connect becomes the **Leader** and selects a game.
- Controllers send inputs that affect the game state.
- The Receiver syncs all changes with Controllers using dynamic Ably channels.

---

## 🧱 Tech Stack

| Technology        | Description                                        |
|------------------|----------------------------------------------------|
| React + TypeScript | UI and application structure                     |
| Vite             | Fast dev server and build system                   |
| Ably             | Real-time communication between devices            |
| Google Cast SDK  | Enables Chromecast support for the Receiver        |
| Zustand          | Local state management (Receiver and Controller)   |
| QRCode.react     | QR code generation                                 |

---

## 📁 Project Structure

```

tv-games/
│
├── apps/
│   ├── receiver/             # Receiver app (TV interface)
│   └── controller/           # Controller app (mobile interface)
│
├── games/                    # Modular, self-contained games
│   └── tic-tac-toe/
│       ├── config.json
│       ├── scripts/          # init, handleInput, render, etc.
│       └── components/       # Optional custom UI
│
├── services/                 # Game logic and infrastructure
│   ├── AblyService.ts
│   ├── CastService.ts
│   ├── GameService.ts
│   └── PlayerService.ts
│
├── state/                    # Zustand stores
│   ├── ReceiverStore.ts
│   └── ControllerStore.ts
│
├── types/                    # Strongly-typed message definitions
│   ├── messages/
│   └── game/
│
├── shared/                   # Shared components and utilities
│
├── controller.html           # Entry point for controllers
├── receiver.html             # Entry point for receiver
├── vite.config.ts            # Multi-entry Vite config
└── vercel.json               # Vercel rewrites

````

---

## ✨ Features

- Auto-generated game code (e.g. `ABCD12`) on Receiver startup
- Dynamic QR linking to `/controller?code=XXXXXX`
- Real-time messaging with **strong typing** using TypeScript
- Dynamic **Ably** channels per session (`game-XXXXXX`)
- Game logic is fully **decoupled from React components**
- Pluggable architecture: each game lives in its own folder
- Support for reconnections and multiple simultaneous sessions
- Compatible with **Vercel** deployments (frontend-only)

---

## ⚙️ Debugging with Visual Studio

- Fully compatible with **Visual Studio** (not only VS Code)
- Breakpoints work directly in `.tsx` and `.ts` files
- Recommend using **Chrome or Edge** to attach debugger

Optional `.vscode/launch.json`:

```json
{
  "version": "0.2.0",
  "configurations": [
    {
      "name": "Debug Receiver",
      "type": "chrome",
      "request": "launch",
      "url": "http://localhost:5173/receiver.html",
      "webRoot": "${workspaceFolder}"
    },
    {
      "name": "Debug Controller",
      "type": "chrome",
      "request": "launch",
      "url": "http://localhost:5173/controller.html",
      "webRoot": "${workspaceFolder}"
    }
  ]
}
````

---

## 📐 Naming Conventions

Following **Microsoft-style naming conventions**:

| Element        | Convention           | Example                 |
| -------------- | -------------------- | ----------------------- |
| Classes        | PascalCase           | `PlayerService`         |
| Interfaces     | I + PascalCase       | `IPlayer`, `IGameState` |
| Enums          | PascalCase           | `InputType.Jump`        |
| Methods        | camelCase            | `handleInput()`         |
| Private Fields | `_camelCase`         | `_players`, `_state`    |
| Hooks          | use + PascalCase     | `usePlayerStore()`      |
| Message Types  | Discriminated Unions | `type: "join"`          |

---

## 🚀 Vercel Deployment

Include `vercel.json` with:

```json
{
  "rewrites": [
    { "source": "/receiver", "destination": "/receiver.html" },
    { "source": "/controller", "destination": "/controller.html" }
  ]
}
```

---

## 📬 License

This project is **not open source**.

All rights reserved © [Franco Rosatto](https://github.com/frosatto).
You are not allowed to copy, distribute, sublicense, or reuse any part of this code without explicit written permission.

For commercial or educational inquiries, please contact the author.
