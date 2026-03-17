<script lang="ts">
  let { value, options, onChange } = $props<{
    value: number;
    options: number[];
    onChange: (v: number) => void;
  }>();
  let container: HTMLDivElement;
  let containerWidth = $state(320);
  const minorTicks = 12;
  const stepWidth = 10;
  const totalSteps = $derived((options.length - 1) * minorTicks);
  let offset = $state(0);
  let startX = 0;
  let startOffset = 0;
  let dragging = $state(false);
  const activeIndex = $derived(options.indexOf(value));
  const minOffset = $derived(-(options.length - 1) * minorTicks * stepWidth);
  const maxOffset = 0;
  $effect(() => {
    if (!dragging) {
      const target = -activeIndex * minorTicks * stepWidth;
      offset = target;
    }
  });
  function clamp(v: number) {
    const elasticity = 60;
    if (v > maxOffset) return maxOffset + (v - maxOffset) * 0.45;
    if (v < minOffset) return minOffset + (v - minOffset) * 0.45;
    return v;
  }
  function snap() {
    const step = Math.round(-offset / stepWidth);
    const index = Math.round(step / minorTicks);
    const clamped = Math.max(0, Math.min(options.length - 1, index));
    const snappedStep = clamped * minorTicks;
    offset = -snappedStep * stepWidth;
    onChange(options[clamped]);
  }
  function pointerDown(e: PointerEvent) {
    e.stopPropagation();
    e.preventDefault();
    dragging = true;
    window.addEventListener("pointermove", pointerMove);
    window.addEventListener("pointerup", pointerUp);
    startX = e.clientX;
    startOffset = offset;
  }
  function pointerMove(e: PointerEvent) {
    if (!dragging) return;
    const dx = e.clientX - startX;
    offset = clamp(startOffset + dx);
  }
  function pointerUp(e: PointerEvent) {
    e.preventDefault();
    if (!dragging) return;
    window.removeEventListener("pointermove", pointerMove);
    window.removeEventListener("pointerup", pointerUp);
    dragging = false;
    snap();
  }
</script>

<div
  class="flex flex-col items-center w-full select-none"
>

  <div class="flex flex-col items-center mb-3">
    <span
      class="
      text-xs
      text-neutral-500
      transition-all
      duration-200
      "
    >
      {value}m
    </span>

    <div
      class="
      w-0.5
      h-6
      bg-accent
      rounded-full
      shadow-[0_0_8px_rgba(249,115,22,0.6)]
      "
    ></div>
  </div>

  <div
    bind:this={container}
    bind:clientWidth={containerWidth}
    role="slider"
    aria-valuenow={value}
    aria-valuemin={options[0]}
    aria-valuemax={options[options.length - 1]}
    tabindex="0"
    onpointerdown={pointerDown}
    onpointermove={pointerMove}
    onpointerup={pointerUp}
    class="
    relative
    w-full
    overflow-hidden
    py-6
    cursor-grab
    active:cursor-grabbing
    "
  >

    <div
      class="pointer-events-none absolute left-0 top-0 h-full w-16 bg-linear-to-r from-background to-transparent z-10"
    ></div>
    <div class="relative w-full flex items-center justify-center">
      <div class="w-0 overflow-visible flex flex-col items-start">
        <div
          class={["flex items-end flex-nowrap", !dragging && "transition-transform duration-[400ms] ease-[cubic-bezier(0.16,1,0.3,1)]"]}
          style={`transform: translateX(calc(${offset}px - 5px));`}
        >
      {#each Array(totalSteps + 1) as _, step}
        {@const major = step % minorTicks === 0}
        {@const medium = step % 6 === 0 && !major}

        {@const index = step / minorTicks}

        <div class="flex flex-col items-center justify-end w-2.5">

          <div
            class="
            bg-neutral-400
            rounded-full
            transition-all
            duration-200
            "
            class:bg-accent={major && options[index] === value}
            class:h-12={major}
            class:h-7={medium}
            class:h-4={!major && !medium}
            class:w-[3px]={major}
            class:w-[2px]={medium}
            class:w-[1px]={!major && !medium}
          ></div>


          {#if major}
            <span
              class="
              mt-1
              text-[10px]
              text-neutral-500
              select-none
              "
            >
              {options[index]}
            </span>
          {/if}
        </div>
      {/each}
    </div>
  </div>
</div>
<div
  class="pointer-events-none absolute right-0 top-0 h-full w-16 bg-linear-to-l from-background to-transparent z-10"
    ></div>

  </div>
</div>