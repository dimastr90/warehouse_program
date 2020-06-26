const {Router} = require('express');
const Categories = require('../models/Categories');
const Services = require('../models/Services');
const router = Router();
const {check, validationResult} = require('express-validator');


router.put(
    '/put/',
    [
        check('category', 'Min parent category length: 1').isLength({min: 1}),
        check('name', 'Min name name length: 1').isLength({min: 1}),
        check('price', 'Min parent price length: 1').isLength({min: 1}).isNumeric()
    ],
    async (req, res) => {
        try {
            const errors = validationResult(req);
            if (!errors.isEmpty()) {
                return res.status(400).json({
                    errors: errors.array(),
                    message: "Incorrect category data"
                })
            }
            const {category, name} = req.body;
            const price = Number(req.body.price);

            const check = await Categories.find({$and: [{_id: category}, {items: {$elemMatch: {name: name}}}]});
            if (check.length > 0) {
                return res.status(400).json({
                    errors: errors.array(),
                    message: "Category is exist"
                })
            }

            const newId = await Services.findOne({_id:"uniqIdCreator"});
            await Services.updateOne({_id:"uniqIdCreator"}, {$set:{freeId:++newId.freeId}});


            await Categories.updateOne({_id: category}, {
                $push: {
                    items: {
                        uniq_Id:newId.freeId,
                        category,
                        name,
                        price
                    }
                }
            });

            res.status(201).json({message: 'Category item is added'})


        } catch (e) {
            res.status(500).json({message: 'Something went wrong'})
        }
    });


router.get('/get/all', async (req, res) => {
    try {
        const data = await Categories.find();
        await res.json(data);
    } catch (e) {
        res.status(500).json({message: "Something went wrong"})
    }
});



router.get('/getitems/', async (req, res) => {
    try {
        const data = await Categories.find();
        let result = data.reduce((accum, i)=> {return [...accum,...i.items]},[]);
        await res.json(result);
    } catch (e) {
        res.status(500).json({message: "Something went wrong"})
    }
});






router.delete('/delete', async (req, res) => {
    try {
        const id=parseInt(req.query.id);
        const cat=req.query.cat;
        await Categories.updateOne({_id:cat}, { $pull: { "items" : { uniq_Id: id } } });
        res.status(200).json({message: 'Category item is removed'})
    } catch (e) {
        res.status(500).json({message: "Something went wrong"})
    }
});


router.put(
    '/replace/',
    [
        check('id', 'Min parent id length: 1').isLength({min: 1}).isNumeric(),
        check('category', 'Min parent category length: 1').isLength({min: 1}),
        check('name', 'Min name name length: 1').isLength({min: 1}),
        check('price', 'Min parent price length: 1').isLength({min: 1}).isNumeric()
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
            const {id, category, name, price, oldCat} = req.body;

            const check = await Categories.find({$and: [{_id: category}, {items: {$elemMatch: {name: name}}}]});

            if (check.length > 0) {
                return res.status(400).json({
                    errors: errors.array(),
                    message: `Item is already exist in category`
                })
            }

            await Categories.updateOne({_id:oldCat}, { $pull: { "items" : { uniq_Id: id } } });


            await Categories.updateOne({_id: category}, {
                $push: {
                    items: {
                        uniq_Id:id,
                        category,
                        name,
                        price
                    }
                }
            });

            res.status(201).json({message: 'Category item is moved'})


        } catch (e) {
            res.status(500).json({message: 'Something went wrong'})
        }
    });


router.put(
    '/rename/item',
    [
        check('id', 'Min parent id length: 1').isLength({min: 1}).isNumeric(),
        check('category', 'Min parent category length: 1').isLength({min: 1}),
        check('name', 'Min name name length: 1').isLength({min: 1}),
        check('price', 'Min parent price length: 1').isLength({min: 1}).isNumeric()
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
            const {id, category, name, oldCat} = req.body;
            const price = Number(req.body.price);

            const check = await Categories.find({$and: [{_id: category}, {items: {$elemMatch: {uniq_Id: id}}}]});

            if (check.length === 0) {
                return res.status(400).json({
                    errors: errors.array(),
                    message: `Internal error. Item not find in base`
                })
            }

            await Categories.updateOne({_id:oldCat}, { $pull: { "items" : { uniq_Id: id } } });


            await Categories.updateOne({_id: category, "items.uniq_Id":id}, {
                $set: {
                    "items.$.name": name,
                    "items.$.price": price,
                }
            });

            res.status(201).json({message: 'Item data is renamed'})


        } catch (e) {
            res.status(500).json({message: 'Something went wrong'})
        }
    });



module.exports = router;