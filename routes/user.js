const express = require('express');
const User = require('../models/user');
const bcrypt = require('bcrypt')

const router = express.Router(); 

//user 메인

//리스트 확인 
router.get('/list', async (req, res, next) => { 
    try {
        const uList = await User.findAll({
            attributes: ['id', 'name']
        }); 
        res.locals.uList  = uList ;
        res.render('userList.html');
    } catch (err) {
        console.error(err);// 에러
        next(err);
    }
});

router.get('/delete', async (req, res, next) => { 
    try {
        const result = await User.destroy({ // 삭제
            where: { id: req.user.id }
        });
        if (result) res.redirect('/');

    } catch (err) {
        console.error(err);// 에러
        next(err);
    }
});



router.route('/') // 동일한 주소 get post 사용 localhost:5000/user
    .get(async (req, res, next) => {
        try {
            res.render('signup.html'); 
        } catch (err) {
            console.error(err);
            next(err);
        }
    })
    //user.signup post 회원가입
    .post(async (req, res, next) => {
        if (!req.body.password) return next('비밀번호를 입력하세요.');

        const user = await User.findOne({ where: { id: req.body.id } });
        if (user) {
            next('이미 등록된 사용자 아이디입니다.');
            return;
        }

        try {
            const hash = await bcrypt.hash(req.body.password, 12); // 해시함수 암호화 ( 복호화는 불가능)
            await User.create({
                id: req.body.id, 
                name: req.body.name,
                password: hash,
            });
            res.redirect('/');
        } catch (err) {
            console.error(err);
            next(err);
        }
    });




module.exports = router;

