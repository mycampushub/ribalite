# Treasury & Liquidity Platform

## Overview

This is a frontend-only simulation of an enterprise treasury and liquidity management platform inspired by Kyriba. The application provides a comprehensive suite of tools for cash management, forecasting, payments processing, risk management, and bank connectivity. Built as a single-page application (SPA) with React, it features responsive design, interactive charts, and mock data to simulate real treasury operations without requiring a backend.

The platform includes seven main modules: Dashboard (overview and quick actions), Cash Position (bank balances and transactions), Cash Forecasting (scenario planning and projections), Payments (payment processing and approval workflows), Risk Management (FX exposures and hedging), Connectivity (bank and ERP integrations), and Settings (user and system administration).

## User Preferences

Preferred communication style: Simple, everyday language.

## System Architecture

**Frontend Framework**: React 18+ with TypeScript using Vite as the build tool. The application follows a component-based architecture with a clear separation between UI components, business logic, and data management.

**Styling System**: Tailwind CSS for utility-first styling with shadcn/ui component library providing pre-built, accessible components. The design system uses CSS custom properties for theming and maintains consistent spacing, colors, and typography throughout the application.

**State Management**: Zustand for client-side state management, providing a lightweight alternative to Redux. The store manages bank accounts, transactions, payments, forecasts, FX exposures, connectors, users, and UI state like sidebar visibility and selected items.

**Data Layer**: Mock data generators create realistic financial data including bank accounts, transactions, payments, and market data. The data schemas are defined using Zod for type safety and validation, ensuring consistency between frontend and potential future backend integration.

**Routing**: Wouter for client-side routing, providing a lightweight routing solution that handles navigation between different modules and maintains URL state.

**Charts and Visualization**: Recharts library for interactive financial charts including line charts, bar charts, and pie charts. Charts display cash flow trends, balance distributions, FX exposures, and forecast scenarios with responsive design and custom tooltips.

**Component Architecture**: Modular component structure with reusable UI components (buttons, modals, tables), treasury-specific components (bank balance tables, payment workflows, chart containers), and page-level components for each major module.

**Responsive Design**: Mobile-first approach with collapsible sidebar, responsive grid layouts, and touch-friendly interactions. The application adapts to desktop, tablet, and mobile viewports.

**Data Tables**: Custom DataTable component with sorting, filtering, and row selection capabilities for displaying financial data like transactions, payments, and bank accounts.

**Modal and Drawer System**: Dialog components for payment details, scenario creation, and settings management. Sheet components for sliding panels like bank account details.

**Form Handling**: React Hook Form with Zod validation for user inputs, payment creation, and settings management.

**Accessibility**: ARIA roles, keyboard navigation support, focus management, and semantic HTML structure throughout the application.

## External Dependencies

**UI Components**: Radix UI primitives for accessible, unstyled components including dialogs, dropdowns, tabs, and form controls. These provide the foundation for the shadcn/ui component system.

**Icons**: Lucide React for consistent iconography across the application, providing treasury and finance-specific icons.

**Date Handling**: date-fns library for date formatting, calculations, and relative time display used throughout the application for transaction dates, payment schedules, and activity timestamps.

**Build Tools**: Vite for fast development and optimized production builds, with PostCSS and Autoprefixer for CSS processing.

**Database Integration Ready**: Drizzle ORM configured with PostgreSQL schema definitions, ready for future backend integration. The schema includes tables for users, bank accounts, transactions, payments, and other treasury entities.

**Development Tools**: ESBuild for server compilation, TypeScript for type safety, and development utilities including runtime error overlays and hot module replacement.

**Deployment**: Configuration supports both development and production environments with environment variable management and optimized builds for static hosting.