const express = require('express');
const mongoose = require('mongoose');
const dotenv = require('dotenv');

dotenv.config();

const app = express();
mongoose.connect(process.env.MONGODB_URI, {
  useNewUrlParser: true,
  useUnifiedTopology: true,
});

const db = mongoose.connection;

mongoose.connect(process.env.MONGODB_URI, {
    useNewUrlParser: true,
    useUnifiedTopology: true,
  });


  app.post('/api/v1/rooms-types', async (req, res) => {
    const { name } = req.body;
    if (!name) {
      return res.status(400).json({ message: 'Name is required' });
    }
    const roomType = new RoomType({ name });
    try {
      await roomType.save();
      res.status(201).json(roomType);
    } catch (error) {
      res.status(400).json({ message: error.message });
    }
  });



  app.post('/api/v1/rooms', async (req, res) => {
    const { name, roomType, price } = req.body;
    if (!name || !roomType || !price) {
      return res.status(400).json({ message: 'Name, roomType, and price are required' });
    }
    const room = new Room({ name, roomType, price });
    try {
      await room.save();
      res.status(201).json(room);
    } catch (error) {
      res.status(400).json({ message: error.message });
    }
  });

  app.get('/api/v1/rooms', async (req, res) => {
    const { search, roomType, minPrice, maxPrice } = req.query;
    const query = {};
    if (search) query.name = { $regex: search, $options: 'i' };
    if (roomType) query.roomType = roomType;
    if (minPrice) query.price = { $gte: minPrice };
    if (maxPrice) query.price = { $lte: maxPrice };
    try {
      const rooms = await Room.find(query);
      res.json(rooms);
    } catch (error) {
      res.status(500).json({ message: error.message });
    }
  });

  app.get('/api/v1/rooms/:id', async (req, res) => {
    try {
      const room = await Room.findById(req.params.id);
      if (!room) {
        return res.status(404).json({ message: 'Room not found' });
      }
      res.json(room);
    } catch (error) {
      res.status(500).json({ message: error.message });
    }
  });
  
  app.listen(PORT, () => {
    console.log(`Server is running on port ${PORT}`);
  });

  

  app.listen(PORT, () => {
    console.log(`Server is running on port ${PORT}`);
  });  


  
  