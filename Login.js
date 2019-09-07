const Login = {
    login: (req, res) => {
        let username = req.body.username;
        let password = req.body.password;
        let role = '';
        let area = '';
        let flag = false;
        console.log(username, password);
        if (username.indexOf('trainer') != -1 && username === password) {
            role = 'trainer';
            for (let i = 0; i < req.trainers.length; i++) {
                if(username === req.trainers[i].name) {
                    area = req.trainers[i].inchargeOf;
                    break;
                }
            }
            flag = true;
        }
        else if (username.indexOf('user') != -1 && username === password) {
            role = 'user';
            flag = true;
        }
        console.log("AREA: ", area);
        if (!flag) {
            return res.json({
                success: false,
                message: 'User Login Failed!'
            });
        }
        return res.json({
            success: true,
            loginResponse: { role, area },
            message: 'User Logged in successfully!'
        });
    }
}

module.exports = Login;