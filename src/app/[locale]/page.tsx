import { useTranslations } from 'next-intl';
import { Link } from '@/i18n/navigation';
import { Button } from '@/components/ui/button';

export default function HomePage() {
  const t = useTranslations();

  return (
    <div className="flex min-h-[calc(100vh-12rem)] flex-col items-center justify-center px-4 text-center">
      <h1 className="text-4xl font-bold tracking-tight sm:text-5xl md:text-6xl">
        {t('home.heroTitle')}
      </h1>
      <p className="text-muted-foreground mt-4 max-w-2xl text-lg sm:text-xl">
        {t('home.heroSubtitle')}
      </p>
      <div className="mt-8 flex gap-4">
        <Button size="lg" asChild>
          <Link href="/tutors">{t('home.ctaButton')}</Link>
        </Button>
        <Button size="lg" variant="outline" asChild>
          <Link href="/tutors">{t('home.ctaSecondary')}</Link>
        </Button>
      </div>
    </div>
  );
}
