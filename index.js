"use strict";

const express = require("express");
const bodyParser = require("body-parser");
const app = express();

const {
    dialogflow,
    BasicCard,
    Image,
    Button,
    Suggestions,
    LinkOutSuggestion,
    Carousel,
    Table,
    List
} = require("actions-on-google");

const assistant = dialogflow({ debug: true });

const { ExerciseList } = require("./helpers/exercises");

app.use(bodyParser.json({ type: "application/json" }));
app.use(bodyParser.urlencoded({ extended: true }));

// Default Welcome Intent
assistant.intent("Default Welcome Intent", conv => {
    conv.ask(
        "Hello Welcome to your 30 Day Fitness Chalenge. Are you ready to start your fitness goals ?"
    );
});

// Yes Intent if the user is ready to start fitness challenge
assistant.intent("ReadyToStartIntent", conv => {
    let list = [];
    let finTable = [];
    conv.ask(
    );
    let dayOne = ExerciseList.DayOne;
    let n = ExerciseList.DayOne.length;
    console.log("DayOne", dayOne);
    for (let i = 0; i < n; i++) {
        list.push({
            name: ExerciseList.DayOne[i].item,
            count: ExerciseList.DayOne[i].count
        });
        console.log("DayOne", list[0]);
        console.log('>>>>>>', list[0].name)
        finTable.push([list[i].name, `${list[i].count}`]);
        console.log('finTable', finTable)
    }
    const ssml =
        '<speak>' +
        `${list[0].name}<break time="1" />` +
        `${list[1].name}<break time="1" />` +
        `${list[2].name}<break time="1" />` +
        `${list[3].name}<break time="1" />` +
        '</speak>';
    conv.ask('Great! CheerUp let`s start your day and acheive your fitness goals. Here is your Day1 set of exercises');
    conv.ask(ssml);
    conv.ask(new Table({
        title: 'List of Exercises',
        dividers: true,
        columns: ['Exercise', 'Count'],
        rows: finTable
    }))
    conv.contexts.set('exercise-yes',2);
});

// Starting Exercise Intent
assistant.intent('ExerciseIntent', conv => {
    const context = conv.contexts.get('exercise-yes');
    console.log('context',context);
    const ssml =
    '<speak>' +
    `Ok Here you go with the First Exercise of Squats. Let's get started <break time="1" />`+
    `1<break time="1" />` +
    `2<break time="1.5" />` +
    `3<break time="1.5" />` +
    `4<break time="1.5" />` + 
    `5<break time="1.5" />` +
    `6<break time="1.5" />` +
    `7<break time="1.5" />` +
    `8<break time="1.5" />` +
    `9<break time="1.5" />` +
    `10<break time="1" />`+
    `Let's take a break for 5 seconds <break time="6" />`+
    `Lets go with the Second Exercise of WallPushups <break time="1.5" />`+    
    `1<break time="1.5" />` +
    `2<break time="1.5" />` +
    `3<break time="1.5" />` +
    `4<break time="1.5" />` + 
    `5<break time="1.5" />` +
    `6<break time="1.5" />` +
    `7<break time="1.5" />` +
    `8<break time="1.5" />` +
    `9<break time="1.5" />` +
    `10<break time="1" />`+
    `Let's take a break for 5 seconds <break time="6" />`+ 
    `Moving on to the Third Exercise of Left Side Lying Leg <break time="1.5" />`+    
    `1<break time="1.5" />` +
    `2<break time="1.5" />` +
    `3<break time="1.5" />` +
    `4<break time="1.5" />` + 
    `5<break time="1.5" />` +
    `6<break time="1.5" />` +
    `7<break time="1.5" />` +
    `8<break time="1.5" />` +
    `9<break time="1.5" />` +
    `10<break time="1" />`+
    `Let's take a break for 5 seconds <break time="6" />`+
    `Moving on to the Fourth Exercise of Right Side Lying Leg <break time="1.5" />`+    
    `1<break time="1.5" />` +
    `2<break time="1.5" />` +
    `3<break time="1.5" />` +
    `4<break time="1.5" />` + 
    `5<break time="1.5" />` +
    `6<break time="1.5" />` +
    `7<break time="1.5" />` +
    `8<break time="1.5" />` +
    `9<break time="1.5" />` +
    `10<break time="2" />`+
    `Congratulations you have burned 150 calories. Keep doing it. See you back tomorrow. Good Day`+    
    '</speak>';
    conv.ask(ssml);
    conv.close();
})

// Main Route
app.post("/", assistant);

app.get("/", (req, res) => {
    res.send("server running");
});

app.listen(process.env.PORT || 6000, function () {
    console.log("Express app started on port 6000");
});
