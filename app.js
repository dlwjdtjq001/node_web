const path = require('path');
const express = require('express');
const dotenv = require('dotenv');
const nunjucks = require("nunjucks");
const { sequelize } = require('./models');
const cookieParser = require('cookie-parser');
const session = require('express-session');
const passport = require('passport');
const passportConfig = require('./passport');

//라우팅----------------------------------------------------

const userRouter = require('./routes/user');
const authRouter = require('./routes/auth');
const studyRouter = require('./routes/study');
const communityRouter = require('./routes/community');

//----------------------------------------------------------

dotenv.config();
passportConfig(); //passport.index.js의 노출된 함수 호출


const app = express();
app.set('port', process.env.PORT || 3000);

//넌적스
nunjucks.configure(path.join(__dirname, 'front'), { 
    express: app,
}); 


//시퀼라이즈
sequelize.sync({ force: false }) //model 들을 읽어서 값을 동기화 시켜준다.
  .then(() => {console.log("디비연동성공")})
  .catch(err => console.error(err));

app.use( // 미들웨어 장착
    express.static(path.join(__dirname, 'public')), // 지정된 폴더안에 파일 있으면 파일 읽어서 응답해줌

    express.json(), // body가 json 형식인 경우 req 객체에 body 추개해줌. req.body.id
    express.urlencoded({ extended: false }), //url 파싱 req.params.id
    cookieParser(process.env.SECRET),
    session({ //세션
        resave: false,
        saveUninitialized: false,
        secret: process.env.SECRET,
        cookie: {
            httpOnly: true,
            secure: false
        },
        name: 'session-cookie'
    })
    );
app.use(passport.initialize()); //초기화 미들웨어
app.use(passport.session()); // 세션 미들웨어



//------------------라우터 미들웨어--------------
app.use('/user', userRouter); //회원가입, 관리
app.use('/auth', authRouter); //로그인, 인증
app.use('/study', studyRouter); //공부기록, 확인
app.use('/community', communityRouter);//공부관련 게시판


//------------------------------------------
//----------------------main-----------
app.get('/',(req,res)=> {
    res.render('main.html');
});
//-------------------------------------


app.listen(app.get('port'), () =>{
    console.log('5000번 포트에 연결 완료!!!');
});