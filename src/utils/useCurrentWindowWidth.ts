import { useEffect, useState } from "react"
import { debounce } from "./debounce"

const getWidth = () =>
	window.innerWidth ||
	document.documentElement.clientWidth ||
	document.body.clientWidth

const useCurrentWindowWidth = () => {
	const [width, setWidth] = useState(getWidth())

	useEffect(() => {
		const resizeListener = debounce(() => setWidth(getWidth()), 150)

		window.addEventListener("resize", resizeListener)

		return () => {
			window.removeEventListener("resize", resizeListener)
		}
	}, [])

	return width
}

export { useCurrentWindowWidth }
