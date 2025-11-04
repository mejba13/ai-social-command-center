'use client';

import { Breadcrumb } from '@/components/layout/breadcrumb';
import { BrandVoiceManager } from '@/components/features/brand-voice-manager';

export default function BrandVoicePage() {
  return (
    <div>
      <Breadcrumb />
      <BrandVoiceManager mode="page" />
    </div>
  );
}
