import React from "react";
import { Accordion, AccordionDetails, AccordionSummary, Typography } from "@mui/material";
import ExpandMoreIcon from '@mui/icons-material/ExpandMore';
import SkateboardingIcon from '@mui/icons-material/Skateboarding';
export default function Accord({ joinDetail }) {
    return (
        <React.Fragment>
            <Accordion sx={{ mt: 2 }}>
                <AccordionSummary
                    expandIcon={<ExpandMoreIcon />}
                    aria-controls="panel1bh-content"
                    id="panel1bh-header"
                >
                    <Typography sx={{ width: '33%', flexShrink: 0 }}>
                        {joinDetail[0].id_project}
                    </Typography>
                    <Typography sx={{ color: 'text.secondary' }}>{joinDetail[0].project_title_th}</Typography>
                </AccordionSummary>
                {
                    joinDetail.map((item, index) => (
                        <AccordionDetails key={index}>
                            <Typography sx={{ color: 'text.secondary' }}>
                                <SkateboardingIcon fontSize="small" />{' ' + item.student_code + '  ' + item.first_name_th + ' ' + item.last_name_th}
                            </Typography>
                        </AccordionDetails>
                    ))
                }
            </Accordion>
        </React.Fragment>
    )
}