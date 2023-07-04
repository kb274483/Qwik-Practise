import { component$,useTask$, useSignal } from '@builder.io/qwik';
import type { PropFunction } from "@builder.io/qwik"

export interface PaginationProps {
  totalPage : number
  currentPage : number
  toPage : PropFunction<(num : number)=>void>
}

export const Pagination = component$<PaginationProps>((props:PaginationProps) =>{
  const currPage = useSignal(props.currentPage)
  useTask$(async ({track}) => {
    track(()=>{props.currentPage})
    if(props.currentPage){
      currPage.value = props.currentPage
    }
  });
  const pages = [];
  if(props.totalPage > 10){
    for (let i = 1; i <= props.totalPage; i++) {
      i <= 5 || i === props.totalPage || i === props.totalPage-1 ? 
        pages.push(
          <button key={i}
            onClick$={()=> props.toPage(i)}
            class={[`relative block rounded px-3 py-1.5 text-sm text-neutral-600 transition-all duration-300 hover:bg-neutral-600 hover:text-neutral-100`,{
              'bg-gray-500 text-white' : i == currPage.value ,
            }]}
          >
            {i}
          </button>
        ) : 
      i === props.currentPage || i === props.currentPage+1 || i === props.currentPage-1 ?
        pages.push(
          <button key={i}
            onClick$={()=> props.toPage(i)}
            class={[`relative block rounded px-3 py-1.5 text-sm text-neutral-600 transition-all duration-300 hover:bg-neutral-600 hover:text-neutral-100`,{
              'bg-gray-500 text-white' : i == currPage.value ,
            }]}
          >
            {i}
          </button>
        ) :
      null
    }
  }else{
    for (let i = 1; i <= props.totalPage; i++) {
      pages.push(
        <button key={i}
          onClick$={()=> props.toPage(i)}
          class={[`relative block rounded px-3 py-1.5 text-sm text-neutral-600 transition-all duration-300 hover:bg-neutral-600 hover:text-neutral-100`,{
            'bg-gray-500 text-white' : i == currPage.value ,
          }]}
        >
          {i}
        </button>
      );
    }
  }
  return (
    <div class="flex justify-center mt-4 text-gray-500">
      <button onClick$={()=> props.toPage((currPage.value-1))}
        class="border rounded-md bg-gray-100 px-2 py-1 text-lg leading-6 text-slate-400 transition hover:bg-gray-200 hover:text-slate-500 cursor-pointer shadow-sm"
      >
        Prev
      </button>
      {pages}
      <button onClick$={()=> props.toPage((currPage.value+1))}
        class="border rounded-md bg-gray-100 px-2 py-1 text-lg leading-6 text-slate-400 transition hover:bg-gray-200 hover:text-slate-500 cursor-pointer shadow-sm"
      >
        Next
      </button>
    </div>
  );
});