import Modal from "react-bootstrap/Modal";
import React, { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { Link, useNavigate } from "react-router-dom";
import {
  editProduct,
  getProductById,
  updateProductRequest,
} from "../../Actions/productAction";

const EditProduct = (props) => {
  const { open, setOpen, index } = props;
  const productDetail = useSelector((state) => state.product.productDetail);
  const [formProduct, setFormProduct] = useState([
    {
      nama: "",
      hargaBeli: 0,
      hargaJual: 0,
      stok: 0,
      foto: "",
    },
  ]);
  const Url = "http://localhost:8000/uploads/";

  const dispatch = useDispatch();

  useEffect(() => {
    if (open) {
      dispatch(getProductById(index));
    }
  }, [open]);

  useEffect(() => {
    setFormProduct({
      nama: productDetail.nama,
      hargaBeli: productDetail.hargaBeli,
      hargaJual: productDetail.hargaJual,
      stok: productDetail.stok,
      foto: "",
    });
  }, [productDetail]);

  const validateImageHandeler = (e) => {
    const selectedFile = e.target.files[0];

    if (selectedFile) {
      if (
        selectedFile.type === "image/jpeg" ||
        selectedFile.type === "image/png"
      ) {
        if (selectedFile.size <= 100 * 1024) {
          setFormProduct({ ...formProduct, foto: selectedFile });
        } else {
          alert("Ukuran file harus kurang dari atau sama dengan 100KB.");
        }
      } else {
        alert("Hanya file dengan format JPG atau PNG yang diizinkan.");
        e.target.files[0] = null;
      }
    }
  };

  const handleClose = () => {
    setFormProduct({
      nama: "",
      hargaBeli: 0,
      hargaJual: 0,
      stok: 0,
      foto: "",
    });
    setOpen(false);
  };

  const handlerSave = () => {
    dispatch(editProduct(index, formProduct));
    handleClose();
  };

  return (
    <>
      <Modal show={open} onHide={handleClose}>
        <Modal.Header closeButton>
          <Modal.Title>Edit Product</Modal.Title>
        </Modal.Header>
        <Modal.Body>
          <form>
            <div className="text-center mb-3">
              <div>
                <Link to={Url + productDetail.foto}>
                  <img
                    src={Url + productDetail.foto}
                    className="img-fluid rounded-circle"
                  />
                </Link>
              </div>
            </div>
            <div class="mb-3">
              <label htmlFor="exampleInputEmail1" class="form-label">
                Name
              </label>
              <input
                onChange={(e) =>
                  setFormProduct({ ...formProduct, nama: e.target.value })
                }
                disabled
                value={formProduct.nama}
                type="name"
                class="form-control"
              />
            </div>

            <div class="mb-3">
              <label htmlFor="exampleInputEmail1" class="form-label">
                Harga Beli
              </label>
              <input
                onChange={(e) =>
                  setFormProduct({ ...formProduct, hargaBeli: e.target.value })
                }
                value={formProduct.hargaBeli}
                type="number"
                class="form-control"
              />
            </div>

            <div class="mb-3">
              <label htmlFor="exampleInputEmail1" class="form-label">
                Harga Jual
              </label>
              <input
                onChange={(e) =>
                  setFormProduct({
                    ...formProduct,
                    hargaJual: e.target.value,
                  })
                }
                value={formProduct.hargaJual}
                type="number"
                class="form-control"
              />
            </div>

            <div class="mb-3">
              <label htmlFor="exampleInputEmail1" class="form-label">
                Stok
              </label>
              <input
                onChange={(e) =>
                  setFormProduct({ ...formProduct, stok: e.target.value })
                }
                value={formProduct.stok}
                type="number"
                class="form-control"
              />
            </div>

            <div class="mb-3">
              <label htmlFor="exampleInputPassword1" class="form-label">
                Upload New Picture
              </label>
              <input
                onChange={validateImageHandeler}
                type="file"
                accept=".jpg, .jpeg, .png"
                class="form-control"
                id="exampleInputPassword1"
              />
            </div>
          </form>
        </Modal.Body>

        <Modal.Footer>
          <button className="btn btn-secondary" onClick={() => handleClose()}>
            Close
          </button>
          <button onClick={() => handlerSave()} className="btn btn-info">
            Submit
          </button>
        </Modal.Footer>
      </Modal>
    </>
  );
};
export default EditProduct;
