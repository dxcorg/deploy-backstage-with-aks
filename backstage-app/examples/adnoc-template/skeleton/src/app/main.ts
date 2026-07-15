import { Component } from '@angular/core';
import { bootstrapApplication } from '@angular/platform-browser';
import { NgFor } from '@angular/common';

interface WorkflowStep {
  icon: string;
  title: string;
  description: string;
  badge: string;
  badgeColor: string;
}

@Component({
  selector: 'app-root',
  standalone: true,
  imports: [NgFor],
  styles: [`
    /* ── Header ── */
    header {
      background: #0d1b2e;
      border-bottom: 1px solid var(--color-border);
      padding: 0 2rem;
      height: 64px;
      display: flex;
      align-items: center;
      gap: 0.75rem;
      position: sticky;
      top: 0;
      z-index: 100;
    }
    header img { height: 36px; width: 36px; object-fit: contain; }
    header .brand { font-size: 1.1rem; font-weight: 700; color: #fff; letter-spacing: 0.02em; }
    header .brand span { color: var(--color-accent); }
    header .pill {
      margin-left: auto;
      background: rgba(0,174,239,0.12);
      color: var(--color-accent);
      border: 1px solid rgba(0,174,239,0.35);
      border-radius: 9999px;
      padding: 3px 14px;
      font-size: 0.78rem;
      font-weight: 600;
    }

    /* ── Hero ── */
    .hero {
      text-align: center;
      padding: 4rem 1.5rem 3rem;
      background: linear-gradient(160deg, #0b1a30 0%, #0b1120 60%);
    }
    .hero h1 { font-size: clamp(1.8rem, 4vw, 2.8rem); font-weight: 800; margin-bottom: 1rem; }
    .hero h1 span { color: var(--color-accent); }
    .hero p { color: var(--color-muted); font-size: 1.05rem; max-width: 600px; margin: 0 auto 2rem; }
    .hero-badges { display: flex; gap: 0.75rem; justify-content: center; flex-wrap: wrap; }
    .hero-badge {
      background: var(--color-surface);
      border: 1px solid var(--color-border);
      border-radius: 9999px;
      padding: 5px 16px;
      font-size: 0.8rem;
      color: var(--color-muted);
    }

    /* ── Section ── */
    .section { padding: 3rem 1.5rem 4rem; max-width: 1100px; margin: 0 auto; }
    .section-title {
      font-size: 1.35rem;
      font-weight: 700;
      margin-bottom: 0.5rem;
      color: #fff;
    }
    .section-sub { color: var(--color-muted); font-size: 0.92rem; margin-bottom: 2rem; }

    /* ── Workflow Grid ── */
    .workflow-grid {
      display: grid;
      grid-template-columns: repeat(auto-fill, minmax(290px, 1fr));
      gap: 1.25rem;
    }
    .step-card {
      background: var(--color-surface);
      border: 1px solid var(--color-border);
      border-radius: var(--radius);
      padding: 1.5rem;
      transition: border-color 0.2s, transform 0.2s;
      position: relative;
      overflow: hidden;
    }
    .step-card::before {
      content: '';
      position: absolute;
      inset: 0;
      border-radius: var(--radius);
      background: linear-gradient(135deg, rgba(0,174,239,0.04) 0%, transparent 60%);
      pointer-events: none;
    }
    .step-card:hover { border-color: var(--color-accent); transform: translateY(-3px); }
    .step-icon {
      font-size: 2rem;
      margin-bottom: 0.75rem;
      display: block;
    }
    .step-title { font-size: 1rem; font-weight: 700; margin-bottom: 0.4rem; color: #fff; }
    .step-desc { font-size: 0.875rem; color: var(--color-muted); line-height: 1.55; margin-bottom: 1rem; }
    .step-badge {
      display: inline-block;
      border-radius: 9999px;
      padding: 3px 12px;
      font-size: 0.75rem;
      font-weight: 600;
    }

    /* ── Pipeline visual ── */
    .pipeline {
      display: flex;
      align-items: center;
      gap: 0;
      overflow-x: auto;
      padding: 1.5rem 0;
      margin-bottom: 0.5rem;
    }
    .pipe-node {
      display: flex;
      flex-direction: column;
      align-items: center;
      min-width: 90px;
      gap: 0.4rem;
    }
    .pipe-circle {
      width: 44px;
      height: 44px;
      border-radius: 50%;
      display: flex;
      align-items: center;
      justify-content: center;
      font-size: 1.2rem;
      border: 2px solid var(--color-border);
      background: var(--color-surface);
    }
    .pipe-circle.done { border-color: var(--color-success); background: rgba(34,197,94,0.1); }
    .pipe-circle.active { border-color: var(--color-accent); background: rgba(0,174,239,0.12); }
    .pipe-label { font-size: 0.72rem; color: var(--color-muted); text-align: center; line-height: 1.3; }
    .pipe-arrow {
      flex: 1;
      min-width: 24px;
      height: 2px;
      background: var(--color-border);
      position: relative;
    }
    .pipe-arrow::after {
      content: '›';
      position: absolute;
      right: -6px;
      top: -17px;
      color: var(--color-border);
      font-size: 1.2rem;
    }

    /* ── Footer ── */
    footer {
      text-align: center;
      padding: 1.5rem;
      color: var(--color-muted);
      font-size: 0.8rem;
      border-top: 1px solid var(--color-border);
    }
  `],
  template: `
    <!-- Header -->
    <header>
      <img src="favicon.ico" alt="ADNOC Logo" />
      <span class="brand">ADNOC <span>Backstage</span></span>
      <span class="pill">Developer Portal</span>
    </header>

    <!-- Hero -->
    <section class="hero">
      <h1>Demo App for <span>Backstage Workflow</span></h1>
      <p>
        This is a demo application showcasing how the ADNOC internal developer portal
        streamlines software delivery — from scaffolding to production deployment.
      </p>
      <div class="hero-badges">
        <span class="hero-badge">Angular 18</span>
        <span class="hero-badge">Azure App Service</span>
        <span class="hero-badge">Terraform IaC</span>
        <span class="hero-badge">Backstage Catalog</span>
      </div>
    </section>

    <!-- CI/CD Pipeline visual -->
    <div style="max-width:1100px; margin:0 auto; padding:0 1.5rem;">
      <div style="background:var(--color-surface); border:1px solid var(--color-border); border-radius:var(--radius); padding:1.5rem 2rem;">
        <div style="font-size:0.85rem; color:var(--color-muted); text-transform:uppercase; letter-spacing:.08em; margin-bottom:0.25rem;">End-to-End Pipeline</div>
        <div class="pipeline">
          <div class="pipe-node">
            <div class="pipe-circle done">📋</div>
            <div class="pipe-label">Template<br>Catalog</div>
          </div>
          <div class="pipe-arrow"></div>
          <div class="pipe-node">
            <div class="pipe-circle done">⚙️</div>
            <div class="pipe-label">Scaffold<br>Component</div>
          </div>
          <div class="pipe-arrow"></div>
          <div class="pipe-node">
            <div class="pipe-circle done">🔀</div>
            <div class="pipe-label">Git<br>Repository</div>
          </div>
          <div class="pipe-arrow"></div>
          <div class="pipe-node">
            <div class="pipe-circle done">🔨</div>
            <div class="pipe-label">CI Build<br>& Test</div>
          </div>
          <div class="pipe-arrow"></div>
          <div class="pipe-node">
            <div class="pipe-circle active">🚀</div>
            <div class="pipe-label">Deploy to<br>Azure</div>
          </div>
          <div class="pipe-arrow"></div>
          <div class="pipe-node">
            <div class="pipe-circle">📊</div>
            <div class="pipe-label">Monitor<br>& Observe</div>
          </div>
        </div>
      </div>
    </div>

    <!-- Workflow Cards -->
    <div class="section">
      <div class="section-title">Backstage Workflows</div>
      <div class="section-sub">Core developer workflows available through the ADNOC internal developer portal.</div>
      <div class="workflow-grid">
        <div class="step-card" *ngFor="let step of workflowSteps">
          <span class="step-icon">{{ step.icon }}</span>
          <div class="step-title">{{ step.title }}</div>
          <div class="step-desc">{{ step.description }}</div>
          <span class="step-badge" [style.background]="step.badgeColor + '22'" [style.color]="step.badgeColor" [style.border]="'1px solid ' + step.badgeColor + '55'">
            {{ step.badge }}
          </span>
        </div>
      </div>
    </div>

    <!-- Footer -->
    <footer>
      &copy; 2026 ADNOC &mdash; Internal Developer Portal &mdash; Powered by Backstage
    </footer>
  `
})
export class App {
  readonly workflowSteps: WorkflowStep[] = [
    {
      icon: '📋',
      title: 'Template Catalog',
      description: 'Browse a curated library of approved software templates for microservices, APIs, frontends, and data pipelines — ready to use in seconds.',
      badge: 'Discovery',
      badgeColor: '#00aeef'
    },
    {
      icon: '⚙️',
      title: 'Scaffold New Component',
      description: 'Use Software Templates to generate a fully configured repository with CI/CD, linting, testing, and cloud infrastructure pre-wired.',
      badge: 'Automation',
      badgeColor: '#a78bfa'
    },
    {
      icon: '📦',
      title: 'Register Existing Service',
      description: 'Onboard any existing service or library into the Backstage catalog with a single catalog-info.yaml file — full ownership and metadata tracked.',
      badge: 'Onboarding',
      badgeColor: '#f59e0b'
    },
    {
      icon: '🔀',
      title: 'CI/CD Pipeline',
      description: 'Every scaffolded component ships with an Azure DevOps pipeline for automated build, test, and deployment — triggered on every pull request.',
      badge: 'DevOps',
      badgeColor: '#22c55e'
    },
    {
      icon: '☁️',
      title: 'Infrastructure as Code',
      description: 'Azure resources — App Service, Storage, networking — are provisioned automatically via Terraform modules enforcing ADNOC cloud standards.',
      badge: 'Terraform',
      badgeColor: '#7c5cbf'
    },
    {
      icon: '📖',
      title: 'API Documentation',
      description: 'Auto-generated and published API docs (OpenAPI / AsyncAPI) live alongside the service in the catalog, always up-to-date with the source code.',
      badge: 'Docs',
      badgeColor: '#0ea5e9'
    },
    {
      icon: '🔐',
      title: 'Access & Ownership',
      description: 'Manage team ownership, permissions, and RBAC directly in the portal. Every component has a clear owner, on-call contact, and runbook link.',
      badge: 'Governance',
      badgeColor: '#ef4444'
    },
    {
      icon: '📊',
      title: 'Monitoring & Observability',
      description: 'Integrated dashboards surface deployment status, health checks, Azure Monitor alerts, and performance metrics — all from one place.',
      badge: 'Observability',
      badgeColor: '#10b981'
    }
  ];
}

bootstrapApplication(App).catch((err) => console.error(err));
