import React from 'react';

import styles from './css/NavItem.module.css'
import classNames from 'classnames/bind';

import Table from '@mui/material/Table';
import TableBody from '@mui/material/TableBody';
import TableCell from '@mui/material/TableCell';
import TableContainer from '@mui/material/TableContainer';
import TableHead from '@mui/material/TableHead';
import TableRow from '@mui/material/TableRow';
import Paper from '@mui/material/Paper';

const cx = classNames.bind(styles);

function createData(stt,language,score,auth,dateTime ) {
    return { stt, language, score, auth, dateTime };
}
const rows = [
    createData('1', 'C', 6.0, 'nvduy', '2021/06/12 9:00'),
    createData('2', 'C++', 9.0, 'nvduy','2021/06/12 9:00'),
    createData('3', "Python", 16.0, 'nvduy', '2021/06/12 9:00'),
    createData('4', 'Java', 3.7, 'nvduy', '2021/06/12 9:00'),
    createData('5', 'C#', 16.0, 'nvduy', '2021/06/12 9:00'),
  ];

export default function Rank() {
  return (
    <div>
        <h2>Bảng xếp hạng</h2>
        <TableContainer component={Paper} >
            <Table sx={{ minWidth: 300 }} aria-label="simple table">
                <TableHead>
                <TableRow>
                    <TableCell >STT</TableCell>
                    <TableCell align="center">Ngôn ngữ</TableCell>
                    <TableCell align="center">Điểm</TableCell>
                    <TableCell align="center">Nộp bởi</TableCell>
                    <TableCell align="center">Thời gian nộp</TableCell>
                </TableRow>
                </TableHead>
                <TableBody>
                    {rows.map((row) => (
                        <TableRow
                            key={row.stt}
                            sx={{ '&:last-child td, &:last-child th': { border: 0 } }}
                            >
                            <TableCell component="th" scope="row">
                                {row.stt}
                            </TableCell>
                            <TableCell align="center">{row.language}</TableCell>
                            <TableCell align="center">{row.score}</TableCell>
                            <TableCell align="center">{row.auth}</TableCell>
                            <TableCell align="center">{row.dateTime}</TableCell>
                        </TableRow>
                    ))}
                </TableBody>
            </Table>
        </TableContainer>
    </div>
  )
}
