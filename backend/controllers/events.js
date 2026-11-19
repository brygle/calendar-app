const express = require('express');
const Event = require('../models/Event');

const getEvents = async (req, res = express.response) => {
    const events = await Event.find().populate('user', 'name');
    return res.status(200).json({
        ok: true,
        events: events
    });
}

const createEvent = async (req, res = express.response) => {
    const event = new Event(req.body);
    event.user = req.uid;
    try {
        const eventSaved = await event.save();
        return res.status(200).json({
            ok: true,
            event: eventSaved
        });
    } catch (error) {
        return res.status(500).json({
            ok: false,
            msg: 'Contact your administrator.'
        });
    }
}

const updateEvent = async (req, res = express.response) => {
    const {uid, params, body} = req; 
    const eventId = params.id;
    try {
        const event = await Event.findById(eventId);
        if (!event) {
            return res.status(404).json({
                ok: false,
                msg: 'Event does not exist.'
            });
        }
        
        if (event.user.toString() !== uid) {
            return res.status(401).json({
                ok: false,
                msg: 'User is not allowed to update this event.'
            });    
        }

        const newEvent = {
            ...body,
            user: uid
        }

        const eventUpdated = await Event.findByIdAndUpdate(eventId, newEvent, {new: true});
        
        return res.status(200).json({
            ok: true,
            event: eventUpdated
        });
    } catch (error) {
        console.error(error);
        return res.status(500).json({
            ok: false,
            msg: 'Contact your administrator'
        });
    }
}

const deleteEvent = async (req, res = express.response) => {
    const {uid, params} = req; 
    const eventId = params.id;
    try {
        const event = await Event.findById(eventId);
        if (!event) {
            return res.status(404).json({
                ok: false,
                msg: 'Event does not exist.'
            });
        }
        
        if (event.user.toString() !== uid) {
            return res.status(401).json({
                ok: false,
                msg: 'User is not allowed to delete this event.'
            });    
        }

        await Event.findByIdAndDelete(eventId);
        
        return res.status(200).json({
            ok: true
        });
    } catch (error) {
        console.error(error);
        return res.status(500).json({
            ok: false,
            msg: 'Contact your administrator'
        });
    }
}

module.exports = {getEvents, createEvent, updateEvent, deleteEvent}