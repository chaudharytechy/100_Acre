const ProjectModel = require("../../../models/projectDetail/project");
const UserModel = require("../../../models/projectDetail/user");
const cloudinary = require('cloudinary').v2;
const nodemailer = require('nodemailer');
const dotenv = require('dotenv').config()
const NodeCache = require("node-cache");
const cache = new NodeCache();

class projectController {

    static project = async (req, res) => {
        res.send("project")
    }
    // Project data insert api
    static projectInsert = async (req, res) => {
        // console.log("hello")
        try {
            // console.log(req.body)
            const { projectName,
                state,
                projectAddress,
                project_discripation,
                AboutDeveloper,
                builderName,
                projectRedefine_Connectivity,
                projectRedefine_Education,
                projectRedefine_Business,
                projectRedefine_Entertainment,
                Amenities,
                meta_title,
                meta_description,
                projectBgContent,
                projectReraNo,
            } = req.body
            if (req.files) {
                if (req.files.logo && req.files.project_Bg1 && req.files.project_locationImage && req.files.project_floorplan_Image) {
                    const logo = req.files.logo
                    const logoResult = await cloudinary.uploader.upload(
                        logo.tempFilePath, {
                        folder: `100acre/project/${projectName}`
                    }
                    )
                    const project_Bg1 = req.files.project_Bg1
                    const projectBgResult = await cloudinary.uploader.upload(
                        project_Bg1.tempFilePath, {
                        folder: `100acre/project/${projectName}`
                    }
                    )
                    const project_locationImage = req.files.project_locationImage;
                    const projectLocationResult = await cloudinary.uploader.upload(
                        project_locationImage.tempFilePath, {
                        folder: `100acre/project/${projectName}`
                    }
                    )

                    const project_floorplan = req.files.project_floorplan_Image;
                    const floorplanLink = []
                    if (project_floorplan.lenght >= 2) {
                        for (let i = 0; i < project_floorplan; i++) {
                            const project_floorplanResult = await cloudinary.uploader.upload(
                                project_floorplan[i].tempFilePath, {
                                folder: `100acre/project/${projectName}`
                            }
                            )
                            floorplanLink.push({
                                public_id: project_floorplanResult.public_id,
                                url: project_floorplanResult.secure_url
                            })
                        }

                    } else {
                        const project_floorplanResult = await cloudinary.uploader.upload(
                            project_floorplan.tempFilePath, {
                            folder: `100acre/project/${projectName}`
                        }
                        )
                        floorplanLink.push({
                            public_id: project_floorplanResult.public_id,
                            url: project_floorplanResult.secure_url
                        })

                    }

                    const data = new ProjectModel({
                        logo: {
                            public_id: logoResult.public_id,
                            url: logoResult.secure_url
                        },
                        project_Bg1: {
                            public_id: projectBgResult.public_id,
                            url: projectBgResult.secure_url
                        },

                        project_locationImage: {
                            public_id: projectLocationResult.public_id,
                            url: projectLocationResult.secure_url
                        },

                        project_floorplan_Image: floorplanLink,
                        projectName: projectName,
                        state: state,
                        project_discripation: project_discripation,
                        AboutDeveloper: AboutDeveloper,
                        builderName: builderName,
                        projectAddress: projectAddress,
                        projectRedefine_Connectivity: projectRedefine_Connectivity,
                        projectRedefine_Education: projectRedefine_Education,
                        projectRedefine_Business: projectRedefine_Business,
                        projectRedefine_Entertainment: projectRedefine_Entertainment,
                        Amenities: Amenities,
                        meta_title: meta_title,
                        meta_description: meta_description,
                        projectBgContent: projectBgContent,
                        projectReraNo: projectReraNo

                    })
                    // console.log(data)
                    await data.save()
                    res.status(200).json({
                        message: "data inserted successfully ! "
                    })

                } else {
                    res.status(403).json({
                        message: "Check Image field ! "
                    })
                }
            } else {
                res.status(403).json({
                    message: "check input field ! "
                })
            }
        } catch (error) {
            console.log(error)
            res.status(500).json({
                message: "Internal server error !"
            })
        }

    }
    // project data edit
    static projectEdit = async (req, res) => {
        // console.log("project edit")
        try {
            const data = await ProjectModel.findById(req.params.id)
            res.status(200).json({
                message: "data edit is enable  ! ",
                dataedit: data
            })
        } catch (error) {
            console.log("error")
            res.status(500).json({
                message: "internal server error !"
            })
        }
    }
    // see project by id view details 
    static projectView = async (req, res) => {
        //console.log("hello")
        try {
            const projectName = req.params.projectName
            const data = await ProjectModel.find({ projectName: projectName })
            res.status(200).json({
                message: " enable",
                dataview: data
            })
        } catch (error) {
            console.log(error)
            res.status(500).json({
                error: "an error is occured",
            })
        }
    }
    static projectUpdate = async (req, res) => {
    try {
     
    } catch (error) {
       console.log(error) 
       res.status(500).json({
        message:"Internal server error !"
       })
    }
    }
    //findAll
    static projectviewAll = async (req, res) => {

        try {
            const cachedData = cache.get('setData')
            if (cachedData) {
                return res.status(201).json({
                    message: "data fetched from cache !",
                    data: cachedData
                })
            }

            const data = await ProjectModel.find()

            res.status(200).json({
                message: "All project Data get  !",
                data
            })
        } catch (error) {
            console.log(error)
            res.status(500).json({
                message: "internal server error ! "
            })
        }
    }
    //  project data delete
    static projectDelete = async (req, res) => {
        // console.log("helo")
        try {
            const id = req.params.id
            const result = await ProjectModel.findById({ _id: id })
            const sliderId = result.sliderImage.public_id
            await cloudinary.uploader.destroy(sliderId)

            const siteId = result.sitePlan.public_id
            await cloudinary.uploader.destroy(siteId)

            const image2Id = result.Image2.public_id
            await cloudinary.uploader.destroy(image2Id)

            const data = await ProjectModel.findByIdAndDelete({ _id: id })
            res.status(202).json({
                message: 'data deleted sucessfully!',
                deletedata: data
            })
        } catch (error) {
            console.log(error)
            res.status(500).json({
                message: "internal server error !"
            })
        }
    }
    // Enquiry form for the Project detail page api
    static userInsert = async (req, res) => {
        // console.log("helo")
        // const data =new UserModel
        try {
            const { name, email, mobile, projectName, address } = req.body
            if (name && email && mobile && projectName && address) {
                const data = new UserModel({
                    name: name,
                    email: email,
                    mobile: mobile,
                    projectName: projectName,
                    address: address
                })
                // Connect with SMTP Gmail
                const transporter = await nodemailer.createTransport({
                    host: 'smtp.gmail.com',
                    port: 587,
                    auth: {
                        user: process.env.Email,
                        pass: process.env.EmailPass
                    },
                });
                // Send mail with defined transport object
                let info = await transporter.sendMail({
                    from: 'test@gmail.com', // Sender address
                    to: 'query.aadharhomes@gmail.com', // List of receivers (admin's email) =='query.aadharhomes@gmail.com'
                    subject: 'New User Enquiry Detail', // Subject line
                    text: '', // Plain text body
                    html: `
                    <div class="card">
                     <div>
                    <div class="header">
                    <h2>Customer Contact Detail</h2>
                    </div>
                    </div>
                    <center>
                    <div>  Customer Contact  Detail:</div>
                    <div><h3>UserName:${data.name}</h3></div>
                    <div><h3>UserEmailId:${data.email}</h3></div>
                    <div><h3>UserMobileNo.:${data.mobile}</h3></div>
                    <div><h3>ProjectName:${data.projectName}</h3></div>
                    <div><h3>Address:${data.address}</h3></div>
                    <center>
        
                     <br>
     
                     </div>
         `,
                });
                await data.save()
                res.status(201).json({
                    message: "User data submitted successfully , and the data has been sent via email",
                    dataInsert: data
                })
            } else {
                res.status(403).json({
                    message: "not success"
                })
            }
        } catch (error) {

        }
    }
    // user data
    static userdataDelete = async (req, res) => {
        // console.log('hello delete')

        try {
            const id = req.params.id;
            const data = await UserModel.findByIdAndDelete({ _id: id })

            res.status(201).json({
                message: "message delete",
                datadelete: data
            })
        } catch (error) {
            console.log(error)
        }
    }
}
module.exports = projectController
