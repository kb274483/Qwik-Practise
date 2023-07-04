import { createContextId } from "@builder.io/qwik";
import type { Signal } from "@builder.io/qwik"

interface propsFilter{
	id : string
	name : string
	phone : string
}
export const filterContext = createContextId<Signal<propsFilter>>('filterContext')