import { type Accessor, type Component, type JSX } from 'solid-js';
import type { Nullable } from '~/shared/types';
import { ServerImage, Trash2, UserRound } from '~/shared/ui';

type Props = {
  profileImage: Accessor<Nullable<string>>;
  onUploadProfileImage: JSX.ChangeEventHandlerUnion<HTMLInputElement, Event>;
  onRemoveProfileImage: () => void;
};

export const UserSettingProfile: Component<Props> = (props) => {
  const profileImage = () => props.profileImage();

  let inputFile: HTMLInputElement;

  return (
    <div class='relative' onClick={() => inputFile.click()}>
      <div class='rounded-[42%] overflow-hidden w-20 h-20 transition-all duration-300 active:scale-95 border border-gray-300'>
        {profileImage() ? (
          profileImage()!.includes('/uploads') ? (
            <ServerImage class='w-full h-full' src={profileImage()!} alt='' />
          ) : (
            <img class='w-full h-full' src={profileImage()!} alt='' />
          )
        ) : (
          <div class='w-full h-full bg-linear-150 from-gray-300 to-gray-300/65 flex items-center justify-center'>
            <UserRound size={40} />
          </div>
        )}
      </div>

      {profileImage() !== null && (
        <button
          class='absolute -right-1 -top-1 p-1 rounded-full bg-gray-400 transition-all duration-300 active:scale-90'
          onClick={(e) => {
            e.stopPropagation();

            props.onRemoveProfileImage();
          }}
        >
          <Trash2 />
        </button>
      )}

      <input
        ref={(el) => (inputFile = el)}
        type='file'
        accept='image/*'
        class='hidden'
        onChange={props.onUploadProfileImage}
      />
    </div>
  );
};
