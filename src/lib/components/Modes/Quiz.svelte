<script lang="ts">
	import jsonData from "$lib/apostles-creed-verses.json" assert { type: "json" };
	import type { VerseData } from "$lib/types";
	import { scrollToBottomOnUpdate } from "$lib/actions";
	const data: VerseData = jsonData;

	let lineNumber = $state(1);
	let userInput = $state("");
	let chances = $state(1);
	let inputElement: null | HTMLInputElement = $state(null);

	// This effect will run after the DOM updates, whenever its dependencies (lineNumber, chances) change.
	$effect(() => {
		// Refocus the input after the first submission, so the user can keep typing.
		if (inputElement && (lineNumber > 1 || chances < 1)) {
			// Defer focus slightly to ensure it happens after all other DOM updates and potential browser events.
			// This can sometimes improve reliability, especially on mobile.
			setTimeout(() => {
				inputElement?.focus({ preventScroll: true });
			}, 0);
		}
	});

	// skip the line break lines, and show them when the line after is guessed
	function onSubmit() {
		chances -= 1;
		if (lineNumber === Object.keys(data).length + 1) return;

		if (chances === 0 || userInput === data[lineNumber]) {
			lineNumber += 1;
			chances = 1;
		}
		userInput = "";
	}
</script>

<div id="page">
	<div
		id="previous"
		use:scrollToBottomOnUpdate={lineNumber}
	>
		<div style="flex-grow: 1;"></div>
		<!-- add back .slice(0, Math.max(0, lineNumber - 1)) -->
		{#each Object.values(data).slice(0, Math.max(0, lineNumber - 1)) as verse}
			<p>{verse}</p>
		{/each}
	</div>
	<form on:submit|preventDefault={onSubmit}>
		<input
			type="text"
			bind:this={inputElement}
			autofocus
			bind:value={userInput}
			disabled={lineNumber === Object.keys(data).length + 1}
		/>
	</form>
</div>

<style>
	#page {
		width: 100dvw;
		height: 100dvh;
		display: flex;
		flex-direction: column;
		align-items: center;
		justify-content: center;
	}
	#previous {
		width: 40dvw;
		height: 40dvh;
		gap: 0.5em;
		display: flex;
		flex-direction: column;
		overflow-y: auto;
		min-height: 0; /* Essential for scrolling in a flex container */
		padding-bottom: 1em;
	}
	p {
		margin: 0;
	}

	@media (max-width: 640px) {
		#previous {
			width: 70dvw;
		}
	}
</style>
