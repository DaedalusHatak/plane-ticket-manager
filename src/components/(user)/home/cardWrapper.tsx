"use client";
import { Box } from "@mui/material";
import Card from "./card";
import CheckCircleOutlineIcon from "@mui/icons-material/CheckCircleOutline";
import EuroIcon from "@mui/icons-material/Euro";
import InfoOutlinedIcon from "@mui/icons-material/InfoOutlined";

export default function CardWrapper() {
  const cardList = [
    {
      icon: CheckCircleOutlineIcon,
      title: "Easy Booking",
      desc: "A streamlined booking process to save you time.",
    },
    {
      icon: EuroIcon,
      title: "Best Prices",
      desc: "We compare prices to offer you the best deals.",
    },
    {
      icon: InfoOutlinedIcon,
      title: "24/7 Support",
      desc: "Our team is here to help you anytime, anywhere.",
    },
  ];
  return (
    <Box className="flex flex-wrap md:flex-nowrap  gap-8 max-w-5xl">
      {cardList.map((card) => (
        <Card key={card.title} Icon={card.icon} title={card.title} desc={card.desc} />
      ))}
    </Box>
  );
}
