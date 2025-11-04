'use client';

import { useState } from 'react';
import { useRouter } from 'next/navigation';
import {
  Image as ImageIcon,
  Video,
  Calendar,
  Send,
  Save,
  Sparkles,
} from 'lucide-react';
import { Button } from '@/components/ui/button';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';
import { Label } from '@/components/ui/label';
import { Textarea } from '@/components/ui/textarea';
import { Badge } from '@/components/ui/badge';
import { Breadcrumb } from '@/components/layout/breadcrumb';
import { AICaptionGenerator } from '@/components/features/ai-caption-generator';
import { AIImageGenerator } from '@/components/features/ai-image-generator';

const platforms = [
  { id: 'facebook', name: 'Facebook', icon: '📘', maxLength: 63206 },
  { id: 'instagram', name: 'Instagram', icon: '📸', maxLength: 2200 },
  { id: 'twitter', name: 'Twitter/X', icon: '🐦', maxLength: 280 },
  { id: 'linkedin', name: 'LinkedIn', icon: '💼', maxLength: 3000 },
  { id: 'tiktok', name: 'TikTok', icon: '🎵', maxLength: 2200 },
];

export default function NewPostPage() {
  const router = useRouter();
  const [content, setContent] = useState('');
  const [selectedPlatforms, setSelectedPlatforms] = useState<string[]>([]);
  const [scheduledDate, setScheduledDate] = useState('');
  const [scheduledTime, setScheduledTime] = useState('');
  const [media, setMedia] = useState<File[]>([]);

  const togglePlatform = (platformId: string) => {
    setSelectedPlatforms((prev) =>
      prev.includes(platformId)
        ? prev.filter((id) => id !== platformId)
        : [...prev, platformId]
    );
  };

  const handleMediaUpload = (e: React.ChangeEvent<HTMLInputElement>) => {
    if (e.target.files) {
      setMedia(Array.from(e.target.files));
    }
  };

  const handleSaveDraft = () => {
    // TODO: Save draft
    console.log('Saving draft...');
  };

  const handleSchedule = () => {
    // TODO: Schedule post
    console.log('Scheduling post...', {
      content,
      platforms: selectedPlatforms,
      scheduledDate,
      scheduledTime,
      media,
    });
    router.push('/dashboard/posts');
  };

  const handlePublishNow = () => {
    // TODO: Publish immediately
    console.log('Publishing now...');
    router.push('/dashboard/posts');
  };

  const characterLimit = selectedPlatforms.length > 0
    ? Math.min(...selectedPlatforms.map((id) =>
        platforms.find((p) => p.id === id)?.maxLength || 999999
      ))
    : 999999;

  return (
    <div>
      <Breadcrumb />

      {/* Header */}
      <div className="mb-8">
        <h1 className="text-h1 text-primary-900 mb-2">Create New Post</h1>
        <p className="text-body text-primary-600">
          Compose and schedule your social media post
        </p>
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
        {/* Main Content Area */}
        <div className="lg:col-span-2 space-y-6">
          {/* Platform Selector */}
          <Card>
            <CardHeader>
              <CardTitle>Select Platforms</CardTitle>
              <CardDescription>
                Choose where you want to publish this post
              </CardDescription>
            </CardHeader>
            <CardContent>
              <div className="grid grid-cols-2 md:grid-cols-3 gap-3">
                {platforms.map((platform) => (
                  <button
                    key={platform.id}
                    onClick={() => togglePlatform(platform.id)}
                    className={`flex flex-col items-center justify-center p-4 rounded-lg border-2 transition-all ${
                      selectedPlatforms.includes(platform.id)
                        ? 'border-accent-500 bg-accent-50'
                        : 'border-primary-200 hover:border-primary-300 hover:bg-primary-50'
                    }`}
                  >
                    <span className="text-3xl mb-2">{platform.icon}</span>
                    <span className="text-sm font-medium text-primary-900">
                      {platform.name}
                    </span>
                    {selectedPlatforms.includes(platform.id) && (
                      <Badge variant="success" className="mt-2">
                        Selected
                      </Badge>
                    )}
                  </button>
                ))}
              </div>
            </CardContent>
          </Card>

          {/* Post Content */}
          <Card>
            <CardHeader>
              <div className="flex items-center justify-between">
                <div>
                  <CardTitle>Post Content</CardTitle>
                  <CardDescription>
                    Write your post content
                  </CardDescription>
                </div>
                <AICaptionGenerator
                  selectedPlatforms={selectedPlatforms}
                  onSelectCaption={(caption) => setContent(caption)}
                />
              </div>
            </CardHeader>
            <CardContent>
              <div className="space-y-4">
                <div>
                  <Textarea
                    value={content}
                    onChange={(e) => setContent(e.target.value)}
                    placeholder="What's on your mind?"
                    className="min-h-[200px] text-base"
                    maxLength={characterLimit}
                  />
                  <div className="flex items-center justify-between mt-2">
                    <span className="text-xs text-primary-500">
                      {content.length} / {characterLimit === 999999 ? '∞' : characterLimit} characters
                    </span>
                    {selectedPlatforms.length > 0 && (
                      <span className="text-xs text-primary-500">
                        Character limit for:{' '}
                        {platforms.find((p) => p.maxLength === characterLimit)?.name}
                      </span>
                    )}
                  </div>
                </div>

                {/* Media Upload */}
                <div>
                  <Label>Add Media (Optional)</Label>
                  <div className="mt-2 grid grid-cols-3 gap-3">
                    <label className="flex flex-col items-center justify-center h-32 border-2 border-dashed border-primary-200 rounded-lg cursor-pointer hover:border-accent-500 hover:bg-accent-50/50 transition-all">
                      <ImageIcon className="h-8 w-8 text-primary-400 mb-2" />
                      <span className="text-xs text-primary-600 font-medium">
                        Add Images
                      </span>
                      <input
                        type="file"
                        accept="image/*"
                        multiple
                        className="hidden"
                        onChange={handleMediaUpload}
                      />
                    </label>

                    <label className="flex flex-col items-center justify-center h-32 border-2 border-dashed border-primary-200 rounded-lg cursor-pointer hover:border-accent-500 hover:bg-accent-50/50 transition-all">
                      <Video className="h-8 w-8 text-primary-400 mb-2" />
                      <span className="text-xs text-primary-600 font-medium">
                        Add Videos
                      </span>
                      <input
                        type="file"
                        accept="video/*"
                        className="hidden"
                        onChange={handleMediaUpload}
                      />
                    </label>

                    <AIImageGenerator
                      onSelectImage={(imageUrl) => {
                        // TODO: Convert URL to File and add to media
                        console.log('Generated image:', imageUrl);
                      }}
                      trigger={
                        <button className="flex flex-col items-center justify-center h-32 border-2 border-dashed border-accent-500 rounded-lg hover:border-accent-600 hover:bg-accent-50/50 transition-all">
                          <Sparkles className="h-8 w-8 text-accent-500 mb-2" />
                          <span className="text-xs text-accent-600 font-medium">
                            AI Generate
                          </span>
                        </button>
                      }
                    />
                  </div>

                  {media.length > 0 && (
                    <div className="mt-3 space-y-2">
                      {media.map((file, index) => (
                        <div
                          key={index}
                          className="flex items-center gap-3 p-2 bg-primary-50 rounded-lg"
                        >
                          <div className="h-10 w-10 bg-primary-200 rounded flex items-center justify-center flex-shrink-0">
                            {file.type.startsWith('image/') ? (
                              <ImageIcon className="h-5 w-5 text-primary-600" />
                            ) : (
                              <Video className="h-5 w-5 text-primary-600" />
                            )}
                          </div>
                          <div className="flex-1 min-w-0">
                            <p className="text-sm font-medium text-primary-900 truncate">
                              {file.name}
                            </p>
                            <p className="text-xs text-primary-500">
                              {(file.size / 1024 / 1024).toFixed(2)} MB
                            </p>
                          </div>
                          <Button
                            variant="ghost"
                            size="sm"
                            onClick={() =>
                              setMedia((prev) => prev.filter((_, i) => i !== index))
                            }
                          >
                            Remove
                          </Button>
                        </div>
                      ))}
                    </div>
                  )}
                </div>
              </div>
            </CardContent>
          </Card>
        </div>

        {/* Sidebar - Schedule & Actions */}
        <div className="space-y-6">
          {/* Schedule */}
          <Card>
            <CardHeader>
              <CardTitle>Schedule</CardTitle>
              <CardDescription>
                When should this be published?
              </CardDescription>
            </CardHeader>
            <CardContent className="space-y-4">
              <div>
                <Label htmlFor="date">Date</Label>
                <input
                  id="date"
                  type="date"
                  value={scheduledDate}
                  onChange={(e) => setScheduledDate(e.target.value)}
                  className="input mt-2"
                />
              </div>

              <div>
                <Label htmlFor="time">Time</Label>
                <input
                  id="time"
                  type="time"
                  value={scheduledTime}
                  onChange={(e) => setScheduledTime(e.target.value)}
                  className="input mt-2"
                />
              </div>

              <div className="pt-4 border-t border-primary-200">
                <p className="text-xs text-primary-500 mb-2">
                  Or publish immediately
                </p>
                <Button
                  variant="outline"
                  className="w-full"
                  onClick={handlePublishNow}
                  disabled={selectedPlatforms.length === 0 || !content}
                >
                  <Send className="h-4 w-4 mr-2" />
                  Publish Now
                </Button>
              </div>
            </CardContent>
          </Card>

          {/* Actions */}
          <Card>
            <CardHeader>
              <CardTitle>Actions</CardTitle>
            </CardHeader>
            <CardContent className="space-y-3">
              <Button
                className="w-full"
                onClick={handleSchedule}
                disabled={
                  selectedPlatforms.length === 0 ||
                  !content ||
                  !scheduledDate ||
                  !scheduledTime
                }
              >
                <Calendar className="h-4 w-4 mr-2" />
                Schedule Post
              </Button>

              <Button
                variant="outline"
                className="w-full"
                onClick={handleSaveDraft}
                disabled={!content}
              >
                <Save className="h-4 w-4 mr-2" />
                Save Draft
              </Button>

              <Button
                variant="ghost"
                className="w-full"
                onClick={() => router.back()}
              >
                Cancel
              </Button>
            </CardContent>
          </Card>

          {/* Preview (Placeholder) */}
          <Card>
            <CardHeader>
              <CardTitle>Preview</CardTitle>
              <CardDescription>
                How your post will look
              </CardDescription>
            </CardHeader>
            <CardContent>
              <div className="bg-primary-50 rounded-lg p-4">
                <p className="text-sm text-primary-600 italic">
                  {content || 'Your post content will appear here...'}
                </p>
              </div>
            </CardContent>
          </Card>
        </div>
      </div>
    </div>
  );
}
