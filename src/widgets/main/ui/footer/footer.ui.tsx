export const Footer = () => {
  return (
    <footer class='px-4 py-6'>
      <div class='w-full h-[1px] bg-linear-to-r from-white via-slate-300 to-white mb-6' />

      <div class='flex flex-col gap-2'>
        <p class='font-semibold text-slate-400 text-sm text-center'>
          Win Yourself by
          <a
            href='mailto:kimelijahsol@gmail.com'
            class='font-extrabold ml-2 text-slate-600'
          >
            @kim-elijah-sol
          </a>
        </p>
        <p class='font-semibold text-slate-400 text-sm text-center'>
          feedback & support
          <a
            href='mailto:cx@winyourself.com'
            class='font-extrabold ml-2 text-slate-600'
          >
            cx@winyourself.com
          </a>
        </p>
        <p class='font-semibold text-slate-400 text-sm text-center'>
          github
          <a
            href='https://github.com/kim-elijah-sol'
            target='_blank'
            class='font-extrabold ml-2 text-slate-600'
          >
            @kim-elijah-sol
          </a>
        </p>
      </div>

      <div class='flex flex-col gap-2 mt-6'>
        <a
          href='/guard/terms-of-use'
          class='font-extrabold text-slate-600 text-sm text-center'
        >
          Terms of Use
        </a>
        <a
          href='/guard/privacy-policy'
          class='font-extrabold text-slate-600 text-sm text-center'
        >
          Privacy Policy
        </a>
      </div>

      <p class='mt-8 font-semibold text-slate-400 text-sm text-center'>
        © 2025 Win Yourself. All rights reserved.
      </p>
    </footer>
  );
};
