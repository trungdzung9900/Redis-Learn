module.exports = (job,done) =>{
    try{
        job.progress(100)
        done(null,job.data)
    }catch(err){
        done(err)
    }
}