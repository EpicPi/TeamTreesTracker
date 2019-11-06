// Your web app's Firebase configuration
var firebaseConfig = {
    apiKey: "AIzaSyBCchaKsJuhA8ftqeUi8ybTxwFXJ0zzYOw",
    authDomain: "teamtrees.firebaseapp.com",
    databaseURL: "https://teamtrees.firebaseio.com",
    projectId: "teamtrees",
    storageBucket: "teamtrees.appspot.com",
    messagingSenderId: "952280609558",
    appId: "1:952280609558:web:da8552cdf82d074d805637",
    measurementId: "G-09Q991QMMN"
};
// Initialize Firebase
firebase.initializeApp(firebaseConfig);

var db = firebase.firestore();

var d = new Date();
var seconds = Math.round(d.getTime() / 1000);
var i = 0;
var hourData = [];
db.collection("minute")
    .where("time_stamp", ">", new firebase.firestore.Timestamp(seconds - 3600, 0))
    .orderBy("time_stamp", "desc")
    .get()
    .then(function (querySnapshot) {
        querySnapshot.forEach(function (doc) {
            hourData.push(doc.data().count);
        });
        hourData = hourData.reverse();

        new Chart(document.getElementById("myChart"),
            {
                type: "line",
                data: {
                    labels: [...Array(60).keys()].map(x => "t-" + x).reverse(),
                    datasets: [{
                        data: hourData.map(x => x / 1000000),
                        borderColor: '#34eb86',
                        backgroundColor: '#61755d'
                    }],

                },
                options: {
                    maintainAspectRatio: false,
                    legend: {
                        display: false
                    },
                    tooltips: {
                        callbacks: {
                            label: function (tooltipItem) {
                                return tooltipItem.yLabel;
                            }
                        }
                    },
                    scales: {
                        yAxes: [{
                            scaleLabel: {
                                display: true,
                                labelString: 'Millions of Dollars'
                            }
                        }],
                        xAxes: [{
                            scaleLabel: {
                                display: true,
                                labelString: 'T-minus timestamps'
                            }
                        }]
                    }
                }
            });
        hourDeltaData = []
        for (var i = 1; i < hourData.length; i++)  hourDeltaData.push(hourData[i] - hourData[i - 1]);
        var diffMs = new Date('01-01-2020') - new Date();
        var diffMins = Math.round(diffMs / 60000);
        new Chart(document.getElementById("myDeltaChart"),
            {
                type: "bar",
                data: {
                    labels: [...Array(59).keys()].map(x => "t-" + (x + 1)).reverse(),
                    datasets: [{
                        data: hourDeltaData,
                        label: "Current Donations",
                        borderColor: '#34eb86',
                        backgroundColor: '#61755d'
                    }, {
                        data: [...Array(60).keys()].map(x => (20000000 - hourData[59]) / diffMins),
                        label: "Rate to Reach Goal",
                        type: "line"
                    }],

                },
                options: {
                    maintainAspectRatio: false,
                    scales: {
                        yAxes: [{
                            scaleLabel: {
                                display: true,
                                labelString: 'Dollars'
                            }
                        }],
                        xAxes: [{
                            scaleLabel: {
                                display: true,
                                labelString: 'T-minus timestamps'
                            }
                        }]
                    }
                }
            });
    })
    .catch(function (error) {
        console.log("Error getting documents: ", error);
    });
dayData= [];
db.collection("hour")
    .orderBy("time_stamp", "asc")
    .limit(24)
    .get()
    .then(function (querySnapshot) {
        querySnapshot.forEach(function (doc) {
            dayData.push(doc.data().count);
        });
        new Chart(document.getElementById("myDayChart"),
            {
                type: "line",
                data: {
                    labels: [...Array(24).keys()].map(x => "t-" + x).reverse(),
                    datasets: [{
                        data: dayData.map(x => x / 1000000),
                        borderColor: '#34eb86',
                        backgroundColor: '#61755d'
                    }],

                },
                options: {
                    maintainAspectRatio: false,
                    legend: {
                        display: false
                    },
                    tooltips: {
                        callbacks: {
                            label: function (tooltipItem) {
                                return tooltipItem.yLabel;
                            }
                        }
                    },
                    scales: {
                        yAxes: [{
                            scaleLabel: {
                                display: true,
                                labelString: 'Millions of Dollars'
                            }
                        }],
                        xAxes: [{
                            scaleLabel: {
                                display: true,
                                labelString: 'T-minus timestamps'
                            }
                        }]
                    }
                }
            });
    })
    .catch(function (error) {
        console.log("Error getting documents: ", error);
    });