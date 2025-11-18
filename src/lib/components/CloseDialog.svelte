<form method="dialog">
	<button
		class="close-btn"
		aria-label="Close settings"
	>
		<svg
			xmlns="http://www.w3.org/2000/svg"
			width="18"
			height="18"
			viewBox="0 0 24 24"
			fill="none"
			stroke="currentColor"
			stroke-width="3"
			stroke-linecap="round"
			stroke-linejoin="round"
		>
			<line
				x1="18"
				y1="6"
				x2="6"
				y2="18"
			></line>
			<line
				x1="6"
				y1="6"
				x2="18"
				y2="18"
			></line>
		</svg>
	</button>
</form>

<style>
	button.close-btn {
		position: absolute;
		top: 0.2rem;
		right: 0.2rem;

		/* Reset default button styles to look like an icon */
		background: transparent;
		border: none;
		width: auto;
		height: auto;
		padding: 0.5rem;
		cursor: pointer;
		display: flex;
		align-items: center;
		justify-content: center;
		color: var(--color-text); /* Inherits dark/light mode color */
	}

	button.close-btn:hover {
		opacity: 0.7;
		/* Optional: prevents the background color change defined in your generic button:hover */
		background-color: transparent;
		border-color: transparent;
	}
</style>
