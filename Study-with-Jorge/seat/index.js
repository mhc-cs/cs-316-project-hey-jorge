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

    // Define the summary schema
    const SummarySchema = new mongoose.Schema({
        userId: String,
        startTime: String,
        endTime: String,
        length: Number,
    });

    const Summary = mongoose.model('Summary', SummarySchema, 'summary');


    // Ensure the schema index is set for efficient querying
    ClassroomSchema.index({ tag: 1 });
    const Classroom = mongoose.model('Classroom', ClassroomSchema, 'seats');

    // API endpoint to toggle chair occupancy
    app.put('/classrooms/:classroomId/chairs/:chairId/toggle', async (req, res) => {
        try {
            const classroom = await Classroom.findOne({ tag: req.params.classroomId });
            if (!classroom) {
                console.log("Classroom not found:", req.params.classroomId);
                return res.status(404).send({ message: "Classroom not found" });
            }
    
            const chair = classroom.chairs.find(c => c.tag === req.params.chairId);
            if (!chair) {
                console.log("Chair not found:", req.params.chairId);
                return res.status(404).send({ message: "Chair not found" });
            }
    
            // Inside the PUT endpoint for toggling chair occupancy
            if (chair.isOccupied) {
                // Calculate the duration of occupancy
                const endTime = new Date();
                const durationInSeconds = (endTime - chair.startTime) / 1000; // Duration in seconds
                console.log("Duration in seconds:", durationInSeconds); // Add this line to log the duration

                // Save the summary entry with the duration
                const summaryEntry = new Summary({
                    userId: chair.occupiedByUser,
                    startTime: chair.startTime.toISOString().substring(0, 10),
                    endTime: endTime.toISOString().substring(0, 10),
                    length: durationInSeconds  // Saving the duration in seconds
                });
                console.log("Attempting to save summary entry:", summaryEntry);
                await summaryEntry.save()
                    .then(() => console.log("Summary saved successfully"))
                    .catch(err => {
                        console.error("Error saving summary:", err);
                        throw err;
                    });

                // Reset chair occupancy details
                chair.occupiedByUser = null;
                chair.startTime = null;
                chair.isOccupied = false;
            } else {
                // Occupying the chair
                chair.occupiedByUser = req.body.userId;
                chair.startTime = new Date();
                chair.isOccupied = true;
            }

            await classroom.save();
            res.status(200).send({ message: "Chair status updated successfully" });
        } catch (error) {
            console.error("Error in toggle endpoint:", error);
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