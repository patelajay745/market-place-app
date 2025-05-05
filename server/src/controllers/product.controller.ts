import mongoose, { isValidObjectId } from "mongoose";
import cloudUploader from "src/cloud";
import { categories, Product } from "src/models/product.model";
import { User, UserDocument } from "src/models/users.model";
import { ApiError, ApiResponse, asyncHandler } from "src/utils/helper";

async function uploadImage(filepath: string) {
  const { secure_url: url, public_id: id } = await cloudUploader.upload(
    filepath,
    {
      width: 1280,
      height: 720,
      crop: "fill",
    }
  );

  return { url, id };
}

export const listProduct = asyncHandler(async (req, res) => {
  const { name, price, purchasingDate, category, description } = req.body;

  const newProduct = new Product({
    owner: req.user.id,
    name,
    price,
    purchasingDate,
    category,
    description,
  });

  const { images } = req.files;

  if (!images) throw new ApiError("Please Provide Image", 422);

  let imageUrls = [];

  let inavalidFileType = false;

  if (Array.isArray(images)) {
    if (images.length > 5)
      throw new ApiError("Images should not be more than 5", 422);
    for (let img of images) {
      if (!img.mimetype?.startsWith("image")) {
        inavalidFileType = true;
        break;
      }
      const { url, id } = await uploadImage(img.filepath);
      imageUrls.push({ url, id });
    }
  } else {
    if (!images.mimetype?.startsWith("image")) {
      inavalidFileType = true;
    } else {
      const { url, id } = await uploadImage(images.filepath);
      imageUrls.push({ url, id });
    }
  }

  if (inavalidFileType)
    throw new ApiError("Image file type must be image type", 422);

  newProduct.thumbnail = imageUrls[0].url;
  newProduct.images = imageUrls;

  await newProduct.save();

  return res.json(
    new ApiResponse(
      "New Product has been added",
      {
        product: {
          name,
          price,
          purchasingDate,
          category,
          description,
          thumbnail: newProduct.thumbnail,
          images: newProduct.images,
        },
      },
      201
    )
  );
});

export const updateProduct = asyncHandler(async (req, res) => {
  const id = req.params["id"];
  if (!isValidObjectId(id))
    throw new ApiError("Please Provide id of product", 422);

  const { name, price, purchasingDate, category, description, thumbnail } =
    req.body;

  const product = await Product.findOneAndUpdate(
    { _id: id, owner: req.user.id },
    {
      name,
      price,
      purchasingDate,
      category,
      description,
    },
    {
      new: true,
    }
  );

  if (!product) throw new ApiError("product not found", 404);

  if (typeof thumbnail === "string") product.thumbnail = thumbnail;

  const { images } = req.files;

  let inavalidFileType = false;

  if (Array.isArray(images)) {
    if (product.images!.length + images.length > 5)
      throw new ApiError("Images should not be more than 5", 422);
    for (let img of images) {
      if (!img.mimetype?.startsWith("image")) {
        inavalidFileType = true;
        break;
      }
      const { url, id } = await uploadImage(img.filepath);
      product.images!.push({ url, id });
    }
  } else {
    if (images) {
      if (!images.mimetype?.startsWith("image")) {
        inavalidFileType = true;
      } else {
        const { url, id } = await uploadImage(images.filepath);
        product.images!.push({ url, id });
      }
    }
  }

  if (inavalidFileType)
    throw new ApiError("Image file type must be image type", 422);

  await product.save();

  return res.json(
    new ApiResponse(
      " Product has been updated",
      {
        product: {
          name,
          price,
          purchasingDate,
          category,
          description,
          thumbnail: product.thumbnail,
          images: product.images,
        },
      },
      201
    )
  );
});

export const deleteProduct = asyncHandler(async (req, res) => {
  const id = req.params["id"];

  if (!isValidObjectId(id))
    throw new ApiError("Please provide valid id of the product", 422);

  console.log();

  const product = await Product.findOneAndDelete({
    owner: req.user.id,
    _id: id,
  });
  if (!product) throw new ApiError("product not found", 404);

  product.images!.map(async ({ id }) => {
    await cloudUploader.destroy(id);
  });

  return res.json(new ApiResponse("Product has been deleted", {}, 200));
});

export const deleteProductImage = asyncHandler(async (req, res) => {
  const { productId, imageId } = req.params;

  if (!productId || !isValidObjectId(productId))
    throw new ApiError("Please provide valid productId", 422);
  if (!imageId) throw new ApiError("Please provide valid imageId", 422);

  const product = await Product.findOne({ _id: productId, owner: req.user.id });
  if (!product) throw new ApiError("Product not found", 404);

  const updatedImages = [];

  for (const { id, url } of product.images!) {
    if (id === imageId) {
      await cloudUploader.destroy(id);
      continue;
    }
    updatedImages.push({ id, url });
  }

  product.images = updatedImages;

  if (product.thumbnail!.includes(imageId)) {
    product.thumbnail = product.images[0].url;
  }

  await product.save();

  return res.json(
    new ApiResponse(
      "Image has been deleted",
      {
        product: {
          name: product.name,
          price: product.price,
          purchasingDate: product.purchasingDate,
          category: product.category,
          description: product.description,
          thumbnail: product.thumbnail,
          images: product.images,
        },
      },
      200
    )
  );
});

export const getProduct = asyncHandler(async (req, res) => {

  const { id } = req.params

  const product = await Product.findById({
    _id: new mongoose.Types.ObjectId(id)
  }).populate<{ owner: UserDocument }>("owner")

  if (!product) throw new ApiError("No product found", 404)

  res.status(200).json(new ApiResponse("Product data has been fetched", {
    product: {
      id: product._id,
      name: product.name,
      description: product.description,
      thumbnail: product.thumbnail,
      category: product.category,
      date: product.purchasingDate,
      price: product.price,
      images: product.images?.map(image => image.url),
      seller: {
        id: product.owner._id,
        name: product.owner.name,
        avatar: product.owner.avatar!.url
      }

    }
  }, 200))

});

export const getProductByCategory = asyncHandler(async (req, res) => {
  let { category } = req.params
  const { pageNo = "1", limit = "10" } = req.query as { pageNo: string, limit: string }

  category = category.charAt(0).toUpperCase() + category.slice(1)

  if (!categories.includes(category)) throw new ApiError("Invalid category", 422)

  const products = await Product.find({ category }).sort("-createdAt").skip((+pageNo - 1) * (+limit)).limit(+limit)

  if (products.length <= 0) throw new ApiError("No product found for that category", 404)

  const formattedProduct = products.map(p => ({
    id: p._id,
    name: p.name,
    thumbnail: p.thumbnail,
    category: p.category,
    price: p.price
  }))

  res.status(200).json(new ApiResponse(`All products from ${category} are fetched `, { product: formattedProduct }, 200))
});

export const getLatestProduct = asyncHandler(async (req, res) => {
  console.log("reached here")
  const { pageNo = "1", limit = "10" } = req.query as { pageNo: string, limit: string }

  const products = await Product.find({}).sort("-createAt").skip((+pageNo - 1) * +limit).limit(+limit)

  if (products.length <= 0) throw new ApiError("No product found ", 404)

  const formattedProduct = products.map(p => ({
    id: p._id,
    name: p.name,
    thumbnail: p.thumbnail,
    category: p.category,
    price: p.price
  }))

  res.status(200).json(new ApiResponse(`All products  are fetched `, { product: formattedProduct }, 200))
});

export const getListedAllProduct = asyncHandler(async (req, res) => {
  const { pageNo = "1", limit = "10" } = req.query as { pageNo: string, limit: string }

  const userid = new mongoose.Types.ObjectId(req.user!.id)

  const products = await Product.find({
    owner: userid
  }).sort("-createAt").skip((+pageNo - 1) * +limit).limit(+limit)

  if (!products) throw new ApiError("No product found", 404)

  const formattedProduct = products.map(p => ({
    id: p._id,
    name: p.name,
    thumbnail: p.thumbnail,
    category: p.category,
    price: p.price,
    image: p.images?.map(i => i.url),
    description: p.description,
    date: p.purchasingDate,
    seller: {
      id: req!.user.id,
      name: req.user.name,
      avatar: req.user.avatar
    }
  }))

  res.status(200).json(new ApiResponse(`All products  are fetched `, {
    product: formattedProduct
  }, 200))
});
