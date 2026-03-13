<script lang="ts">
  import "../../styles/global.css";
  import { onMount } from "svelte";
  import { remainderPlugins } from "../../plugins";
  import { saveSettings, getSettings } from "../../core/storage/storageService";
  import { WATER_REMAINDER } from "../../utils/constant";
  import ReminderCard from "../components/RemainderCard.svelte";
  import { type RemainderSettings } from "../../core/types";

  let enabled = $state(false);
  let interval = $state(30);
  let settings = $state<Record<string, RemainderSettings>>({});

  const handleToggleReminder = (id: string) => {
    const current = settings[id];
    const updated = {
      ...current,
      id: id,
    };
    settings[id] = updated;
    saveSettings(id, updated);
  };

  const handleIntervalChange = (id: string, value: number) => {
    const current = settings[id];
    const updated = {
      ...current,
      interval: value,
    };
    settings[id] = updated;
    saveSettings(id, updated);
  };

  onMount(async () => {
    await Promise.all(
      remainderPlugins.map(async (plugin) => {
        const res = await getSettings(plugin.id);
        settings[plugin.id] = {
          enabled: res.enabled ?? false,
          interval: res.interval ?? plugin.defaultInterval,
        };
      }),
    );
  });
</script>

<main
  class="w-[320px] h-105 bg-white dark:bg-neutral-900
  text-neutral-900 dark:text-neutral-100
  p-4 flex flex-col gap-4 overflow-y-auto"
>
  {#each remainderPlugins as plugin}
    {#if settings[plugin.id]}
      <ReminderCard
        id={plugin.id}
        title={plugin.title}
        description={plugin.message}
        enabled={settings[plugin.id].enabled}
        interval={settings[plugin.id].interval}
        onToggle={() => handleToggleReminder(plugin.id)}
        onIntervalChange={(value: number) =>
          handleIntervalChange(plugin.id, value)}
      />
    {/if}
  {/each}
</main>
