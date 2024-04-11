const prerender = false;
const turnstileURL = "https://challenges.cloudflare.com/turnstile/v0/siteverify";
const POST = async ({ request }) => {
  const data = await request.formData();
  const turnstile_token = data.get("cf-turnstile-response");
  if (!turnstile_token || !process.env.TURNSTILE_SECRET_TOKEN) {
    return new Response(
      JSON.stringify({
        status: "401 Unauthorized",
        message: "Please include TURNSTILE_SECRET_TOKEN in your .env file."
      }),
      { status: 401 }
    );
  }
  const formData = new FormData();
  formData.append("secret", process.env.TURNSTILE_SECRET_TOKEN);
  formData.append("response", turnstile_token);
  const result = await fetch(turnstileURL, {
    body: formData,
    method: "POST"
  });
  const outcome = await result.json();
  if (!outcome.success) {
    return new Response(
      JSON.stringify({
        status: "500 Internal Server Error",
        message: "An error occurred while verifying you with Turnstile. Are you a human?"
      }),
      { status: 500 }
    );
  }
  const name = data.get("name")?.toString();
  const message = data.get("message")?.toString();
  if (!name && !message) {
    return new Response(
      JSON.stringify({
        status: "400 Bad Request",
        message: "Missing required fields: name, message."
      }),
      { status: 400 }
    );
  }
  return new Response(
    JSON.stringify({
      message: "Success.",
      response: {
        name,
        message
      }
    })
  );
};

export { POST, prerender };
