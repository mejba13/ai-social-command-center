#!/bin/bash

# 🚀 Quick Development Setup Script
# This script sets up your development environment in seconds!

set -e

echo "🚀 AI Social Command Center - Quick Dev Setup"
echo "=============================================="
echo ""

# Colors for output
GREEN='\033[0;32m'
BLUE='\033[0;34m'
YELLOW='\033[1;33m'
NC='\033[0m' # No Color

# Check if pnpm is installed
if ! command -v pnpm &> /dev/null; then
    echo -e "${YELLOW}⚠️  pnpm not found. Installing pnpm...${NC}"
    npm install -g pnpm
fi

# Install dependencies
echo -e "${BLUE}📦 Installing dependencies...${NC}"
pnpm install

# Setup frontend environment
if [ ! -f apps/web/.env.local ]; then
    echo -e "${BLUE}⚙️  Setting up frontend environment...${NC}"
    cp apps/web/.env.local.example apps/web/.env.local

    # Generate a random NextAuth secret
    SECRET=$(openssl rand -base64 32 2>/dev/null || node -e "console.log(require('crypto').randomBytes(32).toString('base64'))")

    # Update the secret in .env.local
    if [[ "$OSTYPE" == "darwin"* ]]; then
        # macOS
        sed -i '' "s/your-super-secret-key-minimum-32-characters-long/$SECRET/" apps/web/.env.local
    else
        # Linux
        sed -i "s/your-super-secret-key-minimum-32-characters-long/$SECRET/" apps/web/.env.local
    fi

    echo -e "${GREEN}✅ Created apps/web/.env.local with generated secret${NC}"
else
    echo -e "${GREEN}✅ apps/web/.env.local already exists${NC}"
fi

# Setup backend environment (if needed)
if [ ! -f apps/api/.env ]; then
    echo -e "${BLUE}⚙️  Setting up backend environment...${NC}"
    if [ -f apps/api/.env.example ]; then
        cp apps/api/.env.example apps/api/.env
        echo -e "${GREEN}✅ Created apps/api/.env${NC}"
    else
        echo -e "${YELLOW}⚠️  apps/api/.env.example not found, skipping backend setup${NC}"
    fi
else
    echo -e "${GREEN}✅ apps/api/.env already exists${NC}"
fi

echo ""
echo -e "${GREEN}========================================${NC}"
echo -e "${GREEN}✨ Setup Complete!${NC}"
echo -e "${GREEN}========================================${NC}"
echo ""
echo -e "${BLUE}📖 Quick Start Options:${NC}"
echo ""
echo -e "  ${YELLOW}1. Frontend Only (Recommended for UI development):${NC}"
echo -e "     cd apps/web"
echo -e "     pnpm dev"
echo -e "     ${BLUE}→ Visit http://localhost:3000${NC}"
echo ""
echo -e "  ${YELLOW}2. Full Stack (with Docker):${NC}"
echo -e "     docker-compose up -d"
echo -e "     ${BLUE}→ Frontend: http://localhost:3000${NC}"
echo -e "     ${BLUE}→ Backend: http://localhost:3001${NC}"
echo ""
echo -e "  ${YELLOW}3. Full Stack (manual):${NC}"
echo -e "     Terminal 1: cd apps/api && pnpm dev"
echo -e "     Terminal 2: cd apps/web && pnpm dev"
echo ""
echo -e "${GREEN}🎯 Development Mode:${NC}"
echo -e "   Mock AI is ENABLED by default (no API keys needed!)"
echo -e "   5 brand voice profiles will auto-load"
echo -e "   All AI features work with mock data"
echo ""
echo -e "${BLUE}📚 Documentation:${NC}"
echo -e "   • DEVELOPER_GUIDE.md - Full developer guide"
echo -e "   • README.md - Project overview"
echo -e "   • QUICKSTART.md - Quick start guide"
echo ""
echo -e "${GREEN}Happy coding! 🎉${NC}"
echo ""
