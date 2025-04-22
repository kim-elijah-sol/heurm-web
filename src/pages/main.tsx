import { DateSelect, MainTop, Overview } from '~/widgets/main';

function Main() {
  return (
    <div class='p-4 flex flex-col gap-7'>
      <MainTop />
      <DateSelect />
      <Overview />
    </div>
  );
}

export default Main;
