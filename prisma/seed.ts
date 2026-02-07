import { PrismaClient } from '../src/generated/prisma/client';
import { PrismaPg } from '@prisma/adapter-pg';

const adapter = new PrismaPg({ connectionString: process.env.DATABASE_URL! });
const prisma = new PrismaClient({ adapter });

async function main() {
  console.log('🌱 Seeding database...');

  // ---------------------------------------------------------------------------
  // Locales
  // ---------------------------------------------------------------------------
  const locales = [
    { code: 'en', name: 'English', nativeName: 'English', isDefault: true, sortOrder: 0 },
    { code: 'km', name: 'Khmer', nativeName: 'ខ្មែរ', sortOrder: 1 },
    { code: 'es', name: 'Spanish', nativeName: 'Español', sortOrder: 2 },
    { code: 'fr', name: 'French', nativeName: 'Français', sortOrder: 3 },
  ];

  for (const locale of locales) {
    await prisma.locale.upsert({
      where: { code: locale.code },
      update: locale,
      create: locale,
    });
  }
  console.log(`  ✓ ${locales.length} locales`);

  // ---------------------------------------------------------------------------
  // Platform Config (22 entries across categories)
  // ---------------------------------------------------------------------------
  const configs = [
    // Identity
    {
      key: 'platform.name',
      value: 'School Pillar',
      type: 'STRING' as const,
      category: 'identity',
      description: 'Platform display name',
      isPublic: true,
    },
    {
      key: 'platform.tagline',
      value: 'Find your perfect tutor',
      type: 'STRING' as const,
      category: 'identity',
      description: 'Platform tagline/subtitle',
      isPublic: true,
    },
    {
      key: 'platform.logo_url',
      value: '/logo.svg',
      type: 'STRING' as const,
      category: 'identity',
      description: 'Logo URL',
      isPublic: true,
    },
    {
      key: 'platform.support_email',
      value: 'support@schoolpillar.com',
      type: 'STRING' as const,
      category: 'identity',
      description: 'Support email address',
      isPublic: true,
    },

    // Commission & Pricing
    {
      key: 'commission.rate',
      value: 15,
      type: 'NUMBER' as const,
      category: 'commission',
      description: 'Platform commission percentage (0-100)',
    },
    {
      key: 'pricing.currency',
      value: 'USD',
      type: 'STRING' as const,
      category: 'pricing',
      description: 'Default currency code',
      isPublic: true,
    },
    {
      key: 'pricing.min_hourly_rate',
      value: 5,
      type: 'NUMBER' as const,
      category: 'pricing',
      description: 'Minimum tutor hourly rate',
    },
    {
      key: 'pricing.max_hourly_rate',
      value: 200,
      type: 'NUMBER' as const,
      category: 'pricing',
      description: 'Maximum tutor hourly rate',
    },
    {
      key: 'pricing.trial_lesson_price',
      value: 5,
      type: 'NUMBER' as const,
      category: 'pricing',
      description: 'Default trial lesson price (0 for free)',
      isPublic: true,
    },

    // Booking Rules
    {
      key: 'booking.min_advance_hours',
      value: 2,
      type: 'NUMBER' as const,
      category: 'booking',
      description: 'Minimum hours before lesson to book',
    },
    {
      key: 'booking.max_advance_days',
      value: 30,
      type: 'NUMBER' as const,
      category: 'booking',
      description: 'Maximum days in advance to book',
    },
    {
      key: 'booking.cancellation_hours',
      value: 24,
      type: 'NUMBER' as const,
      category: 'booking',
      description: 'Hours before lesson for free cancellation',
    },
    {
      key: 'booking.lesson_duration_minutes',
      value: 60,
      type: 'NUMBER' as const,
      category: 'booking',
      description: 'Default lesson duration in minutes',
      isPublic: true,
    },

    // Feature Flags
    {
      key: 'features.video_lessons',
      value: true,
      type: 'BOOLEAN' as const,
      category: 'features',
      description: 'Enable video lessons',
      isPublic: true,
    },
    {
      key: 'features.messaging',
      value: true,
      type: 'BOOLEAN' as const,
      category: 'features',
      description: 'Enable in-app messaging',
      isPublic: true,
    },
    {
      key: 'features.reviews',
      value: true,
      type: 'BOOLEAN' as const,
      category: 'features',
      description: 'Enable tutor reviews',
      isPublic: true,
    },
    {
      key: 'features.group_classes',
      value: false,
      type: 'BOOLEAN' as const,
      category: 'features',
      description: 'Enable group classes',
      isPublic: true,
    },
    {
      key: 'features.trial_lessons',
      value: true,
      type: 'BOOLEAN' as const,
      category: 'features',
      description: 'Enable trial lessons',
      isPublic: true,
    },

    // SEO
    {
      key: 'seo.title_template',
      value: '%s | School Pillar',
      type: 'STRING' as const,
      category: 'seo',
      description: 'Page title template (%s = page title)',
      isPublic: true,
    },
    {
      key: 'seo.default_description',
      value: 'Find expert tutors for 1-on-1 online lessons. Book a trial lesson today.',
      type: 'STRING' as const,
      category: 'seo',
      description: 'Default meta description',
      isPublic: true,
    },
    {
      key: 'seo.og_image',
      value: '/og-image.png',
      type: 'STRING' as const,
      category: 'seo',
      description: 'Default Open Graph image URL',
      isPublic: true,
    },

    // Tutor Settings
    {
      key: 'tutor.max_subjects',
      value: 10,
      type: 'NUMBER' as const,
      category: 'tutor',
      description: 'Maximum subjects a tutor can teach',
    },
  ];

  for (const config of configs) {
    await prisma.platformConfig.upsert({
      where: { key: config.key },
      update: {
        value: config.value,
        type: config.type,
        category: config.category,
        description: config.description,
        isPublic: config.isPublic ?? false,
      },
      create: {
        key: config.key,
        value: config.value,
        type: config.type,
        category: config.category,
        description: config.description,
        isPublic: config.isPublic ?? false,
      },
    });
  }
  console.log(`  ✓ ${configs.length} platform configs`);

  // ---------------------------------------------------------------------------
  // SEO Translations (admin-editable)
  // ---------------------------------------------------------------------------
  const translations = [
    // English
    { locale: 'en', namespace: 'seo', key: 'home.title', value: 'Find Your Perfect Tutor Online' },
    {
      locale: 'en',
      namespace: 'seo',
      key: 'home.description',
      value: 'Connect with expert tutors for 1-on-1 online lessons. Book a trial lesson today.',
    },
    { locale: 'en', namespace: 'seo', key: 'tutors.title', value: 'Browse Online Tutors' },
    {
      locale: 'en',
      namespace: 'seo',
      key: 'tutors.description',
      value: 'Find the best online tutors. Filter by subject, price, and availability.',
    },

    // Khmer
    {
      locale: 'km',
      namespace: 'seo',
      key: 'home.title',
      value: 'ស្វែងរកគ្រូបង្រៀនដ៏ល្អឥតខ្ចោះរបស់អ្នកតាមអនឡាញ',
    },
    {
      locale: 'km',
      namespace: 'seo',
      key: 'home.description',
      value: 'ភ្ជាប់ជាមួយគ្រូបង្រៀនជំនាញសម្រាប់មេរៀនអនឡាញ ១-១។ កក់មេរៀនសាកល្បងថ្ងៃនេះ។',
    },
    { locale: 'km', namespace: 'seo', key: 'tutors.title', value: 'រុករកគ្រូបង្រៀនអនឡាញ' },
    {
      locale: 'km',
      namespace: 'seo',
      key: 'tutors.description',
      value: 'ស្វែងរកគ្រូបង្រៀនអនឡាញល្អបំផុត។ ត្រងតាममុខវិជ្ជា តម្លៃ និងភាពអាចរកបាន។',
    },

    // Spanish
    {
      locale: 'es',
      namespace: 'seo',
      key: 'home.title',
      value: 'Encuentra Tu Tutor Perfecto Online',
    },
    {
      locale: 'es',
      namespace: 'seo',
      key: 'home.description',
      value:
        'Conecta con tutores expertos para clases online 1 a 1. Reserva una clase de prueba hoy.',
    },
    { locale: 'es', namespace: 'seo', key: 'tutors.title', value: 'Buscar Tutores Online' },
    {
      locale: 'es',
      namespace: 'seo',
      key: 'tutors.description',
      value: 'Encuentra los mejores tutores online. Filtra por materia, precio y disponibilidad.',
    },

    // French
    {
      locale: 'fr',
      namespace: 'seo',
      key: 'home.title',
      value: 'Trouvez Votre Tuteur Parfait en Ligne',
    },
    {
      locale: 'fr',
      namespace: 'seo',
      key: 'home.description',
      value:
        "Connectez-vous avec des tuteurs experts pour des cours en ligne 1-à-1. Réservez un cours d'essai aujourd'hui.",
    },
    {
      locale: 'fr',
      namespace: 'seo',
      key: 'tutors.title',
      value: 'Parcourir les Tuteurs en Ligne',
    },
    {
      locale: 'fr',
      namespace: 'seo',
      key: 'tutors.description',
      value: 'Trouvez les meilleurs tuteurs en ligne. Filtrez par matière, prix et disponibilité.',
    },
  ];

  for (const t of translations) {
    await prisma.translation.upsert({
      where: {
        locale_namespace_key: {
          locale: t.locale,
          namespace: t.namespace,
          key: t.key,
        },
      },
      update: { value: t.value },
      create: t,
    });
  }
  console.log(`  ✓ ${translations.length} translations`);

  // ---------------------------------------------------------------------------
  // Admin User Stub
  // ---------------------------------------------------------------------------
  await prisma.user.upsert({
    where: { email: 'admin@schoolpillar.com' },
    update: {},
    create: {
      email: 'admin@schoolpillar.com',
      name: 'Admin',
      role: 'ADMIN',
    },
  });
  console.log('  ✓ 1 admin user');

  console.log('✅ Seed complete!');
}

main()
  .catch((e) => {
    console.error(e);
    process.exit(1);
  })
  .finally(async () => {
    await prisma.$disconnect();
  });
