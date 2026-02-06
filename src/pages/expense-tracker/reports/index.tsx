import { useMemo } from 'react';
import { BarChart3, Users, Sparkles } from 'lucide-react';
import Page from '@/components/helmet-page';
import { Tabs, TabsContent, TabsList, TabsTrigger } from '@/components/ui/tabs';
import { useAuth } from '@/store/useAuth';
import UserReportTab from './UserReportTab';
import AdminReportTab from './AdminReportTab';

export default function Report() {
  const { user } = useAuth();

  // Determine if user is admin
  const isAdmin = useMemo(() => {
    return user?.role?.toLowerCase() === 'admin';
  }, [user?.role]);

  // Determine default tab
  const defaultTab = isAdmin ? 'admin' : 'user';

  return (
    <Page title="Reports">
      <div className="min-h-screen bg-background text-foreground">
        <div className="relative overflow-hidden">
          {/* Enhanced background with multiple gradients */}
          <div className="absolute inset-0 bg-[radial-gradient(900px_360px_at_12%_-10%,#f59e0b33,transparent),radial-gradient(700px_300px_at_88%_-20%,#0ea5e933,transparent)] dark:bg-[radial-gradient(900px_360px_at_12%_-10%,#1f293733,transparent),radial-gradient(700px_300px_at_88%_-20%,#1e40af33,transparent)]" />

          {/* Animated background elements */}
          <div className="absolute top-20 left-10 w-72 h-72 bg-blue-500/10 rounded-full mix-blend-multiply filter blur-3xl opacity-20 dark:opacity-10 animate-pulse" />
          <div className="absolute bottom-20 right-10 w-72 h-72 bg-purple-500/10 rounded-full mix-blend-multiply filter blur-3xl opacity-20 dark:opacity-10 animate-pulse" />

          <div className="relative px-6 py-8 sm:px-8">
            {/* Header Section */}
            <div className="mb-12 space-y-4">
              <div className="flex items-center gap-2">
                <div className="relative">
                  <div className="absolute inset-0 bg-gradient-to-r from-blue-600 to-purple-600 rounded-lg blur opacity-75" />
                  <div className="relative bg-background rounded-lg p-2">
                    <Sparkles size={20} className="text-blue-600" />
                  </div>
                </div>
                <p className="text-xs uppercase tracking-[0.32em] text-muted-foreground">
                  Financial Overview
                </p>
              </div>
              <h1 className="text-3xl font-bold sm:text-4xl font-['Space_Grotesk'] bg-gradient-to-r from-blue-600 via-purple-600 to-pink-600 bg-clip-text text-transparent">
                Expense Reports
              </h1>
              <p className="text-sm text-muted-foreground sm:text-base max-w-2xl">
                View and analyze expenses with detailed filters and insights.
                Track your spending patterns and make informed financial
                decisions.
              </p>
            </div>

            {/* Tabs Section */}
            <Tabs defaultValue={defaultTab} className="w-full space-y-6">
              {/* Modern Tab List */}
              <div className="relative">
                <div className="absolute -inset-1 bg-gradient-to-r from-blue-600/20 via-purple-600/20 to-pink-600/20 rounded-full blur-lg opacity-75 group-hover:opacity-100 transition duration-1000 group-hover:duration-200" />
                <div className="relative">
                  <TabsList className="inline-flex gap-1 rounded-full border border-border/40 bg-card/50 p-1 backdrop-blur-md shadow-lg shadow-blue-500/5 hover:shadow-blue-500/10 transition-all duration-300">
                    {/* User Report Tab */}
                    <TabsTrigger
                      value="user"
                      className="group relative inline-flex items-center gap-2.5 rounded-full px-6 py-2.5 text-sm font-semibold transition-all duration-300 text-muted-foreground hover:text-foreground data-[state=active]:text-white"
                    >
                      {/* Background gradient for active state */}
                      <div className="absolute inset-0 rounded-full bg-gradient-to-r from-blue-600 to-cyan-600 opacity-0 group-data-[state=active]:opacity-100 transition-opacity duration-300 shadow-lg shadow-blue-500/50 group-data-[state=active]:shadow-blue-500/50" />

                      {/* Icons and text */}
                      <div className="relative flex items-center gap-2 z-10">
                        <BarChart3
                          size={18}
                          className="transition-all duration-300 group-hover:scale-110 group-data-[state=active]:scale-110"
                        />
                        <span className="hidden sm:inline">User Report</span>
                        <span className="sm:hidden">User</span>
                      </div>
                    </TabsTrigger>

                    {/* Admin Report Tab - Only for admins */}
                    {isAdmin && (
                      <TabsTrigger
                        value="admin"
                        className="group relative inline-flex items-center gap-2.5 rounded-full px-6 py-2.5 text-sm font-semibold transition-all duration-300 text-muted-foreground hover:text-foreground data-[state=active]:text-white"
                      >
                        {/* Background gradient for active state */}
                        <div className="absolute inset-0 rounded-full bg-gradient-to-r from-purple-600 to-pink-600 opacity-0 group-data-[state=active]:opacity-100 transition-opacity duration-300 shadow-lg shadow-purple-500/50 group-data-[state=active]:shadow-purple-500/50" />

                        {/* Icons and text */}
                        <div className="relative flex items-center gap-2 z-10">
                          <Users
                            size={18}
                            className="transition-all duration-300 group-hover:scale-110 group-data-[state=active]:scale-110"
                          />
                          <span className="hidden sm:inline">Admin Report</span>
                          <span className="sm:hidden">Admin</span>
                        </div>
                      </TabsTrigger>
                    )}
                  </TabsList>
                </div>
              </div>

              {/* Content Container with Glow */}
              <div className="relative">
                {/* Glow effect behind content */}
                <div className="absolute -inset-px rounded-2xl bg-gradient-to-b from-blue-500/10 via-purple-500/5 to-transparent blur-2xl -z-10" />

                {/* User Report Tab Content */}
                <TabsContent
                  value="user"
                  className="mt-0 focus-visible:outline-none"
                >
                  <div className="animate-in fade-in duration-500">
                    <UserReportTab />
                  </div>
                </TabsContent>

                {/* Admin Report Tab Content */}
                {isAdmin && (
                  <TabsContent
                    value="admin"
                    className="mt-0 focus-visible:outline-none"
                  >
                    <div className="animate-in fade-in duration-500">
                      <AdminReportTab />
                    </div>
                  </TabsContent>
                )}
              </div>
            </Tabs>
          </div>
        </div>
      </div>
    </Page>
  );
}
