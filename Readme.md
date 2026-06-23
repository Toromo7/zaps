# Zaps: Social Payments on Stellar ⚡

Zaps is a high-speed, interactive social payments platform built on the Stellar blockchain with Soroban smart contracts. It transforms standard financial transactions into peer-to-peer social interactions—allowing users to pay friends, add comments, toggle likes, and share payments publicly or privately, similar to Venmo and Cash App.

---

## 🚀 Key Features

1. **Social Payments Feed**: Share peer-to-peer payments (e.g. *"Ebube paid ₦5,000 to Tolu for Lunch"*) with interactive liking and commenting.
2. **Fiat Settlement via Stellar Anchors**: Seamlessly deposit and withdraw fiat currencies (including Naira ₦) with automated conversion and settlement handled directly through regulated Stellar Anchors (SEP-24 / SEP-38).
3. **Cross-Chain Bridge Funding**: Fund your Stellar wallet from other major blockchains (Ethereum, Solana, BNB Chain, Polygon) using our Allbridge Core integration.
4. **Soroban Smart Contracts**: High-speed, secure, and gas-efficient execution of payments and social graphs on-chain.

---

## 📁 Repository Architecture

- **`mobileapp/`**: React Native (Expo) app for social payment interactions, profile management, and Allbridge cross-chain funding.
- **`backend/`**: Axum Rust server. Manages off-chain social logs (likes, comments, friends lists) and indices Stellar ledger events.
- **`contracts/`**: Soroban smart contracts workspace handling user registries, social payments, and graph relationships.
- **`dashboard/`**: Next.js web application for monitoring social statistics, Naira transaction volume, and bridging queues.

---

## 🛠️ Getting Started

### 📱 Mobile App (Expo)
```bash
cd mobileapp
npm install
npm start
```

### 🦀 Backend API (Rust)
```bash
cd backend
cargo run
```

### ⛓️ Smart Contracts (Soroban)
```bash
cd contracts
cargo build --target wasm32-unknown-unknown --release
cargo test
```

---

## 🤝 Contributing & Issue Catalog (60 Open Issues)

We have pre-created **60 detailed developer issues** in `/issues` and published them to GitHub to enable open-source contributors to help build out the functions:

### 1. Smart Contracts (`/issues/smart-contracts/`)
- `[SC-001]` to `[SC-003]`: Address-to-Username registries and profile modifications.
- `[SC-004]` to `[SC-008]`: Social payment structures, Naira transfer executions, and on-chain event emitters.
- `[SC-009]` to `[SC-013]`: Access controls, Anchor stablecoin interfaces (₦), and fee distributions.
- `[SC-014]` to `[SC-015]`: Contract upgrades and testing environments.

### 2. Backend API (`/issues/backend/`)
- `[BE-001]` to `[BE-002]`: PostgreSQL schemas and SQLx migration integrations.
- `[BE-003]` to `[BE-005]`: Wallet signature authorizations and user searches.
- `[BE-006]` to `[BE-008]`: Paginated public, friend-only, and private social feeds.
- `[BE-009]` to `[BE-012]`: Likes, comments, and friends list database storage.
- `[BE-013]` to `[BE-015]`: Background Soroban event indexer pollers.
- `[BE-016]` to `[BE-020]`: Allbridge proxy endpoints and rate-limiters.

### 3. Mobile Frontend (`/issues/mobile-app/`)
- `[FE-001]` to `[FE-005]`: Social Feed lists, toggles, liking transitions, and comments drawer.
- `[FE-006]` to `[FE-009]`: Contact payment selectors, note inputs, visibility panels, and custom numeric keypads.
- `[FE-010]` to `[FE-012]`: Stellar transaction signing and Allbridge deposit stepper panels.
- `[FE-013]` to `[FE-015]`: Onboarding edits, caching mechanisms, and haptic feedback triggers.

### 4. Web Dashboard (`/issues/dashboard/`)
- `[DB-001]` to `[DB-005]`: Administration transaction logs, metrics charts, and anchor fee adjustments.

### 5. DevOps & Infrastructure (`/issues/devops/`)
- `[DO-001]` to `[DO-005]`: Docker configurations, compilation pipelines, deployment templates, and OpenAPI endpoints documentation.