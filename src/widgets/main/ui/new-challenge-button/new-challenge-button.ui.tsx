import { Sparkles } from '~/shared/ui';
import './new-challenge-button.css';

export const NewChallengeButton = () => {
  return (
    <div class='flex justify-center'>
      <button class='p-6 rounded-[35%] transition-all active:scale-90 wys-new-challenge-button'>
        <Sparkles />
      </button>
    </div>
  );
};
