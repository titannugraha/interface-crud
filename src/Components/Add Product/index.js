import React, { useState } from "react";
import { useNavigate } from "react-router-dom";
import { useDispatch } from "react-redux";
import Modal from "react-bootstrap/Modal";
import { addProduct } from "../../Actions/productAction";

const AddProduct = (props) => {
  const { show, setShow } = props;
  const [formProduct, setFormProduct] = useState([
    {
      nama: "",
      hargaBeli: 0,
      hargaJual: 0,
      stok: 0,
      foto: "",
    },
  ]);
  const navigation = useNavigate();
  const dispatch = useDispatch();

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
    setShow(false);
  };

  const handlerSave = () => {
    dispatch(addProduct(formProduct));

    handleClose();
  };
  const handleShow = () => setShow(true);

  return (
    <>
      <Modal show={show} onHide={handleClose}>
        <Modal.Header closeButton>
          <Modal.Title>Add Product</Modal.Title>
        </Modal.Header>
        <Modal.Body>
          <form>
            <div class="mb-3">
              <label htmlFor="exampleInputEmail1" class="form-label">
                Name
              </label>
              <input
                onChange={(e) =>
                  setFormProduct({ ...formProduct, nama: e.target.value })
                }
                type="name"
                class="form-control"
              />
            </div>

            <div class="mb-3">
              <label htmlFor="exampleInputEmail1" class="form-label">
                hargaBeli
              </label>
              <input
                onChange={(e) =>
                  setFormProduct({ ...formProduct, hargaBeli: e.target.value })
                }
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
                type="number"
                class="form-control"
              />
            </div>

            <div class="mb-3">
              <label htmlFor="exampleInputPassword1" class="form-label">
                Image
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

export default AddProduct;
