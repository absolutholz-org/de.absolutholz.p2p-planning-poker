# P2P Planning Poker 🃏

A serverless, peer-to-peer Scrum planning poker app built with React, Emotion, and WebRTC.

This application provides a real-time agile estimation tool for small teams (up to 12 users) without the need for a backend server or database. By utilizing WebRTC via PeerJS, all session data is kept strictly in-memory and synced directly between clients.

## 🚀 Features

- **Zero Backend:** Completely serverless architecture using direct peer-to-peer data channels.
- **Host/Guest Model:** The first user creates a room and acts as the authoritative state host.
- **Real-Time Syncing:** Instantaneous vote casting, revealing, and resetting across all connected clients.
- **Ephemeral Sessions:** No database means zero data persistence once the Host closes the session.
- **Deep Linking:** Dynamic SPA routing ensures users can share semantic URLs (`/room/:roomId`) natively to instantly onboard teammates.
- **Global Localization:** Fully localized in English, German, French, and Portuguese contexts seamlessly.
- **Fibonacci Scale:** Standard agile voting scale `[0, 1, 2, 3, 5, 8, 13, 21, "☕️", "?"]`.
- **Governance Settings:** Host-controlled democratic reveal permissions and mandatory voting consensus rules.
- **Session Persistence**: Built-in `sessionStorage` backup ensures that both Hosts and Guests can refresh their browser without losing their identity or room state.
- **Relay Bridge**: Integrated Metered.ca TURN/STUN relay ensures connectivity even behind strict corporate firewalls and Symmetric NATs.

## 🛠️ Tech Stack

- **Package Manager:** `pnpm`
- **Frontend:** React (Bootstrapped with Vite)
- **Routing:** React Router DOM for SPA deep-linking
- **Styling:** CSS-in-JS via Emotion (`@emotion/react`, `@emotion/styled`)
- **Localization:** `react-i18next`
- **Networking:** WebRTC via `peerjs`

## 🏗️ Architecture

Because this app lacks a centralized server, it relies on a Host/Guest network topology:

1. **The Host:** Generates a session. Their browser holds the single source of truth for the room's React state. They are assigned a permanent room URL. Session state is backed up to `sessionStorage` to survive refreshes.
2. **The Guests:** Up to 11 additional team members join by opening the Host's semantic deep-link URL (`/room/:roomId`), establishing a direct WebRTC connection. Guests use persistent Peer IDs to maintain their identity across page reloads.
3. **Data Flow:** Guests send discrete actions (`JOIN_ROOM`, `SUBMIT_VOTE`) to the Host. The Host updates the master state and broadcasts the complete, updated state back to all Guests. If the Host briefly disappears, Guests will automatically attempt to reconnect.

## 🎨 Design System & Styling

This project follows a strict **Design Token** architecture. Developers MUST use the predefined CSS Custom Properties (`var(--sys-...)`) found in `src/theme/GlobalStyles.ts` for all styling.

### Guidelines

- **No Hardcoded Colors/Spacing:** Use `--sys-color-*` and `--sys-spacing-*` exclusively.
- **Relative Units:** Use `rem` for all layout spacing (margins, paddings, gaps) to ensure accessibility and browser scaling.
- **Pixel Exceptions:** Borders (`1px`) and corner radii (`--sys-radius-*`) remain in pixels to maintain visual crispness.
- **Native First:** Leverage native CSS features (Grid, Flexbox, Media Queries) over JavaScript-based layout calculations.

## 💻 Quick Start

### Prerequisites

Make sure you have [Node.js](https://nodejs.org/) installed along with `pnpm`.

### Installation

1. Clone the repository:
   ```bash
   git clone [https://github.com/your-username/p2p-planning-poker.git](https://github.com/your-username/p2p-planning-poker.git)
   cd p2p-planning-poker
   ```

````

2. Install the dependencies strictly using `pnpm`:
```bash
pnpm install

````

3. Start the development server:

```bash
pnpm dev

```

4. Open your browser to the local Vite URL (typically `http://localhost:5173`).

## 📜 License

This project is licensed under the MIT License - see the [LICENSE](https://www.google.com/search?q=LICENSE) file for details.
