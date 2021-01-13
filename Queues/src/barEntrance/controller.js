const {barEntrance} = require('../../queues')

module.exports = {
    entrance: async (req,res)=>{
        const {name,age}= req.body
        if(!name || !age) return res.send('The age and name are require');
        if (age<18) return res.send('The age must be higher than 18');
         await barEntrance.add({name, age})
        
        res.send(`${name} has been added to the entrance bar queue`)
    },

    getall: async(req,res)=>{
        const total = await barEntrance.getCompletedCount()
        res.send(`number of completed task: ${total} `)
    }
} 