import { FlowList } from '~/widgets/flow';
import { DateSelect } from '~/widgets/main';
import { UserTop } from '~/widgets/user';

function Main() {
  return (
    <div class='flex flex-col gap-4'>
      <UserTop />
      <DateSelect />
      <FlowList />
    </div>
  );
}

export default Main;
