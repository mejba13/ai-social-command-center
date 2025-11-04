'use client';

import { useState } from 'react';
import Link from 'next/link';
import { Plus, CheckCircle, XCircle, RefreshCw, Settings } from 'lucide-react';
import { Button } from '@/components/ui/button';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';
import { Badge } from '@/components/ui/badge';
import { Breadcrumb } from '@/components/layout/breadcrumb';

// Mock data - will be replaced with real data from API
const connectedAccounts = [
  {
    id: '1',
    platform: 'Facebook',
    username: '@brandname',
    followers: '12.5K',
    status: 'connected',
    lastSync: '2 minutes ago',
    image: '/platforms/facebook.svg',
  },
  {
    id: '2',
    platform: 'Instagram',
    username: '@brandname.official',
    followers: '28.3K',
    status: 'connected',
    lastSync: '5 minutes ago',
    image: '/platforms/instagram.svg',
  },
  {
    id: '3',
    platform: 'Twitter',
    username: '@brandname',
    followers: '8.9K',
    status: 'error',
    lastSync: '2 hours ago',
    image: '/platforms/twitter.svg',
  },
];

const availablePlatforms = [
  { name: 'LinkedIn', icon: '💼', description: 'Connect your LinkedIn profile' },
  { name: 'TikTok', icon: '🎵', description: 'Connect your TikTok account' },
  { name: 'YouTube', icon: '▶️', description: 'Connect your YouTube channel' },
  { name: 'Pinterest', icon: '📌', description: 'Connect your Pinterest board' },
];

export default function AccountsPage() {
  const [syncing, setSyncing] = useState<string | null>(null);

  const handleSync = (accountId: string) => {
    setSyncing(accountId);
    // Simulate sync
    setTimeout(() => setSyncing(null), 2000);
  };

  return (
    <div>
      <Breadcrumb />

      {/* Header */}
      <div className="flex flex-col md:flex-row md:items-center md:justify-between mb-8">
        <div>
          <h1 className="text-h1 text-primary-900 mb-2">Social Accounts</h1>
          <p className="text-body text-primary-600">
            Manage and monitor your connected social media accounts
          </p>
        </div>
      </div>

      {/* Connected Accounts */}
      <Card className="mb-8">
        <CardHeader>
          <CardTitle>Connected Accounts</CardTitle>
          <CardDescription>
            Accounts you've connected to AI Social Command Center
          </CardDescription>
        </CardHeader>
        <CardContent>
          <div className="space-y-4">
            {connectedAccounts.map((account) => (
              <div
                key={account.id}
                className="flex items-center justify-between p-4 border border-primary-200 rounded-lg hover:border-primary-300 transition-colors"
              >
                <div className="flex items-center gap-4">
                  <div className="h-12 w-12 rounded-full bg-gradient-to-br from-accent-500 to-accent-600 flex items-center justify-center">
                    <span className="text-white font-bold text-lg">
                      {account.platform[0]}
                    </span>
                  </div>
                  <div>
                    <div className="flex items-center gap-2">
                      <h3 className="text-sm font-semibold text-primary-900">
                        {account.platform}
                      </h3>
                      {account.status === 'connected' ? (
                        <Badge variant="success">
                          <CheckCircle className="h-3 w-3 mr-1" />
                          Connected
                        </Badge>
                      ) : (
                        <Badge variant="error">
                          <XCircle className="h-3 w-3 mr-1" />
                          Error
                        </Badge>
                      )}
                    </div>
                    <p className="text-sm text-primary-600 mt-1">
                      {account.username} • {account.followers} followers
                    </p>
                    <p className="text-xs text-primary-400 mt-1">
                      Last synced: {account.lastSync}
                    </p>
                  </div>
                </div>

                <div className="flex items-center gap-2">
                  <Button
                    variant="outline"
                    size="sm"
                    onClick={() => handleSync(account.id)}
                    disabled={syncing === account.id}
                  >
                    <RefreshCw
                      className={`h-4 w-4 mr-2 ${
                        syncing === account.id ? 'animate-spin' : ''
                      }`}
                    />
                    Sync
                  </Button>
                  <Button variant="ghost" size="sm">
                    <Settings className="h-4 w-4" />
                  </Button>
                </div>
              </div>
            ))}
          </div>
        </CardContent>
      </Card>

      {/* Available Platforms */}
      <Card>
        <CardHeader>
          <CardTitle>Add More Accounts</CardTitle>
          <CardDescription>
            Connect additional social media platforms to expand your reach
          </CardDescription>
        </CardHeader>
        <CardContent>
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-4">
            {availablePlatforms.map((platform) => (
              <button
                key={platform.name}
                className="flex flex-col items-center justify-center p-6 border-2 border-dashed border-primary-200 rounded-lg hover:border-accent-500 hover:bg-accent-50/50 transition-all group"
              >
                <span className="text-4xl mb-3">{platform.icon}</span>
                <h4 className="text-sm font-semibold text-primary-900 mb-1">
                  {platform.name}
                </h4>
                <p className="text-xs text-primary-500 text-center mb-3">
                  {platform.description}
                </p>
                <div className="flex items-center gap-1 text-accent-600 group-hover:text-accent-700 font-medium text-sm">
                  <Plus className="h-4 w-4" />
                  Connect
                </div>
              </button>
            ))}
          </div>
        </CardContent>
      </Card>
    </div>
  );
}
