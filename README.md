A unified, AI-powered social media management platform for managing multiple social media accounts, automating content creation, engaging with audiences, and analyzing performance across all major platforms.

## 🚀 Features

### Phase 1 - Core Infrastructure (Completed)
- ✅ Modern tech stack with Next.js 14+, TypeScript, and Tailwind CSS
- ✅ Beautiful modern classic UI design system
- ✅ Authentication with NextAuth.js (Email/Password, Google, GitHub)
- ✅ Express.js backend with TypeScript
- ✅ PostgreSQL database with Prisma ORM
- ✅ Redis caching and session management
- ✅ Docker containerization for easy deployment

### Upcoming Features
- Social account connections (Facebook, Instagram, Twitter, LinkedIn, TikTok, YouTube, Pinterest)
- Content creation and scheduling
- AI-powered caption generation
- AI image generation
- Analytics and insights
- Team collaboration tools
- And much more...

## 🏗️ Architecture

```
ai-social-command-center/
├── apps/
│   ├── web/          # Next.js frontend
│   └── api/          # Express.js backend
├── packages/
│   ├── ui/           # Shared UI components
│   ├── types/        # Shared TypeScript types
│   ├── config/       # Shared configs
│   └── utils/        # Shared utilities
└── docs/             # Documentation
```

## 🛠️ Tech Stack

### Frontend
- **Framework:** Next.js 14+ (App Router)
- **Language:** TypeScript
- **Styling:** Tailwind CSS
- **UI Components:** Shadcn/ui
- **State Management:** Zustand
- **Data Fetching:** TanStack Query
- **Forms:** React Hook Form + Zod
- **Auth:** NextAuth.js

### Backend
- **Runtime:** Node.js 20+
- **Framework:** Express.js
- **Language:** TypeScript
- **Database:** PostgreSQL 16+
- **ORM:** Prisma
- **Cache:** Redis 7+
- **Queue:** Bull

### DevOps
- **Containerization:** Docker
- **Orchestration:** Docker Compose
- **CI/CD:** GitHub Actions (planned)

## 🚦 Getting Started

### Prerequisites
- Node.js 20+ LTS
- pnpm 8+
- Docker and Docker Compose
- PostgreSQL 16+ (or use Docker)
- Redis 7+ (or use Docker)

### Installation

1. **Clone the repository**
```bash
git clone <repository-url>
cd ai-social-command-center
```

2. **Install dependencies**
```bash
pnpm install
```

3. **Set up environment variables**
```bash
# Copy the example env files
cp .env.example .env
cp apps/web/.env.local.example apps/web/.env.local
cp apps/api/.env.example apps/api/.env

# Edit the .env files with your configuration
```

4. **Start with Docker (Recommended)**
```bash
# Copy Docker environment file
cp .env.docker.example .env

# Start all services
docker-compose up -d

# View logs
docker-compose logs -f
```

5. **Or start manually**
```bash
# Start PostgreSQL and Redis (if not using Docker)

# Run database migrations
cd apps/api
pnpm prisma:migrate

# Generate Prisma Client
pnpm prisma:generate

# Start backend (in apps/api)
pnpm dev

# Start frontend (in apps/web)
cd ../web
pnpm dev
```

### Accessing the Application
- **Frontend:** http://localhost:3000
- **Backend API:** http://localhost:3001
- **API Health Check:** http://localhost:3001/health

## 📁 Project Structure

```
apps/web/src/
├── app/              # Next.js app router pages
│   ├── (auth)/       # Authentication pages
│   ├── (dashboard)/  # Dashboard pages (planned)
│   └── api/          # API routes
├── components/       # React components
│   ├── ui/           # Base UI components
│   ├── features/     # Feature-specific components
│   └── layout/       # Layout components
├── lib/              # Utilities and configurations
├── hooks/            # Custom React hooks
├── stores/           # Zustand stores
├── types/            # TypeScript types
└── styles/           # Global styles

apps/api/src/
├── config/           # Configuration files
├── controllers/      # Route controllers
├── services/         # Business logic
├── routes/           # API routes
├── middleware/       # Express middleware
├── lib/              # Libraries (Prisma, Redis)
├── types/            # TypeScript types
└── utils/            # Utility functions
```

## 🗄️ Database Schema

The database schema includes:
- **Users & Authentication:** User accounts, OAuth providers
- **Workspaces:** Multi-tenant workspace support
- **Social Accounts:** Connected social media accounts
- **Posts:** Content scheduling and publishing
- **Media:** File management
- **Analytics:** Performance tracking
- **Comments:** Engagement management
- **AI:** AI generations and brand voice
- **Notifications:** User notifications

## 🧪 Development

### Available Scripts

```bash
# Root directory
pnpm dev          # Start all apps in development
pnpm build        # Build all apps
pnpm lint         # Lint all apps
pnpm type-check   # Type check all apps
pnpm format       # Format code with Prettier

# Frontend (apps/web)
pnpm dev          # Start Next.js dev server
pnpm build        # Build for production
pnpm start        # Start production server
pnpm lint         # Lint code
pnpm type-check   # Type check

# Backend (apps/api)
pnpm dev          # Start with tsx watch
pnpm build        # Build TypeScript
pnpm start        # Start production server
pnpm prisma:migrate # Run database migrations
pnpm prisma:generate # Generate Prisma client
pnpm prisma:studio   # Open Prisma Studio
```

### Code Quality
- ESLint for code linting
- Prettier for code formatting
- Husky for Git hooks
- Lint-staged for pre-commit checks

## 🎨 Design System

The application follows a **Modern Classic** design philosophy:
- Minimalist and elegant
- Premium and professional
- Clean lines and geometry
- High contrast and accessibility
- Generous white space
- Balanced aesthetics

See the full design system specifications in the project documentation.

## 📝 Environment Variables

### Frontend (.env.local)
- `NEXTAUTH_URL`: Frontend URL
- `NEXTAUTH_SECRET`: NextAuth secret key
- `NEXT_PUBLIC_API_URL`: Backend API URL

### Backend (.env)
- `DATABASE_URL`: PostgreSQL connection string
- `REDIS_URL`: Redis connection string
- `JWT_SECRET`: JWT signing secret
- `CORS_ORIGIN`: Allowed CORS origin
- `PORT`: API server port

See `.env.example` files for complete lists.

## 🐳 Docker

### Start services
```bash
docker-compose up -d
```

### Stop services
```bash
docker-compose down
```

### View logs
```bash
docker-compose logs -f [service-name]
```

### Rebuild services
```bash
docker-compose up -d --build
```

## 🤝 Contributing

This is currently a private project. Contribution guidelines will be added when the project goes public.

## 📄 License

Proprietary - All rights reserved

## 🗺️ Roadmap

### Phase 1: Foundation & MVP (Months 1-3) ✅
- [x] Core infrastructure setup
- [x] Design system implementation
- [x] Authentication system
- [x] Backend foundation
- [ ] Social account connections
- [ ] Basic content scheduler
- [ ] Publishing system
- [ ] Analytics foundation

### Phase 2: AI Features & Advanced Scheduling (Months 4-6)
- [ ] AI content generation
- [ ] AI image generation
- [ ] Smart scheduling
- [ ] Advanced analytics
- [ ] Content repurposing

### Phase 3: Engagement & Team Features (Months 7-9)
- [ ] Social inbox
- [ ] AI-powered engagement
- [ ] Team collaboration
- [ ] Client management
- [ ] Approval workflows

### Phase 4: Admin System & Polish (Months 10-12)
- [ ] Admin panel
- [ ] Subscription management
- [ ] Template library
- [ ] Performance optimization
- [ ] Production launch

## 👨‍💻 Author

**Engr Mejba Ahmed**

### 🤝 Hire / Work with me:

- 🔗 **Fiverr** (custom builds, integrations, performance): [fiverr.com/s/EgxYmWD](https://www.fiverr.com/s/EgxYmWD)
- 🌐 **Mejba Personal Portfolio**: [mejba.me](https://www.mejba.me)
- 🏢 **Ramlit Limited**: [https://www.ramlit.com)](https://www.ramlit.com)
- 🎨 **ColorPark Creative Agency**: [colorpark.io](https://www.colorpark.io)
- 🛡 **xCyberSecurity Global Services**: [xcybersecurity.io](https://www.xcybersecurity.io)

## 📞 Support

For support, email support@aisocial.com or open an issue in the repository.

---

Built with ❤️ by **Engr Mejba Ahmed** using Next.js, TypeScript, and modern web technologies.
