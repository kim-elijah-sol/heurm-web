import { FlowList } from '~/widgets/flow';
import { DateSelect, MainTop } from '~/widgets/main';

function Main() {
  return (
    <div class='flex flex-col gap-4'>
      <MainTop />
      <DateSelect />
      <FlowList />
    </div>
  );
}

export default Main;
