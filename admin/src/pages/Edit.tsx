import { ChangeEvent, ReactNode, useEffect, useState } from "react";

import { MIN_ALBUM, PHOTO_LABELS, SONGS, TEMPLATES } from "../catalog";
import {
  Invitation,
  STATUS_LABEL,
  Status,
  WeddingData,
  finalizeData,
  invitationLink,
  joinISO,
  makeCode,
  missingFor,
  newInvitationData,
  splitISO,
  uploadPhoto,
  uploadSong,
} from "../data";
import { supabase } from "../supabase";

const thumbs = import.meta.glob("../../../my-wed/src/static/thumbs/*.jpg", {
  eager: true,
  query: "?url",
  import: "default",
}) as Record<string, string>;
const thumbOf = (id: string) =>
  Object.entries(thumbs).find(([p]) => p.endsWith(`/${id}.jpg`))?.[1];

const Field = ({ label, children }: { label: string; children: ReactNode }) => (
  <label className="field">
    <span>{label}</span>
    {children}
  </label>
);

const Section = ({
  title,
  children,
}: {
  title: string;
  children: ReactNode;
}) => (
  <section className="card section">
    <h3>{title}</h3>
    {children}
  </section>
);

const EditPage = ({ code: editCode }: { code?: string }) => {
  const [code, setCode] = useState(editCode ?? "");
  const [isNew, setIsNew] = useState(!editCode);
  const [templateId, setTemplateId] = useState("t25");
  const [status, setStatus] = useState<Status>("draft");
  const [customer, setCustomer] = useState("");
  const [expires, setExpires] = useState("");
  const [d, setD] = useState<WeddingData>(newInvitationData);
  const [loading, setLoading] = useState(!!editCode);
  const [busy, setBusy] = useState("");
  const [msg, setMsg] = useState("");

  useEffect(() => {
    if (!editCode) return;
    supabase
      .from("invitations")
      .select("*")
      .eq("code", editCode)
      .single()
      .then(({ data, error }) => {
        setLoading(false);
        if (error || !data) return setMsg("Không tìm thấy thiệp.");
        const row = data as Invitation;
        setTemplateId(row.template_id);
        setStatus(row.status);
        setCustomer(row.customer ?? "");
        setExpires(row.expires_at?.slice(0, 10) ?? "");
        setD({ ...newInvitationData(), ...row.data });
      });
  }, [editCode]);

  const set = <K extends keyof WeddingData>(k: K, v: WeddingData[K]) =>
    setD((p) => ({ ...p, [k]: v }));
  const { date, time } = splitISO(d.weddingISO);
  const ensureCode = () => {
    if (code) return code;
    const c = makeCode(d.groom, d.bride);
    setCode(c);
    return c;
  };

  const withBusy = async (label: string, job: () => Promise<void>) => {
    setBusy(label);
    setMsg("");
    try {
      await job();
    } catch (e) {
      setMsg(`Lỗi: ${(e as Error).message}`);
    } finally {
      setBusy("");
    }
  };

  const onSlot = (key: string) => (e: ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0];
    e.target.value = "";
    if (!file) return;
    withBusy("Đang tải ảnh…", async () => {
      const slot = await uploadPhoto(
        ensureCode(),
        key,
        PHOTO_LABELS[key] ?? key,
        file,
      );
      setD((p) => ({ ...p, photos: { ...p.photos, [key]: slot } }));
    });
  };

  const onAlbum = (e: ChangeEvent<HTMLInputElement>) => {
    const files = Array.from(e.target.files ?? []);
    e.target.value = "";
    if (!files.length) return;
    withBusy(`Đang tải ${files.length} ảnh…`, async () => {
      const c = ensureCode();
      for (const [i, f] of files.entries()) {
        const slot = await uploadPhoto(
          c,
          `album${Date.now()}${i}`,
          "Ảnh album",
          f,
        );
        setD((p) => ({ ...p, album: [...p.album, slot] }));
      }
    });
  };

  const moveAlbum = (i: number, dir: -1 | 1) =>
    setD((p) => {
      const a = [...p.album];
      const j = i + dir;
      if (j < 0 || j >= a.length) return p;
      [a[i], a[j]] = [a[j], a[i]];
      return { ...p, album: a };
    });

  const onQr =
    (side: "groom" | "bride") => (e: ChangeEvent<HTMLInputElement>) => {
      const file = e.target.files?.[0];
      e.target.value = "";
      if (!file) return;
      withBusy("Đang tải mã QR…", async () => {
        const slot = await uploadPhoto(ensureCode(), `qr-${side}`, "QR", file);
        setD((p) => ({
          ...p,
          gifts: { ...p.gifts, [side]: { ...p.gifts[side], qr: slot.src } },
        }));
      });
    };

  const onSong = (e: ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0];
    e.target.value = "";
    if (!file) return;
    withBusy("Đang tải bài hát…", async () =>
      set("music", await uploadSong(ensureCode(), file)),
    );
  };

  const missing = missingFor(templateId, d);

  const save = () =>
    withBusy("Đang lưu…", async () => {
      if (status === "active" && missing.length) {
        const ok = confirm(
          `Thiệp còn thiếu: ${missing.join(", ")}.\nVẫn lưu ở trạng thái "Đang dùng"?`,
        );
        if (!ok) return;
      }
      const c = ensureCode();
      const row = {
        code: c,
        template_id: templateId,
        status,
        customer: customer.trim() || null,
        wedding_date: date || null,
        expires_at: expires ? `${expires}T23:59:59+07:00` : null,
        data: finalizeData(d),
        updated_at: new Date().toISOString(),
      };
      const { error } = isNew
        ? await supabase.from("invitations").insert(row)
        : await supabase.from("invitations").update(row).eq("code", c);
      if (error) throw error;
      setIsNew(false);
      if (!editCode) history.replaceState(null, "", `#/edit/${c}`);
      setMsg("Đã lưu.");
    });

  const remove = () =>
    withBusy("Đang xóa…", async () => {
      if (
        !confirm(`Xóa hẳn thiệp ${code}? Khách mời sẽ không mở được link nữa.`)
      )
        return;
      const { data: files } = await supabase.storage
        .from("media")
        .list(code, { limit: 1000 });
      if (files?.length)
        await supabase.storage
          .from("media")
          .remove(files.map((f) => `${code}/${f.name}`));
      const { error } = await supabase
        .from("invitations")
        .delete()
        .eq("code", code);
      if (error) throw error;
      location.hash = "#/";
    });

  if (loading) return <p className="muted">Đang tải…</p>;
  const template = TEMPLATES.find((t) => t.id === templateId);
  const customSong = d.music?.startsWith("https://");

  return (
    <div className="edit">
      <div className="row between">
        <h2>{isNew ? "Tạo thiệp" : `Sửa thiệp`}</h2>
        <a href="#/">‹ Danh sách</a>
      </div>
      {code && (
        <p className="small">
          Mã: <b className="code">{code}</b> · Link:{" "}
          <button
            className="link"
            onClick={() => navigator.clipboard.writeText(invitationLink(code))}
          >
            copy
          </button>
        </p>
      )}

      <Section title="1. Mẫu thiệp">
        <div className="templates">
          {TEMPLATES.map((t) => (
            <button
              key={t.id}
              type="button"
              className={`tpl ${t.id === templateId ? "on" : ""}`}
              onClick={() => setTemplateId(t.id)}
            >
              {thumbOf(t.id) && (
                <img src={thumbOf(t.id)} alt="" loading="lazy" />
              )}
              <span>{t.name}</span>
            </button>
          ))}
        </div>
      </Section>

      <Section title="2. Cô dâu, chú rể và ngày cưới">
        <div className="grid2">
          <Field label="Tên chú rể">
            <input
              value={d.groom}
              onChange={(e) => set("groom", e.target.value)}
              placeholder="Minh Khôi"
            />
          </Field>
          <Field label="Tên cô dâu">
            <input
              value={d.bride}
              onChange={(e) => set("bride", e.target.value)}
              placeholder="Bảo Ngọc"
            />
          </Field>
          <Field label="Ngày cưới">
            <input
              type="date"
              value={date}
              onChange={(e) =>
                set("weddingISO", joinISO(e.target.value, time || "11:00"))
              }
            />
          </Field>
          <Field label="Giờ (giờ Việt Nam)">
            <input
              type="time"
              value={time}
              onChange={(e) => set("weddingISO", joinISO(date, e.target.value))}
            />
          </Field>
          <Field label="Hạn xác nhận tham dự (vd 10.12)">
            <input
              value={d.rsvpDeadline}
              onChange={(e) => set("rsvpDeadline", e.target.value)}
            />
          </Field>
        </div>
        <div className="grid2">
          {(["groom", "bride"] as const).map((side) => (
            <Field
              key={side}
              label={
                side === "groom"
                  ? "Nhà trai (mỗi dòng 1 người)"
                  : "Nhà gái (mỗi dòng 1 người)"
              }
            >
              <textarea
                rows={2}
                value={d.families[side].join("\n")}
                onChange={(e) =>
                  set("families", {
                    ...d.families,
                    [side]: e.target.value.split("\n"),
                  })
                }
                placeholder={"Ông Nguyễn Văn A\nBà Trần Thị B"}
              />
            </Field>
          ))}
        </div>
      </Section>

      <Section title="3. Địa điểm và lịch trình">
        <div className="grid2">
          <Field label="Tên địa điểm">
            <input
              value={d.venueName}
              onChange={(e) => set("venueName", e.target.value)}
              placeholder="Nhà hàng Hoa Sen"
            />
          </Field>
          <Field label="Địa chỉ">
            <input
              value={d.venueAddress}
              onChange={(e) => set("venueAddress", e.target.value)}
            />
          </Field>
          <Field label="Từ khóa tìm trên bản đồ (để trống = tên + địa chỉ)">
            <input
              value={d.venueQuery}
              onChange={(e) => set("venueQuery", e.target.value)}
            />
          </Field>
        </div>
        <div className="timeline">
          {d.timeline.map((s, i) => (
            <div key={i} className="row">
              <input
                type="time"
                value={s.time}
                onChange={(e) =>
                  set(
                    "timeline",
                    d.timeline.map((x, j) =>
                      j === i ? { ...x, time: e.target.value } : x,
                    ),
                  )
                }
              />
              <input
                value={s.label}
                onChange={(e) =>
                  set(
                    "timeline",
                    d.timeline.map((x, j) =>
                      j === i
                        ? { ...x, label: e.target.value.toUpperCase() }
                        : x,
                    ),
                  )
                }
              />
            </div>
          ))}
        </div>
      </Section>

      <Section title="4. Ảnh">
        <p className="muted small">
          Ảnh tự nén trước khi tải lên. {template?.name} dùng các ảnh sau:
        </p>
        <div className="slots">
          {(template?.photos ?? []).map((key) => (
            <label key={key} className="slot">
              {d.photos[key]?.src ? (
                <img src={d.photos[key].src} alt="" />
              ) : (
                <span className="ph">+</span>
              )}
              <span>{PHOTO_LABELS[key] ?? key}</span>
              <input
                type="file"
                accept="image/*"
                hidden
                onChange={onSlot(key)}
              />
            </label>
          ))}
        </div>
        <h4>
          Album ({d.album.length}){" "}
          <span className="muted small">
            · ít nhất {MIN_ALBUM} ảnh, ảnh đầu hiện trước
          </span>
        </h4>
        <div className="album">
          {d.album.map((p, i) => (
            <figure key={p.src}>
              <img src={p.src} alt="" />
              <figcaption>
                <button
                  type="button"
                  onClick={() => moveAlbum(i, -1)}
                  disabled={!i}
                >
                  ‹
                </button>
                <button
                  type="button"
                  onClick={() =>
                    set(
                      "album",
                      d.album.filter((_, j) => j !== i),
                    )
                  }
                >
                  Xóa
                </button>
                <button
                  type="button"
                  onClick={() => moveAlbum(i, 1)}
                  disabled={i === d.album.length - 1}
                >
                  ›
                </button>
              </figcaption>
            </figure>
          ))}
          <label className="slot add">
            <span className="ph">+</span>
            <span>Thêm ảnh</span>
            <input
              type="file"
              accept="image/*"
              multiple
              hidden
              onChange={onAlbum}
            />
          </label>
        </div>
      </Section>

      <Section title="5. Mừng cưới">
        <div className="grid2">
          {(["groom", "bride"] as const).map((side) => {
            const g = d.gifts[side];
            const upd = (k: "bank" | "account" | "owner", v: string) =>
              set("gifts", { ...d.gifts, [side]: { ...g, [k]: v } });
            return (
              <div key={side} className="gift">
                <h4>{side === "groom" ? "Chú rể" : "Cô dâu"}</h4>
                <input
                  placeholder="Ngân hàng"
                  value={g.bank}
                  onChange={(e) => upd("bank", e.target.value)}
                />
                <input
                  placeholder="Số tài khoản"
                  value={g.account}
                  onChange={(e) => upd("account", e.target.value)}
                />
                <input
                  placeholder="Chủ tài khoản"
                  value={g.owner}
                  onChange={(e) => upd("owner", e.target.value.toUpperCase())}
                />
                <label className="slot qr">
                  {g.qr ? (
                    <img src={g.qr} alt="" />
                  ) : (
                    <span className="ph">QR</span>
                  )}
                  <span>Mã QR (không bắt buộc)</span>
                  <input
                    type="file"
                    accept="image/*"
                    hidden
                    onChange={onQr(side)}
                  />
                </label>
              </div>
            );
          })}
        </div>
      </Section>

      <Section title="6. Nhạc và màu trang phục">
        <div className="grid2">
          <Field label="Nhạc nền">
            <select
              value={customSong ? "custom" : (d.music ?? "")}
              onChange={(e) =>
                e.target.value !== "custom" && set("music", e.target.value)
              }
            >
              {SONGS.map((s) => (
                <option key={s.id} value={s.id}>
                  {s.name}
                </option>
              ))}
              {customSong && (
                <option value="custom">Bài khách gửi (đã tải lên)</option>
              )}
            </select>
          </Field>
          <Field label="Hoặc tải bài riêng của khách (mp3)">
            <input type="file" accept="audio/mpeg,.mp3" onChange={onSong} />
          </Field>
        </div>
        <div className="row colors">
          {d.dressColors.map((c, i) => (
            <input
              key={i}
              type="color"
              value={c}
              onChange={(e) =>
                set(
                  "dressColors",
                  d.dressColors.map((x, j) => (j === i ? e.target.value : x)),
                )
              }
            />
          ))}
        </div>
      </Section>

      <Section title="7. Quản lý">
        <div className="grid2">
          <Field label="Trạng thái">
            <select
              value={status}
              onChange={(e) => setStatus(e.target.value as Status)}
            >
              {(Object.keys(STATUS_LABEL) as Status[]).map((s) => (
                <option key={s} value={s}>
                  {STATUS_LABEL[s]}
                </option>
              ))}
            </select>
          </Field>
          <Field label="Khách đặt (tên, SĐT, ghi chú)">
            <input
              value={customer}
              onChange={(e) => setCustomer(e.target.value)}
            />
          </Field>
          <Field label="Hết hạn sau ngày (để trống = không hết hạn)">
            <input
              type="date"
              value={expires}
              onChange={(e) => setExpires(e.target.value)}
            />
          </Field>
        </div>
      </Section>

      <div className="savebar">
        {missing.length > 0 && (
          <p className="warn small">Còn thiếu: {missing.join(", ")}</p>
        )}
        {msg && <p className={msg.startsWith("Lỗi") ? "error" : "ok"}>{msg}</p>}
        <div className="row">
          {!isNew && (
            <button className="danger" onClick={remove} disabled={!!busy}>
              Xóa thiệp
            </button>
          )}
          <button className="primary" onClick={save} disabled={!!busy}>
            {busy || "Lưu thiệp"}
          </button>
        </div>
      </div>
    </div>
  );
};

export default EditPage;
