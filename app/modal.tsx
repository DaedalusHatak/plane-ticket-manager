"use client";
import { useAppDispatch, useAppSelector } from "@/store/store";
import Modal from "@mui/material/Modal";
import Dialog from "@mui/material/Dialog";
import DialogTitle from "@mui/material/DialogTitle";
import { closeModal } from "@/store/modal";
import Button from "@mui/material/Button";
import { Box, DialogContent, Typography } from "@mui/material";
import { useRouter } from "next/navigation";
export default function BasicModal() {
  const router = useRouter();
  const modal = useAppSelector((state) => state.modalState);
  const dispatch = useAppDispatch();

  return (
    <div className=" w-full max-w-4xl ">
      <Dialog
        PaperProps={{ sx: { borderRadius: "6px", padding: "5px" } }}
        onClose={(e) => dispatch(closeModal())}
        open={modal.value}
      >
        <DialogTitle className="text-2xl">{modal.title}</DialogTitle>
        <DialogContent className="py-2 text-center">
          <Typography variant="body1" color="initial">
            {modal.message}
          </Typography>
          <Box
            sx={{
              width: "100%",
              display: "flex",
              flex: "1",
              gap: "28px",
            }}
          >
            <Button
              className="col-span-2 w-full mt-3 bg-blue-500 hover:bg-blue-900 hover:shadow-[0px 5px 5px -3px rgba(0,0,0,0.2), 0px 8px 10px 1px rgba(0,0,0,0.14), 0px 3px 14px 2px rgba(0,0,0,0.12)]"
              variant="contained"
              onClick={(e) => router.push(modal.link)}
            >
              Confirm
            </Button>
            <Button
              className="col-span-2  w-full mt-3 bg-blue-500 hover:bg-blue-900 hover:shadow-[0px 5px 5px -3px rgba(0,0,0,0.2), 0px 8px 10px 1px rgba(0,0,0,0.14), 0px 3px 14px 2px rgba(0,0,0,0.12)]"
              variant="contained"
              onClick={(e) => dispatch(closeModal())}
            >
              Cancel
            </Button>
          </Box>
        </DialogContent>
      </Dialog>
    </div>
  );
}