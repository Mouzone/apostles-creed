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
	{:else}
		<p id="single-verse">{data[`${lineNumber}`]}</p>
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
	p {
		width: 97dvw;
	}
	#page {
		height: 100dvh;
		width: 100dvw;
		box-sizing: border-box;
		padding: 1em;

		font-family: "Open Sans";
		font-size: 1.35em;
		font-weight: bold;
		line-height: 0.7em;

		display: flex;
	}
	button {
		position: absolute;
		right: 1em;
		top: 1em;
	}

	#single-verse {
		text-align: center;
		align-self: center;
	}
</style>
