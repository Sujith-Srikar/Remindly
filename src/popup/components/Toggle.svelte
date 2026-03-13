<script lang="ts">
    let {enabled, onToggle} = $props<{enabled: boolean, onToggle: () => void}>();

    const handleClick = (e: MouseEvent) => {
        e.stopPropagation();
        onToggle();
    }
</script>

<button
  type="button"
  onclick={handleClick}
  aria-label="Toggle reminder"
  aria-pressed={enabled}
  class="relative w-12 h-6 rounded-full transition
  {enabled ? 'bg-blue-500' : 'bg-neutral-500'}"
>
  <span
    class="absolute top-0.5 w-5 h-5 bg-white rounded-full transition-transform"
    style="transform: translateX({enabled ? '24px' : '2px'})"
  ></span>
</button>