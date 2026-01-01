
import { v2 as cloudinary } from 'cloudinary';
import productModel from '../models/productModel.js';
import mongoose from 'mongoose';
import crypto from 'crypto'; // for generating productId if not provided

// ------------------ ADD PRODUCT ------------------
export const addProduct = async (req, res) => {
  try {
    const { name, description, price, category, subCategory, sizes, bestseller, productId } = req.body;

    const image1 = req.files.image1 && req.files.image1[0];
    const image2 = req.files.image2 && req.files.image2[0];
    const image3 = req.files.image3 && req.files.image3[0];
    const image4 = req.files.image4 && req.files.image4[0];
    const images = [image1, image2, image3, image4].filter(Boolean);

    // Upload images to Cloudinary
    const imagesUrl = await Promise.all(
      images.map(async (item) => {
        const result = await cloudinary.uploader.upload(item.path, { resource_type: 'image' });
        return result.secure_url;
      })
    );

    // Convert sizes safely
    let parsedSizes = [];
    if (typeof sizes === 'string') {
      try {
        parsedSizes = JSON.parse(sizes);
      } catch {
        parsedSizes = sizes.split(',').map((s) => s.trim());
      }
    } else if (Array.isArray(sizes)) {
      parsedSizes = sizes;
    }

    // Create product data
    const productData = {
      productId: productId || crypto.randomUUID(), // generate your short id if not sent
      name,
      description,
      category,
      price: Number(price),
      subCategory,
      bestseller: String(bestseller).toLowerCase() === 'true',
      sizes: parsedSizes,
      image: imagesUrl,
      date: Date.now()
    };

    const product = new productModel(productData);
    await product.save();

    res.json({ success: true, message: 'Product Added', productId: product.productId });
  } catch (error) {
    console.error(error);
    res.json({ success: false, message: error.message });
  }
 };

// //og ------------------ LIST PRODUCTS ------------------
// export const listProducts = async (req, res) => {
//   try {
//     const products = await productModel.find({});
//      console.log('db product',products)
//     res.json({ success: true, data: products });
//   } catch (error) {
//     res.json({ success: false, message: error.message });
//   }
// };


// function for list product
export const listProducts = async (req, res) => {
    try {
        
        const products = await productModel.find({});
        res.json({success:true,products})
          // console.log('db product',products)


    } catch (error) {
        console.log(error)
        res.json({ success: false, message: error.message })
    }
}

// ------------------ REMOVE PRODUCT ------------------
export const removeProduct = async (req, res) => {
  try {
    const id = String(req.body.id || '').trim();

    if (!id) {
      return res.status(400).json({ success: false, message: 'Product id required' });
    }

    let deleted;

    // Try removing by _id if it's a valid ObjectId
    if (mongoose.Types.ObjectId.isValid(id)) {
      deleted = await productModel.findByIdAndDelete(id);
    }

    // If not found, try removing by productId
    if (!deleted) {
      deleted = await productModel.findOneAndDelete({ productId: id });
    }

    if (!deleted) {
      return res.status(404).json({ success: false, message: 'Product not found' });
    }

    res.json({ success: true, message: 'Product Removed' });
  } catch (error) {
    console.error(error);
    res.json({ success: false, message: error.message });
  }
};

export const singleProduct = async (req, res) => {
  try {
    // Works with either req.body or req.params
    const id = String(req.body.id || req.params.id || '').trim();

    if (!id) {
      return res.status(400).json({ success: false, message: 'Product ID required' });
    }

    let product = null;

    // 1️⃣ Try by Mongo _id
    if (mongoose.Types.ObjectId.isValid(id)) {
      product = await productModel.findById(id);
    }

    // 2️⃣ If not found, try by productId (custom string)
    if (!product) {
      product = await productModel.findOne({ productId: id });
    }

    // 3️⃣ If still not found
    if (!product) {
      return res.status(404).json({ success: false, message: 'Product not found' });
    }

    // ✅ Success
    res.status(200).json({ success: true, data: product });

  } catch (error) {
    console.error('singleProduct error:', error);
    res.status(500).json({ success: false, message: error.message });
  }
};