'use client';

import React, { useState } from 'react';
import Header from '@/components/Header';
import Hero from '@/components/Hero';
import CategorySelector from '@/components/CategorySelector';
import WaitlistForm from '@/components/WaitlistForm';
import KochiTrustBadges from '@/components/KochiTrustBadges';
import HowItWorks from '@/components/HowItWorks';
import TechnicianPerks from '@/components/TechnicianPerks';
import FaqSection from '@/components/FaqSection';
import Footer from '@/components/Footer';
import SupabaseSetupModal from '@/components/SupabaseSetupModal';

export default function HomePage() {
  const [selectedCategory, setSelectedCategory] = useState<string>('Plumbing');
  const [activeRole, setActiveRole] = useState<'customer' | 'technician'>('customer');
  const [isSetupModalOpen, setIsSetupModalOpen] = useState<boolean>(false);

  const handleSelectCategory = (categoryId: string) => {
    setSelectedCategory(categoryId);
  };

  const handleSetRole = (role: 'customer' | 'technician') => {
    setActiveRole(role);
    const formElement = document.getElementById('waitlist');
    formElement?.scrollIntoView({ behavior: 'smooth' });
  };

  return (
    <main className="min-h-screen flex flex-col">
      {/* Top Header */}
      <Header onOpenSetupModal={() => setIsSetupModalOpen(true)} />

      {/* Hero Section */}
      <Hero
        onSelectCategory={handleSelectCategory}
        onSetRole={handleSetRole}
      />

      {/* Category Selector (Plumbing, Electrical, Carpentry) */}
      <CategorySelector
        selectedCategory={selectedCategory}
        onSelectCategory={handleSelectCategory}
      />

      {/* Waitlist Form with Malayalam Input Box and Supabase Handler */}
      <WaitlistForm
        selectedCategory={selectedCategory}
        onSelectCategory={handleSelectCategory}
        activeRole={activeRole}
        onRoleChange={setActiveRole}
        onOpenSetupModal={() => setIsSetupModalOpen(true)}
      />

      {/* Hyperlocal Trust & Verification Badges */}
      <KochiTrustBadges />

      {/* How it works */}
      <HowItWorks />

      {/* Dedicated Technician Value Section */}
      <TechnicianPerks
        onJoinAsTech={() => handleSetRole('technician')}
      />

      {/* FAQ Section */}
      <FaqSection />

      {/* Footer */}
      <Footer onOpenSetupModal={() => setIsSetupModalOpen(true)} />

      {/* Supabase Setup / Guide Modal */}
      <SupabaseSetupModal
        isOpen={isSetupModalOpen}
        onClose={() => setIsSetupModalOpen(false)}
      />
    </main>
  );
}
