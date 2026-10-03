'use client';

import { StateMessage } from '@/components/common/StateMessage';
import { Button } from '@/components/ui/Button';
import { Container } from '@/components/ui/Container';
import { AppStrings } from '@/constants/app_strings';

export default function Error({ reset }: { error: Error & { digest?: string }; reset: () => void }) {
  return (
    <Container className="py-16">
      <StateMessage
        titleAs="h1"
        tone="error"
        title={AppStrings.states.errorTitle}
        description={AppStrings.states.errorBody}
        action={
          <Button variant="secondary" size="sm" onClick={reset}>
            {AppStrings.states.retry}
          </Button>
        }
      />
    </Container>
  );
}
