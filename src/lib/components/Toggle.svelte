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

		/* UPDATED: Sun icon is hard-coded to black */
		background-image: url("data:image/svg+xml,%3Csvg xmlns='http://www.w3.org/2000/svg' width='16' height='16' viewBox='0 0 24 24' fill='none' stroke='%23000000' stroke-width='2' stroke-linecap='round' stroke-linejoin='round'%3E%3Ccircle cx='12' cy='12' r='5'%3E%3C/circle%3E%3Cline x1='12' y1='1' x2='12' y2='3'%3E%3C/line%3E%3Cline x1='12' y1='21' x2='12' y2='23'%3E%3C/line%3E%3Cline x1='4.22' y1='4.22' x2='5.64' y2='5.64'%3E%3C/line%3E%3Cline x1='18.36' y1='18.36' x2='19.78' y2='19.78'%3E%3C/line%3E%3Cline x1='1' y1='12' x2='3' y2='12'%3E%3C/line%3E%3Cline x1='21' y1='12' x2='23' y2='12'%3E%3C/line%3E%3Cline x1='4.22' y1='19.78' x2='5.64' y2='18.36'%3E%3C/line%3E%3Cline x1='18.36' y1='5.64' x2='19.78' y2='4.22'%3E%3C/line%3E%3C/svg%3E");
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

		/* UPDATED: Moon icon is hard-coded to white */
		background-image: url("data:image/svg+xml,%3Csvg xmlns='http://www.w3.org/2000/svg' width='16' height='16' viewBox='0 0 24 24' fill='none' stroke='%23ffffff' stroke-width='2' stroke-linecap='round' stroke-linejoin='round'%3E%3Cpath d='M21 12.79A9 9 0 1 1 11.21 3 7 7 0 0 0 21 12.79z'%3E%3C/path%3E%3C/svg%3E");

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
