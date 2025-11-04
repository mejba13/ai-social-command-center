'use client';

import { useState } from 'react';
import { Check, ChevronsUpDown, Plus } from 'lucide-react';
import { cn } from '@/lib/utils';

interface Workspace {
  id: string;
  name: string;
  image?: string;
}

// Mock data - will be replaced with real data from API
const workspaces: Workspace[] = [
  { id: '1', name: 'Personal' },
  { id: '2', name: 'Company Brand' },
  { id: '3', name: 'Client Projects' },
];

export function WorkspaceSwitcher() {
  const [open, setOpen] = useState(false);
  const [selectedWorkspace, setSelectedWorkspace] = useState(workspaces[0]);

  return (
    <div className="relative mb-6">
      <button
        onClick={() => setOpen(!open)}
        className="flex items-center justify-between w-full px-4 py-3 bg-white border border-primary-200 rounded-lg hover:bg-primary-50 transition-colors"
      >
        <div className="flex items-center gap-3">
          <div className="h-8 w-8 rounded-lg bg-gradient-to-br from-accent-500 to-accent-600 flex items-center justify-center">
            <span className="text-white font-semibold text-sm">
              {selectedWorkspace.name[0]}
            </span>
          </div>
          <div className="text-left">
            <p className="text-sm font-medium text-primary-900">
              {selectedWorkspace.name}
            </p>
            <p className="text-xs text-primary-500">Workspace</p>
          </div>
        </div>
        <ChevronsUpDown className="h-4 w-4 text-primary-400" />
      </button>

      {open && (
        <>
          <div
            className="fixed inset-0 z-40"
            onClick={() => setOpen(false)}
          />
          <div className="absolute top-full left-0 right-0 mt-2 bg-white border border-primary-200 rounded-lg shadow-lg z-50 animate-slide-in">
            <div className="p-2">
              {workspaces.map((workspace) => (
                <button
                  key={workspace.id}
                  onClick={() => {
                    setSelectedWorkspace(workspace);
                    setOpen(false);
                  }}
                  className={cn(
                    'flex items-center justify-between w-full px-3 py-2 rounded-md hover:bg-primary-50 transition-colors',
                    selectedWorkspace.id === workspace.id && 'bg-accent-50'
                  )}
                >
                  <div className="flex items-center gap-3">
                    <div className="h-8 w-8 rounded-lg bg-gradient-to-br from-accent-500 to-accent-600 flex items-center justify-center">
                      <span className="text-white font-semibold text-sm">
                        {workspace.name[0]}
                      </span>
                    </div>
                    <span className="text-sm font-medium text-primary-900">
                      {workspace.name}
                    </span>
                  </div>
                  {selectedWorkspace.id === workspace.id && (
                    <Check className="h-4 w-4 text-accent-600" />
                  )}
                </button>
              ))}
            </div>
            <div className="border-t border-primary-200 p-2">
              <button className="flex items-center gap-3 w-full px-3 py-2 rounded-md hover:bg-primary-50 transition-colors text-accent-600">
                <Plus className="h-4 w-4" />
                <span className="text-sm font-medium">Create workspace</span>
              </button>
            </div>
          </div>
        </>
      )}
    </div>
  );
}
