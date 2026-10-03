import { StateMessage } from '@/components/common/StateMessage';
import { ButtonLink } from '@/components/ui/Button';
import { Container } from '@/components/ui/Container';
import { AppRoutes } from '@/constants/app_routes';
import { AppStrings } from '@/constants/app_strings';

export default function ProjectNotFound() {
  return (
    <Container className="py-16">
      <StateMessage
        titleAs="h1"
        title={AppStrings.states.projectNotFoundTitle}
        description={AppStrings.states.notFoundBody}
        action={
          <ButtonLink href={AppRoutes.projects} size="sm">
            {AppStrings.projectDetail.backToProjects}
          </ButtonLink>
        }
      />
    </Container>
  );
}
