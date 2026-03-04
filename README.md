# P2P Planning Poker 🃏

A serverless, peer-to-peer Scrum planning poker app built with React, Emotion, and WebRTC.

This application provides a real-time agile estimation tool for small teams (up to 12 users) without the need for a backend server or database. By utilizing WebRTC via PeerJS, all session data is kept strictly in-memory and synced directly between clients.

## 🚀 Features

- **Zero Backend:** Completely serverless architecture using direct peer-to-peer data channels.
- **Host/Guest Model:** The first user creates a room and acts as the authoritative state host.
- **Real-Time Syncing:** Instantaneous vote casting, revealing, and resetting across all connected clients.
- **Ephemeral Sessions:** No database means zero data persistence once the Host closes the session.
- **Fibonacci Scale:** Standard agile voting scale `[1, 2, 3, 5, 8, 13, 21, "Coffee", "?"]`.

## 🛠️ Tech Stack

- **Package Manager:** `pnpm`
- **Frontend:** React (Bootstrapped with Vite)
- **Styling:** CSS-in-JS via Emotion (`@emotion/react`, `@emotion/styled`)
- **Networking:** WebRTC via `peerjs`

## 🏗️ Architecture

Because this app lacks a centralized server, it relies on a Host/Guest network topology:

1. **The Host:** Generates a session. Their browser holds the single source of truth for the room's React state. Their unique PeerJS ID serves as the "Room Code."
2. **The Guests:** Up to 11 additional team members join using the Host's Room Code, establishing a direct WebRTC connection to the Host's browser.
3. **Data Flow:** Guests send discrete actions (`JOIN_ROOM`, `SUBMIT_VOTE`) to the Host. The Host updates the master state and broadcasts the complete, updated state back to all Guests.

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
