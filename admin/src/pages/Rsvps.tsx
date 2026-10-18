import { useEffect, useState } from "react";
import writeXlsxFile from "write-excel-file";

import { supabase } from "../supabase";

interface Rsvp {
  id: number;
  guest_name: string;
  attending: boolean;
  party_size: number;
  side: "groom" | "bride" | null;
  message: string | null;
  created_at: string;
}

const SIDE: Record<string, string> = { groom: "Nhà trai", bride: "Nhà gái" };
const when = (iso: string) =>
  new Date(iso).toLocaleString("vi-VN", { timeZone: "Asia/Ho_Chi_Minh" });

/** Guests' RSVPs and wishes for one invitation, with an Excel export for the couple. */
const RsvpsPage = ({ code }: { code: string }) => {
  const [rows, setRows] = useState<Rsvp[] | null>(null);
  const [title, setTitle] = useState("");
  const [error, setError] = useState("");

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
    supabase
      .from("rsvps")
      .select("*")
      .eq("invitation_code", code)
      .order("created_at")
      .then(({ data, error }) =>
        error ? setError(error.message) : setRows(data as Rsvp[]),
      );
  }, [code]);

  const coming = rows?.filter((r) => r.attending) ?? [];
  const people = coming.reduce((n, r) => n + r.party_size, 0);

  const exportExcel = () => {
    if (!rows) return;
    const head = [
      "STT",
      "Tên khách",
      "Tham dự",
      "Số người",
      "Bên",
      "Lời chúc",
      "Thời gian",
    ].map((value) => ({ value, fontWeight: "bold" as const }));
    const body = rows.map((r, i) => [
      { type: Number, value: i + 1 },
      { type: String, value: r.guest_name },
      { type: String, value: r.attending ? "Có" : "Không" },
      { type: Number, value: r.party_size },
      { type: String, value: r.side ? SIDE[r.side] : "" },
      { type: String, value: r.message ?? "", wrap: true },
      { type: String, value: when(r.created_at) },
    ]);
    writeXlsxFile([head, ...body], {
      columns: [
        { width: 5 },
        { width: 24 },
        { width: 9 },
        { width: 9 },
        { width: 10 },
        { width: 50 },
        { width: 20 },
      ],
      fileName: `phan-hoi-${code}.xlsx`,
    });
  };

  return (
    <section>
      <div className="row between">
        <h2>Phản hồi · {title}</h2>
        <a href="#/">‹ Danh sách</a>
      </div>
      {error && <p className="error">{error}</p>}
      {rows && (
        <>
          <p>
            {rows.length} phản hồi · <b>{coming.length}</b> sẽ đến (tổng{" "}
            <b>{people}</b> người) · {rows.length - coming.length} không đến
          </p>
          <button
            className="primary"
            onClick={exportExcel}
            disabled={!rows.length}
          >
            Xuất Excel
          </button>
          <table className="table">
            <thead>
              <tr>
                <th>Tên</th>
                <th>Đến</th>
                <th>Số người</th>
                <th>Bên</th>
                <th>Lời chúc</th>
                <th>Lúc</th>
              </tr>
            </thead>
            <tbody>
              {rows.map((r) => (
                <tr key={r.id}>
                  <td>{r.guest_name}</td>
                  <td>{r.attending ? "Có" : "Không"}</td>
                  <td>{r.party_size}</td>
                  <td>{r.side ? SIDE[r.side] : ""}</td>
                  <td className="wish">{r.message}</td>
                  <td className="small">{when(r.created_at)}</td>
                </tr>
              ))}
            </tbody>
          </table>
        </>
      )}
      {!rows && !error && <p className="muted">Đang tải…</p>}
    </section>
  );
};

export default RsvpsPage;
