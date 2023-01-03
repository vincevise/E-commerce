import React, { useEffect, useState } from "react";
import axios from "axios";
import { GrClose } from "react-icons/gr";
import { useDispatch } from "react-redux";
import { postProducts } from "../features/productSlice";

const AddProductForm = ({ propState }) => {
  const { modal, setModal } = propState;
  const [categories, setCategories] = useState([]);
  const dispatch = useDispatch();
  const [input, setInput] = useState({
    name: "",
    description: "",
    stock: "",
    price: "",
  });

  const [imageInput, setImageInput] = useState([]);
  const [previewSource, setPreviewSource] = useState([]);

  const fetchCategory = async () => {
    await axios
      .get("http://localhost:7000/api/category")
      .then((res) => setCategories(res.data.data));
  };

  useEffect(() => {
    fetchCategory();
  }, []);

  const handleClick = async () => {
    console.log(previewSource);
    console.log(input);
    await dispatch(postProducts({ previewSource, input }));
    setModal(!modal);
  };
  const handleImage = (e) => {
    const file = e.target.files[0];
    console.log(file);
    const reader = new FileReader();
    reader.onloadend = () => {
      setPreviewSource([...previewSource, reader.result]);
    };
    reader.readAsDataURL(file);
  };

  return (
    <div className={formStyle}>
      <h2 className="mb-4">PRODUCT FORM</h2>
      <div
        className="p-1  inline-block rounded-full absolute right-5 top-5 cursor-pointer"
        onClick={() => setModal(!modal)}
      >
        <GrClose size={20} />
      </div>
      <label htmlFor="name">Product Name</label>
      <input
        className="w-full"
        type="text"
        name="name"
        value={input.name}
        onChange={(e) => {
          setInput({ ...input, [e.target.name]: e.target.value });
        }}
      />
      <label htmlFor="name">Description</label>

      <textarea
        className="w-full"
        type="text"
        name="description"
        value={input.description}
        onChange={(e) => {
          setInput({ ...input, [e.target.name]: e.target.value });
        }}
      />
      <label htmlFor="stock">Stock</label>
      <input
        className="mr-4  w-36"
        type="number"
        name="stock"
        value={input.stock}
        onChange={(e) => {
          setInput({ ...input, [e.target.name]: e.target.value });
        }}
      />
      <label htmlFor="price">Price</label>
      <input
        type="number"
        name="price"
        value={input.price}
        onChange={(e) => {
          setInput({ ...input, [e.target.name]: e.target.value });
        }}
      />
      <br />
      <label htmlFor="category">Category</label>
      <select name="category" id="category" onChange={(e)=>setInput({...input,[e.target.name]:e.target.value})}>
        <option value="">Select a Category</option>
        {categories.map((x)=><option key={x._id} value={x._id}>{x.name}</option>)}
      </select>
      <input
        className="block mt-2"
        type="file"
        name="image"
        onChange={handleImage}
      />
      <div className="flex flex-wrap">
        {previewSource?.map((x, i) => {
          return (
            <div key={i}>
              <img className={imageStyle} src={x} alt="" />
            </div>
          );
        })}
      </div>
      <button className={submitBtnStyle} onClick={handleClick}>
        Save
      </button>
    </div>
  );
};

export default AddProductForm;

const submitBtnStyle =
  " bg-green-800 text-white px-3 py-1 rounded absolute bottom-4 right-4";
const formStyle =
  "font-semibold max-w-2xl max-h-max my-20 absolute bg-slate-300 z-10 mx-auto my-auto left-0 right-0 top-0 bottom-0 p-6 [&>input]:outline-none [&>input]:px-2 [&>input]:py-1 [&>textarea]:py-1 [&>textarea]:px-2 [&>textarea]:outline-none [&>label]:mr-2 [&>input]:mt-2 [&>input]:mb-2 [&>textarea]:mt-2 rounded [&>input]:rounded";

const imageStyle = "max-w-20 max-h-20 mr-5 mt-5";
