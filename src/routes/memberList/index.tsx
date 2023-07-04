import { component$,useVisibleTask$, useSignal,$ } from "@builder.io/qwik";
import type { DocumentHead } from "@builder.io/qwik-city";
import { MemberList } from "~/components/memberList/memberList"
import { Pagination } from "~/components/pagination/pagination"

export interface test{
  msg:string,
  title:string,
}

export default component$(() => {
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
        <MemberList toPage={currentPage.value}
          isShow={isShow.value} data={initPage} 
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