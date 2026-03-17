<script lang="ts">
  import ThemeToggle from "./ThemeToggle.svelte";
</script>

<header
  class="
px-4 py-3
flex items-center justify-between
text-sm font-semibold
text-neutral-900
dark:text-white
"
>
  <span>Remindly</span>
  <ThemeToggle />
</header>
