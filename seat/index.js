require('dotenv').config();
const express = require('express');
const mongoose = require('mongoose');
const app = express();
app.use(express.json());

// MongoDB connection setup
const mongoURI = process.env.MONGODB_URI;
console.log("MongoDB URI being used:", mongoURI);

mongoose.connect(mongoURI)
  .then(() => {
    console.log('Database connected successfully');

    // Define the classroom schema inside the connection success callback
    const ClassroomSchema = new mongoose.Schema({
        tag: String,
        currentUsers: Array,
        chairs: [{
            tag: String,
            isOccupied: Boolean,
            occupiedByUser: String,
            startTime: Date,
            endTime: Date
        }]
    });

    // Ensure the schema index is set for efficient querying
    ClassroomSchema.index({ tag: 1 });
    const Classroom = mongoose.model('Classroom', ClassroomSchema, 'seats');

    // API endpoint to toggle chair occupancy
    app.put('/classrooms/:classroomId/chairs/:chairId/toggle', async (req, res) => {
        console.log("Received toggle request for chair:", req.params.chairId, "in classroom:", req.params.classroomId);
        try {
            const classroom = await Classroom.findOne({ tag: req.params.classroomId });
            console.log("Query result for classroom with tag", req.params.classroomId, ":", classroom);
    
            if (!classroom) {
                console.log("Classroom not found:", req.params.classroomId);
                return res.status(404).send({ message: "Classroom not found" });
            }
    
            const chair = classroom.chairs.find(c => c.tag === req.params.chairId);
            if (!chair) {
                console.log("Chair not found:", req.params.chairId);
                return res.status(404).send({ message: "Chair not found" });
            }
    
            // Allow toggle if same chair or no chair is occupied
            const alreadyOccupiedChair = classroom.chairs.find(c => c.occupiedByUser === req.body.userId);
            if (alreadyOccupiedChair && alreadyOccupiedChair.tag !== chair.tag) {
                return res.status(400).send({ message: "You can only occupy one chair at a time." });
            }
    
            chair.isOccupied = !chair.isOccupied;
            if (chair.isOccupied) {
                chair.occupiedByUser = req.body.userId;
                chair.startTime = new Date();
            } else {
                chair.occupiedByUser = null;
                chair.endTime = new Date();
            }
    
            await classroom.save();
            console.log("Chair status updated successfully:", chair);
            res.status(200).send({ message: "Chair status updated successfully" });
        } catch (error) {
            console.error("Error updating chair status:", error);
            res.status(500).send({ message: "Error updating chair status", error: error.message });
        }
    });
    
    // Server listening setup
    const port = process.env.PORT || 3000;
    app.listen(port, () => {
        console.log(`Server listening at http://localhost:${port}`);
    });

  })
  .catch(err => {
    console.error('Database connection error:', err);
  });