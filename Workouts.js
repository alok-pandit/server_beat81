const Workouts = {

    getListOfAllWorkouts: (req, res) => {
        return res.json({
            data: req.workOutList,
            success: true
        });

    },

    getListOfUsers: (req, res) => {

        console.log(req.body.area, req.users);

        let users = [];

        for (let i = 0; i < req.users.length; i++) {

            if (req.users[i].checkedInTo === req.body.area) {

                users.push(req.users[i]);

            }

        }

        return res.json({
            users,
            success: true
        });

    },

    checkIn: (req, res) => {

        let userId = req.body.userId;
        let area = req.body.area;

        for (let i = 0; i < req.users.length; i++) {
            if (req.users[i].name === userId) {
                req.users[i].checkedInTo = area;
                break;
            }
        }

        for (let i = 0; i < req.workOutList.length; i++) {
            if (req.workOutList[i].area === area) {
                req.workOutList[i].userIdList.push(userId);
                break;
            }
        }

        return res.json({
            success: true,
            data: req.workOutList
        });

    }

}

module.exports = Workouts;