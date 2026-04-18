import { Link } from "react-router-dom";
import support1 from "../assets/new-install-less.jpg";
import support2 from "../assets/reconnect.jpg";

export const DEALS_DATA = [
  {
    id: 1,
    category: "new",
    title: "Fiber Sale",
    desc: "Save ₱3,600 with free installation. Exclusive to Online and Retail applications.",
    img: support1,
    tag: "BEST SELLER",
    btn: "Claim Offer",
    path: "/applynow" // <-- Add this line
},
{
    id: 2,
    category: "new",
    title: "Fiber Sale",
    desc: "Save ₱5,000 with free installation. Exclusive to Online and Retail applications.",
    img: support2,
    tag: "BEST SELLER",
    btn: "Claim Offer"
  },

  {
    id: 3,
    category: "existing",
    title: "Fiber Sale",
    desc: "Save ₱5,000 with free installation. Exclusive to Online and Retail applications.",
    img: support2,
    tag: "BEST SELLER",
    btn: "Claim Offer"
  },
  // ... add the rest of your objects here
];
