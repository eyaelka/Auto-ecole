const router = require( 'express');
const Event = require ('../models/event');


module.exports = (router) => {
router.get('/get-events', async (req, res) => {
    try {
        const events = await Event.find();
        res.json(events);
    } catch (error) {
        res.json({ message: error.message });
    }

})

router.post('/add-event', async(req,res) => {
    console.log(req.body);
    const { title, date } = req.body;

    const newEvent = new Event({ title, date })

    try {
        await newEvent.save();
        res.json(
            {
                type: "success",
                message: "Event has been added successfully"
            }
        );
    } catch (error) {
        res.json({ message: error.message });
    }
});

router.delete('/delete_event', async (req, res) => {
    const { id } = req.params;

    if (!mongoose.Types.ObjectId.isValid(id)) return res.send(`No event with id: ${id}`);

    await Event.findByIdAndRemove(id);

    res.json({ message: "Event deleted successfully." });





});




return router;
}