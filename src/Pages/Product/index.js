import React, { useState, useEffect } from "react";
import { Link } from "react-router-dom";
import { useSelector, useDispatch } from "react-redux";
import { deleteProduct, setProducts } from "../../Actions/productAction";
import axios from "axios";

import ReactPaginate from "react-paginate";

import "bootstrap/js/src/modal";
import "./style.css";
import { HiOutlinePlusCircle } from "react-icons/hi";
import AddProduct from "../../Components/Add Product";
import EditProduct from "../../Components/EditProduct";

const Product = () => {
  const { productState, page, pages, rows } = useSelector(
    (state) => state.product
  );
  const [show, setShow] = useState(false);
  const [index, setIndex] = useState(0)
  const [open, setOpen] = useState(false);
  const limit = 5;
  const [query, setQuery] = useState("");
  const [msg, setMsg] = useState("");
  const dispatch = useDispatch();
  const Url = "http://localhost:8000/uploads/";

  const getProduct = async () => {
    try {
      const response = await axios.get(
        `http://localhost:8000/api/products?search_query=${query}&page=${page}&limit=${limit}`,
        { headers: { user_token: localStorage.getItem("user_token") } }
      );
      dispatch(
        setProducts({
          products: response.data.result,
          page: response.data.page,
          totalPage: response.data.totalPage,
          totalRows: response.data.totalRows,
        })
      );
    } catch (err) {
      console.log(err);
    }
  };

  useEffect(() => {
    getProduct();
  }, [page, query, limit]);

  const handlePageChange = ({ selected }) => {
    dispatch(setProducts({ ...productState, page: selected }));
  };

  const handleSearch = (e) => {
    e.preventDefault();
    setMsg("");
    dispatch(setProducts({ ...productState, page: 0 }));
  };

  const addHandler = () => {
    setShow(true);
  };
  const editHandler = (id) => {
    setIndex(id)
    setOpen(true);
  };
  const deleteHandler = (id) => {
    dispatch(deleteProduct(id));
  };

  return (
    <div className="dashboard-content">
      <div className="dashboard-content-container">
        <div className="dashboard-content-header">
          <div className="dashboard-content-tittle">
            <h2>Product List</h2>
          </div>
          <div className="dashboard-content-iconAdd">
            <Link onClick={() => addHandler(true)}>
              <h4>
                <HiOutlinePlusCircle /> Add Product
              </h4>
            </Link>
            <AddProduct show={show} setShow={setShow} />
          </div>
          <form onSubmit={handleSearch}>
            <div className="dashboard-content-search">
              <input
                type="text"
                className="dashboard-content-input"
                value={query}
                onChange={(e) => setQuery(e.target.value)}
                placeholder="Find something here..."
              />
              <button type="submit" className="btn btn-info">
                Search
              </button>
            </div>
          </form>
        </div>

        <table>
          <thead>
            <th>ID</th>
            <th>NAME</th>
            <th>FOTO</th>
            <th>HARGABELI</th>
            <th>HARGA JUAL</th>
            <th>STOK</th>
            <th>Action</th>
          </thead>

          {productState ? (
            <tbody>
              {productState.map((product, i) => (
                <tr key={i}>
                  <td>
                    <span>{product.id}</span>
                  </td>
                  <td>
                    <span>{product.nama}</span>
                  </td>
                  <td>
                    <div>
                      <Link to={Url + product.foto}>
                        <img
                          src={Url + product.foto}
                          className="dashboard-content-avatar"
                        />
                      </Link>
                    </div>
                  </td>
                  <td>
                    <span>Rp.{product.hargaBeli}</span>
                  </td>
                  <td>
                    <span>Rp.{product.hargaJual}</span>
                  </td>
                  <td>
                    <span>{product.stok}</span>
                  </td>
                  <td>
                    <div
                      class="btn-group"
                      role="group"
                      aria-label="Basic example"
                    >
                      <button
                        onClick={() => editHandler(product.id)}
                        type="button"
                        class="btn btn-secondary"
                      >
                        Edit
                      </button>
                      <EditProduct
                        open={open}
                        setOpen={setOpen}
                        index={index}
                      />
                      <button
                        onClick={() => deleteHandler(product.id)}
                        type="button"
                        class="btn btn-danger"
                      >
                        Delete
                      </button>
                    </div>
                  </td>
                </tr>
              ))}
            </tbody>
          ) : (
            <div>Data Tidak Ditemukan</div>
          )}
        </table>

        <p>
          Total Rows: {rows} Page: {rows ? page + 1 : 0} of {pages}
        </p>
        <p className="has-text-centered has-text-danger">{msg}</p>

        <ReactPaginate
          previousLabel={"< Prev"}
          nextLabel={"Next >"}
          breakLabel={"..."}
          pageCount={Math.min(5, pages)}
          forcePage={page}
          onPageChange={handlePageChange}
          containerClassName={"pagination-list"}
          pageLinkClassName={"pagination-link"}
          previousLinkClassName={"pagination-link"}
          nextLinkClassName={"pagination-link"}
          activeLinkClassName={"pagination-link is-current"}
          disabledLinkClassName={"pagination-link is-disabled"}
        />
      </div>
    </div>
  );
};

export default Product;
