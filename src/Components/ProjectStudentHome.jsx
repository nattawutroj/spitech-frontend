import React from 'react';
import ProjectCardHome from './ProjectCardHome';
import ProjectCard from './ProjectCard';

export default function ProjectStudentHome({ projectinfo }) {
    const [editMode, setEditMode] = React.useState(0);
    console.log(editMode)
    return (
        <React.Fragment>
            {editMode == 0
                ?
                <ProjectCardHome projectinfo={projectinfo} setEditMode={setEditMode} />
                :
                < ProjectCard projectinfo={projectinfo} editMode={editMode} setEditMode={setEditMode} />
            }
        </React.Fragment>
    );
}
