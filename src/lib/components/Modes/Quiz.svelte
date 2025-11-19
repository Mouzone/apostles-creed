<script lang="ts">
	import jsonData from "$lib/apostles-creed-verses.json" assert { type: "json" };
	import type { VerseData } from "$lib/types";
	const data: VerseData = jsonData;

	let lineNumber = $state(1);
	let userInput = $state("");
	let chances = $state(3);

	function onSubmit() {
		chances -= 1;
		if (lineNumber === Object.keys(data).length + 1) return;

		if (chances === 0 || userInput === data[lineNumber]) {
			lineNumber += 1;
			chances = 3;
		}
		userInput = "";
	}
</script>

<div id="page">
	<div id="previous">
		{#each Object.values(data).slice(0, Math.max(0, lineNumber - 1)) as verse}
			<p>{verse}</p>
		{/each}
	</div>
	<form onsubmit={onSubmit}>
		<input
			bind:value={userInput}
			disabled={lineNumber === Object.keys(data).length + 1}
		/>
	</form>
</div>

<style>
	#page {
		width: 100dwh;
		height: 100dvh;
		display: flex;
		flex-direction: column;
		align-items: center;
		justify-content: center;
	}
</style>
