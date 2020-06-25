const {Router} = require('express');
const Categories = require('../models/Categories')
const router = Router();
const{check, validationResult} = require('express-validator');


router.post(
    '/add',
    [
        check('_id', 'Min name length: 1').isLength({min:1}),
        check('parent', 'Min parent name length: 1').isLength({min:1})
    ],
    async (req,res)=>{
    try{
        const errors = validationResult(req);
        if(!errors.isEmpty()){
            return res.status(400).json({
                errors: errors.array(),
                message: "Incorrect category data"
            })
        }
        const {_id, parent} = req.body;
        const check = await Categories.findOne({_id, parent});
        if(check){
            return res.status(400).json({message:'Category with this name is already exist'});
        }

        const cat = new Categories({_id,parent,items:Array});
        await cat.save();

        res.status(201).json({message: 'New category is created'})


    }catch (e) {
        res.status(500).json({message:'Something went wrong'})
    }
});



router.get('/get:name', async (req,res)=>{
    try {
        const data = await Categories.find({parent:req.params.name});
        await res.json(data);
    }
    catch (e) {
        res.status(500).json({message:"Something went wrong"})
    }
});




router.delete('/delete:id', async (req,res)=>{
    try {
        await Categories.deleteOne({_id:req.params.id});
        await categoriesCleanFunction(req.params.id);
    }
    catch (e) {
        res.status(500).json({message:"Something went wrong"})
    }
});



const categoriesCleanFunction = async (id) => {
    const check = await Categories.find({parent:id});
    if(check.length>0){
        for(let i=0; i<check.length; i++){
            try {
                await Categories.deleteOne({_id: check[i]['_id']});
                await categoriesCleanFunction(check[i]['_id']);
            }catch (e) {
                
            }
        }
    }
};




module.exports = router;