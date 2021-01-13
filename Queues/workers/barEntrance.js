module.exports = (job,done)=>{
    const{bar}= require('../queues');
try{
    const {name,age}= job.data;
    if(age<18) throw new Error ('You cannot access')
    job.progress(100)
    bar.add({name,age})
    done(null,job.data)
}
catch(err){
    done(err)
}
}