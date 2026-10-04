import { Page, useNavigate } from "zmp-ui";

import { formatPrice, shopConfig } from "@/core/shop-config";
import { templates } from "@/templates";

function GalleryPage() {
  const navigate = useNavigate();

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
            onClick={() => navigate(`/template/${template.id}`)}
          >
            <img src={template.thumbnail} alt={template.name} />
            <span className="gl-card-name">{template.name}</span>
            <span className="gl-price">
              <s>{formatPrice(shopConfig.originalPrice)}</s>
              <b>{formatPrice(shopConfig.salePrice)}</b>
            </span>
            <span className="gl-card-cta">Xem thử</span>
          </button>
        ))}
      </div>
    </Page>
  );
}

export default GalleryPage;
