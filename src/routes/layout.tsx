import { component$, Slot } from '@builder.io/qwik';
import { routeLoader$ } from '@builder.io/qwik-city';
import Header from '~/components/header/header';

export const useServerTimeLoader = routeLoader$(() => {
  return {
    date: new Date().toISOString(),
  };
});

export default component$(() => {
  return (
    <>
      <main class="pt-4 pb-12 px-12 h-auto">
        <Header />
        <Slot />
      </main>
    </>
  );
});
