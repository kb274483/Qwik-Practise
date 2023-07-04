import { component$ } from '@builder.io/qwik';

export default component$(() => {
  return (
    <header>
      <ul class="w-full flex justify-end pt-4">
        <li class="mx-2">
          <a href="/" class="text-gray-500">
            首頁
          </a>
        </li>
        <li class="mx-2">
          <a href="/memberList/" class="text-gray-500">
            會員列表
          </a>
        </li>
        <li class="mx-2">
          <span class="text-indigo-400 font-semibold">Qwik</span>
          <a href="https://qwik.builder.io/examples/introduction/hello-world/" target="_blank" class="text-gray-500">
          Examples
          </a>
        </li>
        <li class="mx-2">
          <span class="text-indigo-400 font-semibold">Qwik</span>
          <a href="https://qwik.builder.io/tutorial/welcome/overview/" target="_blank" class="text-gray-500">
          Tutorials
          </a>
        </li>
      </ul>
    </header>
  );
});
