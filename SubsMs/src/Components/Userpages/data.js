import deal1 from "../../../assets/new-install-less.jpg";
import deal2 from "../../../assets/reconnect.jpg";
import deal3 from "../../../assets/referral.jpg";

export const DEALS_DATA = [
  {
    id: 1,
    category: "all",
    image: deal1,
    title: "Get a FREE Tapo Smart Bulb",
    description: "when you purchase PLDT StreamTV!",
    badge: null,
  },
  {
    id: 2,
    category: "new",
    image: deal2,
    title: "Fiber Sale",
    description: "Save ₱3,600 with free installation. Exclusive to Online and Retail applications.",
    badge: null,
  },
  {
    id: 3,
    category: "existing",
    image: deal3,
    title: "Get 50% off your monthly service fee",
    description: "for 6 months or free speedboost for 1 year when you switch!",
    badge: { text1: "SAVE ₱3600", text2: "FREE INSTALLATION" },
  },
];