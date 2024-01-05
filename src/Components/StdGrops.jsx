import { useEffect, useMemo, useState } from 'react';
import {
    MaterialReactTable,
    // createRow,
    useMaterialReactTable,
} from 'material-react-table';
import {
    Box,
    Grid,
    Tooltip,
    Typography,
} from '@mui/material';
import {
    QueryClient,
    QueryClientProvider,
} from '@tanstack/react-query';
import AddCircleIcon from '@mui/icons-material/AddCircle';
import Axios from '../libs/Axios';
import RouteUpload from './Upload';
import { FormControl, MenuItem, Select } from '@mui/material';
import Botton from '@mui/material/Button';

const Example = () => {
    const [validationErrors, setValidationErrors] = useState({});
    const [rowSelection, setRowSelection] = useState({});

    const [selectedFile, setSelectedFile] = useState(null);

    const [loading, setLoading] = useState(false);

    const [List, setList] = useState([]);

    const [Item, setItem] = useState('');

    const [Menu, setManu] = useState([]);

    const [motion, setMotion] = useState('');
    const [progress, setProgress] = useState(false);
    


    const handleChange = (event) => {
        setItem(event.target.value);
        console.log(event.target.value);
    };

    useEffect(() => {
        console.log(List);
    }, [List])

    useEffect(() => {
        Axios.get('/resources/public/course')
            .then(res => {
                console.log(res.data.data);
                setManu(res.data.data);
            }).catch(err => {
                console.log(err);
            })
    }, [])

    useEffect(() => {
        console.log(rowSelection);
    }, [rowSelection]);

    const handleCreateUser = () => {
        if (Item !== '') {
            setLoading(true)
            setMotion('Waitng.')
            setProgress(true)
            var predata = []
            const trueKey = Object.keys(rowSelection);
            trueKey.forEach(element => {
                List.forEach(item => {
                    if (item[1] === element) {
                        predata.push(item)
                    }
                })
            });
            var updata = []
            predata.forEach(item => {
                setMotion("Waitng..")
                var data = {
                    course_code: Item,
                    student_code: item[1],
                    first_name_th: item[2],
                    last_name_th: item[3],
                    password: item[1],
                    status: true
                }
                updata.push(data)
                setMotion("Waitng...")
            })
            Axios.post('/resources/admin/student/grops', updata)
                .then(res => {
                    console.log(res.data);

                    if (res.data.code === 200) {
                        alert('เพิ่มรายชื่อสำเร็จ')
                        window.location.reload();
                    }
                }).catch(err => {
                    console.log(err);
                })
        }
        else {
            alert('กรุณาเลือกหลักสูตร')
        }
    };
    const columns = useMemo(
        () => [
            {
                accessorKey: '8',
                header: 'Status',
                size: 100,
                muiEditTextFieldProps: {
                    type: 'student_code',
                    required: true,
                    error: !!validationErrors?.email,
                    helperText: validationErrors?.email,
                    //remove any previous validation errors when user focuses on the input
                    onFocus: () =>
                        setValidationErrors({
                            ...validationErrors,
                            email: undefined,
                        }),
                },
                Cell: ({ row }) =>
                (
                    row.original[8] ? <i style={{ color: 'red' }}>ถูกเพิ่มแล้ว</i> : <i style={{ color: 'green' }}>ปกติ</i>
                ),
            },
            {
                accessorKey: '1',
                header: 'รหัสนักศึกษา',
                size: 100,
                muiEditTextFieldProps: {
                    type: 'student_code',
                    required: true,
                    error: !!validationErrors?.email,
                    helperText: validationErrors?.email,
                    //remove any previous validation errors when user focuses on the input
                    onFocus: () =>
                        setValidationErrors({
                            ...validationErrors,
                            email: undefined,
                        }),
                },
            },
            {
                accessorKey: '2',
                header: 'ชื่อ',
                size: 100,
                muiEditTextFieldProps: {
                    type: 'first_name_th',
                    required: true,
                    error: !!validationErrors?.firstName,
                    helperText: validationErrors?.firstName,
                    //remove any previous validation errors when user focuses on the input
                    onFocus: () =>
                        setValidationErrors({
                            ...validationErrors,
                            firstName: undefined,
                        }),
                    //optionally add validation checking for onBlur or onChange
                },
            },
            {
                accessorKey: '3',
                header: 'นามสกุล',
                size: 100,
                muiEditTextFieldProps: {
                    type: 'last_name_th',
                    required: true,
                    error: !!validationErrors?.lastName,
                    helperText: validationErrors?.lastName,
                    //remove any previous validation errors when user focuses on the input
                    onFocus: () =>
                        setValidationErrors({
                            ...validationErrors,
                            lastName: undefined,
                        }),
                },
            },
            {
                accessorKey: '4',
                header: 'สาขา',
                editVariant: 'select',
                muiEditTextFieldProps: {
                    error: !!validationErrors?.state,
                    helperText: validationErrors?.state,
                },
            },
        ],
        [validationErrors],
    );


    const table = useMaterialReactTable({
        columns,
        data: List,
        createDisplayMode: 'modal', //default ('row', and 'custom' are also available)
        editDisplayMode: 'modal', //default ('row', 'cell', 'table', and 'custom' are also available)
        getRowId: (row) => row[1],
        muiTableContainerProps: {
            sx: {
                minHeight: '100%',
            },
        },
        enableStickyHeader: true,
        renderBottomToolbarCustomActions: () => (
            <RouteUpload setList={setList} selectedFile={selectedFile} setSelectedFile={setSelectedFile} />
        ),
        renderTopToolbarCustomActions: () => (
            <>
                <Grid>
                    <Box sx={{ display: 'flex', justifyContent: 'flex-end', width: '100%' }}>
                        <Tooltip title="Add User">
                            <Botton component="label" disabled={loading} onClick={handleCreateUser} variant="contained" startIcon={<AddCircleIcon />}>
                                {!progress?'เพิ่มรายชื่อ': motion}
                            </Botton>
                        </Tooltip>
                    </Box>
                </Grid>
                <Grid sx={{ display: 'flex', width: '30%' }}>
                    <Typography mt={1} mr={1} variant="body1" component="h6" gutterBottom > หลักสูตร</Typography>
                    <FormControl size='small' variant="standard" sx={{ m: 1, minWidth: 240 }}>
                        <Select
                            labelId="demo-simple-select-label"
                            id="demo-simple-select"
                            value={Item}
                            label="Age"
                            onChange={handleChange}
                        >
                            {Menu.map((item, index) => (
                                <MenuItem key={index} value={item.course_code}>{item.course_code}  {item.course_name}</MenuItem>
                            ))}
                        </Select>
                    </FormControl>
                </Grid>
            </>
        ),
        enableRowSelection: (row) => row.original[8] != true,
        onRowSelectionChange: setRowSelection, //connect internal row selection state to your own
        initialState: { density: 'compact', pagination: { pageSize: 100 } },
        state: {
            rowSelection,
        },
    });

    return (
        <MaterialReactTable table={table} />
    )
};

const queryClient = new QueryClient();

const ExampleWithProviders = () => (
    //Put this with your other react-query providers near root of your app
    <QueryClientProvider client={queryClient}>
        <Example />
    </QueryClientProvider>
);

export default ExampleWithProviders;
