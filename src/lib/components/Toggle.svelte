<script lang="ts">
	let { checked = $bindable() } = $props<{ checked: boolean }>();
</script>

<label class="toggle-switch">
	<input
		type="checkbox"
		bind:checked
	/>
	<span class="slider"></span>
</label>

<style>
	.toggle-switch {
		position: relative;
		display: inline-block;
		width: 50px;
		height: 28px;
	}

	.toggle-switch input {
		opacity: 0;
		width: 0;
		height: 0;
	}

	/* --- Themed Styles --- */
	.slider {
		position: absolute;
		cursor: pointer;
		top: 0;
		left: 0;
		right: 0;
		bottom: 0;
		border-radius: 28px;
		transition: 0.3s;

		/* Track color uses page theme */
		background-color: var(--color-text);
	}

	.slider:before {
		position: absolute;
		content: "";
		height: 20px;
		width: 20px;
		left: 4px;
		bottom: 4px;
		border-radius: 50%;
		transition: 0.3s;

		/* Knob color uses page theme */
		background-color: var(--color-bg);

		background-repeat: no-repeat;
		background-position: center;
		background-size: 14px 14px;
	}

	/* --- "ON" State (Dark Mode) --- */
	input:checked + .slider {
		background-color: var(--color-text);
	}

	input:checked + .slider:before {
		transform: translateX(22px);
		background-color: var(--color-bg);

		/* We still need these to position the icon */
		background-repeat: no-repeat;
		background-position: center;
		background-size: 14px 14px;
	}

	/* Focus rings */
	input:focus-visible + .slider {
		box-shadow:
			0 0 0 2px var(--color-bg),
			0 0 0 4px var(--color-text);
	}
</style>
