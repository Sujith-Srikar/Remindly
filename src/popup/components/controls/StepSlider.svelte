<script lang="ts">
  let { value, options, onChange } = $props<{
    value: number
    options: number[]
    onChange: (v:number)=>void
  }>()

  let container: HTMLDivElement

  const minorTicks = 8
  const stepWidth = 12

  const totalSteps = (options.length - 1) * minorTicks
  const activeIndex = $derived(options.indexOf(value))

  let offset = $state(0)
  let startX = 0
  let startOffset = 0

  function snap() {
    const step = Math.round(-offset / stepWidth)
    const index = Math.round(step / minorTicks)

    const clamped = Math.max(0, Math.min(options.length - 1, index))
    const snappedStep = clamped * minorTicks

    offset = -snappedStep * stepWidth
    onChange(options[clamped])
  }

  function pointerDown(e:PointerEvent) {
    e.stopPropagation()
    e.preventDefault()

    startX = e.clientX
    startOffset = offset

    const move = (ev:PointerEvent)=>{
      const dx = ev.clientX - startX
      offset = startOffset + dx
    }

    const up = ()=>{
      snap()

      window.removeEventListener("pointermove",move)
      window.removeEventListener("pointerup",up)
    }

    window.addEventListener("pointermove",move)
    window.addEventListener("pointerup",up)
  }
</script>


<div class="flex flex-col items-center w-full select-none">

  <!-- value + indicator -->

  <div class="flex flex-col items-center mb-2">

    <span class="text-xs text-neutral-500">{value}</span>

    <div
      class="
      w-[2px]
      h-6
      bg-accent
      rounded-full
      shadow-[0_0_6px_rgba(249,115,22,0.6)]
      "
    ></div>

  </div>


  <!-- ruler viewport -->

  <div
    bind:this={container}
    on:pointerdown={pointerDown}
    role="slider"
    tabindex="0"
    class="
    relative
    w-full
    overflow-hidden
    py-4
    cursor-grab
    active:cursor-grabbing
    "
  >

    <div
      class="flex items-center transition-transform duration-300 ease-apple"
      style={`transform: translateX(calc(50% + ${offset}px))`}
    >

      {#each Array(totalSteps+1) as _, step}

        {@const major = step % minorTicks === 0}
        {@const medium = step % 4 === 0 && !major}

        <div class="flex items-center justify-center w-[12px]">

          <!-- center baseline -->

          <div
            class="
            bg-neutral-400
            rounded-full
            transition-all
            duration-200
            "
            class:bg-accent={major && options[step/minorTicks] === value}

            class:h-10={major}
            class:h-6={medium}
            class:h-3={!major && !medium}

            class:w-[3px]={major}
            class:w-[2px]={medium}
          ></div>

        </div>

      {/each}

    </div>

  </div>

</div>