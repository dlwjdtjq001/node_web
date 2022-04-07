const express = require('express');
const passport = require('passport');
const router = express.Router(); 



// user/login
router.get('/login',(req,res,next)=>{
    res.render("login.html");
})
router.post('/login', (req, res, next) => {

    passport.authenticate('local', (authError, user, info) => { // 로컬 전략 수행
        if (user) req.login(user, loginError => res.redirect('/')); 
        else next(`로그인 실패!`);
    })(req, res, next); // 미들웨어 장착 함으로써 요청객체 사용가능
});

router.get('/logout', (req, res) => { 
    req.logout(); //passport.intialize()미들웨어 
    req.session.destroy(); //세션 삭제
    res.redirect('/'); // 리다이렉트
});



module.exports = router;

