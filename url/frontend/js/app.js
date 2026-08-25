const form = document.getElementById("shortenForm");
const input = document.getElementById("longUrl");
const result = document.getElementById("result");
const shortUrl = document.getElementById("shortUrl");
const copyBtn = document.getElementById("copyBtn");
const message = document.getElementById("message");
const submitBtn = document.getElementById("submitBtn");

form.addEventListener("submit", async (e) => {
  e.preventDefault();
  result.classList.add("hidden");
  message.textContent = "";
  submitBtn.disabled = true;
  submitBtn.textContent = "Creating…";

  try {
    const res = await fetch("/api/shorten", {
      method: "POST",
      headers: {"Content-Type":"application/json"},
      body: JSON.stringify({ longUrl: input.value.trim() })
    });
    const data = await res.json();
    if (!res.ok) throw new Error(data.error || "Something went wrong.");

    shortUrl.href = data.shortUrl;
    shortUrl.textContent = data.shortUrl;
    result.classList.remove("hidden");
  } catch (err) {
    message.textContent = err.message;
  } finally {
    submitBtn.disabled = false;
    submitBtn.innerHTML = 'Shorten URL <span>→</span>';
  }
});

copyBtn.addEventListener("click", async () => {
  await navigator.clipboard.writeText(shortUrl.href);
  const old = copyBtn.textContent;
  copyBtn.textContent = "Copied!";
  setTimeout(() => copyBtn.textContent = old, 1200);
});
