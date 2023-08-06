import AuthenticationService from "../../services/authService.js";
import UserService from "../../services/userService.js";
import Thesis from "../../utils/Thesis.js";
import { catchAsyncHandle } from "../../utils/authentication.js";

export const signUp = catchAsyncHandle(async function (req,res,next){
    const user = await UserService.createUser({
        username: req.body.username,
        email: req.body.email,
        password: req.body.password,
        birth: req.body.birth
    });

    console.log(user);
    const accessToken = AuthenticationService.createAccessToken(user._id, process.env.JWT_ACTIVE_EXPIRY);
    const refreshToken = AuthenticationService.createRefreshToken(user._id, process.env.JWT_REFRESH_EXPIRY);

    res.cookie('jwtAccess', accessToken, {
        expiresIn: new Date(
            Date.now() + process.env.JWT_ACTIVE_EXPIRY * 1000 * 60 * 60 * 24 // Convert from days to milliseconds *1000ms to 1s *60 to 1m *60 to 1h * 24 to 1d
        ),
        httpOnly: true,
        secure: (process.env.NODE_ENV === 'production') ? true : false,
        sameSite: 'strict',
    });

    res.cookie('jwtRefresh', refreshToken, {
        expiresIn: new Date(
            Date.now() + process.env.JWT_REFRESH_EXPIRY * 1000 * 60 * 60 * 24 // Convert from days to milliseconds *1000ms to 1s *60 to 1m *60 to 1h * 24 to 1d
        ),
        httpOnly: true,
        secure: (process.env.NODE_ENV === 'production') ? true : false,
        sameSite: 'strict',
    })

    console.log(accessToken, ' ', refreshToken);

    user.password = undefined;

    res.status(201).json({
        status: 'success',
        accessToken: accessToken,
        refreshToken: refreshToken,
        data: {
            user: user,
        }
    });

});

export const login = catchAsyncHandle(async function (req, res, next){
    const email = req.body.email;
    const password = req.body.password;

    const user = await UserService.findByEmail(email);

    console.log(user);

    res.status(200).json({
        status: 'success',
        data:{
            user: user
        }
    });
});

export const refresh = catchAsyncHandle(async function (req, res, next){
    const refreshToken = req.cookies.jwtRefresh;
    const accessToken = req.cookies.jwtAccess;

    const decodedAccess = await AuthenticationService.decode(accessToken);

    if (decodedAccess && Date.now() >= decodedAccess.iat * 1000)
    {
        res.status(400).json({
            'status': 'fail',
            'error': 'Cannot refresh access token if access token has not expired!'
        });
        next();
    }

    const decodedRefreshToken = await AuthenticationService.verif(refreshToken);

    const newAccessToken = AuthenticationService.createAccessToken(req.user._id, process.env.JWT_ACTIVE_EXPIRY);

    res.cookie('jwtAccess', newAccessToken, {
        expiresIn: new Date(
            Date.now() + process.env.JWT_ACTIVE_EXPIRY * 1000 * 60 * 60 * 24 // Convert from days to milliseconds *1000ms to 1s *60 to 1m *60 to 1h * 24 to 1d
        ),
        httpOnly: true,
        secure: (process.env.NODE_ENV === 'production') ? true : false,
        sameSite: 'strict',
    });

    res.status(201).json({
        'status': 'success',
        accessToken: newAccessToken,
    });
});