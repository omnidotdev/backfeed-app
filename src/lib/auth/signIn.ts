export const signIn = async ({
  redirectUrl,
  action,
}: {
  redirectUrl: string;
  action?: "sign-up";
}) => {
  const { callbackUrl = redirectUrl, redirect = true } = {};

  const response = await fetch("/api/auth/csrf");
  const { csrfToken } = await (response.json() as Promise<{
    csrfToken: string;
  }>);
  const res = await fetch(
    `/api/auth/signin/omni${action ? "?action=sign-up" : ""}`,
    {
      method: "post",
      headers: {
        "Content-Type": "application/x-www-form-urlencoded",
        "X-Auth-Return-Redirect": "1",
      },
      body: new URLSearchParams({
        csrfToken,
        callbackUrl,
      }),
    },
  );

  const data = await res.clone().json();
  const error = new URL(data.url).searchParams.get("error");

  if (redirect || !error) {
    window.location.href = data.url;
    // If url contains a hash, the browser does not reload the page. We reload manually
    if (data.url.includes("#")) window.location.reload();
    return;
  }

  return res;
};
