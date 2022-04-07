const path = require('path');
const express = require('express');
const Study = require('../models/study');
const { isLoggedIn } = require('./helpers');


const router = express.Router();

router.route('/create')
    .get(isLoggedIn, (req, res) => { // 로그인 되어있는 상태
        res.render('study.html'); // comment.js 랜더링
    })
    .post(async (req, res, next) => {
        try {
            await Study.create({ 
                userId: req.user.id,
                subject: req.body.subject, 
                time: req.body.time
             }); //study db테이블 생성
            res.redirect('/study'); //리다이렉션
        } catch (err) { //에러
            console.error(err);
            next(err);
        }
    });

    router.get('/', async (req, res, next) => { 
        try {
            const studies = await Study.findAll({
                where: {userId: req.user.id,},
                attributes: ['subject', 'time']
            }); 
            const key = studies.map(x => x.subject);
            const value = studies.map(x => x.time);
            res.locals.key = key;
            res.locals.value = value;
            res.render('chart.html');
        } 
        catch (err) {
            console.error(err);// 에러
            next(err);
        }
    });

    router.route('/update')
    .get(isLoggedIn, (req, res) => { // 로그인 되어있는 상태 , 겟방식
        res.render('studyUpdate.html'); // studyUpdate.html 랜더링
    })
    .post(async (req, res, next) => { // 포스트방식

        try {
            const studyTime = await Study.findOne({ //studyTime에 Study테이블에서 user객체 아이디값과 과목명 일치하는 부분 탐색.
                where: 
                {
                userId: req.user.id, // 아이디
                subject: req.body.subject // 과목
                },
            });
            const sub = parseInt(req.body.time) + parseInt(studyTime.time) // 폼을 통해 전달받은 시간값과 탐색한 study 테이블의 해당 과목 시간의 합
            if(studyTime){ // 과목명, userId와 쿠키세션을 통해 전달받은 아이디값이 일치 하는 부분이 있는 경우
                await Study.update( //Study db테이블 업데이트
                    {
                    time: sub //총 공부한 시간
                    },
                    {where:
                    {
                    userId: req.user.id, //로그인한 아이디값
                    subject: req.body.subject // 폼으로 전달받은 과목명
                    },
                });
            }
            res.redirect('/study'); // 차트 출력 페이지로 리다이렉트
        } catch (err) { //에러
            console.error(err);
            next(err);
        }
    });

    router.get('/delete/:id', async (req, res, next) => {  // id값에 과목
        try {
            const result = await Study.destroy({ // 삭제
                where: 
                { 
                    subject: req.params.id ,
                    userId: req.user.id,
                }
            });
            if (result) res.redirect('/study');
    
        } catch (err) {
            console.error(err);// 에러
            next(err);
        }
    });



module.exports = router;
