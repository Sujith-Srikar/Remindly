<script lang="ts">
  let { interval, onChange } = $props();

  const options = [15, 20, 30, 45, 60];
</script>

<div
  class="flex justify-between bg-neutral-200 dark:bg-neutral-700 rounded-lg p-1"
>
  {#each options as option}
    <button
      onclick={() => onChange(option)}
      class="flex-1 text-sm py-1 rounded-md transition
      {interval === option
        ? 'bg-white dark:bg-neutral-900 shadow'
        : 'text-neutral-600 dark:text-neutral-300'}"
    >
      {option}
    </button>
  {/each}
</div>
