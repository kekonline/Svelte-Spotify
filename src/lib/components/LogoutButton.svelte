<script>
	import { invalidateAll } from '$app/navigation';
</script>

<form
	method="POST"
	action="/api/auth/logout"
	on:submit|preventDefault={async () => {
		const response = await fetch('/api/auth/logout', {
			method: 'POST',
			//without the header and invalidateAll will not work if javascript enabled ass it will not refresh but it will delete the cookies
			//we use header to tell the server we are sending a request with javascript and it will not redirect from the server side
			headers: {
				accept: 'application/json'
			}
		});
		if (response.ok) {
			//invalidateAll will reload the page but we do this because we are using javascript and we are not going to get a server side render.
			invalidateAll();
		}
	}}
>
	<button type="submit">Logout</button>
</form>
