import React, { useState,useEffect } from 'react';

import styles from './css/NavItem.module.css'
import classNames from 'classnames/bind';

import Table from '@mui/material/Table';
import TableBody from '@mui/material/TableBody';
import TableCell from '@mui/material/TableCell';
import TableContainer from '@mui/material/TableContainer';
import TableHead from '@mui/material/TableHead';
import TableRow from '@mui/material/TableRow';
import Paper from '@mui/material/Paper';

import {apis} from './api'
const cx = classNames.bind(styles);


export default function Rank({id}) {

    const [ranks,setRanks] = useState([]);
    useEffect(() => {
        const data = async () => {
            try {
                const response = await apis.getRank(id);
                setRanks(response.data.map((rank,index) => ({
                    stt:index+1,
                    ...rank
                })));
            } catch (error) {
                console.log("Fetch data error: ", error);
            }
        }
        data();
    },[]);

  return (
    <div>
        <h2>Bảng xếp hạng</h2>
        <TableContainer component={Paper} >
            <Table sx={{ minWidth: 300 }} aria-label="simple table">
                <TableHead>
                <TableRow>
                    <TableCell >STT</TableCell>
                    <TableCell align="center">Tài khoản</TableCell>
                    <TableCell align="center">Trạng thái</TableCell>
                    <TableCell align="center">Ngôn ngữ</TableCell>
                    <TableCell align="center">Câu đúng</TableCell>
                    <TableCell align="center">Thời gian</TableCell>
                </TableRow>
                </TableHead>
                <TableBody>
                    {ranks.map((row) => (
                        <TableRow
                            key={row.stt}
                            sx={{ '&:last-child td, &:last-child th': { border: 0 } }}
                            >
                            <TableCell component="th" scope="row">
                                {row.stt}
                            </TableCell>
                            <TableCell align="center">{row.userName}</TableCell>
                            <TableCell align="center">{row.status ? 'Hoàn thành':'Thiếu'}</TableCell>
                            <TableCell align="center">{row.laguage}</TableCell>
                            <TableCell align="center">{row.testCasePass}</TableCell>
                            <TableCell align="center">{row.time}</TableCell>
                        </TableRow>
                    ))}
                </TableBody>
            </Table>
        </TableContainer>
    </div>
  )
}
