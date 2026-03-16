<script lang="ts">
  let {
    value,
    options = [15, 20, 30, 45, 60],
    onChange,
  } = $props<{
    value: number;
    options?: number[];
    onChange: (value: number) => void;
  }>();

  const handleChange = (event: MouseEvent, option: number) => {
    event.stopPropagation();
    onChange(option);
  };
</script>

<div
  class="
  flex
  gap-1
  rounded-control
  bg-neutral-200
  p-1
  dark:bg-neutral-800
  "
>
  {#each options as option}
    <button
      type="button"
      onclick={(event) => handleChange(event, option)}
      aria-pressed={value === option}
      class="
      flex-1
      rounded-control
      py-1
      text-xs
      transition-all
      duration-normal
      ease-apple
      "
      class:bg-white={value === option}
      class:bg-transparent={value !== option}
      class:shadow={value === option}
    >
      {option}
    </button>
  {/each}
</div>
