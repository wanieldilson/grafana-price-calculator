# Grafana Cloud Pricing Estimator

A modern, interactive web application for estimating Grafana Cloud Pro tier costs. Built with React, TypeScript, and Tailwind CSS, this tool helps you calculate monthly costs based on your infrastructure metrics, observability data, and user requirements.

![Grafana Cloud Pricing Estimator](https://img.shields.io/badge/React-19.2.0-blue) ![TypeScript](https://img.shields.io/badge/TypeScript-5.8.2-blue) ![Vite](https://img.shields.io/badge/Vite-6.2.0-purple)

## Features

- **Infrastructure & Core Monitoring**
  - Metrics series tracking
  - Kubernetes host and container hours
  - Log volume (GB) estimation

- **Application Observability**
  - Application host hours
  - Distributed tracing (GB)
  - Continuous profiling (GB)

- **Frontend & Testing**
  - Frontend observability sessions
  - Synthetic monitoring (API & Browser)
  - k6 load testing (VUh)

- **User Management**
  - Standard users
  - Enterprise users
  - IRM (Incident Response Management) users

- **Smart Estimator Mode**
  - Calculate metrics based on infrastructure topology
  - Estimate data volumes from host and application counts
  - Automatic calculation of monthly costs

- **Real-time Cost Breakdown**
  - Visual pie chart representation
  - Itemized cost breakdown
  - Monthly total calculation

## Technology Stack

- **Frontend Framework:** React 19.2.0
- **Language:** TypeScript 5.8.2
- **Build Tool:** Vite 6.2.0
- **Styling:** Tailwind CSS (via CDN)
- **Charts:** Recharts 3.5.0
- **Icons:** Lucide React 0.555.0

## Local Development

### Prerequisites

- Node.js 18+ and npm

### Setup

1. Clone the repository:
```bash
git clone <your-repo-url>
cd grafana-cloud-pricing-estimator
```

2. Install dependencies:
```bash
npm install
```

3. Start the development server:
```bash
npm run dev
```

4. Open your browser to `http://localhost:3000`

### Available Scripts

- `npm run dev` - Start development server on port 3000
- `npm run build` - Build for production
- `npm run preview` - Preview production build locally

## Docker Deployment

### Build Docker Image

```bash
docker build -t grafana-pricing-estimator .
```

### Run Docker Container

```bash
docker run -p 8080:80 grafana-pricing-estimator
```

The application will be available at `http://localhost:8080`

### Docker Image Details

- **Base Image:** nginx:alpine (production)
- **Build Stage:** node:20-alpine
- **Size:** ~50MB (optimized multi-stage build)
- **Port:** 80

## Deploy to Render

This application is configured for easy deployment on Render.

### Steps:

1. Push your code to GitHub
2. Create a new Web Service on [Render](https://render.com)
3. Connect your GitHub repository
4. Render will automatically detect the Dockerfile
5. Configure the service:
   - **Environment:** Docker
   - **Build Command:** (automatic from Dockerfile)
   - **Port:** 80

Render will automatically build and deploy your application. The service will be available at your Render URL.

### Render Configuration

No environment variables are required - this is a static frontend application with no backend dependencies.

## Project Structure

```
grafana-cloud-pricing-estimator/
├── components/
│   ├── CounterInput.tsx      # User counter component
│   ├── EstimatorPanel.tsx    # Smart estimator panel
│   ├── InputSection.tsx      # Input field component
│   └── SummaryChart.tsx      # Cost breakdown chart
├── App.tsx                   # Main application component
├── constants.ts              # Pricing configuration
├── types.ts                  # TypeScript type definitions
├── index.tsx                 # Application entry point
├── index.html                # HTML template
├── Dockerfile                # Multi-stage Docker build
├── nginx.conf                # Nginx configuration for SPA
├── vite.config.ts            # Vite configuration
├── tsconfig.json             # TypeScript configuration
└── package.json              # Dependencies and scripts
```

## Pricing Configuration

Pricing data is configured in `constants.ts` based on Grafana Cloud Pro tier pricing. The estimator includes:

- Free tier allowances
- Per-unit pricing
- Monthly cost calculations
- Volume-based pricing for different metrics

## Browser Support

- Chrome (latest)
- Firefox (latest)
- Safari (latest)
- Edge (latest)

## Contributing

Contributions are welcome! Please feel free to submit a Pull Request.

## License

This project is licensed under the MIT License - see the [LICENSE](LICENSE) file for details.

## Disclaimer

This is an unofficial pricing estimator tool. For official pricing information, please visit [Grafana Cloud Pricing](https://grafana.com/pricing/).

## Acknowledgments

- Built with [React](https://react.dev/)
- Icons by [Lucide](https://lucide.dev/)
- Charts by [Recharts](https://recharts.org/)
- Pricing data based on [Grafana Cloud](https://grafana.com/products/cloud/)
