export const signOut = async () => {
  const response = await fetch("/api/auth/csrf");

  const { csrfToken } = await (response.json() as Promise<{
    csrfToken: string;
  }>);

  const res = await fetch("/api/auth/signout", {
    method: "post",
    headers: {
      "Content-Type": "application/x-www-form-urlencoded",
      "X-Auth-Return-Redirect": "1",
    },
    body: new URLSearchParams({
      csrfToken,
    }),
  });

  const data = await res.clone().json();
  const error = new URL(data.url).searchParams.get("error");

  // TODO: this method doesn't prevent `back` button in browser from reloading auth page. Revamp if needed before migration to BA
  if (!error) {
    window.location.reload();
    return;
  }

  return res;
};
