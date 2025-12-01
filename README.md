# ⚡ SolUPI - Seamless UPI to Solana On-Ramp

![Solana](https://img.shields.io/badge/Solana-Web3-black?style=for-the-badge&logo=solana)
![Next.js](https://img.shields.io/badge/Next.js-14-black?style=for-the-badge&logo=next.js)
![TypeScript](https://img.shields.io/badge/TypeScript-5-blue?style=for-the-badge&logo=typescript)
![Node.js](https://img.shields.io/badge/Node.js-Express-green?style=for-the-badge&logo=node.js)
![PostgreSQL](https://img.shields.io/badge/PostgreSQL-Neon-blue?style=for-the-badge&logo=postgresql)

> **Bridge the gap between Fiat and Crypto with the speed of Solana and the convenience of UPI.**

---

## 🌐 Live Demo

| Component | URL |
|-----------|-----|
| **Frontend** | [Insert Hosted Frontend URL] |
| **Backend** | [Insert Hosted Backend URL] |

---

## 📄 Project Proposal

### 🔴 The Problem
In the current crypto ecosystem, on-ramping (converting Fiat to Crypto) is often a **complex, slow, and expensive process**. Users are forced to navigate:
*   **P2P Exchanges:** High risk of scams and slow settlement times.
*   **Centralized Exchanges:** High fees, strict KYC requirements, and custodial risks.
*   **Lack of Direct Access:** No seamless way to use familiar local payment methods like **UPI (Unified Payments Interface)** in India to buy crypto directly.

### 🟢 The Solution: SolUPI
**SolUPI** is a decentralized application (dApp) that revolutionizes the on-ramp experience. It allows users to purchase **USDC** (and other SPL tokens) directly using UPI, leveraging the speed and low cost of the Solana blockchain.

#### Key Features
*   **🚀 Direct UPI Integration:** Pay using your favorite UPI apps (GPay, PhonePe, Paytm).
*   **⚡ Instant Settlement:** Automated verification via email receipts (RRN matching) ensures funds are released instantly.
*   **🛡️ Non-Custodial:** We never hold your funds. It's a direct bridge to your wallet.
*   **🔒 Secure & Transparent:** Built on Solana's secure infrastructure with transparent transaction tracking.

---

## 🛠️ Tech Stack

### Frontend
*   **Framework:** [Next.js 14](https://nextjs.org/) (App Router)
*   **Styling:** [Tailwind CSS](https://tailwindcss.com/)
*   **Animations:** [Framer Motion](https://www.framer.com/motion/)
*   **Icons:** [Lucide React](https://lucide.dev/)

### Backend
*   **Runtime:** [Node.js](https://nodejs.org/)
*   **Framework:** [Express.js](https://expressjs.com/)
*   **Database:** [PostgreSQL](https://www.postgresql.org/) (via [Neon](https://neon.tech/))
*   **ORM:** [Prisma](https://www.prisma.io/)
*   **Blockchain:** [Solana Web3.js](https://solana-labs.github.io/solana-web3.js/)
*   **Email Processing:** IMAP & Mailparser (for automated payment verification)

---

## 🚀 Getting Started

Follow these steps to set up the project locally.

### Prerequisites
*   Node.js (v18+)
*   npm or yarn
*   PostgreSQL Database URL

### Installation

1.  **Clone the Repository**
    ```bash
    git clone https://github.com/yourusername/solupi.git
    cd solupi
    ```

2.  **Install Dependencies**
    ```bash
    # Frontend
    cd frontend
    npm install

    # Backend
    cd ../backend
    npm install
    ```

3.  **Environment Setup**
    Create `.env` files in both `frontend` and `backend` directories.

    **Backend `.env`:**
    ```env
    DATABASE_URL="postgresql://..."
    PORT=3001
    EMAIL_USER="your-email@gmail.com"
    EMAIL_PASS="your-app-password"
    SOLANA_RPC_URL="https://api.devnet.solana.com"
    JWT_SECRET="your-secret-key"
    ```

4.  **Database Setup**
    ```bash
    cd backend
    npx prisma generate
    npx prisma db push
    ```

5.  **Run the Application**
    Open two terminal tabs:

    ```bash
    # Terminal 1: Backend
    cd backend
    npm run dev
    ```

    ```bash
    # Terminal 2: Frontend
    cd frontend
    npm run dev
    ```

---

## 📚 API Reference

### 👤 User Management

| Method | Endpoint | Description |
| :--- | :--- | :--- |
| `GET` | `/api/users/:id` | Fetch user profile details. |
| `PUT` | `/api/users/:id` | Update user profile (Name, Mobile, etc.). |
| `DELETE` | `/api/users/:id` | Delete user account and data. |

### 💸 Order Management

| Method | Endpoint | Description |
| :--- | :--- | :--- |
| `POST` | `/api/orders` | Create a new buy order. |
| `GET` | `/api/orders` | Fetch user orders (Supports pagination `?page=1&limit=5`). |
| `PUT` | `/api/orders/:id/utr` | Submit UTR (Transaction ID) for verification. |
| `DELETE` | `/api/orders/:id` | Cancel/Delete a pending order. |

---

## 🔮 Future Roadmap
*   [ ] **KYC Integration:** Automated identity verification.
*   [ ] **Multi-Chain Support:** Expand to Ethereum and Polygon.
*   [ ] **P2P Marketplace:** Allow users to sell crypto for Fiat.
*   [ ] **Mobile App:** Native iOS and Android applications.

---

## 📜 License
This project is licensed under the MIT License.
