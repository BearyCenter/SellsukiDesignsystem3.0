/**
 * Product List — types + realistic baked-in mock data.
 *
 * Scaffolded as Pattern #2 to validate the Pattern SoT scale claim
 * (≤30% effort vs Pattern #1). Realistic numbers + Thai product names so
 * output is visually comparable to the DS 2.0 Vibe Code Demo reference.
 *
 * 🎨 DESIGNER TODO markers below flag values that should be tuned by the
 * Designer team before Pattern #2 is considered "complete". The mock works
 * end-to-end as-is, but the copy/specifics are first-draft placeholders.
 */

export type Trend = "up" | "down";

export interface StatCard {
  label: string;
  value: string;          // formatted display value (e.g. "1,847")
  iconName: string;       // ssk-icon outline-* name
  deltaPct: number;       // signed
  trend: Trend;
}

export interface StatusTab {
  key: string;
  label: string;          // Thai
  count: number;
}

export type ProductStatus =
  | "เผยแพร่"       // published
  | "ฉบับร่าง"      // draft
  | "หมดสต็อก"      // out of stock
  | "สต็อกต่ำ"      // low stock
  | "ระงับ";        // archived

export type ProductCategory =
  | "เสื้อผ้า"
  | "อาหารและเครื่องดื่ม"
  | "ความงาม"
  | "บ้านและสวน"
  | "อิเล็กทรอนิกส์";

export interface ProductRow {
  id: string;             // "#PRD-10042"
  name: string;           // Thai product name
  sku: string;            // "SKU-A-001"
  /**
   * 🎨 DESIGNER TODO: decide thumbnail handling.
   *   - placeholder URL like https://placehold.co/40x40 (current default)
   *   - slot-based (consumer ships <img> via ssk-pattern-product-list slot)
   *   - icon fallback when no image
   */
  imageUrl: string;
  category: ProductCategory;
  price: number;          // baht
  /**
   * 🎨 DESIGNER TODO: confirm stock indicator color thresholds.
   * Current heuristic: 0 → danger, ≤5 → warning, else neutral.
   */
  stock: number;
  status: ProductStatus;
  updatedAt: string;      // "2026-05-08 14:23"
}

export interface SidebarItem {
  key: string;
  label: string;
  iconName: string;
  badge?: number;
  active?: boolean;
}

export interface ProductListData {
  pageTitle: string;
  pageSubtitle: string;
  primaryActionLabel: string;
  searchPlaceholder: string;
  brandHeaderLabel: string;
  userInitials: string;
  stats: [StatCard, StatCard, StatCard, StatCard];
  statusTabs: StatusTab[];
  products: ProductRow[];
  pagination: { total: number; page: number; pageSize: number };
  sidebar: SidebarItem[];
}

export const productListMock: ProductListData = {
  pageTitle: "Product List",
  pageSubtitle: "จัดการสินค้าทั้งหมดและสต็อกในร้านของคุณ",
  primaryActionLabel: "เพิ่มสินค้า",
  searchPlaceholder: "ค้นหาสินค้า, SKU…",
  brandHeaderLabel: "Product Management",
  userInitials: "WC",
  // 🎨 DESIGNER TODO: confirm which 4 KPIs matter most for the Products page.
  // Order Management uses: ยอดขาย, ออเดอร์ใหม่, ลูกค้าใหม่, สต็อก.
  // For Products, candidates include: Total / Low Stock / Out / Drafts /
  // Best-seller-this-week / Avg-price / Gross-margin.
  stats: [
    { label: "สินค้าทั้งหมด",  value: "1,847", iconName: "outline-archive-box",     deltaPct:  4.2, trend: "up"   },
    { label: "สต็อกต่ำ",       value: "42",    iconName: "outline-exclamation-triangle", deltaPct: 18.3, trend: "up"   },
    { label: "หมดสต็อก",       value: "12",    iconName: "outline-x-circle",        deltaPct: -8.5, trend: "down" },
    { label: "ฉบับร่าง",       value: "23",    iconName: "outline-document-text",   deltaPct:  2.7, trend: "up"   },
  ],
  // 🎨 DESIGNER TODO: confirm tab order + which status maps to which key.
  // The richness contract requires ≥1 tab labeled with status semantics.
  statusTabs: [
    { key: "all",       label: "ทั้งหมด",      count: 1847 },
    { key: "published", label: "เผยแพร่",      count: 1770 },
    { key: "draft",     label: "ฉบับร่าง",     count:   23 },
    { key: "low",       label: "สต็อกต่ำ",     count:   42 },
    { key: "out",       label: "หมดสต็อก",     count:   12 },
  ],
  // 10 representative rows — covers all 5 statuses + 5 categories + price/stock
  // spread. Numbers chosen to feel realistic for a SEA SMB shop.
  products: [
    { id: "#PRD-10042", name: "เสื้อยืด Sellsuki Heritage",   sku: "SK-TS-001", imageUrl: "https://placehold.co/40x40", category: "เสื้อผ้า",                price:   590, stock:  124, status: "เผยแพร่",  updatedAt: "2026-05-08 14:23" },
    { id: "#PRD-10041", name: "กาแฟดริปบรรจุซอง 12 ชิ้น",     sku: "SK-FB-014", imageUrl: "https://placehold.co/40x40", category: "อาหารและเครื่องดื่ม", price:   320, stock:   45, status: "เผยแพร่",  updatedAt: "2026-05-08 13:18" },
    { id: "#PRD-10040", name: "ครีมบำรุงหน้า Vitamin C",      sku: "SK-BT-007", imageUrl: "https://placehold.co/40x40", category: "ความงาม",                 price:   890, stock:    3, status: "สต็อกต่ำ", updatedAt: "2026-05-08 12:55" },
    { id: "#PRD-10039", name: "กระถางต้นไม้เซรามิก ขนาด M",   sku: "SK-HG-022", imageUrl: "https://placehold.co/40x40", category: "บ้านและสวน",            price:   450, stock:    0, status: "หมดสต็อก", updatedAt: "2026-05-08 11:40" },
    { id: "#PRD-10038", name: "หูฟัง Bluetooth True Wireless", sku: "SK-EL-031", imageUrl: "https://placehold.co/40x40", category: "อิเล็กทรอนิกส์",         price: 1290, stock:   18, status: "เผยแพร่",  updatedAt: "2026-05-08 10:12" },
    { id: "#PRD-10037", name: "กางเกงยีนส์ Slim Fit",         sku: "SK-TS-018", imageUrl: "https://placehold.co/40x40", category: "เสื้อผ้า",                price:   790, stock:   67, status: "เผยแพร่",  updatedAt: "2026-05-08 09:48" },
    { id: "#PRD-10036", name: "ชาเขียวมัทฉะออร์แกนิค 100g",   sku: "SK-FB-027", imageUrl: "https://placehold.co/40x40", category: "อาหารและเครื่องดื่ม", price:   480, stock:    1, status: "สต็อกต่ำ", updatedAt: "2026-05-07 22:15" },
    { id: "#PRD-10035", name: "เซรั่มหน้าใส Retinol 1%",       sku: "SK-BT-019", imageUrl: "https://placehold.co/40x40", category: "ความงาม",                 price: 1490, stock:   33, status: "ฉบับร่าง", updatedAt: "2026-05-07 21:30" },
    { id: "#PRD-10034", name: "โซฟา 2 ที่นั่ง สีเทาอ่อน",      sku: "SK-HG-045", imageUrl: "https://placehold.co/40x40", category: "บ้านและสวน",            price: 8900, stock:    4, status: "สต็อกต่ำ", updatedAt: "2026-05-07 19:05" },
    { id: "#PRD-10033", name: "ที่ชาร์จไร้สาย 15W Qi-certified", sku: "SK-EL-052", imageUrl: "https://placehold.co/40x40", category: "อิเล็กทรอนิกส์",         price:   690, stock:   89, status: "เผยแพร่",  updatedAt: "2026-05-07 17:22" },
  ],
  pagination: { total: 1847, page: 1, pageSize: 10 },
  // Sidebar mirrors Order Management's nav so the shell looks consistent —
  // only the "active" item flips from `orders` to `products`.
  sidebar: [
    { key: "dashboard", label: "Dashboard",  iconName: "outline-squares-2x2",   active: false },
    { key: "orders",    label: "Orders",     iconName: "outline-shopping-bag",  active: false, badge: 23 },
    { key: "products",  label: "Products",   iconName: "outline-archive-box",   active: true  },
    { key: "customers", label: "Customers",  iconName: "outline-user-group",    active: false },
    { key: "reports",   label: "Reports",    iconName: "outline-chart-bar",     active: false },
    { key: "marketing", label: "Marketing",  iconName: "outline-megaphone",     active: false },
    { key: "campaigns", label: "Campaigns",  iconName: "outline-calendar-days", active: false },
  ],
};
