import { component$,useTask$,useStore,useVisibleTask$ } from "@builder.io/qwik";
import { isServer } from '@builder.io/qwik/build';
import type { PropFunction } from "@builder.io/qwik"
import { paths } from "../utils/paths";

export interface PropsData {
	propsFilterID : string
	propsFilterName : string
	propsFilterPhone : string
  isShow : boolean
  toPage : number
  data : PropFunction<(data : resData)=>void>
}
export interface resData{
	data:[]
	totalDataCount:number
	totalPage:number
	currentPage:number
}
export const MemberList = component$((props : PropsData) => {
  const store = useStore({ data :null });
  useTask$(async ({track}) => {
    track(()=>{props.toPage,props.propsFilterID,props.propsFilterName,props.propsFilterPhone})
    if(props.toPage || props.propsFilterID || props.propsFilterName || props.propsFilterPhone){
      const response = await fetch(`http://roy_go.casa.art/memberList?page=${props.toPage}&id=${props.propsFilterID}&name=${props.propsFilterName}&phone=${props.propsFilterPhone}`);
      store.data = await response.json();
    }
    if (isServer) {
      const response = await fetch(`http://roy_go.casa.art/memberList?page=${props.toPage}`);
      store.data = await response.json();
    }
  });
  useVisibleTask$(({track})=>{
		track(()=>{props.isShow})
    store.data != null ? props.data(store.data) : null   
  })
  return (
    <>  
			<ul class="mt-2 bg-slate-300 rounded">
				<li class="grid-cols-6 grid gap-2 text-center text-lg py-1 px-2">
					<span class="text-gray-500">分店</span>
					<span class="text-gray-500">ID</span>
					<span class="text-gray-500">姓名</span>
					<span class="text-gray-500">編號</span>
					<span class="text-gray-500">電話</span>
					<span class="text-gray-500">操作</span>
				</li>
			</ul>
			<ul id="target" 
				class={['mt-1 mb-4 transition-all ease-in-out relative',
				{
					'top-20 opacity-0 duration-0': !props.isShow ,
					'top-0 opacity-100 duration-1000': props.isShow
				}]}
			>
			{store.data != null ? 
				(store.data["data"] as resData[]).map((item : any)=>{
					return(
						<li key={item.ID}
							class={`border border-gray-600 text-gray-500 text-center
								mb-2 p-2 rounded w-full mx-auto grid-cols-6 grid gap-2
							`} 
						>   
							<span class={'block font-medium '}>
								{item['Store']}
							</span>
							<span class={'block font-medium '}>
								{item['ID']}
							</span>
							<span class={'block font-medium'}>
								{item['MemberName']}
							</span>
							<span class={'block font-medium'}>
								{item['MemberNo']}
							</span>
							<span class={'block font-medium'}>
								{item['MemberPhone']}
							</span>
							<span class={'block font-medium flex justify-center'}>
								<a href={paths.memberDetail(item['ID'])}
								class="bg-teal-700 text-gray-100 py-1 px-2 rounded mx-auto hover:bg-teal-500 transition-all ease-in-out duration-300"
								>
									詳細資訊
								</a>
							</span>
						</li>
					)
				})
				: 
				<div class="text-cneter text-gray-500">
					暫無資料
				</div>
			}
			</ul>
    </>
  )
});