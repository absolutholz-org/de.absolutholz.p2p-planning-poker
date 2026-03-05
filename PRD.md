# Project Requirements Document (PRD): Peer-to-Peer Scrum Estimator

## 1. Project Overview

The objective is to build a lightweight, serverless web application for agile development teams to estimate Scrum tickets. The application will use a peer-to-peer architecture to support up to 12 simultaneous users in a single session. Because the app relies entirely on direct client-to-client communication, no backend database or server infrastructure is required, and no data is persisted after the session ends.

## 2. Technical Stack

The team will adhere to the following tools to maintain a small, consistent footprint:

- **Package Manager:** `pnpm`
- **Frontend Framework:** React (Vite recommended)
- **Styling:** CSS-in-JS using Emotion (`@emotion/react` and `@emotion/styled`)
- **Networking:** WebRTC via the `peerjs` library (using their free public signaling server to broker initial connections).
- **Routing:** Client-side SPA semantic routing via `react-router-dom`.
- **Localization:** Multi-language support (EN, DE, FR, PT) via `react-i18next`.

## 3. Architecture: The Host/Guest Model

Because there is no central server, the application relies on a "Host" and "Guest" topology.

- **The Host:** The first user to initialize a session becomes the Host. Their browser holds the single source of truth for the room's state. The Host is automatically routed to a permanent session URL (`/room/:roomId`).
- **The Guests:** Up to 11 additional team members join the session by navigating to the Host's deep-linked URL. They establish a direct WebRTC data connection to the Host upon entry.
- **Data Flow:** Guests send their actions (e.g., casting a vote) to the Host. The Host updates the master state and instantly broadcasts the updated state back to all connected Guests.

## 4. User Stories

- **Creating a Room (Host):** As a Scrum Master/Team Lead, I want to enter my name and click "Create Session" so that I can generate a Room Code to share with my team.
- **Joining a Room (Guest):** As a team member, I want to enter my name and the provided Room Code so I can connect to the estimation session.
- **Voting:** As a user, I want to click a card to cast my estimation vote secretly.
- **Observation:** As a user, I want to see a visual roster of everyone in the room indicating who has and hasn't voted yet.
- **Revealing:** As any user, I want to click a "Reveal" button so that all hidden votes are broadcasted and shown to everyone simultaneously.
- **Resetting:** As any user, I want to click a "Reset" button to clear the board and prepare for the next ticket.

## 5. Core Data & Event Dictionary

The application relies on passing strict message payloads over PeerJS data channels.

**Voting Scale:** Standard Fibonacci `[0, 1, 2, 3, 5, 8, 13, 21, "Coffee", "?"]`

| Action/Event    | Sender → Receiver | Description                                                                             |
| --------------- | ----------------- | --------------------------------------------------------------------------------------- |
| `JOIN_ROOM`     | Guest → Host      | Guest provides their name and unique Peer ID. Host adds them to the master user list.   |
| `SUBMIT_VOTE`   | Guest → Host      | Guest sends their selected vote value. Host updates that user's record in the state.    |
| `TOGGLE_REVEAL` | Any Client → Host | Triggers the Host to change the session's reveal state to `true`.                       |
| `RESET_SESSION` | Any Client → Host | Triggers the Host to clear all current votes and hide the board.                        |
| `SYNC_STATE`    | Host → All Guests | The Host pushes the complete, updated room object to everyone whenever a change occurs. |

## 6. UI/UX Requirements

The interface should be clean and split into two primary views.

- **Lobby View:** A simple entry form containing inputs for "Name" and "Room Code" (conditionally hidden if accessed via a deep link). Leaving the Room Code blank and proceeding creates a new room as a Host.
- **Estimation View:**
- **Header:** Clearly displays a dynamic "Share" menu (with native OS sharing and clipboard deep-link copying) alongside the "Reveal" and "Reset" controls.
- **Voting Deck:** A grid of cards representing the voting scale. Emotion should be used to style active/selected states when a user clicks their choice.
- **Team Roster:** A visual list of up to 12 participants.
- _If votes are hidden:_ Show a neutral icon for pending votes and a checkmark for completed votes.
- _If votes are revealed:_ Show the actual selected value next to each name.

## 7. Constraints & Edge Cases

- **Maximum Capacity:** The Host must reject any `JOIN_ROOM` requests that exceed the 12-person limit, sending an error message back to the attempting Guest.
- **Guest Disconnection:** If a Guest closes their tab or loses connection, the Host must detect the dropped peer connection, remove the user from the state, and broadcast the updated roster.
- **Host Disconnection:** If the Host drops offline, the session ceases to exist. Guests must be immediately routed back to the Lobby View with an alert stating the session has ended.
