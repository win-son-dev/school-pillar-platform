import { useTranslations } from 'next-intl';
import { Link } from '@/i18n/navigation';
import { Button } from '@/components/ui/button';

export default function NotFound() {
  const t = useTranslations('errors');

  return (
    <main className="flex min-h-[calc(100vh-8rem)] flex-col items-center justify-center px-4 text-center">
      <h1 className="text-4xl font-bold tracking-tight">{t('notFound')}</h1>
      <p className="text-muted-foreground mt-4 text-lg">{t('notFoundDescription')}</p>
      <Button className="mt-8" asChild>
        <Link href="/">{t('goHome')}</Link>
      </Button>
    </main>
  );
}
