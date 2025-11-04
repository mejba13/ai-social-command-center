'use client';

import { useState, useEffect } from 'react';
import { Plus, Edit2, Trash2, Save, X, Check } from 'lucide-react';
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogFooter,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from '@/components/ui/dialog';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import { Textarea } from '@/components/ui/textarea';
import { Badge } from '@/components/ui/badge';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';
import { loadSeedBrandVoices } from '@/lib/seed-data/brand-voices';

interface BrandVoice {
  id: string;
  name: string;
  description: string;
  tone: string;
  targetAudience: string;
  keyPhrases: string[];
  dosList: string[];
  dontsList: string[];
  isDefault: boolean;
  createdAt: string;
}

interface BrandVoiceManagerProps {
  mode?: 'page' | 'selector';
  onSelect?: (brandVoice: BrandVoice) => void;
  selectedId?: string;
}

export function BrandVoiceManager({
  mode = 'page',
  onSelect,
  selectedId,
}: BrandVoiceManagerProps) {
  const [brandVoices, setBrandVoices] = useState<BrandVoice[]>([]);
  const [isEditing, setIsEditing] = useState(false);
  const [editingVoice, setEditingVoice] = useState<BrandVoice | null>(null);
  const [formData, setFormData] = useState({
    name: '',
    description: '',
    tone: '',
    targetAudience: '',
    keyPhrases: '',
    dosList: '',
    dontsList: '',
  });

  // Load brand voices from localStorage on mount
  useEffect(() => {
    const voices = loadSeedBrandVoices(); // This will load seed data if none exist
    setBrandVoices(voices);
  }, []);

  // Save to localStorage whenever brandVoices changes
  const saveBrandVoices = (voices: BrandVoice[]) => {
    localStorage.setItem('brandVoices', JSON.stringify(voices));
    setBrandVoices(voices);
  };

  const handleCreate = () => {
    const newVoice: BrandVoice = {
      id: `bv_${Date.now()}`,
      name: formData.name,
      description: formData.description,
      tone: formData.tone,
      targetAudience: formData.targetAudience,
      keyPhrases: formData.keyPhrases.split(',').map((p) => p.trim()).filter(Boolean),
      dosList: formData.dosList.split('\n').map((d) => d.trim()).filter(Boolean),
      dontsList: formData.dontsList.split('\n').map((d) => d.trim()).filter(Boolean),
      isDefault: brandVoices.length === 0,
      createdAt: new Date().toISOString(),
    };

    saveBrandVoices([...brandVoices, newVoice]);
    resetForm();
    setIsEditing(false);
  };

  const handleUpdate = () => {
    if (!editingVoice) return;

    const updated = brandVoices.map((voice) =>
      voice.id === editingVoice.id
        ? {
            ...voice,
            name: formData.name,
            description: formData.description,
            tone: formData.tone,
            targetAudience: formData.targetAudience,
            keyPhrases: formData.keyPhrases.split(',').map((p) => p.trim()).filter(Boolean),
            dosList: formData.dosList.split('\n').map((d) => d.trim()).filter(Boolean),
            dontsList: formData.dontsList.split('\n').map((d) => d.trim()).filter(Boolean),
          }
        : voice
    );

    saveBrandVoices(updated);
    resetForm();
    setIsEditing(false);
    setEditingVoice(null);
  };

  const handleEdit = (voice: BrandVoice) => {
    setEditingVoice(voice);
    setFormData({
      name: voice.name,
      description: voice.description,
      tone: voice.tone,
      targetAudience: voice.targetAudience,
      keyPhrases: voice.keyPhrases.join(', '),
      dosList: voice.dosList.join('\n'),
      dontsList: voice.dontsList.join('\n'),
    });
    setIsEditing(true);
  };

  const handleDelete = (id: string) => {
    if (confirm('Are you sure you want to delete this brand voice?')) {
      saveBrandVoices(brandVoices.filter((voice) => voice.id !== id));
    }
  };

  const handleSetDefault = (id: string) => {
    const updated = brandVoices.map((voice) => ({
      ...voice,
      isDefault: voice.id === id,
    }));
    saveBrandVoices(updated);
  };

  const resetForm = () => {
    setFormData({
      name: '',
      description: '',
      tone: '',
      targetAudience: '',
      keyPhrases: '',
      dosList: '',
      dontsList: '',
    });
  };

  const handleCancel = () => {
    resetForm();
    setIsEditing(false);
    setEditingVoice(null);
  };

  // Selector mode - renders a simple list for selection
  if (mode === 'selector') {
    return (
      <div className="space-y-2">
        {brandVoices.length === 0 ? (
          <p className="text-sm text-primary-600 italic">No brand voices configured yet.</p>
        ) : (
          <div className="space-y-2">
            {brandVoices.map((voice) => (
              <button
                key={voice.id}
                onClick={() => onSelect?.(voice)}
                className={`w-full text-left p-3 rounded-lg border-2 transition-all ${
                  selectedId === voice.id
                    ? 'border-accent-500 bg-accent-50'
                    : 'border-primary-200 hover:border-primary-300 hover:bg-primary-50'
                }`}
              >
                <div className="flex items-center justify-between mb-1">
                  <span className="font-medium text-primary-900">{voice.name}</span>
                  {voice.isDefault && <Badge variant="default">Default</Badge>}
                </div>
                <p className="text-xs text-primary-600">{voice.description}</p>
              </button>
            ))}
          </div>
        )}
      </div>
    );
  }

  // Page mode - full management interface
  return (
    <div className="space-y-6">
      {/* Header */}
      <div className="flex items-center justify-between">
        <div>
          <h2 className="text-h2 text-primary-900">Brand Voice Profiles</h2>
          <p className="text-body text-primary-600 mt-1">
            Define your brand's tone and style for consistent AI-generated content
          </p>
        </div>
        <Button onClick={() => setIsEditing(true)}>
          <Plus className="h-4 w-4 mr-2" />
          Add Brand Voice
        </Button>
      </div>

      {/* Brand Voices Grid */}
      {brandVoices.length === 0 ? (
        <Card>
          <CardContent className="flex flex-col items-center justify-center py-12">
            <div className="text-6xl mb-4">🎨</div>
            <h3 className="text-h4 text-primary-900 mb-2">No brand voices yet</h3>
            <p className="text-body text-primary-600 text-center max-w-md mb-6">
              Create your first brand voice profile to ensure consistent, on-brand AI-generated content.
            </p>
            <Button onClick={() => setIsEditing(true)}>
              <Plus className="h-4 w-4 mr-2" />
              Create Brand Voice
            </Button>
          </CardContent>
        </Card>
      ) : (
        <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
          {brandVoices.map((voice) => (
            <Card key={voice.id} className="relative">
              {voice.isDefault && (
                <div className="absolute top-4 right-4">
                  <Badge variant="success">Default</Badge>
                </div>
              )}
              <CardHeader>
                <CardTitle>{voice.name}</CardTitle>
                <CardDescription>{voice.description}</CardDescription>
              </CardHeader>
              <CardContent className="space-y-4">
                <div>
                  <Label className="text-xs text-primary-600">Tone</Label>
                  <p className="text-sm text-primary-900 mt-1">{voice.tone}</p>
                </div>
                <div>
                  <Label className="text-xs text-primary-600">Target Audience</Label>
                  <p className="text-sm text-primary-900 mt-1">{voice.targetAudience}</p>
                </div>
                {voice.keyPhrases.length > 0 && (
                  <div>
                    <Label className="text-xs text-primary-600">Key Phrases</Label>
                    <div className="flex flex-wrap gap-1 mt-1">
                      {voice.keyPhrases.slice(0, 3).map((phrase, idx) => (
                        <Badge key={idx} variant="outline">
                          {phrase}
                        </Badge>
                      ))}
                      {voice.keyPhrases.length > 3 && (
                        <Badge variant="outline">+{voice.keyPhrases.length - 3} more</Badge>
                      )}
                    </div>
                  </div>
                )}
                <div className="flex items-center gap-2 pt-2">
                  <Button
                    variant="outline"
                    size="sm"
                    onClick={() => handleEdit(voice)}
                  >
                    <Edit2 className="h-3 w-3 mr-2" />
                    Edit
                  </Button>
                  {!voice.isDefault && (
                    <Button
                      variant="ghost"
                      size="sm"
                      onClick={() => handleSetDefault(voice.id)}
                    >
                      <Check className="h-3 w-3 mr-2" />
                      Set Default
                    </Button>
                  )}
                  <Button
                    variant="ghost"
                    size="sm"
                    onClick={() => handleDelete(voice.id)}
                    className="text-error-600 hover:text-error-700 hover:bg-error-50"
                  >
                    <Trash2 className="h-3 w-3 mr-2" />
                    Delete
                  </Button>
                </div>
              </CardContent>
            </Card>
          ))}
        </div>
      )}

      {/* Create/Edit Dialog */}
      {isEditing && (
        <Dialog open={isEditing} onOpenChange={(open) => !open && handleCancel()}>
          <DialogContent className="max-w-2xl max-h-[90vh] overflow-y-auto">
            <DialogHeader>
              <DialogTitle>
                {editingVoice ? 'Edit Brand Voice' : 'Create Brand Voice'}
              </DialogTitle>
              <DialogDescription>
                Define the tone, style, and personality of your brand for AI-generated content.
              </DialogDescription>
            </DialogHeader>

            <div className="space-y-4 py-4">
              <div className="space-y-2">
                <Label htmlFor="name" required>
                  Name
                </Label>
                <Input
                  id="name"
                  placeholder="E.g., Professional Tech, Friendly Casual, Bold & Innovative"
                  value={formData.name}
                  onChange={(e) => setFormData({ ...formData, name: e.target.value })}
                />
              </div>

              <div className="space-y-2">
                <Label htmlFor="description" required>
                  Description
                </Label>
                <Textarea
                  id="description"
                  placeholder="Brief description of this brand voice"
                  value={formData.description}
                  onChange={(e) => setFormData({ ...formData, description: e.target.value })}
                  rows={2}
                />
              </div>

              <div className="grid grid-cols-2 gap-4">
                <div className="space-y-2">
                  <Label htmlFor="tone" required>
                    Tone
                  </Label>
                  <Input
                    id="tone"
                    placeholder="E.g., Professional, Casual, Friendly"
                    value={formData.tone}
                    onChange={(e) => setFormData({ ...formData, tone: e.target.value })}
                  />
                </div>

                <div className="space-y-2">
                  <Label htmlFor="targetAudience" required>
                    Target Audience
                  </Label>
                  <Input
                    id="targetAudience"
                    placeholder="E.g., Business owners, Developers"
                    value={formData.targetAudience}
                    onChange={(e) => setFormData({ ...formData, targetAudience: e.target.value })}
                  />
                </div>
              </div>

              <div className="space-y-2">
                <Label htmlFor="keyPhrases">
                  Key Phrases (Optional)
                </Label>
                <Input
                  id="keyPhrases"
                  placeholder="Comma-separated phrases that represent your brand"
                  value={formData.keyPhrases}
                  onChange={(e) => setFormData({ ...formData, keyPhrases: e.target.value })}
                />
                <p className="text-xs text-primary-500">
                  E.g., "innovation at scale", "customer-first", "data-driven"
                </p>
              </div>

              <div className="grid grid-cols-2 gap-4">
                <div className="space-y-2">
                  <Label htmlFor="dosList">
                    Do's (Optional)
                  </Label>
                  <Textarea
                    id="dosList"
                    placeholder="One per line&#10;E.g., Use active voice&#10;Keep it concise&#10;Include data"
                    value={formData.dosList}
                    onChange={(e) => setFormData({ ...formData, dosList: e.target.value })}
                    rows={4}
                  />
                </div>

                <div className="space-y-2">
                  <Label htmlFor="dontsList">
                    Don'ts (Optional)
                  </Label>
                  <Textarea
                    id="dontsList"
                    placeholder="One per line&#10;E.g., Avoid jargon&#10;No exclamation marks&#10;Don't oversell"
                    value={formData.dontsList}
                    onChange={(e) => setFormData({ ...formData, dontsList: e.target.value })}
                    rows={4}
                  />
                </div>
              </div>
            </div>

            <DialogFooter>
              <Button variant="ghost" onClick={handleCancel}>
                Cancel
              </Button>
              <Button
                onClick={editingVoice ? handleUpdate : handleCreate}
                disabled={!formData.name || !formData.description || !formData.tone || !formData.targetAudience}
              >
                <Save className="h-4 w-4 mr-2" />
                {editingVoice ? 'Update' : 'Create'}
              </Button>
            </DialogFooter>
          </DialogContent>
        </Dialog>
      )}
    </div>
  );
}
