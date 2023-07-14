import { component$, useSignal, useVisibleTask$} from "@builder.io/qwik"
import { MemberDetail } from "~/components/memberDetail/memberDetail"
import type { memberData } from "~/components/memberDetail/memberDetail"

export default component$(() => {  
  const memberID = useSignal("")
  const memberStore = useSignal({} as memberData);
  useVisibleTask$(async ()=>{
    const searchUrl = new URL(location.href)
    memberID.value = searchUrl.pathname.slice(1, -1).split('/')[1]
    const response = await fetch(`http://roy_go.casa.art/memberDetail/${memberID.value}`);
    memberStore.value = await response.json();
  })
  return (
    <> 
      <div class="border rounded w-full mx-auto mt-8 px-4 py-3 bg-white">
        <div class='w-full h-60 bg-banner rounded bg-cover bg-bottom'></div>
        <MemberDetail
          memberData={memberStore.value}
        >
        </MemberDetail>
      </div>
    </>
  )
});