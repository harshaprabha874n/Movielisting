const express=require("express");
const router =express.Router();
const Movie=require("../../db/schemas/movieSchema")
router.get("/", async(req,res)=>{
    const movies=await Movie.find();
        res.json(movies);

});
    router.post("/",async(req,res)=>{
    try{
    const moviesData=req.body;
    console.log(moviesData);
    const newMovie =new Movie(moviesData);
    await newMovie.save();
    res.json({

        message:"Movie added succesfully",
    });

    }catch(error){
        console.log(error);
        res.status(500).json({
            message:"Internal server error",
        });

    }
});
router.put("/:id",async(req,res)=>{
    try{
        const movieId=req.params.id;
        const updateMovieData=req.body;
        await Movie.findByIdAndUpdate(movieId,updateMovieData);
        res.json({
            message:"Movie Updated successfully",
        })
    }catch(error){
        console.log(error);
        res.status(500).json({
            message:"internal server error",
        });
    }
});
router.delete("/:id",async(req,res)=>{
    try{
        const movieId=req.params.id;
        const deleteMovieData=req.body;
        await Movie.findByIdAndDelete(movieId,deleteMovieData);
        res.json({
            message:"Movie Deleted successfully",
        })
    }catch(error){
        console.log(error);
        res.status(500).json({
            message:"internal server error",
        });
    }
});
router.get("/:id", async(req,res)=>{
    try{
        const movieId = req.params.id;
        console.log("handling the get by id request");
        const onemovie=await Movie.findById(movieId)
        res.json(onemovie);
    }
    catch(error){
        if(error.kind==="ObjectId"){
        res.status(404).json({
            message:"Page not found error"
        })}
        else{
        res.status(500).json({
            message:"Internal server error"});
}
    }
});
router.get("/:id", async(req,res)=>{
        const queryParams= req.query;
        const filters={};
        if(queryParams.name){
            filters.name={
                $regex: `^${queryParams.name}`
                ,$options:"i",
            };
        }
        if(queryParams.rating){
            filters.rating={
                $gte:parseFloat (queryParams.rating ),

            };
        }
       const movies=await Movie.find(filters);
       res.json(movies);
    });


module.exports=router;