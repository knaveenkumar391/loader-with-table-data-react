import React, { useEffect, useState } from "react";
import "../Components/dashboard.css";
import DeleteIcon from "@mui/icons-material/Delete";
import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableRow,
  Rating,
  Typography,
  Button,
} from "@mui/material";
import Loder from "./Loder";

function DashBoard() {
  const [responseData, setResponseData] = useState([]);
  const [loader,setLoader]=useState(false);
  const [pagination,setPagination]=useState(0)

  useEffect(() => {
    setLoader(true);
    fetch("https://dummyjson.com/products")
      .then((res) => res.json())
      .then((response) => {
        setResponseData(response);
        setLoader(false);
      })
      .catch((err) => setLoader(false));
  }, []);

  //   reviewCalculation
  const reviewCalculation = (reviewArray) => {
    const reviewCal = reviewArray.reduce(
      (accum, curr) => accum + curr.rating,
      0
    );
    return Number((reviewCal / reviewArray.length).toFixed(1));
  };
  //CropDescription
  const CropDescription = (text) => {
    if (text.lenth < 40) {
      return text;
    } else {
      return text.substring(0, 41).concat('...');
    }
  };

  const gotoPage =(pageNumber)=>{
    if(pageNumber === -2 || pageNumber === -1) {
      if(pagination === 1) {
        setPagination(pagination-1)
      }else if(pagination > 0){
        setPagination(pagination+pageNumber)
      }
    }  else {
      setPagination(pagination+pageNumber)
    }
  } 
  return (
    <div>
      {/* input box search box part */}
      <h3 style={{fontFamily:'cursive', marginLeft:'15px'}}>Products and Ratings</h3>
      <div>
        <input
          type="text"
          className="searchTextBox"
          placeholder="Search your Products here ..."
        ></input>
      </div>
      {/* table rendring  */}
      {/* sx={{display:'block',  height: "250px", overflowY: "auto"}} */}

      <div style={{ marginLeft: "15px" }}>
        <Table
          sx={{
            minWidth: 650,
            display: "block",
            height: "410px",
            overflowY: "auto",
          }}
          size="medium"
          aria-label="simple table"
        >
          <TableHead>
            <TableRow className="table-headder-container">
              <TableCell align="left" className="table-headder">
                Selected Items
              </TableCell>
              <TableCell align="left" className="table-headder">
                Title
              </TableCell>
              <TableCell align="left" className="table-headder">
                Description
              </TableCell>
              <TableCell align="left" className="table-headder">
                Category
              </TableCell>
              <TableCell align="left" className="table-headder">
                Price
              </TableCell>
              <TableCell align="left" className="table-headder">
                Brand
              </TableCell>
              <TableCell align="left" className="table-headder">
                Weight
              </TableCell>
              <TableCell align="left" className="table-headder" s>
                Ratings
              </TableCell>
            </TableRow>
          </TableHead>
          {
            loader?<div className="loder">
              <Loder/>
            </div>:
          
          <TableBody>
            {responseData &&
              responseData.products &&
              responseData.products.map((item) => (
                <TableRow
                  sx={{ "&:last-child td, &:last-child th": { border: 0 } }}
                >
                  <TableCell align="left">
                    <input type="checkbox"></input>
                  </TableCell>
                  <TableCell align="left">{item.title}</TableCell>
                  <TableCell align="left">
                    {CropDescription(item.description)}
                  </TableCell>
                  <TableCell align="left">{item.category}</TableCell>
                  <TableCell align="left">{item.price}</TableCell>
                  <TableCell align="left">{item.brand}</TableCell>
                  <TableCell align="left">{item.weight}</TableCell>

                  <TableCell align="left">
                    <Rating
                      readOnly
                      name="half-rating"
                      defaultValue={reviewCalculation(item.reviews)}
                      precision={0.1}
                    />
                    <Typography variant="body2">
                      {reviewCalculation(item.reviews)}
                    </Typography>
                  </TableCell>
                </TableRow>
              ))}
          </TableBody>
          }
        </Table>
      </div>

      <div style={{ margin: "15px" }} className="navigation">
        <div className="delBtn">
          <Button variant="outlined" color="error" startIcon={<DeleteIcon />}>
            Delete Selected Item
          </Button>
        </div>
        <div className="navBtn">
          <Button sx={{ fontWeight: 600 }} variant="outlined" onClick={()=>gotoPage(-2)}>{"<<"}</Button>
          <Button sx={{ fontWeight: 600 }} variant="outlined" onClick={()=>gotoPage(-1)}>{"<"}</Button>
          <Button sx={{ fontWeight: 600 }} variant="outlined" >{pagination+1}</Button>
          <Button sx={{ fontWeight: 600 }} variant="outlined" onClick={()=>gotoPage(1)}>{pagination+2}</Button>
          <Button sx={{ fontWeight: 600 }} variant="outlined" onClick={()=>gotoPage(1)}>{">"}</Button>
          <Button sx={{ fontWeight: 600 }} variant="outlined" onClick={()=>gotoPage(2)}>{">>"}</Button>
        </div>
      </div>
    </div>
  );
}

export default DashBoard;
