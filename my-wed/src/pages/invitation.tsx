import { useEffect, useState } from "react";
import { Page, useNavigate } from "zmp-ui";

import MusicPlayer from "@/components/music-player";
import Preloader, { LoadingScreen } from "@/components/preloader";
import { fetchInvitation, mergeInvitationData } from "@/core/invitations";
import { WeddingData } from "@/core/types";
import { getTemplate } from "@/templates";

type State =
  | { kind: "loading" }
  | { kind: "missing" }
  | { kind: "error"; reason: string }
  | { kind: "ready"; templateId: string; data: WeddingData };

/** A real invitation, opened from a link with `?thiep=<code>`. */
const InvitationPage = ({ code }: { code: string }) => {
  const navigate = useNavigate();
  const [state, setState] = useState<State>({ kind: "loading" });
  // The template (and so its own waiting screen) is only known once the invitation has been fetched. A quick
  // fetch gets no screen of its own, so the guest sees one waiting screen, the template's; only a slow one
  // shows the plain screen in the meantime.
  const [slow, setSlow] = useState(false);
  useEffect(() => {
    const t = window.setTimeout(() => setSlow(true), 700);
    return () => window.clearTimeout(t);
  }, []);

  useEffect(() => {
    let alive = true;
    fetchInvitation(code)
      .then((invitation) => {
        if (!alive) return;
        const template = invitation && getTemplate(invitation.templateId);
        if (!invitation || !template) {
          setState({ kind: "missing" });
          return;
        }
        setState({
          kind: "ready",
          templateId: template.id,
          data: mergeInvitationData(template.demoData, invitation.data),
        });
      })
      .catch(
        (e: unknown) =>
          alive &&
          setState({
            kind: "error",
            reason: e instanceof Error ? e.message : String(e),
          }),
      );
    return () => {
      alive = false;
    };
  }, [code]);

  if (state.kind === "ready") {
    const { Component } = getTemplate(state.templateId)!;
    return (
      <>
        <MusicPlayer song={state.data.music} corner />
        <Component data={state.data} />
        <Preloader names={[state.data.groom, state.data.bride]} />
      </>
    );
  }

  if (state.kind === "loading") return slow ? <LoadingScreen /> : null;

  return (
    <Page className="iv-page">
      <div className="iv-box">
        <h1>
          {state.kind === "missing"
            ? "Không tìm thấy thiệp"
            : "Chưa mở được thiệp"}
        </h1>
        <p>
          {state.kind === "missing"
            ? "Đường liên kết không đúng hoặc thiệp đã hết hạn."
            : "Kết nối mạng đang chập chờn, bạn thử mở lại sau ít phút nhé."}
        </p>
        <button
          type="button"
          className="iv-btn"
          onClick={() => navigate("/", { replace: true })}
        >
          Xem các mẫu thiệp
        </button>
        {/* the real cause, small, so a screenshot tells the shop what went wrong */}
        {state.kind === "error" && (
          <small className="iv-reason">{state.reason}</small>
        )}
      </div>
    </Page>
  );
};

export default InvitationPage;
