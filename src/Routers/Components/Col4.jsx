import { useMemo, useRef, useState, useEffect } from 'react';
import { MaterialReactTable, useMaterialReactTable } from 'material-react-table';
import "./Css/Col4.css";
import axios from "../../libs/Axios";
import { DialogActions, DialogContent, DialogTitle, Button } from '@mui/material';

const Col_4 = ({ api, command, header, col1, col2, col3, col4, col5, col6, col7, col8, col9, col10 }) => {
    const [data, setData] = useState([]);
    const columns = useMemo(
        () => [
            {
                accessorKey: col1[0], //simple recommended way to define a column
                header: col1[1],
                enableEditing: false,
                muiTableHeadCellProps: { sx: { color: 'green' } }, //optional custom props
                Cell: ({ cell }) => <span>{cell.getValue()}</span>, //optional custom cell render
            },
            {
                accessorKey: col2[0], //id required if you use accessorFn instead of accessorKey
                id: col2[0],
                header: col2[1],
                Header: () => <i>{col2[1]}</i>, //optional custom header render
            },
        ],
        [col1, col2],
    );
    if (col3 !== undefined) {
        columns.push({
            accessorKey: col3[0], //id required if you use accessorFn instead of accessorKey
            id: col3[0]
            , header: col3[1],
            Header: () => <i>{col3[1]}</i>, //optional custom header render
        })
    }
    if (col4 !== undefined) {
        columns.push({
            accessorKey: col4[0], //id required if you use accessorFn instead of accessorKey
            id: col4[0]
            , header: col4[1],
            Header: () => <i>{col4[1]}</i>, //optional custom header render
        })
    }
    if (col5 !== undefined) {
        columns.push({
            accessorKey: col5[0], //id required if you use accessorFn instead of accessorKey
            id: col5[0]
            , header: col5[1],
            Header: () => <i>{col5[1]}</i>, //optional custom header render
        })
    }
    if (col6 !== undefined) {
        columns.push({
            accessorKey: col6[0], //id required if you use accessorFn instead of accessorKey
            id: col6[0]
            , header: col6[1],
            Header: () => <i>{col6[1]}</i>, //optional custom header render
        })
    }
    if (col7 !== undefined) {
        columns.push({
            accessorKey: col7[0], //id required if you use accessorFn instead of accessorKey
            id: col7[0]
            , header: col7[1],
            Header: () => <i>{col7[1]}</i>, //optional custom header render
        })
    }
    if (col8 !== undefined) {
        columns.push({
            accessorKey: col8[0], //id required if you use accessorFn instead of accessorKey
            id: col8[0]
            , header: col8[1],
            Header: () => <i>{col8[1]}</i>, //optional custom header render
        })
    }
    if (col9 !== undefined) {
        columns.push({
            accessorKey: col9[0], //id required if you use accessorFn instead of accessorKey
            id: col9[0]
            , header: col9[1],
            Header: () => <i>{col9[1]}</i>, //optional custom header render
        })
    }
    if (col10 !== undefined) {
        columns.push({
            accessorKey: col10[0], //id required if you use accessorFn instead of accessorKey
            id: col10[0]
            , header: col10[1],
            Header: () => <i>{col10[1]}</i>, //optional custom header render
        })
    }
    let x = 2
    for (let i = 2; i < columns.length; i++) {
        if(columns[i].columnDefType !== undefined){
            x +=1
        }
    }
    // ลบอาเรย์จากตำแหน่งที่ x ไปจนถึงตำแหน่งสุดท้าย
    columns.splice(x+2, columns.length - (x));

    const tableInstanceRef = useRef(null);

    useEffect(() => {
        async function fetchData() {
            try {
                const res = await axios.get(api);
                setData(res.data.result)
            } catch (error) {
                console.error("Error fetching data:", error);
            }
        }
        fetchData();

    }, [api, command]);

    async function postData(e) {
        // ลบ key ที่ไม่ได้ใช้ col1[0]
        delete e[col1[0]]
        try {
            const res = await axios.post(api, e);
            setData(res.data)
        } catch (error) {
            console.error("Error fetching data:", error);
        }
    }

    const table = useMaterialReactTable({
        columns,
        data,
        tableInstanceRef,
        renderTopToolbarCustomActions: ({ table }) => (
            <Button
                variant="contained"
                onClick={() => {
                    table.setCreatingRow(true);
                }}
            >
                เพิ่มข้อมูล
            </Button>
        ),
        renderCreateRowDialogContent: ({ table, row, internalEditComponents }) => (
            <>
                <DialogTitle variant="h4" className="addText">เพิ่ม</DialogTitle>
                <DialogContent
                    sx={{ display: 'flex', flexDirection: 'column', gap: '1rem' }}
                >
                    {internalEditComponents} { }
                </DialogContent>
                <DialogActions>
                    <Button
                        onClick={() => {
                            table.setCreatingRow(false);
                        }}
                    >
                        ยกเลิก
                    </Button>
                    <Button
                        onClick={() => {
                            table.setCreatingRow(false);
                            console.log(row._valuesCache);
                            postData(row._valuesCache)
                        }}
                    >
                        บันทึก
                    </Button>
                </DialogActions>
            </>
        ),

    });

    return (
        <>
            <div className="table_container">
                <MaterialReactTable table={table} />
            </div>
        </>
    )
}
export default Col_4;


