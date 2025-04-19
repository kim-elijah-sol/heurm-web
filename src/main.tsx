import { render } from 'solid-js/web';

const App = () => {
  return (
    <main style={{ padding: '2rem', 'font-family': 'sans-serif' }}>
      <h1>Hello Solid!</h1>
      <p>This is a SolidJS app using only Vite 🚀</p>
    </main>
  );
};

render(() => <App />, document.getElementById('root')!);
