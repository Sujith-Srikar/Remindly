<script lang="ts">
  import { activeReminderId, toggleReminderCard } from "../store/uiStore";
  import Toggle from "./controls/Toggle.svelte";
  import SegmentControl from "./controls/SegmentControls.svelte";
  import StepSlider from "./controls/StepSlider.svelte";
  import ProgressRing from "./feedback/ProcessingRing.svelte";
  import { scaleFade } from "../../utils/transition";

  let { id, title, message, enabled, interval, onToggle, onIntervalChange } =
    $props<{
      id: string;
      title: string;
      message: string;
      enabled: boolean;
      interval: number;
      onToggle: () => void;
      onIntervalChange: (value: number) => void;
    }>();

  const expanded = $derived($activeReminderId === id);
  const progress = $derived(Math.min(Math.max(interval / 60, 0), 1));
  const contentId = $derived(`${id}-details`);

  const toggleExpanded = () => {
    toggleReminderCard(id);
  };

  const handleKeydown = (event: KeyboardEvent) => {
    if (event.key === "Enter" || event.key === " ") {
      event.preventDefault();
      toggleExpanded();
    }
  };
</script>

<div
  onclick={toggleExpanded}
  onkeydown={handleKeydown}
  role="button"
  tabindex="0"
  aria-expanded={expanded}
  aria-controls={contentId}
  class="
  p-4
  rounded-card
  backdrop-blur-glass
  bg-card-light
  dark:bg-card-dark
  border border-border-light
  dark:border-border-dark
  shadow-card
  transition-all
  duration-300
  ease-[cubic-bezier(.22,.61,.36,1)]
  cursor-pointer
  hover:scale-[1.01]
  hover:shadow-cardHover
  overflow-hidden
  "
>
  <!-- HEADER -->

  <div class="flex items-center justify-between gap-4">
    <div class="flex min-w-0 flex-col">
      <span
        class="
        text-sm
        font-medium
        text-neutral-900
        dark:text-white
        "
      >
        {title}
      </span>

      <span
        class="
        text-xs
        text-neutral-500
        "
      >
        {message}
      </span>
    </div>

    <Toggle checked={enabled} onChange={onToggle} />
  </div>

  {#if expanded}
    <div
      id={contentId}
      class="
    mt-4
    flex flex-col
    gap-4
    items-center
    "
      in:scaleFade={{ duration: 220 }}
      out:scaleFade={{ duration: 180 }}
    >
      <ProgressRing {progress} label={`${interval}m`} />

      <StepSlider value={interval} onChange={onIntervalChange}  options={[15,20,30,45,60]} />
    </div>
  {/if}
</div>
