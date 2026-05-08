/**
 * Order Management — types + realistic baked-in mock data.
 *
 * Numbers and Thai customer names match the DS 2.0 Vibe Code Demo screenshot
 * so output can be visually compared against the reference page.
 */

export type Trend = "up" | "down";

export interface StatCard {
  label: string;
  value: string;          // formatted display value (e.g. "฿128,450")
  iconName: string;       // ssk-icon outline-* name
  deltaPct: number;       // signed
  trend: Trend;
}

export interface StatusTab {
  key: string;
  label: string;          // Thai
  count: number;
}

export type OrderStatus =
  | "ชำระแล้ว"
  | "รอชำระ"
  | "กำลังจัดส่ง"
  | "สำเร็จ"
  | "ยกเลิก";

export type Channel = "Shopee" | "Lazada" | "LINE OA" | "Web" | "TikTok";

export interface OrderRow {
  id: string;             // "#ORD-10042"
  customer: string;       // Thai name
  channel: Channel;
  amount: number;         // baht
  status: OrderStatus;
  date: string;           // "2026-05-08 14:23"
}

export interface SidebarItem {
  key: string;
  label: string;
  iconName: string;
  badge?: number;
  active?: boolean;
}

export interface OrderManagementData {
  pageTitle: string;
  pageSubtitle: string;
  primaryActionLabel: string;
  searchPlaceholder: string;
  brandHeaderLabel: string;
  userInitials: string;
  stats: [StatCard, StatCard, StatCard, StatCard];
  statusTabs: StatusTab[];
  orders: OrderRow[];
  pagination: { total: number; page: number; pageSize: number };
  sidebar: SidebarItem[];
}

export const orderManagementMock: OrderManagementData = {
  pageTitle: "Order Management",
  pageSubtitle: "จัดการออเดอร์ทั้งหมดจากทุกช่องทาง",
  primaryActionLabel: "สร้างออเดอร์",
  searchPlaceholder: "ค้นหาออเดอร์, สินค้า, ลูกค้า…",
  brandHeaderLabel: "Order Management",
  userInitials: "WC",
  stats: [
    { label: "ยอดขายวันนี้",    value: "฿128,450", iconName: "outline-banknotes",      deltaPct: 12.5, trend: "up" },
    { label: "ออเดอร์ใหม่",     value: "47",        iconName: "outline-shopping-cart",  deltaPct:  8.2, trend: "up" },
    { label: "ลูกค้าใหม่",      value: "23",        iconName: "outline-user-group",     deltaPct:  3.1, trend: "up" },
    { label: "สินค้าคงเหลือ",   value: "1,847",     iconName: "outline-archive-box",    deltaPct: -2.4, trend: "down" },
  ],
  statusTabs: [
    { key: "all",       label: "ทั้งหมด",     count: 156 },
    { key: "pending",   label: "รอยืนยัน",    count:  23 },
    { key: "confirmed", label: "ยืนยันแล้ว",  count:  45 },
    { key: "shipping",  label: "กำลังจัดส่ง", count:  67 },
    { key: "done",      label: "สำเร็จ",      count:  21 },
  ],
  orders: [
    { id: "#ORD-10042", customer: "กัญญา มานะ",       channel: "Shopee",  amount: 1290, status: "ชำระแล้ว",    date: "2026-05-08 14:23" },
    { id: "#ORD-10041", customer: "สมชาย วัฒนกุล",     channel: "Lazada",  amount: 2480, status: "กำลังจัดส่ง", date: "2026-05-08 13:18" },
    { id: "#ORD-10040", customer: "พรทิพย์ ศรีสุข",   channel: "LINE OA", amount:  590, status: "สำเร็จ",       date: "2026-05-08 12:55" },
    { id: "#ORD-10039", customer: "อนุชา พงศ์ไพบูลย์", channel: "Web",     amount: 4220, status: "ชำระแล้ว",    date: "2026-05-08 11:40" },
    { id: "#ORD-10038", customer: "วิภา ทรัพย์มาก",    channel: "TikTok",  amount:  890, status: "รอชำระ",       date: "2026-05-08 10:12" },
    { id: "#ORD-10037", customer: "ธีรพงษ์ บัวศรี",    channel: "Shopee",  amount: 3150, status: "สำเร็จ",       date: "2026-05-08 09:48" },
    { id: "#ORD-10036", customer: "นภา จันทร์เพ็ญ",   channel: "Lazada",  amount: 1780, status: "กำลังจัดส่ง", date: "2026-05-07 22:15" },
    { id: "#ORD-10035", customer: "ปราโมทย์ คงสุข",   channel: "LINE OA", amount:  420, status: "ยกเลิก",       date: "2026-05-07 21:30" },
    { id: "#ORD-10034", customer: "สุภาพร แก้วกล้า",   channel: "Web",     amount: 6890, status: "ชำระแล้ว",    date: "2026-05-07 19:05" },
    { id: "#ORD-10033", customer: "ชาญชัย ไพศาล",      channel: "Shopee",  amount: 2240, status: "สำเร็จ",       date: "2026-05-07 17:22" },
  ],
  pagination: { total: 156, page: 1, pageSize: 10 },
  sidebar: [
    { key: "dashboard", label: "Dashboard",  iconName: "outline-squares-2x2",       active: false },
    { key: "orders",    label: "Orders",     iconName: "outline-shopping-bag",      active: true,  badge: 23 },
    { key: "products",  label: "Products",   iconName: "outline-archive-box",       active: false },
    { key: "customers", label: "Customers",  iconName: "outline-user-group",        active: false },
    { key: "reports",   label: "Reports",    iconName: "outline-chart-bar",         active: false },
    { key: "marketing", label: "Marketing",  iconName: "outline-megaphone",         active: false },
    { key: "campaigns", label: "Campaigns",  iconName: "outline-calendar-days",     active: false },
  ],
};
