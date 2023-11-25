import { useMemo, useState, useEffect } from 'react';
import {
    MRT_EditActionButtons,
    MaterialReactTable,
    // createRow,
    useMaterialReactTable,
} from 'material-react-table';
import {
    Box,
    Button,
    DialogActions,
    DialogContent,
    DialogTitle,
    IconButton,
    Tooltip,
} from '@mui/material';
import {
    QueryClient,
    QueryClientProvider,
} from '@tanstack/react-query';
import EditIcon from '@mui/icons-material/Edit';
import DeleteIcon from '@mui/icons-material/Delete';
import Axios from '../libs/Axios';

const Example = () => {
    const [ setValidationErrors] = useState({});


    const [role] = useState([]);

    const [List, setList] = useState([]);

    const [nametitle] = useState([{ label: 'ไม่เลือก', value: -1 }]);

    useEffect(() => {
        console.log(List);
    }, [List])

    function fecthData() {
        Axios.get('/resources/admin/staff')
            .then(res => {
                console.log(res.data.result);

                const student = res.data.result;
                for (let i = 0; i < student.length; i++) {
                    for (const key in student[i]) {
                        student[i][key] = student[i][key] !== null ? student[i][key] : '';
                    }
                }
                setList(student);
            })
            .catch(err => {
                console.log(err);
            });
    }

    useEffect(() => {
        fecthData();
        Axios.get('/resources/public/name_title')
            .then(res => {
                console.log(res.data.data);
                for (let i = 0; i < res.data.data.length; i++) {
                    nametitle.push({ label: res.data.data[i].name_title_th, value: res.data.data[i].id_name_title })
                }
            }).catch(err => {
                console.log(err);
            })
        Axios.get('/resources/public/role')
            .then(res => {
                console.log(res.data.data);
                for (let i = 0; i < res.data.data.length; i++) {
                    role.push({ label: res.data.data[i].role_title, value: res.data.data[i].id_role })
                }
                console.log(role);
            }).catch(err => {
                console.log(err);
            }
            )
    }, [nametitle, role])

    const columns = useMemo(
        () => [
            {
                accessorKey: 'id_staff',
                header: 'ID',
                enableEditing: false,
                size: 100,
                muiEditTextFieldProps: {
                    type: 'id_staff',
                    required: false,
                },
            },
            {
                accessorKey: 'username',
                header: 'Username',
                size: 100,
                muiEditTextFieldProps: {
                    type: 'username',
                    required: true,
                },
            },
            {
                accessorKey: 'initials',
                header: 'ชื่อย่อ',
                size: 100,
                muiEditTextFieldProps: {
                    type: 'initials',
                    required: false,
                },
            },
            {
                accessorKey: 'id_name_title',
                header: 'คำนำหน้า',
                size: 100,
                editSelectOptions: nametitle,
                muiEditTextFieldProps: {
                    select: true,
                    type: 'id_name_title',
                    required: true,
                },
                Cell: ({ row }) => {
                    for (let i = 0; i < nametitle.length; i++) {
                        if (row.original.id_name_title === '') return '';
                        if (row.original.id_name_title === nametitle[i].value) {
                            return nametitle[i].label
                        }
                    }
                },
            },
            {
                accessorKey: 'first_name_th',
                header: 'ชื่อ',
                size: 100,
                muiEditTextFieldProps: {
                    type: 'first_name_th',
                    required: true,
                },
            },
            {
                accessorKey: 'last_name_th',
                header: 'นามสกุล',
                size: 100,
                muiEditTextFieldProps: {
                    type: 'last_name_th',
                    required: true,
                },
            },
            {
                accessorKey: 'phone',
                header: 'เบอร์โทร',
                size: 100,
                muiEditTextFieldProps: {
                    type: 'phone',
                    required: false,
                },
            },
            {
                accessorKey: 'email',
                header: 'E-Mail',
                size: 100,
                muiEditTextFieldProps: {
                    type: 'email',
                    required: false,
                },
            },
            {
                accessorKey: 'first_name_en',
                header: 'Name',
                size: 100,
                muiEditTextFieldProps: {
                    hidden: true,
                    type: 'first_name_en',
                    required: false,
                },
            },
            {
                accessorKey: 'last_name_en',
                header: 'Last Name',
                size: 100,
                muiEditTextFieldProps: {
                    hidden: true,
                    type: 'last_name_en',
                    required: false,
                },
            },
            {
                accessorKey: 'address',
                header: 'ที่อยู่',
                size: 100,
                muiEditTextFieldProps: {
                    type: 'address',
                    required: false,
                },
            },
            {
                accessorKey: 'id_role',
                header: 'หน้าที่',
                size: 100,
                editVariant: 'select',
                editSelectOptions: role,
                muiEditTextFieldProps: {
                    select: true,
                    type: 'id_role',
                    required: true,
                },
                Cell: ({ row }) => {
                    for (let i = 0; i < role.length; i++) {
                        if (row.original.id_role === '') return '';
                        if (row.original.id_role === role[i].value) {
                            return role[i].label
                        }
                    }
                }
            },
            {
                accessorKey: 'password',
                header: 'Password',
                size: 100,
                muiEditTextFieldProps: {
                    type: 'password',
                    required: true,
                },
            },
        ],
        [role, nametitle],
    );
    //CREATE action
    const handleCreateUser = async ({ values, table }) => {
        console.log(values);
        if (values.username !== '' && values.first_name_th !== '' && values.last_name_th !== '' && values.password !== '' && values.id_name_title !== '' && values.id_role !== '') {
            Axios.post('/resources/admin/staff/add', values)
                .then(res => {
                    console.log(res.data);
                    Axios.get('/resources/admin/staff')
                        .then(res => {
                            console.log(res.data.result);
                            fecthData();
                        }).catch(err => {
                            console.log(err);
                        })
                    window.location.reload();
                    table.setCreatingRow(false);
                }).catch(err => {
                    console.log(err.response.data.action);
                    if (err.response.data.action === 401) {
                        alert('กรุณากรอกข้อมูลให้ถูกต้อง')
                    } else if (err.response.data.status === 422) {
                        alert('นักศึกษานี้มีอยู่แล้ว')
                    }
                })
        }
        else {
            alert('กรุณากรอกข้อมูลให้ครบถ้วน')
        }
    };

    //UPDATE action
    const handleSaveUser = async ({ values, table }) => {
        console.log(values);
        Axios.put('/resources/admin/staff/edit', values)
            .then(res => {
                console.log(res.data);
                Axios.get('/resources/admin/staff')
                    .then(res => {
                        console.log(res.data.result);
                        fecthData();
                    }).catch(err => {
                        console.log(err);
                    })
                table.setEditingRow(null);
            }).catch(err => {
                console.log(err);
            })
    };

    //DELETE action
    const openDeleteConfirmModal = (row) => {
        // ภาษาไทย
        console.log(row);
        if (window.confirm(`คุณต้องการลบข้อมูล ${row.original.first_name_th} ${row.original.last_name_th} หรือไม่?`)) {
            console.log(row.id);
            Axios.delete('/resources/admin/staff/delete', { data: { id_staff: row.id } })
                .then(res => {
                    console.log(res.data);
                    Axios.get('/resources/admin/staff')
                        .then(res => {
                            console.log(res.data.result);
                            fecthData();
                        }).catch(err => {
                            console.log(err);
                        })
                }).catch(err => {
                    console.log(err);
                })
        }
    };

    const table = useMaterialReactTable({
        columns,
        data: List,
        createDisplayMode: 'modal', //default ('row', and 'custom' are also available)
        editDisplayMode: 'modal', //default ('row', 'cell', 'table', and 'custom' are also available)
        enableEditing: true,
        getRowId: (row) => row.id_staff,
        muiTableContainerProps: {
            sx: {
                minHeight: '500px',
            },
        },
        onCreatingRowCancel: () => setValidationErrors({}),
        onCreatingRowSave: handleCreateUser,
        onEditingRowCancel: () => setValidationErrors({}),
        onEditingRowSave: handleSaveUser,
        //optionally customize modal content
        renderCreateRowDialogContent: ({ table, row, internalEditComponents }) => (
            <>
                <DialogTitle variant="h3">Create New User</DialogTitle>
                <DialogContent
                    sx={{ display: 'flex', flexDirection: 'column', gap: '1rem' }}
                >
                    {internalEditComponents} {/* or render custom edit components here */}
                </DialogContent>
                <DialogActions>
                    <MRT_EditActionButtons variant="text" table={table} row={row} />
                </DialogActions>
            </>
        ),
        //optionally customize modal content
        renderEditRowDialogContent: ({ table, row, internalEditComponents }) => (
            <>
                <DialogTitle variant="h3">Edit User</DialogTitle>
                <DialogContent
                    sx={{ display: 'flex', flexDirection: 'column', gap: '1.5rem' }}
                >
                    {internalEditComponents} {/* or render custom edit components here */}
                </DialogContent>
                <DialogActions>
                    <MRT_EditActionButtons variant="text" table={table} row={row} />
                </DialogActions>
            </>
        ),
        renderRowActions: ({ row, table }) => (
            <Box sx={{ display: 'flex', gap: '1rem' }}>
                <Tooltip title="Edit">
                    <IconButton onClick={() => table.setEditingRow(row)}>
                        <EditIcon />
                    </IconButton>
                </Tooltip>
                <Tooltip title="Delete">
                    <IconButton color="error" onClick={() => openDeleteConfirmModal(row)}>
                        <DeleteIcon />
                    </IconButton>
                </Tooltip>
            </Box>
        ),
        renderTopToolbarCustomActions: ({ table }) => (
            <Button
                variant="contained"
                onClick={() => {
                    table.setCreatingRow(true); //simplest way to open the create row modal with no default values
                    //or you can pass in a row object to set default values with the `createRow` helper function
                    // table.setCreatingRow(
                    //   createRow(table, {
                    //     //optionally pass in default values for the new row, useful for nested data or other complex scenarios
                    //   }),
                    // );
                }}
            >
                Create New User
            </Button>
        ),
        enableStickyHeader: true,
        initialState: {
            density: 'compact',
            pagination: { pageSize: 20 },
            sorting: [{ id: 'id_staff', desc: true }],
        },
        state: {

        },
    });

    return <MaterialReactTable table={table} />;
};


const queryClient = new QueryClient();

const ExampleWithProviders = () => (
    //Put this with your other react-query providers near root of your app
    <QueryClientProvider client={queryClient}>
        <Example />
    </QueryClientProvider>
);

export default ExampleWithProviders;