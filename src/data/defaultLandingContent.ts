import { LandingContent } from '@/types';

export const defaultLandingContent: LandingContent = {
  hero: {
    title: 'Flowers, Crafted with Love',
    subtitle: 'Premium hand-wrapped bouquets for every occasion. Delivered fresh to your door.',
    buttonText: 'Shop Collection',
    imageUrl: '',
  },
  weddings: {
    sectionLabel: 'Special Occasions',
    sectionTitle: 'Weddings & Ceremonies',
    sectionDescription: 'From intimate ceremonies to grand celebrations, we create breathtaking floral experiences tailored to your vision.',
    weddingTitle: 'Bridal & Wedding Florals',
    weddingDescription: 'Exquisite bridal bouquets, centerpieces, and venue decorations designed to make your special day unforgettable.',
    weddingImageUrl: '',
    ceremonialTitle: 'Grand Ceremonial Designs',
    ceremonialDescription: 'Lavish floral installations for galas, anniversaries, corporate events, and religious ceremonies.',
    ceremonialImageUrl: '',
  },
  services: ['Wedding Packages', 'VIP Event Styling', 'Custom Designs', 'Same-Day Delivery'],
  whyChooseUs: [
    { title: 'Farm Fresh', description: 'Sourced directly from premium farms, ensuring the freshest blooms with every delivery.' },
    { title: 'Custom Wrapping', description: 'Each arrangement is hand-wrapped with premium materials to create a gift-worthy presentation.' },
    { title: 'Same Day Delivery', description: 'Order before 2 PM and receive your flowers the same day, anywhere in the city.' },
  ],
};
