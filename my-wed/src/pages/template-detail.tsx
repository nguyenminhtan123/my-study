import { useState } from "react";
import { Button, Page, useNavigate, useParams } from "zmp-ui";

import { getTemplate } from "@/templates";

const Chevron = ({ up = false }: { up?: boolean }) => (
  <svg
    viewBox="0 0 24 24"
    width="16"
    height="16"
    aria-hidden="true"
    style={{ transform: up ? "rotate(180deg)" : undefined }}
  >
    <path
      d="M6 9l6 6 6-6"
      fill="none"
      stroke="currentColor"
      strokeWidth="2.2"
      strokeLinecap="round"
      strokeLinejoin="round"
    />
  </svg>
);

// Whether the bottom bar is tucked away; kept across previews so a viewer who prefers the full
// view keeps it while browsing templates.
let barHidden = false;

function TemplateDetailPage() {
  const { id = "" } = useParams();
  const navigate = useNavigate();
  const [hidden, setHidden] = useState(barHidden);
  const template = getTemplate(id);

  if (!template) {
    return (
      <Page className="gl-page">
        <header className="gl-head">
          <h1>Không tìm thấy mẫu</h1>
          <Button size="small" onClick={() => navigate("/")}>
            Về danh sách mẫu
          </Button>
        </header>
      </Page>
    );
  }

  const toggle = (next: boolean) => {
    barHidden = next;
    setHidden(next);
  };

  const { Component, demoData } = template;

  return (
    <>
      {/* Kept before the template so `.gl-bar:not(.gl-bar-off) ~ ...` can pad the template
          while the bar is showing; hiding the bar gives the template the full screen. */}
      <div className={`gl-bar ${hidden ? "gl-bar-off" : ""}`}>
        <button
          type="button"
          className="gl-bar-back"
          aria-label="Quay lại danh sách mẫu"
          onClick={() =>
            navigate("/", { animate: true, direction: "backward" })
          }
        >
          ‹
        </button>
        <span className="gl-bar-name">{template.name}</span>
        <button
          type="button"
          className="gl-bar-hide"
          onClick={() => toggle(true)}
        >
          Xem toàn màn hình <Chevron />
        </button>
      </div>
      <button
        type="button"
        className={`gl-peek ${hidden ? "gl-peek-on" : ""}`}
        aria-label="Hiện thanh điều hướng"
        onClick={() => toggle(false)}
      >
        <Chevron up />
      </button>
      <Component data={demoData} />
    </>
  );
}

export default TemplateDetailPage;
