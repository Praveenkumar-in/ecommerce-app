import React, { useState } from 'react'
import axios from 'axios'
import { backendUrl } from '../App'
import { toast } from 'react-toastify'
//import 'bootstrap-icons/font/bootstrap-icons.css'

const Add = ({ token }) => {

  const [image1, setImage1] = useState(false)
  const [image2, setImage2] = useState(false)
  const [image3, setImage3] = useState(false)
  const [image4, setImage4] = useState(false)

  const [name, setName] = useState('')
  const [description, setDescription] = useState('')
  const [price, setPrice] = useState('')
  const [category, setCategory] = useState('Men')
  const [subCategory, setSubCategory] = useState('Topwear')
  const [bestseller, setBestseller] = useState(false)
  const [sizes, setSizes] = useState([])

  const onSubmitHandler = async (e) => {
    e.preventDefault()

    try {
      const formData = new FormData()

      formData.append('name', name)
      formData.append('description', description)
      formData.append('price', price)
      formData.append('category', category)
      formData.append('subCategory', subCategory)
      formData.append('bestseller', bestseller)
      formData.append('sizes', JSON.stringify(sizes))

      image1 && formData.append('image1', image1)
      image2 && formData.append('image2', image2)
      image3 && formData.append('image3', image3)
      image4 && formData.append('image4', image4)

      const response = await axios.post(
        backendUrl + '/api/product/add',
        formData,
        {
          headers: {
            Authorization: `Bearer ${token}`
          }
        }
      )

      if (response.data.success) {
        toast.success(response.data.message)
        setName('')
        setDescription('')
        setPrice('')
        setImage1(false)
        setImage2(false)
        setImage3(false)
        setImage4(false)
        setSizes([])
        setBestseller(false)
      } else {
        toast.error(response.data.message)
      }

    } catch (error) {
      toast.error(error.message)
    }
  }

  const toggleSize = (size) => {
    setSizes(prev =>
      prev.includes(size)
        ? prev.filter(s => s !== size)
        : [...prev, size]
    )
  }

  return (
    <form onSubmit={onSubmitHandler} className="d-flex flex-column gap-3">

      {/* Upload Images */}
      <div>
        <p className="mb-2">Upload Image</p>
        <div className="d-flex gap-2">
          {[image1, image2, image3, image4].map((img, i) => (
            <label
              key={i}
              htmlFor={`image${i + 1}`}
              className="border d-flex align-items-center justify-content-center"
              style={{ width: 80, height: 80, cursor: 'pointer' }}
            >
              {img
                ? <img src={URL.createObjectURL(img)} alt="" className="img-fluid" />
                : <i className="bi bi-cloud-arrow-up fs-3 text-secondary"></i>
              }
              <input
                hidden
                type="file"
                id={`image${i + 1}`}
                onChange={(e) => {
                  const setters = [setImage1, setImage2, setImage3, setImage4]
                  setters[i](e.target.files[0])
                }}
              />
            </label>
          ))}
        </div>
      </div>

      {/* Name */}
      <div>
        <p className="mb-2">Product name</p>
        <input
          className="form-control"
          value={name}
          onChange={(e) => setName(e.target.value)}
          required
        />
      </div>

      {/* Description */}
      <div>
        <p className="mb-2">Product description</p>
        <textarea
          className="form-control"
          value={description}
          onChange={(e) => setDescription(e.target.value)}
          required
        />
      </div>

      {/* Category / Price */}
      <div className="row g-3">
        <div className="col-md-4">
          <p className="mb-2">Category</p>
          <select className="form-select" onChange={(e) => setCategory(e.target.value)}>
            <option>Men</option>
            <option>Women</option>
            <option>Kids</option>
          </select>
        </div>

        <div className="col-md-4">
          <p className="mb-2">Sub category</p>
          <select className="form-select" onChange={(e) => setSubCategory(e.target.value)}>
            <option>Topwear</option>
            <option>Bottomwear</option>
            <option>Winterwear</option>
          </select>
        </div>

        <div className="col-md-4">
          <p className="mb-2">Price</p>
          <input
            type="number"
            className="form-control"
            value={price}
            onChange={(e) => setPrice(e.target.value)}
          />
        </div>
      </div>

      {/* Sizes */}
      <div>
        <p className="mb-2">Product Sizes</p>
        <div className="d-flex gap-2">
          {['S', 'M', 'L', 'XL', 'XXL'].map(size => (
            <span
              key={size}
              onClick={() => toggleSize(size)}
              className={`px-3 py-1 border rounded ${
                sizes.includes(size) ? 'bg-primary text-white' : 'bg-light'
              }`}
              style={{ cursor: 'pointer' }}
            >
              {size}
            </span>
          ))}
        </div>
      </div>

      {/* Bestseller */}
      <div className="form-check">
        <input
          className="form-check-input"
          type="checkbox"
          checked={bestseller}
          onChange={() => setBestseller(prev => !prev)}
        />
        <label className="form-check-label">Add to bestseller</label>
      </div>

      {/* <button className="btn btn-dark w-25 mt-2">ADD</button> */}
      <button className="btn btn-dark w-100 w-md-25 mt-3">
  ADD
</button>


    </form>
  )
}

export default Add