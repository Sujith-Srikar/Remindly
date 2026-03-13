<script lang="ts">
  import Toggle from "./Toggle.svelte";
  import IntervalSegments from "./IntervalSegments.svelte";
  import ProgressRing from "./ProgressRing.svelte";

  const {
    id,
    title,
    description,
    enabled,
    interval,
    onToggle,
    onIntervalChange,
  } = $props<{id: string, title: string, description: string, enabled: boolean, interval: number, onToggle: () => void, onIntervalChange: (value: number) => void}>();
  let expanded = $state(false);
  let progress = $state(0.5);

  const toggleExpand = () => {
    expanded = !expanded;
  };
</script>

<div
  class="rounded-2xl
  bg-neutral-800
  shadow-lg
  p-5
  space-y-4
  transition"
>
  <div class="flex items-start justify-between">
    <button type="button" onclick={toggleExpand} class="text-left space-y-1">
      <h2 class="text-sm font-semibold">{title}</h2>
      <p class="text-xs text-neutral-400">{description}</p>
    </button>

    <Toggle {enabled} {onToggle} />
  </div>

  {#if expanded}
    <div class="flex justify-center relative">
      <ProgressRing {progress} label={`${interval}m`} />
    </div>

    <IntervalSegments {interval} onChange={onIntervalChange} />
  {/if}
</div>
