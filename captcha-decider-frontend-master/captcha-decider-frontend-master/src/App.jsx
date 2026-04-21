import { useEffect, useMemo, useState } from "react";
import { sendEvent, submitForm } from "./api";
import { useActivity } from "./useActivity";
import ConfirmModal from "./components/ConfirmModal";
import { ensureSessionId } from "./session";

const initialForm = {
  firstName: "",
  lastName: "",
  emailId: "",
  text: "",
  hp_emailId: "",
  hp_comment: "",
};

export default function App() {
  const [form, setForm] = useState(initialForm);
  const [status, setStatus] = useState({ text: "", tone: "muted" });
  const [showConfirm, setShowConfirm] = useState(false);
  const [pendingPayload, setPendingPayload] = useState(null);
  const sessionId = useMemo(() => ensureSessionId(), []);
  const { heartbeatSnapshot } = useActivity(sessionId, sendEvent);

  const updateField = (e) => {
    const { name, value } = e.target;
    setForm((prev) => ({ ...prev, [name]: value }));
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    const payload = buildPayload(form, sessionId, heartbeatSnapshot);
    setPendingPayload(payload);
    await dispatchSubmit(payload, false);
  };

  const dispatchSubmit = async (payload, afterCaptcha) => {
    setStatus({ text: "Submitting...", tone: "muted" });
    const resp = await submitForm(payload);
    if (!resp) {
      setStatus({ text: "Network error", tone: "error" });
      return;
    }
    if (resp.result === "ALLOW") {
      setStatus({ text: "Message sent. We'll be in touch soon.", tone: "ok" });
      setForm(initialForm);
      setPendingPayload(null);
      setShowConfirm(false);
    } else if (resp.result === "CAPTCHA" && !afterCaptcha) {
      setStatus({ text: "Please complete the security check to continue.", tone: "warn" });
      setShowConfirm(true);
    } else if (resp.result === "DENY") {
      setStatus({ text: resp.message || "Unable to send right now.", tone: "error" });
      setShowConfirm(false);
    }
  };

  const handleConfirm = async () => {
    if (!pendingPayload) return;
    const payload = { ...pendingPayload, captchaCompleted: true };
    await dispatchSubmit(payload, true);
  };

  return (
    <main className="page">
      <section className="card">
        <header className="card__header">
          <h1>Contact Form</h1>
          <p className="sub">Reach out to us!</p>
        </header>
        <form className="form" onSubmit={handleSubmit}>
          <div className="grid">
            <label>
              First name
              <input name="firstName" value={form.firstName} onChange={updateField} required />
            </label>
            <label>
              Last name
              <input name="lastName" value={form.lastName} onChange={updateField} required />
            </label>
          </div>
          <label>
            Email
            <input type="email" name="emailId" value={form.emailId} onChange={updateField} required />
          </label>
          <label>
            Message
            <textarea name="text" rows={4} value={form.text} onChange={updateField} required />
          </label>

          <div
            className="honeypots"
            aria-hidden="true"
            style={{ position: "absolute", left: "-10000px", width: "1px", height: "1px", overflow: "hidden" }}
          >
            <label>
              emailId
              <input name="hp_emailId" value={form.hp_emailId} onChange={updateField} autoComplete="off" tabIndex={-1} />
            </label>
            <label>
              Comment
              <input name="hp_comment" value={form.hp_comment} onChange={updateField} autoComplete="off" tabIndex={-1} />
            </label>
          </div>

          <button type="submit">Send</button>
        </form>
        {status.text && <div className={`status status--${status.tone}`}>{status.text}</div>}
      </section>
      <ConfirmModal open={showConfirm} onClose={() => setShowConfirm(false)} onSolved={handleConfirm} />
    </main>
  );
}

function buildPayload(form, sessionId, snapshot) {
  return {
    ...form,
    sessionId,
    timezoneOffset: new Date().getTimezoneOffset(),
    screenHeight: window.screen.height,
    screenWidth: window.screen.width,
    userAgent: navigator.userAgent,
    pageUrl: window.location.href,
    captchaCompleted: false,
    mouseMoveCount: snapshot.mouseMoveCount,
    keypressCount: snapshot.keypressCount,
  };
}
