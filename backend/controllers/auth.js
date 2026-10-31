const express = require('express');
const bcrypt = require('bcryptjs');
const User = require('../models/User');
const { generateJWT } = require('../helpers/jwt');

const login = async (req, res = express.response) => {
    const { email, password } = req.body;
    try {
        const user = await User.findOne({ email });
        if (!user) {
            return res.status(400).json({
                ok: false,
                msg: 'Incorrect username or password'
            });
        }

        const validPassword = bcrypt.compareSync(password, user.password);
        if (!validPassword) {
            return res.status(400).json({
                ok: false,
                msg: 'Incorrect username or password'
            });
        }

        const token = await generateJWT(user.id, user.name);

        return res.status(200).json({
            ok: true,
            uid: user.id,
            name: user.name,
            token
        });
    } catch (error) {
        console.error(error);
        return res.status(500).json({
            ok: false,
            msg: 'Contact with your administrator'
        });
    }
}

const register = async (req, res = express.response) => {
    const { name, email, password } = req.body; 
    try {
        let user = await User.findOne({ email });
        if (user) {
            return res.status(400).json({
                ok: false,
                msg: 'The email has been taken'
            });
        }
        user = new User(req.body);
        const salt = bcrypt.genSaltSync(10);
        user.password = bcrypt.hashSync(password, salt);

        await user.save();

        res.status(201).json({
            ok: true,
            uid: user.id,
            name: user.name
        });
    } catch (error) {
        console.error(error);
        res.status(500).json({
            ok: false,
            msg: 'Contact with your administrator'
        });
    }
}

const refresh = async (req, res = express.response) => {
    const {uid, name} = req;

    const token = await generateJWT(uid, name);

    return res.status(200).json({
        ok: true,
        uid, 
        name,
        token
    });
}

module.exports = {login, register, refresh}