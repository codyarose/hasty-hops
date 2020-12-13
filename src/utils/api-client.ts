const { REACT_APP_UNTAPPD_CLIENT_ID, REACT_APP_UNTAPPD_CLIENT_SECRET } = process.env
const authKeys = {
	client_id: REACT_APP_UNTAPPD_CLIENT_ID,
	client_secret: REACT_APP_UNTAPPD_CLIENT_SECRET,
}
const baseURL = 'https://api.untappd.com/v4'

const headers = new Headers({
	'User-Agent': `HastyHop (${authKeys.client_id})`,
})

const client = async <T>(
	endpoint: string,
	queryParams?: { [key: string]: string | number },
	customConfig = {},
): Promise<T> => {
	const config = {
		method: 'GET',
		headers: headers,
		...customConfig,
	}

	const urlParams = new URLSearchParams({
		...queryParams,
		...authKeys,
	})

	const res = await window.fetch(`${baseURL}/${endpoint}?` + urlParams, config)
	const data = await res.json()
	if (res.ok) {
		return data
	} else {
		return Promise.reject(data)
	}
}

export { client }
