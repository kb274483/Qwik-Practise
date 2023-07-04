import { component$,useVisibleTask$, useSignal,$ ,useContextProvider} from "@builder.io/qwik";
import { filterContext } from "../filter-context";
import type { DocumentHead } from "@builder.io/qwik-city";
import { MemberList } from "~/components/memberList/memberList"
import { Pagination } from "~/components/pagination/pagination"

export interface test{
  msg:string,
  title:string,
}

export default component$(() => {
  const filterID = useSignal("")
  const filterName = useSignal("")
  const filterPhone = useSignal("")
  const propsFilter = useSignal({
    id : "",
    name : "",
    phone : ""
  })
  const isShow = useSignal(false)
  const totalPage = useSignal(10)
  const currentPage = useSignal(1)
  const goToPage = $((num : number)=>{
    currentPage.value = num
    window.scrollTo({
      top: 0,
      behavior: "smooth"
    })
  })
  const initPage = $((data : any)=>{
    currentPage.value = data.currentPage
    totalPage.value = data.totalPage
  })
  useContextProvider(filterContext, propsFilter)
  useVisibleTask$(async () => {
    const options = {
      root: null,
      rootMargin: '0px',
      threshold: 0.1,
    }
    const callback = (entries : any) => {
      entries.forEach((entry : any) => {
        if(entry.isIntersecting){
          isShow.value = true
        }
      })
    };
    const observer = new IntersectionObserver(callback, options);
    const target = document.querySelector('#target') as HTMLElement;
    observer.observe(target);
  });

  return (
    <>
      <div id="scrollArea" class="relative">
        <div class="text-gray-500 mt-6">搜尋：</div>
        <div class="flex justify-start items-center text-gray-500">
          ID：
          <input class={'border border-slate-400 rounded-lg text-black px-2 py-1 mr-4'} 
            onInput$={(event)=>{
              filterID.value = (event.target as HTMLInputElement).value
            }} 
          />
          名字：
          <input class={'border border-slate-400 rounded-lg text-black px-2 py-1 mr-4'} 
            onInput$={(event)=>{
              filterName.value = (event.target as HTMLInputElement).value
            }} 
          />
          電話：
          <input class={'border border-slate-400 rounded-lg text-black px-2 py-1 mr-4'} 
            onInput$={(event)=>{
              filterPhone.value = (event.target as HTMLInputElement).value
            }} 
          />
          <button
            onClick$={()=>{
              propsFilter.value.id = filterID.value
              propsFilter.value.name = filterName.value
              propsFilter.value.phone = filterPhone.value
            }}
            class={[`block border rounded px-2 py-1 text-lg text-neutral-600 transition-all duration-300 hover:bg-neutral-600 hover:text-neutral-100 cursor-pointer`]}
          >
            搜尋
          </button>
        </div>
        <MemberList toPage={currentPage.value}
          isShow={isShow.value} data={initPage}
          propsFilter={propsFilter.value}
        >
        </MemberList>
        <Pagination totalPage={totalPage.value} 
          currentPage={currentPage.value} toPage={goToPage}
        >
        </Pagination>
      </div>
    </>
  );
});


export const head: DocumentHead = {
  title: "Welcome to Qwik",
  meta: [
    {
      name: "description",
      content: "Qwik site description",
    },
  ],
};