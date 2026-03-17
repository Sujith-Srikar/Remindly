<script lang="ts">
  import "../../styles/global.css";
  import { remainderPlugins } from "../../plugins";
  import { saveSettings, getSettings } from "../../core/storage/storageService";
  import ReminderCard from "../components/layout/RemainderCard.svelte";
  import { type RemainderSettings } from "../../core/types";
  import Header from "../components/layout/Header.svelte";
  import { fly } from "svelte/transition";
  import { flip } from "svelte/animate";

  let settings = $state<Record<string, RemainderSettings>>({});

  const handleToggleReminder = (id: string) => {
    const current = settings[id];
    const updated = {
      ...current,
      enabled: !current.enabled,
    };
    settings[id] = updated;
    void saveSettings(id, updated);
  };

  const handleIntervalChange = (id: string, value: number) => {
    const current = settings[id];
    const updated = {
      ...current,
      interval: value,
    };
    settings[id] = updated;
    void saveSettings(id, updated);
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

  $effect(() => {
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
