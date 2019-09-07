const express = require('express'),
    bodyParser = require('body-parser'),
    router = express.Router(),
    http = require('http'),
    socketio = require('socket.io'),
    cors = require('cors');

const app = express();

const port = process.env.PORT || 5000;

const LoginController = require('./Login');

const WorkoutController = require('./Workouts');

const server = http.createServer(app);

const websocket = socketio(server);

app.use(cors());

app.use(bodyParser.json({ limit: '500mb' }));

app.use(bodyParser.urlencoded({ limit: '500mb', extended: true }));

app.use('/api', router);

app.get('/ping', (req, res) => {
    console.log(req.path);
    return res.send('pong');
});

app.get('/', (req, res) => {
    console.log('works');
    return res.send('Works')
});

websocket.on('connection', (socket) => {

    socket.on('joined', (userId) => console.log(userId, ' Joined'));
    socket.on('message', (message) => console.log(message));
    // setTimeout(() => {
    //     socket.emit('check_in_event', 'blah' );
    // },4500);
    socket.on('check_in_event', (obj) => {
        console.log("AREA N UID: ", obj.area, obj.username);

        websocket.emit('check_in_event', obj);

    });

});

let workOutList = [
    {
        area: 'area1',
        userIdList: []
    },
    {
        area: 'area2',
        userIdList: []
    },
    {
        area: 'area3',
        userIdList: []
    }
];

let users = [
    {
        name: 'user1',
        checkedInTo: ''
    },
    {
        name: 'user2',
        checkedInTo: ''
    },
    {
        name: 'user3',
        checkedInTo: ''
    },
    {
        name: 'user4',
        checkedInTo: ''
    },
    {
        name: 'user5',
        checkedInTo: ''
    },
    {
        name: 'user6',
        checkedInTo: ''
    },
    {
        name: 'user7',
        checkedInTo: ''
    },
    {
        name: 'user8',
        checkedInTo: ''
    },
    {
        name: 'user9',
        checkedInTo: ''
    },
    {
        name: 'user0',
        checkedInTo: ''
    }
];

let trainers = [
    {
        name: 'trainer1',
        inchargeOf: 'area1'
    },
    {
        name: 'trainer2',
        inchargeOf: 'area2'
    },
    {
        name: 'trainer3',
        inchargeOf: 'area3'
    }
];

router.route('/login').post((req, res) => {
    req.trainers = trainers;
    LoginController.login(req, res);
});

router.route('/workOutList').post((req, res) => {
    req.workOutList = workOutList;
    WorkoutController.getListOfAllWorkouts(req, res);
});

router.route('/userList').post((req, res) => {
    req.users = users;
    WorkoutController.getListOfUsers(req, res);
});

router.route('/checkIn').post((req, res) => {
    req.workOutList = workOutList;
    req.users = users;
    WorkoutController.checkIn(req, res);
});

server.listen(port, () => console.log(`Server up and running on port ${port}!`));
