const router=require("express").Router();
const catchAsyncErrors=require("../middleware/catchasyncerror");
const Product=require("../model/productmodel");
const cloudinary = require("../config/cloudinary");


router.post("/createproduct",catchAsyncErrors(async (req, res, next) => {
    // let images = [];
// console.log(req.files.images)

//     if (typeof req.files.images === "string") {
//       images.push(req.files.images);
//     } else {
//       images = req.files.images;
//     }

//     // images = req.files.images;
// // console.log(images.length)
//     const imagesLinks = [];
 
//     for (let i = 0; i < images.length; i++) {
//       const result = await cloudinary.uploader.upload(images[i].tempFilePath, {
//         folder: "products",
//       });

//       imagesLinks.push({
//         public_id: result.public_id,
//         url: result.secure_url,
//       });
//     }
  
//     req.body.images = imagesLinks;
    // req.body.user = req.user.id;
    // const file= req.files.images
    // console.log(file.tempFilePath)
    // cloudinary.uploader.upload(file.tempFilePath,(err,result)=>{
    //   console.log(result)
    // })


  // images.push(req.body.images)
  // const r=req.body.images
  // r.toString()
const images=req.body.images
    // try{
    if (images) {
      // const uploadedResponse = await cloudinary.uploader.upload(images, {
      //   folder: "products",
      // });
      // console.log(images)

      const imagesLinks = [];
 
          for (let i = 0; i < images.length; i++) {
          
            const result = await cloudinary.uploader.upload(images[i], {
              folder: "products",
            });
      
            imagesLinks.push({
              public_id: result.public_id,
              url: result.secure_url,
            });
          }
          // console.log(imagesLinks)
          req.body.images = imagesLinks;
          // console.log(imagesLinks)
  
      if (imagesLinks) {
    const product = await Product.create(req.body);
  
    res.status(201).json({
      success: true,
      // product,
    });
  }
  }
// }catch (error) {
//   console.log(error);
//   res.status(500).send(error);
// }
  }));



router.post("/updateproduct/:id",catchAsyncErrors(async(req,res,next)=>{

let product=await Product.findById(req.params.id)

if(!product){
  return res.status(500).json({
    success:"false",
message:"product not found"
  })
}

  // Images Start Here
  let images = [];

  if (typeof req.body.images === "string") {
    images.push(req.body.images);
  } else {
    images = req.body.images;
  }

if(images!=undefined){
   // Deleting Images From Cloudinary
   for (let i = 0; i < product.images.length; i++) {
    await cloudinary.uploader.destroy(product.images[i].public_id);
  }

  const imagesLinks = [];

  for (let i = 0; i < images.length; i++) {
    const result = await cloudinary.uploader.upload(images[i], {
      folder: "products",
    });

    imagesLinks.push({
      public_id: result.public_id,
      url: result.secure_url,
    });
  }

  req.body.images = imagesLinks;
}

product = await Product.findByIdAndUpdate(req.params.id, req.body, {
  new: true,
  runValidators: true,
  useFindAndModify: false,
});

res.status(201).json({
  success: true,
  product,
});

}))


router.get("/allproduct",catchAsyncErrors(async(req,res,next)=>{
  const product= await Product.find()

res.status(200).json({
  success:true,
product
})
}))

router.get("/limitproduct",catchAsyncErrors(async(req,res,next)=>{
  const product= await Product.find().limit(8)

res.status(200).json({
  success:true,
product
})
}))



router.get("/singleproduct/:id",catchAsyncErrors(async(req,res,next)=>{
  const product=await Product.findById(req.params.id)
  if(!product){
    return res.status(500).json({
      success:false,
      message:"product not found"
    })
  }
  res.status(200).json({
    success:true,
    product
  })
}))


router.delete("/deleteproduct/:id",catchAsyncErrors(async(req,res,next)=>{

const product=await Product.findById(req.params.id)
if(!product){
  return res.status(500).json({
    success:false,
    message:"product not found"
  })
}

  // Deleting Images From Cloudinary
  // for (let i = 0; i < product.images.length; i++) {
  //   await cloudinary.v2.uploader.destroy(product.images[i].public_id);
  // }

  await product.remove();

  res.status(200).json({
    success: true,
    message: "Product Delete Successfully",
  });

}))

  module.exports=router;