const {Router} = require('express');
const Bases = require('../models/Bases');
const router = Router();
const {check, validationResult} = require('express-validator');


router.post(
    '/create',
    [
        check('name', 'Min name name length: 1').isLength({min: 1}),
    ],
    async (req, res) => {
        try {
            const errors = validationResult(req);
            if (!errors.isEmpty()) {
                return res.status(400).json({
                    errors: errors.array(),
                    message: "Incorrect new base data"
                })
            }
            const name = req.body.name;

            const check = await Bases.find({_id:name});

            if (check.length > 0) {
                return res.status(400).json({
                    errors: errors.array(),
                    message: "Base with this name is exist"
                })
            }
            const base = new Bases({_id:name,items:Array});
            await base.save();


            res.status(201).json({message: 'Base is created'})


        } catch (e) {
            res.status(500).json({message: 'Something went wrong'})
        }
    });


router.get('/get/all', async (req, res) => {
    try {
        const data = await Bases.find();

        if(data){
            const result = data.reduce((acc, i) =>{return [...acc, i._id]},[]);
            res.json(result);
        }

    } catch (e) {
        res.status(500).json({message: "Something went wrong"})
    }
});



router.post(
    '/add/item',
    [
        check('base', 'Min base name length: 1').isLength({min: 1}),
        check('id', 'Min id length: 1').isLength({min: 1}).isNumeric(),
        check('category', 'Min name category length: 1').isLength({min: 1}),
        check('name', 'Min name name length: 1').isLength({min: 1}),
        check('price', 'Min name price length: 1').isLength({min: 1}).isNumeric(),
        check('qty', 'Min name qty length: 1').isLength({min: 1}).isNumeric()
    ],
    async (req, res) => {
        try {
            const errors = validationResult(req);
            if (!errors.isEmpty()) {
                return res.status(400).json({
                    errors: errors.array(),
                    message: "Incorrect new base item data"
                })
            }
            const {base, id, category,name} = req.body;
            const price = Number(req.body.price);
            const qty = Number(req.body.qty);


            const check = await Bases.find({$and: [{_id: base}, {items: {$elemMatch: {uniq_Id: id}}}]});

            if (check.length > 0) {
                return res.status(400).json({
                    errors: errors.array(),
                    message: "Base item with this id is exist"
                })
            }


            await Bases.updateOne({_id: base}, {
                $push: {
                    items: {
                        uniq_Id:id,
                        category,
                        name,
                        price,
                        qty
                    }
                }
            });


            res.status(201).json({message: 'Base item is created'})


        } catch (e) {
            res.status(500).json({message: 'Something went wrong'})
        }
    });



router.get('/get/base:base', async (req,res)=>{
    try {
        const data = await Bases.find({_id: req.params.base});
        if(data.length>0) {
            await res.json(data[0].items);
        }else{
            return res.status(400).json({
                errors: errors.array(),
                message: "No such base"
            })
        }
    }catch (e) {
        res.status(500).json({message:"Something went wrong"})
    }
});



router.delete('/remove/item', async (req, res) => {
    try {
        const id = parseInt(req.query.id);
        const base = req.query.base;
        await Bases.updateOne({_id: base}, {$pull: {"items": {uniq_Id: id}}});
        res.status(200).json({message: 'Item is removed'})
    } catch (e) {
        res.status(500).json({message: "Something went wrong"})
    }
});


router.delete('/remove/base:base', async (req, res) => {
    try {
        await Bases.deleteOne({_id: req.params.base});
        res.status(200).json({message: 'Base is removed'})
    } catch (e) {
        res.status(500).json({message: "Something went wrong"})
    }
});

router.put(
    '/update/item',
    [
        check('base', 'Min parent base length: 1').isLength({min: 1}),
        check('id', 'Min parent id length: 1').isLength({min: 1}).isNumeric(),
        check('price', 'Min name price length: 1').isLength({min: 1}).isNumeric(),
        check('qty', 'Min parent qty length: 1').isLength({min: 1}).isNumeric()
    ],
    async (req, res) => {
        try {
            const errors = validationResult(req);
            if (!errors.isEmpty()) {
                return res.status(400).json({
                    errors: errors.array(),
                    message: "Incorrect input data"
                })
            }
            const {base, id} = req.body;
            const price = Number(req.body.price);
            const qty = Number(req.body.qty);

            const check = await Bases.find({$and: [{_id: base}, {items: {$elemMatch: {uniq_Id: id}}}]});

            if (check.length === 0) {
                return res.status(400).json({
                    errors: errors.array(),
                    message: `No such item in base`
                })
            }

            await Bases.updateOne({_id: base, "items.uniq_Id":id}, {
                $set: {
                    "items.$.price": price,
                    "items.$.qty": qty,
                }
            });

            res.status(201).json({message: 'Category item is moved'})


        } catch (e) {
            res.status(500).json({message: 'Something went wrong'})
        }
    });

module.exports = router;
