'use client';

import { useState } from 'react';
import { Sparkles, Loader2, Download, Copy, Check, RefreshCw, Image as ImageIcon } from 'lucide-react';
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
import { Label } from '@/components/ui/label';
import { Textarea } from '@/components/ui/textarea';
import { Badge } from '@/components/ui/badge';
import { config } from '@/lib/config';
import { apiCall } from '@/lib/api/mock-api';

const styleOptions = [
  {
    value: 'realistic',
    label: 'Realistic',
    emoji: '📷',
    description: 'Photorealistic, high quality',
  },
  {
    value: 'artistic',
    label: 'Artistic',
    emoji: '🎨',
    description: 'Creative, stylized',
  },
  {
    value: 'minimalist',
    label: 'Minimalist',
    emoji: '⬜',
    description: 'Clean, simple design',
  },
  {
    value: 'vibrant',
    label: 'Vibrant',
    emoji: '🌈',
    description: 'Bold, energetic colors',
  },
  {
    value: 'professional',
    label: 'Professional',
    emoji: '💼',
    description: 'Corporate, polished',
  },
];

const aspectRatioOptions = [
  {
    value: '1:1',
    label: 'Square (1:1)',
    size: '1024x1024',
    platforms: ['Instagram', 'Facebook'],
  },
  {
    value: '16:9',
    label: 'Landscape (16:9)',
    size: '1792x1024',
    platforms: ['YouTube', 'LinkedIn'],
  },
  {
    value: '9:16',
    label: 'Portrait (9:16)',
    size: '1024x1792',
    platforms: ['Instagram Stories', 'TikTok'],
  },
  {
    value: '4:5',
    label: 'Portrait (4:5)',
    size: '1024x1280',
    platforms: ['Instagram Feed'],
  },
];

const qualityOptions = [
  { value: 'standard', label: 'Standard', description: 'Faster, lower cost' },
  { value: 'hd', label: 'HD', description: 'Higher quality, slower' },
];

interface AIImageGeneratorProps {
  onSelectImage: (imageUrl: string) => void;
  trigger?: React.ReactNode;
}

export function AIImageGenerator({ onSelectImage, trigger }: AIImageGeneratorProps) {
  const [open, setOpen] = useState(false);
  const [loading, setLoading] = useState(false);
  const [prompt, setPrompt] = useState('');
  const [style, setStyle] = useState('realistic');
  const [aspectRatio, setAspectRatio] = useState('1:1');
  const [quality, setQuality] = useState('standard');
  const [generatedImage, setGeneratedImage] = useState<string>('');
  const [copied, setCopied] = useState(false);

  const handleGenerate = async () => {
    if (!prompt.trim()) {
      return;
    }

    setLoading(true);
    setGeneratedImage('');

    try {
      const data = await apiCall<{ status: string; data: { imageUrl: string } }>(
        `${config.api.baseUrl}/api/v1/ai/generate-image`,
        {
          method: 'POST',
          headers: {
            'Content-Type': 'application/json',
          },
          body: JSON.stringify({
            prompt,
            style,
            aspectRatio,
            quality,
          }),
        },
        config.dev.useMockAI
      );

      setGeneratedImage(data.data.imageUrl);
    } catch (error) {
      console.error('Error generating image:', error);
      // TODO: Show error toast
    } finally {
      setLoading(false);
    }
  };

  const handleCopyUrl = async () => {
    if (generatedImage) {
      await navigator.clipboard.writeText(generatedImage);
      setCopied(true);
      setTimeout(() => setCopied(false), 2000);
    }
  };

  const handleDownload = async () => {
    if (generatedImage) {
      const link = document.createElement('a');
      link.href = generatedImage;
      link.download = `ai-generated-${Date.now()}.png`;
      link.click();
    }
  };

  const handleUseImage = () => {
    if (generatedImage) {
      onSelectImage(generatedImage);
      setOpen(false);
    }
  };

  const resetForm = () => {
    setPrompt('');
    setGeneratedImage('');
    // Keep other settings for convenience
  };

  return (
    <Dialog open={open} onOpenChange={setOpen}>
      <DialogTrigger asChild>
        {trigger || (
          <Button variant="outline" size="sm">
            <Sparkles className="h-4 w-4 mr-2" />
            AI Generate Image
          </Button>
        )}
      </DialogTrigger>
      <DialogContent className="max-w-4xl max-h-[90vh] overflow-y-auto">
        <DialogHeader>
          <DialogTitle>AI Image Generator</DialogTitle>
          <DialogDescription>
            Generate unique images with DALL-E 3. Describe what you want to see and customize the style.
          </DialogDescription>
        </DialogHeader>

        <div className="space-y-6 py-4">
          {/* Prompt Input */}
          <div className="space-y-2">
            <Label htmlFor="prompt" required>
              Describe your image
            </Label>
            <Textarea
              id="prompt"
              placeholder="E.g., A modern office workspace with natural lighting, plants, and a laptop showing analytics dashboard..."
              value={prompt}
              onChange={(e) => setPrompt(e.target.value)}
              className="min-h-[100px]"
              maxLength={1000}
            />
            <div className="flex items-center justify-between">
              <span className="text-xs text-primary-500">
                {prompt.length} / 1000 characters
              </span>
              <span className="text-xs text-primary-500">
                Be specific and detailed for best results
              </span>
            </div>
          </div>

          {/* Style Selection */}
          <div className="space-y-2">
            <Label>Style</Label>
            <div className="grid grid-cols-5 gap-2">
              {styleOptions.map((option) => (
                <button
                  key={option.value}
                  onClick={() => setStyle(option.value)}
                  className={`flex flex-col items-center justify-center p-3 rounded-lg border-2 transition-all text-center ${
                    style === option.value
                      ? 'border-accent-500 bg-accent-50'
                      : 'border-primary-200 hover:border-primary-300 hover:bg-primary-50'
                  }`}
                >
                  <span className="text-2xl mb-1">{option.emoji}</span>
                  <span className="text-xs font-medium text-primary-900">
                    {option.label}
                  </span>
                  <span className="text-[10px] text-primary-600 mt-0.5">
                    {option.description}
                  </span>
                </button>
              ))}
            </div>
          </div>

          {/* Aspect Ratio Selection */}
          <div className="space-y-2">
            <Label>Aspect Ratio</Label>
            <div className="grid grid-cols-2 md:grid-cols-4 gap-3">
              {aspectRatioOptions.map((option) => (
                <button
                  key={option.value}
                  onClick={() => setAspectRatio(option.value)}
                  className={`flex flex-col p-3 rounded-lg border-2 transition-all text-left ${
                    aspectRatio === option.value
                      ? 'border-accent-500 bg-accent-50'
                      : 'border-primary-200 hover:border-primary-300 hover:bg-primary-50'
                  }`}
                >
                  <span className="text-sm font-medium text-primary-900 mb-1">
                    {option.label}
                  </span>
                  <span className="text-xs text-primary-600 mb-1">
                    {option.size}
                  </span>
                  <div className="flex flex-wrap gap-1">
                    {option.platforms.slice(0, 2).map((platform, idx) => (
                      <Badge key={idx} variant="outline" className="text-[10px] px-1 py-0">
                        {platform}
                      </Badge>
                    ))}
                  </div>
                </button>
              ))}
            </div>
          </div>

          {/* Quality Selection */}
          <div className="space-y-2">
            <Label>Quality</Label>
            <div className="grid grid-cols-2 gap-3">
              {qualityOptions.map((option) => (
                <button
                  key={option.value}
                  onClick={() => setQuality(option.value)}
                  className={`flex flex-col p-3 rounded-lg border-2 transition-all text-left ${
                    quality === option.value
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

          {/* Generate Button */}
          <Button
            onClick={handleGenerate}
            disabled={!prompt.trim() || loading}
            className="w-full"
            size="lg"
          >
            {loading ? (
              <>
                <Loader2 className="h-5 w-5 mr-2 animate-spin" />
                Generating... (this may take 10-30 seconds)
              </>
            ) : (
              <>
                <Sparkles className="h-5 w-5 mr-2" />
                Generate Image
              </>
            )}
          </Button>

          {/* Generated Image */}
          {generatedImage && (
            <div className="space-y-3">
              <div className="flex items-center justify-between">
                <Label className="text-base">Generated Image</Label>
                <Button
                  variant="ghost"
                  size="sm"
                  onClick={resetForm}
                >
                  <RefreshCw className="h-4 w-4 mr-2" />
                  Generate New
                </Button>
              </div>
              <div className="relative rounded-lg overflow-hidden border-2 border-primary-200 bg-primary-50">
                <img
                  src={generatedImage}
                  alt="AI Generated"
                  className="w-full h-auto"
                />
              </div>
              <div className="flex items-center gap-2">
                <Button
                  variant="default"
                  onClick={handleUseImage}
                  className="flex-1"
                >
                  <Check className="h-4 w-4 mr-2" />
                  Use This Image
                </Button>
                <Button
                  variant="outline"
                  onClick={handleDownload}
                >
                  <Download className="h-4 w-4 mr-2" />
                  Download
                </Button>
                <Button
                  variant="ghost"
                  onClick={handleCopyUrl}
                >
                  {copied ? (
                    <>
                      <Check className="h-4 w-4 mr-2" />
                      Copied!
                    </>
                  ) : (
                    <>
                      <Copy className="h-4 w-4 mr-2" />
                      Copy URL
                    </>
                  )}
                </Button>
              </div>
            </div>
          )}

          {/* Tips */}
          <div className="p-3 bg-blue-50 border border-blue-200 rounded-lg">
            <p className="text-xs text-blue-800">
              <strong>Tips for better results:</strong>
              <ul className="list-disc list-inside mt-1 space-y-1">
                <li>Be specific and descriptive in your prompt</li>
                <li>Include details about lighting, colors, and composition</li>
                <li>Mention the style or mood you want (e.g., "modern", "vintage", "dramatic")</li>
                <li>HD quality takes longer but produces sharper images</li>
              </ul>
            </p>
          </div>
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
