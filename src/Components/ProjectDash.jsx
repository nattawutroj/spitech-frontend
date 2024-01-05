import React from "react";
import { ProfileContext } from "../StudentDash";
import { Box, Button, CssBaseline, Modal, Stack } from "@mui/material";
import { Add } from "@mui/icons-material";

export default function ProjectDash() {
    const profile = React.useContext(ProfileContext);
    console.log(profile);
    const [open, setOpen] = React.useState(false);
    const [openBuild, setOpenBuild] = React.useState(false);
    const [openJoin, setOpenJoin] = React.useState(false);
    const styleModal = {
        position: 'absolute',
        top: '50%',
        left: '50%',
        transform: 'translate(-50%, -50%)',
        width: 400,
        bgcolor: 'background.paper',
        border: '2px solid #000',
        boxShadow: 24,
        pt: 2,
        px: 4,
        pb: 3,
    };
    const handleOpen = () => setOpen(true);
    const handleClose = () => setOpen(false);
    const handleOpenBuild = () => {
        setOpenBuild(true);
        setOpen(false);
    };
    const handleCloseBuild = () => setOpenBuild(false);
    const handleOpenJoin = () => {
        setOpenJoin(true);
        setOpen(false);
    };
    const handleCloseJoin = () => setOpenJoin(false);
    return (
        <React.Fragment>
            <CssBaseline />
            <Button
                variant="contained"
                color="primary"
                startIcon={<Add />}
                sx={{ mt: 2 }}
                onClick={handleOpen}
            >
                Add Project
            </Button>
            <Modal
                open={open}
                onClose={handleClose}
                aria-labelledby="parent-modal-title"
                aria-describedby="parent-modal-description"
            >
                <Box sx={{ ...styleModal, width: 400 }}>
                    <h2 id="parent-modal-title">Text in a modal</h2>
                    <Stack direction="row" spacing={2}>
                    <Button mr="3" variant="contained" onClick={handleOpenBuild}>
                        สร้างโปรเจค
                    </Button>
                    <Button variant="contained" onClick={handleOpenJoin}>
                        เข้าร่วมโปรเจค
                    </Button>
                    </Stack>
                </Box>
            </Modal>
            <Modal
                open={openBuild}
                onClose={handleCloseBuild}
                aria-labelledby="parent-modal-title"
                aria-describedby="parent-modal-description"
            >
                <Box sx={{ ...styleModal, width: 400 }}>
                    <h2 id="parent-modal-title">Build</h2>
                    <p id="parent-modal-description">
                        Duis mollis, est non commodo luctus, nisi erat porttitor ligula.
                    </p>
                </Box>
            </Modal>
            <Modal
                open={openJoin}
                onClose={handleCloseJoin}
                aria-labelledby="parent-modal-title"
                aria-describedby="parent-modal-description"
            >
                <Box sx={{ ...styleModal, width: 400 }}>
                    <h2 id="parent-modal-title">Join</h2>
                    <p id="parent-modal-description">
                        Duis mollis, est non commodo luctus, nisi erat porttitor ligula.
                    </p>
                </Box>
            </Modal>
        </React.Fragment>
    )
}

