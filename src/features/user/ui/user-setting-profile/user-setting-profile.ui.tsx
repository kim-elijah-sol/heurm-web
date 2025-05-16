import { Trash2 } from '~/shared/ui';

export const UserSettingProfile = () => {
  return (
    <div class='relative' onClick={() => console.log('profile update')}>
      <img
        class='rounded-[35%] w-20 h-20 transition-all duration-300 active:scale-95'
        src='https://avatars.githubusercontent.com/u/86874556?v=4'
        alt=''
      />

      <button
        class='absolute -right-1 -top-1 p-1 rounded-full bg-gray-400 transition-all duration-300 active:scale-90'
        onClick={(e) => {
          e.stopPropagation();

          console.log('profile remove');
        }}
      >
        <Trash2 />
      </button>
    </div>
  );
};
