import { cubicOut } from "svelte/easing";
import type { TransitionConfig } from "svelte/transition";
import { quintOut } from "svelte/easing";

function scaleFade(node: Element, { duration = 260 } = {}): TransitionConfig {
  return {
    duration,
    easing: quintOut,
    css: (t) => `
			opacity: ${t};
			transform: scale(${0.94 + (1 - 0.94) * t}) translateY(${(1 - t) * 6}px);
		`,
  };
}

export {scaleFade}