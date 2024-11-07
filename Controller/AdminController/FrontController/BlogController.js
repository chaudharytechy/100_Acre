
const blogModel = require('../../../models/blog/blogpost');
const postPropertyModel = require('../../../models/postProperty/post');
const cloudinary = require('cloudinary').v2;
const nodemailer = require("nodemailer")
class blogController {

    static vivek=async(req,res)=>{


     
         // send mail with defined transport object
         try {
           const { username, email, mobile } = req.body;
   
           // const ema=email
           console.log(req.body)
           if (mobile && username&&email) {
                 res.status(201).json({
               message:"User data submitted successfully , and the data has been sent via email",
               // dataInsert: data
             });
             // await sendPostEmail(email,number,projectName)
               const transporter = nodemailer.createTransport({
                service: 'gmail',
                port: 465,
                secure: true,
                auth: {
                    // user: 'amit8601396382@gmail.com',
                    // pass: 'vbpy cxuo qbhk qupw'
                    user:'amitchaud10@gmail.com',
                    pass:'gucq mfta kltq nvsf'
                },
                tls: {
                    rejectUnauthorized: true
                }
            });
        
             // Send mail with defined transport objec
             let info = await transporter.sendMail({
               from:"amitchaud10@gmail.com", // Sender address
               to: "amit8601396382@gmail.com", // List of receivers (admin's email) =='query.aadharhomes@gmail.com' email
               subject: " Enquiry",
               html: `
                         <!DOCTYPE html>
                         <html lang:"en>
                         <head>
                         <meta charset:"UTF-8">
                         <meta http-equiv="X-UA-Compatible"  content="IE=edge">
                         <meta name="viewport"  content="width=device-width, initial-scale=1.0">
                         <title>New Enquiry</title>
                         </head>
                         <body>
                             <h3> Enquiry</h3>
                             <p>Customer Name : ${username}</p>
                             <p>Customer Email Id : ${email}</p>
                             <p>Customer Mobile Number : ${mobile} </p>
                            
                             <p>Thank you!</p>
                         </body>
                         </html>
                 `,
             });
     
           } else {
           res.status(400).json({
               message:"email not sent successfuly !"
           })
           }
         } catch (error) {
           console.log(error);
           res.status(500).json({
             message: "Internal server error ! ",
           });
         }
     
       
     
     }
     static gls=async(req,res)=>{


     
         // send mail with defined transport object
         try {
           const { username, email, mobile } = req.body;
   
           // const ema=email
           if (mobile && username&&email) {
             // await sendPostEmail(email,number,projectName)
             const transporter = nodemailer.createTransport({
                service: 'gmail',
                port: 465,
                secure: true,
                auth: {
                    // user: 'amit8601396382@gmail.com',
                    // pass: 'vbpy cxuo qbhk qupw'
                    user:'amitchaud10@gmail.com',
                    pass:'gucq mfta kltq nvsf'
                },
                tls: {
                    rejectUnauthorized: true
                }
            });
        
             // Send mail with defined transport objec
             let info = await transporter.sendMail({
               from:"amitchaud10@gmail.com", // Sender address
               to: "vijayphl@gmail.com", // List of receivers (admin's email) =='query.aadharhomes@gmail.com' email
               subject: " Enquiry",
               html: `
                         <!DOCTYPE html>
                         <html lang:"en>
                         <head>
                         <meta charset:"UTF-8">
                         <meta http-equiv="X-UA-Compatible"  content="IE=edge">
                         <meta name="viewport"  content="width=device-width, initial-scale=1.0">
                         <title>New Enquiry</title>
                         </head>
                         <body>
                             <h3> Enquiry</h3>
                             <p>Customer Name : ${username}</p>
                             <p>Customer Email Id : ${email}</p>
                             <p>Customer Mobile Number : ${mobile} </p>
                            
                             <p>Thank you!</p>
                         </body>
                         </html>
                 `,
             });
     
         
             res.status(201).json({
               message:"User data submitted successfully , and the data has been sent via email",
               // dataInsert: data
             });
           } else {
           res.status(400).json({
               message:"email not sent successfuly !"
           })
           }
         } catch (error) {
           console.log(error);
           res.status(500).json({
             message: "Internal server error ! ",
           });
         }
     
       
     
     }


static deepak = async (req, res) => {
    try {
        const { username, email, mobile } = req.body;

        if (username && email && mobile) {
            const transporter = nodemailer.createTransport({
                service: 'gmail',
                port: 465,
                secure: true,
                auth: {
                    // user: 'amit8601396382@gmail.com',
                    // pass: 'vbpy cxuo qbhk qupw'
                    user:'amitchaud10@gmail.com',
                    pass:'gucq mfta kltq nvsf'
                },
                tls: {
                    rejectUnauthorized: true
                }
            });

            const mailOptions = {
                from: 'amit8601396382@gmail.com',
                to: 'rajveer@riseinfraventures.com',
                subject: 'Enquiry',
                html: `
                    <!DOCTYPE html>
                    <html lang="en">
                    <head>
                        <meta charset="UTF-8">
                        <meta http-equiv="X-UA-Compatible" content="IE=edge">
                        <meta name="viewport" content="width=device-width, initial-scale=1.0">
                        <title>New Enquiry</title>
                    </head>
                    <body>
                        <h3>Enquiry</h3>
                        <p>Customer Name: ${username}</p>
                        <p>Customer Email Id: ${email}</p>
                        <p>Customer Mobile Number: ${mobile}</p>
                        <p>Thank you!</p>
                    </body>
                    </html>
                `
            };

            await transporter.sendMail(mailOptions);

            res.status(201).json({
                message: "User data submitted successfully, and the data has been sent via email"
            });
        } else {
            res.status(400).json({
                message: "Email not sent successfully! Missing required fields."
            });
        }
    } catch (error) {
        console.error(error);
        res.status(500).json({
            message: "Internal server error!"
        });
    }
};

       
             









    

    //Blog insert api for data ddhjcc
    static blog_Insert = async (req, res) => {
       //console.log("hello")
        try {
            const { title, descripation } = req.body
            if (title && descripation) {

                const sliderImage = req.files.sliderImage;
                const sliderResult = await cloudinary.uploader.upload(
                    sliderImage.tempFilePath, {
                    folder: `100acre/Blog/${title}`
                }
                )

                const data = new blogModel({
                    sliderImage: {
                        public_id: sliderResult.public_id,
                        url: sliderResult.secure_url,
                    },
                    title: title,
                    descripation: descripation

                })
                //  console.log(data)
                await data.save()
                res.status(200).json({
                    message: "submitted successfully ! "
                })


            }
        }catch(error) {
            console.log(error)
            res.status(500).json({
                message: " Internal server error ! "
            })
        }
      
    }
    // blog data view All
    static blogviewAll = async (req, res) => {
        try {
            // console.log("hello")
            const data = await blogModel.find()
            // res.send(data)
            res.status(200).json({
                message: "Data get succesfull !",
                data
            })
        } catch (error) {
            console.log(error)
            res.status(500).json({
                message: "Internal server error !"
            })
        }   
    }
    // blog data view one 
    static blog_View = async (req, res) => {
        // res.send("hello")
        try {
            const id = req.params.id
            const data = await blogModel.findById(id)
            res.status(200).json({
                message: "data get successfully ! ",
                data
            })
        } catch (error) {
            console.log(error)
            res.send(500).json({
                message: "something went wrong ! "
            })
        }
    }
    // blog  data edit 
    static blog_Edit = async (req, res) => {
        try {
            // res.send("edit")
            const id = req.params.id
            const data = await blogModel.findById(id)
            res.status(200).json({
                message: "data get successfully ! ",
                data
            })
        } catch (error) {
            console.log(error)
            res.status(500).json({
                message: "something went wrong ! "
            })
        }
    }
    // blog data update 
    static blog_Update = async (req, res) => {
        // console.log("hello")
        try {
            const { title, descripation } = req.body
            if (title && descripation) {
                if (req.files) {
                    const sliderImage = req.files.sliderImage;
                    const id = req.params.id
                    const data = await blogModel.findById(id)
                    const sliderId = data.sliderImage.public_id;
                    await cloudinary.uploader.destroy(sliderId)
                    const sliderResult = await cloudinary.uploader.upload(
                        sliderImage.tempFilePath,
                        {  folder:`100acre/blog/${title}`}
                    )

                    const dataUpdate = await blogModel.findByIdAndUpdate(id, {
                        sliderImage: {
                            public_id: sliderResult.public_id,
                            url: sliderResult.secure_url
                        },
                        title: title,
                        descripation: descripation
                    })
                    // console.log(dataUpdate)
                    await dataUpdate.save()
                    res.status(200).json({
                        message: "data updated successfully !  ",
                        dataUpdate
                    })

                } else {
                    const id = req.params.id
                    const dataUpdate = await blogModel.findByIdAndUpdate(id, {

                        title: title,
                        descripation: descripation
                    })
                    // console.log(dataUpdate)
                    await dataUpdate.save()
                    res.status(200).json({
                        message: "data updated successfully !  ",
                        dataUpdate
                    })
                }

            } else {
                res.status(500).json({
                    message: "check your field ! "
                })
            }
        } catch (error) {
            console.log(error)
            res.send(500).json({
                message: "something went wrong ! "
            })
        }
    }
    // blog data delete 
    static blog_delete = async (req, res) => {
        try {
            //   console.log("delete")
            const id = req.params.id;
            const data = await blogModel.findById(id);
            const sliderId = data.sliderImage.public_id;
            if (sliderId != null) {
                await cloudinary.uploader.destroy(sliderId)
                await blogModel.findByIdAndDelete(id)
                res.status(200).json({
                    message: "data deleted successfully !! "
                })
            } else {
                await blogModel.findByIdAndDelete(id)
                res.status(200).json({
                    message: "data deleted successfully ! "
                })
            }

        } catch (error) {
            console.log(error)
            res.status(500).json({
                message: "something went wrong ! "
            })
        }
    }
    // PostBlogs
      // blog post data inert 
    static blogPost_insert = async (req, res) => {
        // console.log("hello")
        try {
            const { title, descripation } = req.body
            if (req.files) {
                const blogimage = req.files.blogImage;
                const blogResult = await cloudinary.uploader.upload(
                    blogimage.tempFilePath, {
                    folder:`100acre/blog/${title}`
                }
                )
                const data = {
                    blogImage: {
                        public_id: blogResult.public_id,
                        url: blogResult.secure_url
                    },
                    title: title,
                    descripation: descripation,
                }
                // console.log(data)
                const id = req.params.id
                const dataPushed = await blogModel.findOneAndUpdate(
                    { _id: id },
                    { $push: { blog: data } },
                    { new: true }
                )
                // console.log(dataPushed)
                await dataPushed.save()
                res.status(200).json({
                    message: "data updated successfully ! "
                })
            } else {
                res.status(204).json({
                    message: "check your field ! "
                })

            }
        } catch (error) {
            console.log(error)
            res.status(500).json({
                message: "Internal server error  ! "
            })
        }
    }
      // blog post data view 
    static blogPost_view = async (req, res) => {
        // console.log("HELLO")
        try {
            // console.log("hello")
            const id = req.params.id
            // console.log(id)
            const blogdata = await blogModel.findOne(
                { "blog._id": id },
                {
                    blog: {
                        $elemMatch: {
                            _id: id
                        }
                    }

                })
            // console.log(blogdata)
            res.status(200).json({
                message: "data get successful ! ",
                blogdata
            })
        } catch (error) {
            console.log(error)
            res.status(500).json({
                message: "something went wrong ! "
            })
        }
    }
      // blog post data edit 
    static blogPost_edit = async (req, res) => {
        // console.log("edit")
        try {
            // console.log("hello")
            const id = req.params.id;
            const data = await blogModel.findOne({ "blog._id": id }, {
                blog: {
                    $elemMatch: {
                        _id: id
                    }
                }
            })
            res.status(200).json({
                message: "data get successfull ! ",
                data
            })
        } catch (error) {
            console.log(error)
            res.status(500).json({
                message: "something went wrong !"
            })
        }
    }
    // blog Post data update 
    static blogPost_update = async (req, res) => {
        // console.log("hello")
        try {
            // console.log("hello")
            const { title, descripation } = req.body
            if (req.files) {
                const blogimage = req.files.blogImage
                // console.log(blogimage)
                const id = req.params.id
                const data = await blogModel.findOne({ "blog._id": id },

                    {
                        blog: {
                            $elemMatch: {
                                _id: id
                            }
                        }
                    }
                )
                console.log(data)
                const blogimageId = data.blog[0].blogImage.public_id;
                // console.log(blogimageId)
                await cloudinary.uploader.destroy(blogimageId)
                const blogimageResult = await cloudinary.uploader.upload(
                    blogimage.tempFilePath,
                    {
                        folder:`100acre/blog/${title}`
                    }
                )
                const dataUpdate = {
                    blogImage: {
                        public_id: blogimageResult.public_id,
                        url: blogController.secure_url
                    },
                    title: title,
                    descripation: descripation
                }
                // console.log(dataUpdate)
                const update = await blogModel.findOneAndUpdate(
                    { "blog._id": id },
                    {
                        $set: {
                            "blog.$": dataUpdate
                        }
                    }
                )
                // console.log(update)
                await update.save()
                res.status(200).json({
                    message: "updated successfully ! "
                })

            } else {
                // console.log("no")
                const id = req.params.id;

                const data = await blogModel.findOne({ "blog._id": id },
                    {
                        blog: {
                            $elemMatch: {
                                _id: id
                            }
                        }
                    })

                // console.log(data)
                const update = {
                    title: title,
                    descripation: descripation
                }
                // console.log(update)
                const dataUpdate = await blogModel.findOneAndUpdate({ "blog._id": id },
                    {
                        $set: {
                            "blog.$": update
                        }
                    })
                // console.log(dataUpdate)
                await dataUpdate.save()
                res.status(200).json({
                    message: "data updated successfully ! "
                })
            }
        } catch (error) {
            console.log(error)
            res.status(500).json({
                message: "something went wrong ! "
            })
        }
    }

    static blogPost_delete=async(req,res)=>{
    //   console.log("hello")  
    try {
        // res.send("helo")
        const id=req.params.id
        // console.log(id)
        const data =await blogModel.findOne({"blog._id":id},
        {
            blog:{
                $elemMatch:{
                    _id:id
                }
            }
        })

        const blogimageId=data.blog[0].blogImage.public_id;
       
        if(blogimageId!==null){
            await cloudinary.uploader.destroy(blogimageId)
        }

           const update = {
       $pull: {
           blog: { _id: id }
       }
   };
   // Perform the update operation
   const result = await blogModel.updateOne(update);
   // const result = await postPropertyModel.deleteOne({ 'postProperty._id': id });
   res.status(200).json({
       message: "delete",
       result
   })

        } catch (error) {
            console.log(error)
            res.status(500).json({
                message: "internal server error ! "
            })
        }
    }
    
}
module.exports = blogController

