<script>
	import data from "$lib/apostles-creed-verses.json";

	let mode = $state("all");
	let lineNumber = $state(1);
</script>

<div id="page">
	<button onclick={() => (mode = mode === "all" ? "verse" : "all")}>
		Switch Mode
	</button>
	{#if mode === "all"}
		<div id="verses">
			{#each Object.values(data) as verse, i}
				<p
					class="verse"
					style:display={mode === "all" ? "" : "none"}
					data-line={i}
				>
					{verse}
				</p>
			{/each}
		</div>
	{:else}
		<p>{data[`${lineNumber}`]}</p>
	{/if}
</div>

<style>
	@font-face {
		font-family: "Merriweather";
		src: url("/Merriweather/Merriweather-VariableFont_opsz\,wdth\,wght.ttf")
			format("truetype");
		font-weight: 300 900;
		font-style: normal;
	}
	@font-face {
		font-family: "Open Sans";
		src: url("/Open_Sans/OpenSans-VariableFont_wdth\,wght.ttf")
			format("truetype");
		font-weight: 300 800;
		font-style: normal;
	}
	#page {
		width: 100dvw;
		padding: 2em 3em 2em 3em;

		font-family: "Open Sans";
		font-size: 1.35em;
		font-weight: bold;
		line-height: 0.7em;
	}
</style>
