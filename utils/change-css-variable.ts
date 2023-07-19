export const changeCssVariable = (varName: string, value: string) => {
	const root = document.documentElement
	root.style.setProperty(`--${varName}`, value)
}
