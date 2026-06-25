<script lang="ts">
  import "../../styles/global.css";
  import { remainderPlugins } from "../../plugins";
  import { saveSettings, getSettings } from "../../core/storage/storageService";
  import ReminderCard from "../components/layout/RemainderCard.svelte";
  import { type RemainderSettings } from "../../core/types";
  import Header from "../components/layout/Header.svelte";
  import { fly } from "svelte/transition";
  import { flip } from "svelte/animate";
  import { onMount } from "svelte";

  let settings = $state<Record<string, RemainderSettings>>({});

  const updateRemainder = (id: string, patch: Partial<RemainderSettings>) => {
    const updated = {
      ...settings[id],
      ...patch
    }

    settings[id] = updated;
    void saveSettings(id, updated);
  }

  const handleToggleReminder = (id: string) => {
    const current = settings[id];
    updateRemainder(id, {enabled: !settings[id].enabled});
  };

  const handleIntervalChange = (id: string, value: number) => {
    updateRemainder(id, {interval: value});
  };

  const loadSettings = async () => {
    const entries = await Promise.all(
      remainderPlugins.map(async (plugin) => {
        const res = await getSettings(plugin.id);
        return [
          plugin.id,
          {
            enabled: res.enabled ?? false,
            interval: res.interval ?? plugin.defaultInterval,
          },
        ] as const;
      }),
    );

    settings = Object.fromEntries(entries);
  };

  onMount(() => {
  void loadSettings();
});
</script>

<main
  class="
w-[320px]
min-h-130
bg-surface-light
dark:bg-surface-dark
flex flex-col
transition-colors duration-500 ease-[cubic-bezier(.22,.61,.36,1)]
"
>
  <Header />
  {#each remainderPlugins.filter((p) => settings[p.id]) as plugin, index (plugin.id)}
    <div
      animate:flip={{ duration: 350 }}
      in:fly={{
        y: -24,
        duration: 420,
        delay: index * 120,
      }}
      class="p-2"
    >
      <ReminderCard
        id={plugin.id}
        title={plugin.title}
        message={plugin.message}
        enabled={settings[plugin.id].enabled}
        interval={settings[plugin.id].interval}
        onToggle={() => handleToggleReminder(plugin.id)}
        onIntervalChange={(value: number) =>
          handleIntervalChange(plugin.id, value)}
      />
    </div>
  {/each}
</main>
