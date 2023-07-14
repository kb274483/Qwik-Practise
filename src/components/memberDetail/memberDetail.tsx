import { component$, useSignal, useVisibleTask$} from "@builder.io/qwik";

export interface memberData {
  data: any;
  ID           :number,
	MemberNo     :string, 
	MemberName   :string,
	Store        :number,  
	MemberPhone  :string, 
	MemberMail   :string,
	MemberBirth  :string, 
	MemberSex    :string, 
	MemberBlood  :string,
	MemberRemark :string,
}

export interface PropsData {
  memberData : memberData
}

export const MemberDetail = component$((props : PropsData) => {
  const isShow = useSignal(false)
  useVisibleTask$(({track})=>{
    track(()=>{props.memberData});
    (Object.keys(props.memberData).length >= 1) ?  setTimeout(()=>{isShow.value = true},300) : null
  })
  return (
    <> 
      {Object.keys(props.memberData).length >= 1 ?
        <ul
          class={['mt-1 mb-4 text-indigo-600 transition-all ease-in-out relative',
          {
            'top-20 opacity-0 duration-0' : !isShow.value,
            'top-0 opacity-100 duration-1000' : isShow.value
          }]}
        >
          <li class='absolute -top-10 bg-white h-10 rounded-tr-md pr-4 pt-2'>
            <span>姓名：
              <span class="text-gray-600">{props.memberData.data.MemberName}</span>
            </span>
          </li>
          <li class='grid gap-2 grid-cols-2 sm:grid-cols-4'>
            <span>電話：
              <span class="text-gray-600">{props.memberData.data.MemberPhone}</span>
            </span>
            <span>ＩＤ：
              <span class="text-gray-600">{props.memberData.data.ID}</span>
            </span>
            <span>編號：
              <span class="text-gray-600">{props.memberData.data.MemberNo}</span>
            </span>
            <span>信箱：
              <span class="text-gray-600">{props.memberData.data.MemberMail}</span>
            </span>
            <span>生日：
              <span class="text-gray-600">{props.memberData.data.MemberBirth}</span>
            </span>
            <span>性別：
              <span class="text-gray-600">{props.memberData.data.MemberSex}</span>
            </span>
            <span>血型：
              <span class="text-gray-600">{props.memberData.data.MemberBlood}</span>
            </span>
            <span>分店：
              <span class="text-gray-600">{props.memberData.data.Store}</span>
            </span>
            <span class='col-span-3'>備註：
              <span class="text-gray-600">{props.memberData.data.MemberRemark}</span>
            </span>
          </li>
        </ul>
        : null
      }
    </>
  )
});