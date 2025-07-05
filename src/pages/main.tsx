import { Footer } from '~/shared/ui';
import { NewFlowButton, NoFlow } from '~/widgets/flow';
import { DateSelect, MainTop } from '~/widgets/main';

function Main() {
  return (
    <>
      <div class='p-4 flex flex-col gap-4'>
        <MainTop />
        <DateSelect />
        <NoFlow />
        <NewFlowButton />
      </div>
      <Footer />
    </>
  );
}

export default Main;
