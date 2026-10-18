import { useEffect, useMemo, useState } from "react";

import { TEMPLATES } from "../catalog";
import { Invitation, STATUS_LABEL, invitationLink } from "../data";
import { supabase } from "../supabase";

const ListPage = () => {
  const [rows, setRows] = useState<Invitation[] | null>(null);
  const [error, setError] = useState("");
  const [q, setQ] = useState("");

  useEffect(() => {
    supabase
      .from("invitations")
      .select(
        "code, template_id, status, customer, wedding_date, data, updated_at, rsvps(count)",
      )
      .order("wedding_date", { ascending: true, nullsFirst: false })
      .then(({ data, error }) => {
        if (error) setError(error.message);
        else setRows(data as Invitation[]);
      });
  }, []);

  const shown = useMemo(() => {
    const k = q.trim().toLowerCase();
    if (!rows || !k) return rows ?? [];
    return rows.filter((r) =>
      [r.code, r.customer, r.data.groom, r.data.bride]
        .join(" ")
        .toLowerCase()
        .includes(k),
    );
  }, [rows, q]);

  return (
    <section>
      <div className="row between">
        <h2>Thiệp ({rows?.length ?? "…"})</h2>
        <a className="button primary" href="#/new">
          + Tạo thiệp
        </a>
      </div>
      <input
        className="search"
        placeholder="Tìm theo tên cô dâu, chú rể, khách đặt, mã thiệp…"
        value={q}
        onChange={(e) => setQ(e.target.value)}
      />
      {error && <p className="error">{error}</p>}
      {!rows && !error && <p className="muted">Đang tải…</p>}
      <div className="list">
        {shown.map((r) => (
          <article key={r.code} className="card item">
            <div>
              <h3>
                {r.data.groom || "?"} &amp; {r.data.bride || "?"}
              </h3>
              <p className="muted small">
                {r.wedding_date
                  ? r.wedding_date.split("-").reverse().join("/")
                  : "Chưa có ngày"}{" "}
                ·{" "}
                {TEMPLATES.find((t) => t.id === r.template_id)?.name ??
                  r.template_id}{" "}
                ·{" "}
                <span className={`badge ${r.status}`}>
                  {STATUS_LABEL[r.status]}
                </span>{" "}
                · {r.rsvps?.[0]?.count ?? 0} phản hồi
              </p>
              {r.customer && <p className="small">Khách đặt: {r.customer}</p>}
              <p className="small code">{r.code}</p>
            </div>
            <div className="actions">
              <a className="button" href={`#/edit/${r.code}`}>
                Sửa
              </a>
              <a className="button" href={`#/guests/${r.code}`}>
                Link khách mời
              </a>
              <a className="button" href={`#/rsvps/${r.code}`}>
                Phản hồi
              </a>
              <button
                onClick={() =>
                  navigator.clipboard.writeText(invitationLink(r.code))
                }
              >
                Copy link
              </button>
            </div>
          </article>
        ))}
        {rows && !shown.length && <p className="muted">Chưa có thiệp nào.</p>}
      </div>
    </section>
  );
};

export default ListPage;
