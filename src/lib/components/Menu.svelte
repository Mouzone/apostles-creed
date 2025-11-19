<script lang="ts">
	import CloseDialog from "$lib/components/CloseDialog.svelte";
	import Settings from "$lib/svgs/settings.svelte";
	import DarkModeToggle from "$lib/components/SegmentControl.svelte/DarkModeToggle.svelte";
	import OrientationToggle from "$lib/components/SegmentControl.svelte/OrientationToggle.svelte";
	import type { Mode, Orientation } from "../../types";

	let {
		mode = $bindable(),
		isDarkMode = $bindable(),
		isSettingsOpen = $bindable(),
		orientation = $bindable(),
	} = $props<{
		mode: Mode;
		isDarkMode: boolean;
		isSettingsOpen: boolean;
		orientation: Orientation;
	}>();
	let dialogElement: null | HTMLDialogElement = $state(null);
</script>

<dialog
	bind:this={dialogElement}
	onclose={() => (isSettingsOpen = false)}
>
	<CloseDialog />
	<p id="settings-header">Settings</p>
	<hr />

	<div id="settings-grid">
		<label for="dark-mode">Theme</label>
		<DarkModeToggle bind:checked={isDarkMode} />

		<label for="orientation">Orientation</label>
		<OrientationToggle bind:orientation />
	</div>
</dialog>

<div id="menu">
	<button
		id="mode"
		onclick={() => {
			if (mode === "all") {
				mode = "line";
			} else if (mode === "line") {
				mode = "quiz";
			} else if (mode === "quiz") {
				mode = "all";
			}
		}}
	>
		{#if mode === "all"}
			All
		{:else if mode === "line"}
			Line
		{:else if mode === "quiz"}
			Quiz
		{/if}
	</button>
	<button
		id="settings"
		onclick={() => {
			dialogElement?.showModal();
			isSettingsOpen = true;
		}}
	>
		<Settings />
	</button>
</div>

<style>
	dialog {
		position: relative;
		border-radius: var(--border-radius-main);
		background-color: var(--color-bg);
		color: var(--color-text);
		border: none;
		padding: 1rem;
		min-width: 200px;
		box-shadow: 0 8px 24px rgba(0, 0, 0, 0.15);
		font-size: 0.8em;
	}
	dialog::backdrop {
		background: rgba(0, 0, 0, 0.4);
		backdrop-filter: blur(3px);
	}

	hr {
		border: none;
		border-top: 1px solid var(--color-text);
		opacity: 0.2;
		margin-block: 0.5rem;
	}

	#settings-header {
		margin-top: 0.4em;
		text-align: center;
		font-weight: bold;
		font-size: larger;
	}
	#settings-grid {
		display: grid;
		grid-template-columns: 1fr auto;
		gap: 1rem;
		align-items: center;
		padding-block: 0.5rem;
		justify-items: center;
	}

	#settings-grid label {
		font-weight: 500;
		justify-self: start;
	}
	button#mode {
		width: 3.5em;
		height: 2.5em;
		appearance: none;
		background-color: var(--color-bg);
		color: var(--color-text);
		border: var(--border-main);
		border-radius: var(--border-radius-main);
		font-size: var(--btn-font-size);
		border-color: var(--color-text);
	}

	button#settings {
		appearance: none;
		border: none;
		background-color: transparent;
		color: var(--color-text);
	}

	div#menu {
		position: fixed;
		bottom: 1em;
		right: 1em;
		display: flex;
		align-items: center;
		gap: 0.3em;
	}

	button#mode:hover {
		background-color: var(--color-text);
		color: var(--color-bg);
		border-color: var(--color-bg);
	}
</style>
