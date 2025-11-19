<script lang="ts">
	import jsonData from "$lib/apostles-creed-verses.json" assert { type: "json" };
	import type { VerseData } from "$lib/types";

	const data: VerseData = jsonData;
</script>

<div id="verses">
	{#each Object.values(data) as verse, i}
		{#if verse === " "}
			<br />
		{:else}
			<p
				class="verse"
				data-line={i}
			>
				{verse}
			</p>
		{/if}
	{/each}
</div>

<style>
	#verses {
		margin: 2em 1em 1em 1em;
	}
	.verse {
		margin: 0.35em;
	}
	@media (max-width: 640px) {
		.verse {
			margin: 0.7em;
		}
	}
</style>
