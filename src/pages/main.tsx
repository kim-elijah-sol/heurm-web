import { MainTop, Overview } from '~/widgets/main';

function Main() {
  return (
    <div class='p-4 flex flex-col gap-3'>
      <MainTop />
      <Overview />
    </div>
  );
}

export default Main;
