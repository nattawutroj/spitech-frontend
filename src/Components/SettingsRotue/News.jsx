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
import Axios from '../../libs/Axios';
import { Add } from '@mui/icons-material';

const Example = () => {
    
    const [List, setList] = useState([]);


    useEffect(() => {
        console.log(List);
    }, [List])

    function fecthData() {
        Axios.get('/resources/admin/news')
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
    }, [])

    const columns = useMemo(
        () => [
            {
                accessorKey: 'id_news',
                header: 'ID',
                enableEditing: false,
                size: 100,
                muiEditTextFieldProps: {
                    type: 'id_news',
                    required: false,
                },
            },
            {
                accessorKey: 'topic',
                header: 'หัวข้อ',
                size: 100,
                muiEditTextFieldProps: {
                    type: 'topic',
                    required: true,
                },
            },
            {
                accessorKey: 'arctical',
                header: 'บทความ',
                size: 100,
                muiEditTextFieldProps: {
                    type: 'arctical',
                },
            },
            
            {
                accessorKey: 'file_path',
                header: 'ลิงค์ไฟล์แนบ (ถ้ามี)',
                size: 100,
                muiEditTextFieldProps: {
                    type: 'file_path',
                },
            },
            
        ],
        [],
    );
    //CREATE action
    const handleCreateUser = async ({ values, table }) => {
        console.log(values);
        if (values.topic !== '' ) {
            Axios.post('/resources/admin/news/add', values)
                .then(res => {
                    console.log(res.data);
                    Axios.get('/resources/admin/news')
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
        Axios.put('/resources/admin/news/edit', values)
            .then(res => {
                console.log(res.data);
                Axios.get('/resources/admin/news')
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
        console.log(row.id);
        if (window.confirm(`คุณต้องการลบข้อมูลนี้หรือไม่?`)) {
            Axios.delete('/resources/admin/news/delete', { data: { id_news: row.id } })
                .then(res => {
                    console.log(res.data);
                    Axios.get('/resources/admin/news')
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
        getRowId: (row) => row.id_news,
        muiTableContainerProps: {
            sx: {
                minHeight: '500px',
            },
        },
        // onCreatingRowCancel: () => setValidationErrors({}),
        onCreatingRowSave: handleCreateUser,
        // onEditingRowCancel: () => setValidationErrors({}),
        onEditingRowSave: handleSaveUser,
        //optionally customize modal content
        renderCreateRowDialogContent: ({ table, row, internalEditComponents }) => (
            <>
                <DialogTitle variant="h3">เพิ่มข้อมูล</DialogTitle>
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
                <DialogTitle variant="h3">แก้ไขข้อมูล</DialogTitle>
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
                <Add />  เพิ่มข้อมูล
            </Button>
        ),
        enableStickyHeader: true,
        initialState: {
            density: 'compact',
            pagination: { pageSize: 20 },
            sorting: [{ id: 'id_news', desc: true }],
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