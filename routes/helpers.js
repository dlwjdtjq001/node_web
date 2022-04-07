// 미들웨어 함수 구현. 

exports.isLoggedIn = (req, res, next) => {
    if (req.isAuthenticated()) next(); // 로그인 되어있지 않으면 다음 미들웨어 호출
    else res.status(403).send('로그인 필요'); 
};

exports.isNotLoggedIn = (req, res, next) => {
    if (!req.isAuthenticated()) next(); //로그인 되어있으면 다음 미들웨어 호출
    else res.redirect(`/`);
};

