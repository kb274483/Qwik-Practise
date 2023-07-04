import { createContextId } from "@builder.io/qwik";
import type { Signal } from "@builder.io/qwik"

export const pagiContext = createContextId<Signal<number>>('pagiContext')