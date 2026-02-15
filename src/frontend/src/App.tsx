import { RouterProvider, createRouter, createRootRoute, createRoute, Outlet } from '@tanstack/react-router';
import { Toaster } from '@/components/ui/sonner';
import AppHeader from './components/AppHeader';
import DraftPage from './pages/DraftPage';
import LearnPage from './pages/LearnPage';
import PortfolioPage from './pages/PortfolioPage';
import SkillsPage from './pages/SkillsPage';
import SettingsPage from './pages/SettingsPage';
import DraftTypeLayout from './pages/draftType/DraftTypeLayout';
import StructureTutorialPage from './pages/draftType/StructureTutorialPage';
import GuidedWizardPage from './pages/draftType/GuidedWizardPage';
import FreePracticePage from './pages/draftType/FreePracticePage';
import CompareImprovePage from './pages/draftType/CompareImprovePage';
import EditorPage from './pages/draftType/EditorPage';
import CommonMistakesPage from './pages/learn/CommonMistakesPage';
import ChecklistPage from './pages/learn/ChecklistPage';
import TemplatesPage from './pages/learn/TemplatesPage';
import ClauseLibraryPage from './pages/learn/ClauseLibraryPage';
import BeforeAfterGalleryPage from './pages/learn/BeforeAfterGalleryPage';
import WeeklyChallengePage from './pages/challenge/WeeklyChallengePage';
import SharedDraftPage from './pages/SharedDraftPage';
import PrintPreviewPage from './pages/PrintPreviewPage';
import { initializeStorage } from './storage/localStore';
import { useEffect } from 'react';

function RootLayout() {
  return (
    <div className="min-h-screen bg-background">
      <AppHeader />
      <main className="container mx-auto px-4 py-6">
        <Outlet />
      </main>
      <footer className="border-t mt-12 py-6 text-center text-sm text-muted-foreground">
        <p>© {new Date().getFullYear()} DRAFT MASTER. Built with love using{' '}
          <a 
            href={`https://caffeine.ai/?utm_source=Caffeine-footer&utm_medium=referral&utm_content=${encodeURIComponent(window.location.hostname || 'draft-master')}`}
            target="_blank"
            rel="noopener noreferrer"
            className="text-primary hover:underline"
          >
            caffeine.ai
          </a>
        </p>
      </footer>
      <Toaster />
    </div>
  );
}

const rootRoute = createRootRoute({
  component: RootLayout,
});

const indexRoute = createRoute({
  getParentRoute: () => rootRoute,
  path: '/',
  component: DraftPage,
});

const draftRoute = createRoute({
  getParentRoute: () => rootRoute,
  path: '/draft',
  component: DraftPage,
});

const learnRoute = createRoute({
  getParentRoute: () => rootRoute,
  path: '/learn',
  component: LearnPage,
});

const portfolioRoute = createRoute({
  getParentRoute: () => rootRoute,
  path: '/portfolio',
  component: PortfolioPage,
});

const skillsRoute = createRoute({
  getParentRoute: () => rootRoute,
  path: '/skills',
  component: SkillsPage,
});

const settingsRoute = createRoute({
  getParentRoute: () => rootRoute,
  path: '/settings',
  component: SettingsPage,
});

const draftTypeRoute = createRoute({
  getParentRoute: () => rootRoute,
  path: '/draft/$draftType',
  component: DraftTypeLayout,
});

const structureRoute = createRoute({
  getParentRoute: () => draftTypeRoute,
  path: '/structure',
  component: StructureTutorialPage,
});

const wizardRoute = createRoute({
  getParentRoute: () => draftTypeRoute,
  path: '/wizard',
  component: GuidedWizardPage,
});

const practiceRoute = createRoute({
  getParentRoute: () => draftTypeRoute,
  path: '/practice',
  component: FreePracticePage,
});

const compareRoute = createRoute({
  getParentRoute: () => draftTypeRoute,
  path: '/compare',
  component: CompareImprovePage,
});

const editorRoute = createRoute({
  getParentRoute: () => rootRoute,
  path: '/editor/$attemptId',
  component: EditorPage,
});

const commonMistakesRoute = createRoute({
  getParentRoute: () => rootRoute,
  path: '/learn/mistakes/$draftType',
  component: CommonMistakesPage,
});

const checklistRoute = createRoute({
  getParentRoute: () => rootRoute,
  path: '/learn/checklist/$draftType',
  component: ChecklistPage,
});

const templatesRoute = createRoute({
  getParentRoute: () => rootRoute,
  path: '/learn/templates',
  component: TemplatesPage,
});

const clauseLibraryRoute = createRoute({
  getParentRoute: () => rootRoute,
  path: '/learn/clauses',
  component: ClauseLibraryPage,
});

const galleryRoute = createRoute({
  getParentRoute: () => rootRoute,
  path: '/learn/gallery',
  component: BeforeAfterGalleryPage,
});

const challengeRoute = createRoute({
  getParentRoute: () => rootRoute,
  path: '/challenge',
  component: WeeklyChallengePage,
});

const sharedDraftRoute = createRoute({
  getParentRoute: () => rootRoute,
  path: '/share/$token',
  component: SharedDraftPage,
});

const printPreviewRoute = createRoute({
  getParentRoute: () => rootRoute,
  path: '/print/$attemptId',
  component: PrintPreviewPage,
});

const routeTree = rootRoute.addChildren([
  indexRoute,
  draftRoute,
  learnRoute,
  portfolioRoute,
  skillsRoute,
  settingsRoute,
  draftTypeRoute.addChildren([
    structureRoute,
    wizardRoute,
    practiceRoute,
    compareRoute,
  ]),
  editorRoute,
  commonMistakesRoute,
  checklistRoute,
  templatesRoute,
  clauseLibraryRoute,
  galleryRoute,
  challengeRoute,
  sharedDraftRoute,
  printPreviewRoute,
]);

const router = createRouter({ routeTree });

declare module '@tanstack/react-router' {
  interface Register {
    router: typeof router;
  }
}

export default function App() {
  useEffect(() => {
    initializeStorage();
  }, []);

  return <RouterProvider router={router} />;
}
