import { useLayoutEffect } from "react";
import { Page, useNavigate } from "zmp-ui";

import { templates } from "@/templates";

// Where the list was scrolled to, kept across visits so coming back from a template preview
// lands on the same card instead of the top of the list.
let savedScroll = 0;
const listEl = () => document.querySelector<HTMLElement>(".gl-page");

function GalleryPage() {
  const navigate = useNavigate();

  useLayoutEffect(() => {
    const el = listEl();
    if (!el) return;
    el.scrollTop = savedScroll;
    // the page-enter animation can reset scroll once more; restore again on the next frames
    const raf = requestAnimationFrame(() => {
      el.scrollTop = savedScroll;
    });
    const timer = window.setTimeout(() => {
      el.scrollTop = savedScroll;
    }, 350);
    return () => {
      cancelAnimationFrame(raf);
      clearTimeout(timer);
    };
  }, []);

  const open = (id: string) => {
    savedScroll = listEl()?.scrollTop ?? 0;
    navigate(`/template/${id}`);
  };

  return (
    <Page className="gl-page">
      <header className="gl-head">
        <h1>Thiệp cưới online</h1>
        <p>Chọn mẫu bạn thích, chúng mình thiết kế thiệp riêng cho bạn.</p>
      </header>
      <div className="gl-grid">
        {templates.map((template) => (
          <button
            key={template.id}
            type="button"
            className="gl-card"
            onClick={() => open(template.id)}
          >
            <img src={template.thumbnail} alt={template.name} loading="lazy" />
            <span className="gl-card-name">{template.name}</span>
            <span className="gl-card-cta">Xem thử ›</span>
          </button>
        ))}
      </div>
    </Page>
  );
}

export default GalleryPage;
