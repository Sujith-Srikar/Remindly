<script lang="ts">
  import { onMount, untrack } from "svelte";

  let { id, progress = 0, label = "", interval = 0, enabled = false } = $props<{
    id?: string;
    progress?: number;
    label?: string;
    interval?: number;
    enabled?: boolean;
  }>();

  const radius = 28;
  const circumference = 2 * Math.PI * radius;
  
  let currentProgress = $state(0);
  let currentLabel = $state("");
  let timerId: ReturnType<typeof setInterval>;

  async function updateCountdown() {
    if (!id || !enabled) {
      currentProgress = progress;
      currentLabel = label;
      return;
    }

    try {
      const alarm = await chrome.alarms.get(`remainder:${id}`);
      
      if (alarm) {
        const now = Date.now();
        const timeLeftMs = alarm.scheduledTime - now;

        if (timeLeftMs > 0) {
          const totalMs = interval * 60 * 1000;
          currentProgress = Math.max(0, Math.min(timeLeftMs / totalMs, 1));

          const totalSecondsLeft = Math.ceil(timeLeftMs / 1000);
          if (totalSecondsLeft >= 60) {
            currentLabel = `${Math.ceil(totalSecondsLeft / 60)}m`;
          } else {
            currentLabel = `${totalSecondsLeft}s`;
          }
        } else {
          currentProgress = 0;
          currentLabel = "0s";
        }
      } else {
        currentProgress = progress;
        currentLabel = label;
      }
    } catch (err) {
      currentProgress = progress;
      currentLabel = label;
    }
  }

  $effect(() => {
    if (!enabled) {
      currentProgress = progress;
      currentLabel = label;
      if (timerId) clearInterval(timerId);
    } else {
      updateCountdown();
      clearInterval(timerId);
      timerId = setInterval(updateCountdown, 1000);
    }

    return () => {
      if (timerId) clearInterval(timerId);
    };
  });

  const clampedProgress = $derived(Math.min(Math.max(currentProgress, 0), 1));
  const offset = $derived(circumference - clampedProgress * circumference);
</script>

<div class="relative flex items-center justify-center w-[72px] h-[72px]">
  <svg width="72" height="72" class="absolute -rotate-90 pointer-events-none">
    {#each Array(12) as _, i}
      <line
        x1="36"
        y1="8"
        x2="36"
        y2="10"
        stroke="currentColor"
        stroke-width="1.5"
        stroke-linecap="round"
        class="text-neutral-300 dark:text-neutral-700/50"
        transform={`rotate(${i * 30} 36 36)`}
      />
    {/each}

    <circle
      cx="36"
      cy="36"
      r={radius}
      stroke-width="1.5"
      class="stroke-neutral-200 dark:stroke-neutral-800 fill-none"
    />

    <circle
      cx="36"
      cy="36"
      r={radius}
      stroke-width="3.5"
      stroke-linecap="round"
      class="stroke-accent fill-none transition-all duration-[600ms] ease-[cubic-bezier(0.16,1,0.3,1)]"
      stroke-dasharray={circumference}
      stroke-dashoffset={offset}
      style="filter: drop-shadow(0 0 4px rgba(249,115,22,0.3));"
    />

    <g class="transition-transform duration-[600ms] ease-[cubic-bezier(0.16,1,0.3,1)]" style={`transform: rotate(${currentProgress * 360}deg); transform-origin: 36px 36px;`}>
      <circle cx="64" cy="36" r="3" class="fill-white dark:fill-neutral-100 stroke-accent" stroke-width="1.5" 
      style="filter: drop-shadow(0 2px 4px rgba(0,0,0,0.2));" />
    </g>
  </svg>

  <span class="text-sm font-semibold text-neutral-800 dark:text-neutral-200 z-10 tabular-nums tracking-tight">
    {currentLabel}
  </span>
</div>
