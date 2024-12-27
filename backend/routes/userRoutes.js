const router=require("express").Router()
const User=require('../models/User')

//signup

router.post('/signup', async (req, res) => {
    const { name, email, password } = req.body;

    try {
        const user=await User.create({name, email, password})
        res.json(user);
    } catch (err) {
        if(err.code===11000) return res.status(400).send("Email already exists")   //إذا كان البريد الإلكتروني موجودًا بالفعل (خطأ 11000 من MongoDB)، يتم إرجاع رسالة خطأ.
        res.status(400).send(err.message);
    }
});


//login

router.post('/login', async (req, res) => {
    const { email, password } = req.body;

    try {
        const user = await User.findByCredentials(email, password);
        res.json( user);
    } catch (err) {
        res.status(400).send(err.message);
    }
});

//get users
router.get('/', async (req, res) => {
    try {
        const users = await User.find();
        res.json(users);
    } catch (err) {
        res.status(400).send(err.message);
    }
});

module.exports =router