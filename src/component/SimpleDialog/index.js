import React from "react";
import { Dialog, DialogTitle, DialogContent } from "@mui/material";

const SimpleDialog = ({ title="", children, open, setOpen, ...rest }) => {

    const handleClose = () => {
        setOpen(false);
    }

    return (
        <Dialog onClose={handleClose} open={open} {...rest}>
            {title && <DialogTitle>{title}</DialogTitle>}
            <DialogContent>
                {children}
            </DialogContent>
        </Dialog>
    )
}

export default SimpleDialog;