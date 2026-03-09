import { Suspense } from 'react';

function SuccessContent() {
  // Twój kod z useSearchParams()
  const searchParams = useSearchParams();
  // ... reszta kodu
}

export default function SuccessPage() {
  return (
    <Suspense fallback={<div>Ładowanie...</div>}>
      <SuccessContent />
    </Suspense>
  );
}
