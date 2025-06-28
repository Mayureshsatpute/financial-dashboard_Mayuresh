import React, { useState } from "react";
import {
  Table,
  TableBody,
  TableCell,
  TableContainer,
  TableHead,
  TableRow,
  Paper,
  TableSortLabel,
  Typography,
} from "@mui/material";

interface Transaction {
  amount: number;
  category: string;
  date: string;
  status: string;
  user_id: string;
}

interface Props {
  transactions: Transaction[];
}

type Order = "asc" | "desc";

const TransactionTable: React.FC<Props> = ({ transactions }) => {
  const [orderBy, setOrderBy] = useState<keyof Transaction>("date");
  const [order, setOrder] = useState<Order>("asc");

  const handleSort = (property: keyof Transaction) => {
    const isAsc = orderBy === property && order === "asc";
    setOrder(isAsc ? "desc" : "asc");
    setOrderBy(property);
  };

  const sortedData = [...transactions].sort((a, b) => {
    const valA = a[orderBy];
    const valB = b[orderBy];
    if (typeof valA === "number" && typeof valB === "number") {
      return order === "asc" ? valA - valB : valB - valA;
    }
    return order === "asc"
      ? String(valA).localeCompare(String(valB))
      : String(valB).localeCompare(String(valA));
  });

  return (
    <Paper>
      <Typography variant="h6" sx={{ p: 2 }}>
        Transaction List
      </Typography>
      <TableContainer>
        <Table size="small">
          <TableHead>
            <TableRow>
              <TableCell>
                <TableSortLabel
                  active={orderBy === "date"}
                  direction={orderBy === "date" ? order : "asc"}
                  onClick={() => handleSort("date")}
                >
                  Date
                </TableSortLabel>
              </TableCell>
              <TableCell>
                <TableSortLabel
                  active={orderBy === "amount"}
                  direction={orderBy === "amount" ? order : "asc"}
                  onClick={() => handleSort("amount")}
                >
                  Amount
                </TableSortLabel>
              </TableCell>
              <TableCell>
                <TableSortLabel
                  active={orderBy === "category"}
                  direction={orderBy === "category" ? order : "asc"}
                  onClick={() => handleSort("category")}
                >
                  Category
                </TableSortLabel>
              </TableCell>
              <TableCell>Status</TableCell>
              <TableCell>User</TableCell>
            </TableRow>
          </TableHead>
          <TableBody>
            {sortedData.map((tx, index) => (
              <TableRow key={index}>
                <TableCell>{new Date(tx.date).toLocaleDateString()}</TableCell>
                <TableCell>₹{tx.amount.toFixed(2)}</TableCell>
                <TableCell>{tx.category}</TableCell>
                <TableCell>{tx.status}</TableCell>
                <TableCell>{tx.user_id}</TableCell>
              </TableRow>
            ))}
          </TableBody>
        </Table>
      </TableContainer>
    </Paper>
  );
};

export default TransactionTable;
