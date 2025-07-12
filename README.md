# Cursory Frontend

Cursory is a personal web application designed to organize and structure technical knowledge into well-defined courses and learning roadmaps. This is the frontend React application that provides the user interface for managing and consuming technical content.

## 🎯 Purpose

The core purpose of Cursory is to serve as a personal knowledge repository for quick reference, while also laying the foundation for future mentorship or guided learning opportunities. It focuses on topics such as:

- Robotics
- MATLAB
- Embedded systems
- Programming
- Software development
- Artificial intelligence

## 🏗️ Tech Stack

- **Framework**: React 19 with TypeScript
- **Build Tool**: Vite
- **Styling**: Tailwind CSS
- **Routing**: React Router V7
- **State Management**: React Context + useReducer
- **HTTP Client**: Axios with interceptors
- **Authentication**: JWT with HTTP-only cookies
- **UI Components**: Create own components
- **Icons**: Lucide React
- **Forms**: React Hook Form with Zod validation

## 🚀 Getting Started

### Environment Setup

1. Copy the environment template file:
   ```bash
   cp env.template .env
   ```

2. Update the `.env` file with your configuration:
   ```bash
   # API Configuration
   VITE_API_BASE_URL=http://localhost:3000

   # Application Environment
   VITE_APP_ENV=development

   # Development Tools
   VITE_ENABLE_DEV_TOOLS=true
   ```

3. For production, use the production template:
   ```bash
   cp env.production.template .env.production
   ```

### Environment Variables

- `VITE_API_BASE_URL`: Base URL for the backend API
- `VITE_APP_ENV`: Application environment (development, production, staging)
- `VITE_ENABLE_DEV_TOOLS`: Enable/disable development tools and debugging features