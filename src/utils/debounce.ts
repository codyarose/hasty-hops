const debounce = <F extends (...args: never[]) => ReturnType<F>>(func: F, waitFor: number): (() => void) => {
	let timeout: NodeJS.Timeout

	return (...args: Parameters<F>): ReturnType<F> | null => {
		let result: ReturnType<F> | null = null
		clearTimeout(timeout)
		timeout = setTimeout(() => {
			result = func(...args)
		}, waitFor)
		return result
	}
}

export { debounce }
