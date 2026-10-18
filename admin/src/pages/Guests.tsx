import { useEffect, useState } from "react";

import { invitationLink } from "../data";
import { supabase } from "../supabase";

/** Paste the guest list (one name per line) to get a personal link for each guest. */
const GuestsPage = ({ code }: { code: string }) => {
  const [title, setTitle] = useState("");
  const [names, setNames] = useState("");
  const [copied, setCopied] = useState("");

  useEffect(() => {
    supabase
      .from("invitations")
      .select("data")
      .eq("code", code)
      .single()
      .then(
        ({ data }) =>
          data && setTitle(`${data.data.groom} & ${data.data.bride}`),
      );
  }, [code]);

  const guests = names
    .split("\n")
    .map((n) => n.trim())
    .filter(Boolean);
  const copy = (text: string, what: string) =>
    navigator.clipboard.writeText(text).then(() => setCopied(what));

  return (
    <section>
      <div className="row between">
        <h2>Link khách mời · {title}</h2>
        <a href="#/">‹ Danh sách</a>
      </div>
      <p className="muted small">
        Mỗi dòng một tên, đúng cách xưng hô muốn hiện trên thiệp (vd "Anh Hùng",
        "Cô Lan và gia đình"). Thiệp mở bằng link riêng sẽ ghi tên người đó.
      </p>
      <textarea
        rows={8}
        value={names}
        onChange={(e) => setNames(e.target.value)}
        placeholder={"Anh Hùng\nChị Lan\nCô Mai và gia đình"}
      />
      <div className="row">
        <button onClick={() => copy(invitationLink(code), "chung")}>
          Copy link chung
        </button>
        {guests.length > 0 && (
          <button
            className="primary"
            onClick={() =>
              copy(
                guests
                  .map((g) => `${g}: ${invitationLink(code, g)}`)
                  .join("\n"),
                "tất cả",
              )
            }
          >
            Copy tất cả ({guests.length})
          </button>
        )}
        {copied && <span className="ok small">Đã copy {copied}</span>}
      </div>
      <div className="links">
        {guests.map((g) => (
          <div key={g} className="link-row">
            <div>
              <b>{g}</b>
              <span className="small code muted">
                {invitationLink(code, g)}
              </span>
            </div>
            <button onClick={() => copy(invitationLink(code, g), g)}>
              Copy
            </button>
          </div>
        ))}
      </div>
    </section>
  );
};

export default GuestsPage;
