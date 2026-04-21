const headers = { "Content-Type": "application/json" };

export async function submitForm(payload) {
  try {
    const res = await fetch("/api/v1/form", {
      method: "POST",
      headers,
      body: JSON.stringify(payload),
    });
    return await res.json();
  } catch (e) {
    return null;
  }
}

export async function sendEvent(eventPayload) {
  try {
    await fetch("/api/v1/event", {
      method: "POST",
      headers,
      body: JSON.stringify(eventPayload),
    });
  } catch (e) {
    // ignore
  }
}
