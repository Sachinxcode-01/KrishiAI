# 🤝 Contributing to Krishi AI

Welcome! We are excited that you want to contribute to Krishi AI. To ensure a smooth collaboration, please follow these guidelines.

## 🛠️ Getting Started

1. **Fork the Repository**: Create your own copy of the project.
2. **Clone the Project**: `git clone https://github.com/Sachinxcode-01/KrishiAI.git`
3. **Set Up Environment**:
   - Follow the setup instructions in [README.md](README.md).
   - Copy `.env.example` to `.env` in both `frontend` and `backend` folders and fill in your keys.
   - **DO NOT** commit your `.env` files.

## 🌿 Git Workflow (The Feature Branch Model)

We use a standard branching strategy to keep the `main` branch stable.

- **`main`**: Production-ready code. Only merged from `dev`.
- **`dev`**: The integration branch. All features are merged here first.
- **`feature/feature-name`**: Where the actual work happens.

### Step-by-Step Feature Addition:
1. Pull the latest changes: `git checkout dev && git pull origin dev`
2. Create your branch: `git checkout -b feature/your-awesome-feature`
3. Make your changes and commit: `git commit -m "feat: add crop diagnosis history"`
4. Push to your branch: `git push origin feature/your-awesome-feature`
5. Open a **Pull Request (PR)** against the `dev` branch of the main repository.

## 📝 Code Standards

- **Consistency**: Follow the existing project structure (React for frontend, Node/FastAPI for backend).
- **Naming**: Use camelCase for variables/functions and PascalCase for React components.
- **Comments**: Document complex logic, especially in the AI agents and geospatial calculations.
- **Responsive Design**: Always test your UI changes on mobile viewports.

## 💬 Communication

- **Issues**: Use GitHub Issues to report bugs or suggest new features before starting work.
- **Pull Requests**: Describe *what* you changed and *why*. Include screenshots for UI changes.
- **Discussions**: Use the project dashboard or a dedicated chat (e.g., Discord/WhatsApp) for quick syncs.

## 🚀 Deployment

- Krishi AI uses **Vercel** for frontend/backend deployment.
- Ensure all environment variables are updated in the Vercel dashboard when adding new features that require secrets.

---
Thank you for helping us empower farmers with AI! 🌾
