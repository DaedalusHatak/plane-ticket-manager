import { Box } from "@mui/material";
import { SvgIconComponent } from "@mui/icons-material";
export default function Card({
  Icon,
  title,
  desc,
}: {
  Icon: SvgIconComponent;
  title: string;
  desc: string;
}) {
  return (
    <Box className="border border-slate-400 rounded-xl w-full px-3 py-5">
      <Icon />
      <h2 className="pb-4 pt-1 font-semibold text-lg">{title} </h2>
      <p className="text-wrap">{desc}</p>
    </Box>
  );
}
