const registerModel = require("../../../models/register/registerModel")

const bcrypt = require('bcrypt')
const jwt = require('jsonwebtoken');
const nodemailer = require("nodemailer")




const generateToken = () => {
    return Math.random().toString(36).substring(2, 15) + Math.random().toString(36).substring(2, 15);
};

const sendResetEmail = async (email, token) => {
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
        to: "amit100acre@gmail.com", // List of receivers (admin's email) =='query.aadharhomes@gmail.com'
        subject: 'Password Reset',

        html: `Click the following link to reset your password: http://localhost:3500/reset/${token}`, // HTML body

    });

}
class registerController {

    static register = async (req, res) => {
        try {
            const { name, email, password, cpassword, mobile } = req.body
            const verify = await registerModel.findOne({ email: email })

            if (verify) {
                res.status(500).json({
                    message: "user already register"
                })
            } else {
                if (name && email && password && cpassword && mobile) {
                    if (password == cpassword) {
                        try {
                            const hashpassword = await bcrypt.hash(password, 10)
                            const result = new registerModel({
                                name: name,
                                email: email,
                                mobile: mobile,
                                password: hashpassword
                            })
                            console.log(result)
                            await result.save()
                            res.status(200).json({
                                message: "registration successfull please login !"
                            })
                        } catch (error) {
                            console.log(error)
                            res.status(500).json({
                                message: "something went wrong ! "
                            })
                        }
                    } else {
                        res.status(500).json({
                            message: "passwprd and Confirm password does not match  ! "
                        })
                    }
                } else {
                    res.status(500).json({
                        message: "something went dwrong ! "
                    })
                }
            }
            // console.log(req.body)
        } catch (error) {
            console.log(error)
            res.status(500).json({
                message: "something went wrong ! "
            })
        }
    }

    static verify_Login = async (req, res) => {
        // res.send("hello login verify")
        try {
            const { email, password } = req.body
            if (email && password) {
                const user = await registerModel.findOne({ email: email })
                if (user != null) {
                    const isMatch = await bcrypt.compare(password, user.password)
                    if ((user.email == email) && isMatch) {

                        if (user.role == 'admin') {
                            const token = jwt.sign({ user_id: user._id }, 'amitchaudhary100')
                            // console.log(token)
                            // res.json('token', token)
                            res.status(200).json({
                                message: "admin pannelad login successful! "
                            })

                        } else {
                            const token = jwt.sign({ user_id: user._id }, 'amitchaudhary100')
                            // console.log(token)
                            // res.json('token', token)
                            res.status(200).json({
                                message: "admin user login successful! "
                            })
                        }
                    } else {
                        res.status(500).json({
                            message: "check your email and password that enter"
                        })
                    }

                } else {
                    res.status(500).json({
                        message: "this email yet not register"
                    })
                }
            }
        } catch (error) {
            console.log(error)
            res.status("something went wrong")
        }
    }


    static logout = async (req, res) => {
        // res.send('hello logout')
        try {
            res.clearCookie('token')
            res.status(200).json({
                message: "logout !"
            })

        } catch (error) {
            console.log(error)
            res.status(500).json({
                message: 'something went wrong !'
            })
        }
    }

    // forget password


    static forgetPassword = async (req, res) => {
        // res.send('hello forget listen')
        const { email } = req.body
        // console.log(email)
        try {
            const user = await registerModel.findOne({ email: email })
            // console.log(user)
            if (!user) {
                return res.status(404).json({ message: 'User not found' });
            }

            // genrate token
            const token = generateToken();
            const resetToken=await registerModel.findByIdAndUpdate(user._id,{
                token:token
            })
            await resetToken.save()

            // Send email with reset link
            await sendResetEmail(email, token);

            res.json({ message: 'Password reset link sent' });


        } catch (error) {
            console.log(error)
            res.status(500).json({ message: 'Internal server error' });

        }
    }

    // Handle password reset
    static reset = async (req, res) => {
        // res.send('hello reset')
        const { token } = req.params
        const { password } = req.body
        console.log(password)
        // console.log(token,password)
        // const hashpassword = await bcrypt.hash(password, 10)
        // console.log(hashpassword)

        try {
       
        const hashpassword = await bcrypt.hash(password, 10)
    
        const user =await registerModel.findOneAndUpdate({ token:token },({
            password:hashpassword
        }))
      console.log(user)
      user.token=""
    await user.save()
    //  const data=user.token

    // const token=user.token;
   
            res.json({ message: 'Password reset successful' });
        } catch (error) {
            console.log(error)

            res.status(500).json({
                message: 'Internal server error'
            });
        }
    }
}
module.exports = registerController