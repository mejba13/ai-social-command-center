'use client';

import { useState, useEffect } from 'react';
import { Sparkles, Loader2, Copy, Check, RefreshCw, Settings } from 'lucide-react';
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
import { BrandVoiceManager } from './brand-voice-manager';
import { config } from '@/lib/config';
import { apiCall } from '@/lib/api/mock-api';

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

const toneOptions = [
  { value: 'professional', label: 'Professional', emoji: '💼' },
  { value: 'casual', label: 'Casual', emoji: '😊' },
  { value: 'funny', label: 'Funny', emoji: '😄' },
  { value: 'inspirational', label: 'Inspirational', emoji: '✨' },
  { value: 'educational', label: 'Educational', emoji: '📚' },
];

const lengthOptions = [
  { value: 'short', label: 'Short', description: '50-100 chars' },
  { value: 'medium', label: 'Medium', description: '100-200 chars' },
  { value: 'long', label: 'Long', description: '200+ chars' },
];

const providerOptions = [
  { value: 'openai', label: 'OpenAI GPT-4', description: 'Fast, versatile' },
  { value: 'anthropic', label: 'Anthropic Claude', description: 'Thoughtful, nuanced' },
];

interface AICaptionGeneratorProps {
  selectedPlatforms?: string[];
  onSelectCaption: (caption: string) => void;
  trigger?: React.ReactNode;
}

export function AICaptionGenerator({
  selectedPlatforms = [],
  onSelectCaption,
  trigger,
}: AICaptionGeneratorProps) {
  const [open, setOpen] = useState(false);
  const [loading, setLoading] = useState(false);
  const [topic, setTopic] = useState('');
  const [tone, setTone] = useState('professional');
  const [length, setLength] = useState('medium');
  const [provider, setProvider] = useState('openai');
  const [includeHashtags, setIncludeHashtags] = useState(true);
  const [includeEmojis, setIncludeEmojis] = useState(true);
  const [brandVoice, setBrandVoice] = useState('');
  const [targetAudience, setTargetAudience] = useState('');
  const [captions, setCaptions] = useState<string[]>([]);
  const [copiedIndex, setCopiedIndex] = useState<number | null>(null);
  const [brandVoices, setBrandVoices] = useState<BrandVoice[]>([]);
  const [selectedBrandVoiceId, setSelectedBrandVoiceId] = useState<string>('');
  const [showBrandVoiceSelector, setShowBrandVoiceSelector] = useState(false);

  // Load brand voices on mount
  useEffect(() => {
    const stored = localStorage.getItem('brandVoices');
    if (stored) {
      const voices: BrandVoice[] = JSON.parse(stored);
      setBrandVoices(voices);

      // Auto-select default brand voice if exists
      const defaultVoice = voices.find((v) => v.isDefault);
      if (defaultVoice) {
        handleSelectBrandVoice(defaultVoice);
      }
    }
  }, []);

  const handleSelectBrandVoice = (voice: BrandVoice) => {
    setSelectedBrandVoiceId(voice.id);
    setBrandVoice(voice.tone);
    setTargetAudience(voice.targetAudience);
    setTone(voice.tone.toLowerCase().split(' ')[0] as any); // Try to match tone
    setShowBrandVoiceSelector(false);
  };

  const handleClearBrandVoice = () => {
    setSelectedBrandVoiceId('');
    setBrandVoice('');
    setTargetAudience('');
  };

  const handleGenerate = async () => {
    if (!topic.trim()) {
      return;
    }

    setLoading(true);
    setCaptions([]);

    try {
      const data = await apiCall<{ status: string; data: { captions: string[] } }>(
        `${config.api.baseUrl}/api/v1/ai/generate-caption`,
        {
          method: 'POST',
          headers: {
            'Content-Type': 'application/json',
          },
          body: JSON.stringify({
            topic,
            tone,
            length,
            platform: selectedPlatforms[0], // Use first selected platform
            includeHashtags,
            includeEmojis,
            brandVoice: brandVoice || undefined,
            targetAudience: targetAudience || undefined,
            provider,
          }),
        },
        config.dev.useMockAI
      );

      setCaptions(data.data.captions);
    } catch (error) {
      console.error('Error generating captions:', error);
      // TODO: Show error toast
    } finally {
      setLoading(false);
    }
  };

  const handleCopyCaption = async (caption: string, index: number) => {
    await navigator.clipboard.writeText(caption);
    setCopiedIndex(index);
    setTimeout(() => setCopiedIndex(null), 2000);
  };

  const handleUseCaption = (caption: string) => {
    onSelectCaption(caption);
    setOpen(false);
  };

  const resetForm = () => {
    setTopic('');
    setCaptions([]);
    // Keep other settings for convenience
  };

  return (
    <Dialog open={open} onOpenChange={setOpen}>
      <DialogTrigger asChild>
        {trigger || (
          <Button variant="outline" size="sm">
            <Sparkles className="h-4 w-4 mr-2" />
            AI Generate
          </Button>
        )}
      </DialogTrigger>
      <DialogContent className="max-w-4xl max-h-[90vh] overflow-y-auto">
        <DialogHeader>
          <DialogTitle>AI Caption Generator</DialogTitle>
          <DialogDescription>
            Generate engaging captions with AI. Customize the tone, length, and style to match your brand.
          </DialogDescription>
        </DialogHeader>

        <div className="space-y-6 py-4">
          {/* Topic Input */}
          <div className="space-y-2">
            <Label htmlFor="topic" required>
              What's your post about?
            </Label>
            <Textarea
              id="topic"
              placeholder="E.g., Launching a new product, sharing a company milestone, promoting a webinar..."
              value={topic}
              onChange={(e) => setTopic(e.target.value)}
              className="min-h-[80px]"
            />
          </div>

          {/* Tone Selection */}
          <div className="space-y-2">
            <Label>Tone</Label>
            <div className="grid grid-cols-5 gap-2">
              {toneOptions.map((option) => (
                <button
                  key={option.value}
                  onClick={() => setTone(option.value)}
                  className={`flex flex-col items-center justify-center p-3 rounded-lg border-2 transition-all text-center ${
                    tone === option.value
                      ? 'border-accent-500 bg-accent-50'
                      : 'border-primary-200 hover:border-primary-300 hover:bg-primary-50'
                  }`}
                >
                  <span className="text-2xl mb-1">{option.emoji}</span>
                  <span className="text-xs font-medium text-primary-900">
                    {option.label}
                  </span>
                </button>
              ))}
            </div>
          </div>

          {/* Length Selection */}
          <div className="space-y-2">
            <Label>Length</Label>
            <div className="grid grid-cols-3 gap-3">
              {lengthOptions.map((option) => (
                <button
                  key={option.value}
                  onClick={() => setLength(option.value)}
                  className={`flex flex-col p-3 rounded-lg border-2 transition-all ${
                    length === option.value
                      ? 'border-accent-500 bg-accent-50'
                      : 'border-primary-200 hover:border-primary-300 hover:bg-primary-50'
                  }`}
                >
                  <span className="text-sm font-medium text-primary-900 mb-1">
                    {option.label}
                  </span>
                  <span className="text-xs text-primary-600">
                    {option.description}
                  </span>
                </button>
              ))}
            </div>
          </div>

          {/* Options */}
          <div className="grid grid-cols-2 gap-4">
            <div className="flex items-center justify-between p-3 border border-primary-200 rounded-lg">
              <Label htmlFor="hashtags" className="cursor-pointer">
                Include Hashtags
              </Label>
              <input
                id="hashtags"
                type="checkbox"
                checked={includeHashtags}
                onChange={(e) => setIncludeHashtags(e.target.checked)}
                className="h-4 w-4 rounded border-primary-300 text-accent-500 focus:ring-accent-500"
              />
            </div>
            <div className="flex items-center justify-between p-3 border border-primary-200 rounded-lg">
              <Label htmlFor="emojis" className="cursor-pointer">
                Include Emojis
              </Label>
              <input
                id="emojis"
                type="checkbox"
                checked={includeEmojis}
                onChange={(e) => setIncludeEmojis(e.target.checked)}
                className="h-4 w-4 rounded border-primary-300 text-accent-500 focus:ring-accent-500"
              />
            </div>
          </div>

          {/* Brand Voice Selector */}
          {brandVoices.length > 0 && (
            <div className="space-y-2">
              <div className="flex items-center justify-between">
                <Label>Brand Voice Profile (Optional)</Label>
                {selectedBrandVoiceId && (
                  <Button
                    variant="ghost"
                    size="sm"
                    onClick={handleClearBrandVoice}
                    className="h-auto py-1 px-2 text-xs"
                  >
                    Clear
                  </Button>
                )}
              </div>
              {!showBrandVoiceSelector ? (
                <button
                  onClick={() => setShowBrandVoiceSelector(true)}
                  className="w-full p-3 border-2 border-dashed border-primary-200 rounded-lg hover:border-accent-500 hover:bg-accent-50/50 transition-all"
                >
                  {selectedBrandVoiceId ? (
                    <div className="flex items-center justify-between">
                      <div className="text-left">
                        <p className="font-medium text-primary-900">
                          {brandVoices.find((v) => v.id === selectedBrandVoiceId)?.name}
                        </p>
                        <p className="text-xs text-primary-600">
                          {brandVoices.find((v) => v.id === selectedBrandVoiceId)?.description}
                        </p>
                      </div>
                      <Settings className="h-4 w-4 text-primary-400" />
                    </div>
                  ) : (
                    <div className="flex items-center justify-center gap-2">
                      <Settings className="h-4 w-4 text-primary-400" />
                      <span className="text-sm text-primary-600">
                        Select a brand voice profile
                      </span>
                    </div>
                  )}
                </button>
              ) : (
                <div className="p-4 border-2 border-accent-500 rounded-lg bg-accent-50/50">
                  <BrandVoiceManager
                    mode="selector"
                    onSelect={handleSelectBrandVoice}
                    selectedId={selectedBrandVoiceId}
                  />
                  <Button
                    variant="ghost"
                    size="sm"
                    onClick={() => setShowBrandVoiceSelector(false)}
                    className="w-full mt-2"
                  >
                    Cancel
                  </Button>
                </div>
              )}
            </div>
          )}

          {/* Advanced Options */}
          <details className="group">
            <summary className="cursor-pointer text-sm font-medium text-primary-700 hover:text-primary-900 transition-colors">
              Advanced Options
            </summary>
            <div className="mt-4 space-y-4 p-4 bg-primary-50 rounded-lg">
              <div className="space-y-2">
                <Label htmlFor="brandVoice">
                  Brand Voice (Optional)
                </Label>
                <Input
                  id="brandVoice"
                  placeholder="E.g., friendly and approachable, tech-savvy and innovative..."
                  value={brandVoice}
                  onChange={(e) => setBrandVoice(e.target.value)}
                  disabled={!!selectedBrandVoiceId}
                />
                {selectedBrandVoiceId && (
                  <p className="text-xs text-primary-500">
                    Using brand voice from profile
                  </p>
                )}
              </div>
              <div className="space-y-2">
                <Label htmlFor="targetAudience">
                  Target Audience (Optional)
                </Label>
                <Input
                  id="targetAudience"
                  placeholder="E.g., small business owners, tech enthusiasts, millennials..."
                  value={targetAudience}
                  onChange={(e) => setTargetAudience(e.target.value)}
                  disabled={!!selectedBrandVoiceId}
                />
                {selectedBrandVoiceId && (
                  <p className="text-xs text-primary-500">
                    Using target audience from profile
                  </p>
                )}
              </div>
              <div className="space-y-2">
                <Label>AI Provider</Label>
                <div className="grid grid-cols-2 gap-3">
                  {providerOptions.map((option) => (
                    <button
                      key={option.value}
                      onClick={() => setProvider(option.value)}
                      className={`flex flex-col p-3 rounded-lg border-2 transition-all text-left ${
                        provider === option.value
                          ? 'border-accent-500 bg-accent-50'
                          : 'border-primary-200 hover:border-primary-300 hover:bg-primary-50'
                      }`}
                    >
                      <span className="text-sm font-medium text-primary-900 mb-1">
                        {option.label}
                      </span>
                      <span className="text-xs text-primary-600">
                        {option.description}
                      </span>
                    </button>
                  ))}
                </div>
              </div>
            </div>
          </details>

          {/* Generate Button */}
          <Button
            onClick={handleGenerate}
            disabled={!topic.trim() || loading}
            className="w-full"
            size="lg"
          >
            {loading ? (
              <>
                <Loader2 className="h-5 w-5 mr-2 animate-spin" />
                Generating...
              </>
            ) : (
              <>
                <Sparkles className="h-5 w-5 mr-2" />
                Generate Captions
              </>
            )}
          </Button>

          {/* Generated Captions */}
          {captions.length > 0 && (
            <div className="space-y-3">
              <div className="flex items-center justify-between">
                <Label className="text-base">Generated Captions</Label>
                <Button
                  variant="ghost"
                  size="sm"
                  onClick={resetForm}
                >
                  <RefreshCw className="h-4 w-4 mr-2" />
                  Generate New
                </Button>
              </div>
              <div className="space-y-3">
                {captions.map((caption, index) => (
                  <div
                    key={index}
                    className="relative p-4 border-2 border-primary-200 rounded-lg hover:border-accent-500 transition-all bg-white group"
                  >
                    <div className="flex items-start gap-3">
                      <Badge variant="default" className="mt-1 flex-shrink-0">
                        #{index + 1}
                      </Badge>
                      <p className="flex-1 text-sm text-primary-800 leading-relaxed whitespace-pre-wrap">
                        {caption}
                      </p>
                    </div>
                    <div className="flex items-center gap-2 mt-4 pt-3 border-t border-primary-100">
                      <Button
                        variant="default"
                        size="sm"
                        onClick={() => handleUseCaption(caption)}
                      >
                        Use This Caption
                      </Button>
                      <Button
                        variant="ghost"
                        size="sm"
                        onClick={() => handleCopyCaption(caption, index)}
                      >
                        {copiedIndex === index ? (
                          <>
                            <Check className="h-4 w-4 mr-2" />
                            Copied!
                          </>
                        ) : (
                          <>
                            <Copy className="h-4 w-4 mr-2" />
                            Copy
                          </>
                        )}
                      </Button>
                    </div>
                  </div>
                ))}
              </div>
            </div>
          )}

          {/* Platform Context */}
          {selectedPlatforms.length > 0 && (
            <div className="p-3 bg-blue-50 border border-blue-200 rounded-lg">
              <p className="text-xs text-blue-800">
                <strong>Tip:</strong> Captions will be optimized for{' '}
                <span className="font-semibold">{selectedPlatforms[0]}</span>
                {selectedPlatforms.length > 1 && ` and ${selectedPlatforms.length - 1} other platform(s)`}
              </p>
            </div>
          )}
        </div>

        <DialogFooter>
          <Button variant="ghost" onClick={() => setOpen(false)}>
            Close
          </Button>
        </DialogFooter>
      </DialogContent>
    </Dialog>
  );
}
