<script lang="ts">
  let { progress = 0, label = "" } = $props<{
    progress: number;
    label: string;
  }>();

  const radius = 28;
  const circumference = 2 * Math.PI * radius;
  const clampedProgress = $derived(Math.min(Math.max(progress, 0), 1));
  const offset = $derived(circumference - clampedProgress * circumference);
</script>

<div class="flex flex-col items-center gap-1">
  <svg width="64" height="64">
    <circle
      cx="32"
      cy="32"
      r={radius}
      stroke-width="4"
      class="stroke-neutral-300 dark:stroke-neutral-700 fill-none"
    />

    <circle
      cx="32"
      cy="32"
      r={radius}
      stroke-width="4"
      stroke-linecap="round"
      class="stroke-accent fill-none transition-all duration-slow"
      stroke-dasharray={circumference}
      stroke-dashoffset={offset}
    />
  </svg>

  <span class="text-xs text-neutral-500">
    {label}
  </span>
</div>
