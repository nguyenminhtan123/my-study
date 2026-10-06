import { Button, Page, useNavigate, useParams, useSnackbar } from "zmp-ui";

import { buildOrderMessage, shopConfig } from "@/core/shop-config";
import { openLink } from "@/core/utils/open-link";
import { copyText } from "@/core/utils/wedding";
import { getTemplate } from "@/templates";

function TemplateDetailPage() {
  const { id = "" } = useParams();
  const navigate = useNavigate();
  const { openSnackbar } = useSnackbar();
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

  const handleChoose = async () => {
    const message = buildOrderMessage(template.name, template.id);
    const copied = await copyText(message);
    openSnackbar({
      text: copied ? "Đã sao chép tin nhắn, dán gửi shop qua Zalo" : message,
      type: "success",
      duration: 4000,
    });
    if (shopConfig.ownerZaloPhone) {
      openLink(`https://zalo.me/${shopConfig.ownerZaloPhone}`);
    }
  };

  const { Component, demoData } = template;

  return (
    <>
      {/* Kept before the template so `.gl-bar ~ .wd-page` can pad the template. */}
      <div className="gl-bar">
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
        <Button className="gl-bar-cta" onClick={handleChoose}>
          Chọn mẫu
        </Button>
      </div>
      <Component data={demoData} />
    </>
  );
}

export default TemplateDetailPage;
