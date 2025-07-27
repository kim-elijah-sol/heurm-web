import { children, type JSX } from 'solid-js';

export const FlowPanelForm = {
  Wrapper: (props: { children: JSX.Element }) => {
    return (
      <div class='flex flex-col gap-2 mb-6 w-full'>
        {children(() => props.children)()}
      </div>
    );
  },
  Label: (props: { children: JSX.Element }) => {
    return (
      <p class='font-semibold text-gray-700'>
        {children(() => props.children)()}
      </p>
    );
  },
  Description: (props: { children: JSX.Element }) => {
    return (
      <span class='text-sm text-gray-500 font-medium'>{props.children}</span>
    );
  },
  Divider: () => (
    <div class='w-full h-[1px] bg-linear-to-r from-white via-slate-300 to-white mt-2 mb-8' />
  ),
  LeftLabel: (props: { children: JSX.Element }) => {
    return (
      <p class='font-semibold text-[0.75rem] w-[60px] text-gray-500 pl-2'>
        {children(() => props.children)()}
      </p>
    );
  },
  DeleteButton: (props: { onClick: () => void }) => {
    return (
      <button
        onClick={props.onClick}
        class='font-semibold float-right text-slate-300 py-1 px-2 rounded-[14px] transition-all duration-300 active:bg-slate-100 active:scale-90'
      >
        Delete
      </button>
    );
  },
};
