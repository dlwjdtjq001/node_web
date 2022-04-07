const path = require('path');
const express = require('express');
const Community = require('../models/community');
const { isLoggedIn } = require('./helpers');

const router = express.Router();

router.route('/create')
    .get(isLoggedIn, (req, res) => { // 로그인 되어있는 상태
        res.render('community.html'); // community.html 랜더링
    })
    .post(async (req, res, next) => {
        try {
            await Community.create({ 
                userId: req.user.id,
                title: req.body.title, 
                description: req.body.description
             }); //study db테이블 생성
            res.redirect('/'); //리다이렉션
        } catch (err) { //에러
            console.error(err);
            next(err);
        }
    });

    router.get('/delete/:id',async (req, res, next) => {  // id값에 과목
        try {
            const result = await Community.destroy({ // 삭제
                where: 
                { 
                userId: req.user.id,
                title: req.params.id
                }
            });
            if (result) res.redirect('/community');
    
        } catch (err) {
            console.error(err);// 에러
            next(err);
        }
    });

    router.route('/update')
    .get(isLoggedIn, (req, res) => { // 로그인 되어있는 상태
        res.render('communityUpdate.html'); // study.js 랜더링
    })
    .post(async (req, res, next) => {
        try {
            const result = await Community.update({
                description: req.body.description
            }, {
                where:
                 { 
                    userId: req.user.id,
                    title: req.body.title,
                 }
            });
    
            if (result) res.redirect('/community');
            else next('Not updated!')
        } catch (err) {
            console.error(err);
            next(err);
        }
    });


    router.get('/', async (req, res, next) => { 
        try {
            const edit = await Community.findAll({
                attributes: ['id','title', 'description','userId']
            }); 
        
            res.locals.edit  = edit ;
            res.render('communityMain.html');
        } 
        catch (err) {
            console.error(err);// 에러
            next(err);
        }
    });



module.exports = router;
