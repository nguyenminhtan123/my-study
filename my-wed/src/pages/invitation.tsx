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
  | { kind: "error" }
  | { kind: "ready"; templateId: string; data: WeddingData };

/** A real invitation, opened from a link with `?thiep=<code>`. */
const InvitationPage = ({ code }: { code: string }) => {
  const navigate = useNavigate();
  const [state, setState] = useState<State>({ kind: "loading" });

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
      .catch(() => alive && setState({ kind: "error" }));
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

  // the same waiting screen as while the pictures load, so opening an invitation is one smooth wait
  if (state.kind === "loading") return <LoadingScreen />;

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
      </div>
    </Page>
  );
};

export default InvitationPage;
