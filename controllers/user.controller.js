import jwt from 'jsonwebtoken';
import User from '../models/User.model.js';
import bcrypt from 'bcrypt'
const signIn = async (req, res) => {
    const { email, password } = req.body;

    try {
        const user = await User.findOne({ email });
        if (!user) {
            return res.status(401).json({ success: false, message: 'User not found' });
        }

        const passwordMatch = await bcrypt.compare(password, user.password);
        if (!passwordMatch) {
            return res.status(401).json({ success: false, message: 'Invalid password' });
        }

        const token = await jwt.sign({ userId: user._id }, process.env.JWT_SECRECT, { expiresIn: '30d' });
        return res.status(200).json({ success: true, token ,user});
    } catch (error) {
        return res.status(500).json({ success: false, message: 'Internal server error' });
    }
};

const signUp = async (req, res) => {
    const { firstName, lastName, email, password } = req.body;
    console.log(firstName,lastName,email,password)
    try {
      const user = await User.findOne({email});
      if (user) {
        res.status(400).json({success:false, message: 'User already exists' });
      } else {
        const hashedPassword = await bcrypt.hash(password, 10);
        await User.create({ firstName, lastName, email, password: hashedPassword });
        return res.status(201).json({ success:true,message: 'User created successfully' });
      }
    } catch (error) {
      return res.status(500).json({success:false, message: 'Internal server error' });
    }
  };

const getUser=async (req,res)=>{
    const user =req.user
    res.status(201).json({success:true,user})
}

export { signIn, signUp,getUser };

