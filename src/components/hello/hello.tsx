import { component$,useTask$,useStore, } from "@builder.io/qwik";
import { isServer } from '@builder.io/qwik/build';

export interface PropsData {
  isShow : boolean
}
export const Hello = component$((props : PropsData) => {
  const store = useStore({ data: null });
  useTask$(async () => {
    if (isServer) {
      const response = await fetch('http://roy_go.casa.art/');
      store.data = await response.json();
    }
  });
  return (
    <ul id="target" 
      class={['my-8 transition-all duration-1000 ease-in-out relative top-20 opacity-0',
      {
        'top-20 opacity-0': !props.isShow ,
        'top-0 opacity-100': props.isShow
      }]}

    >
      {store.data != null ? 
        <li 
          class={'border border-gray-600 text-gray-600 my-2 p-2 rounded w-1/4 mx-auto'} 
        >
          <span class={'block font-medium '}>
            {store.data['msg']}
          </span>
          <span class={'block mb-4 font-medium'}>
            {store.data['title']}
          </span>
        </li>
        : 
        <div class="text-cneter text-gray-500">
          暫無資料
        </div>
      }
    </ul>
  )
});