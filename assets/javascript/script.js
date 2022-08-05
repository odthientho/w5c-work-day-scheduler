var currentDay = moment().format("dddd, MMMM Do");
$('#currentDay').text(currentDay);

var scheduler = $('#hourly-block');

// insert a new row to the schedule
function insertNewRow(hour, task) {

    var timeCol = $('<input>');
    timeCol.attr('class', 'hour');
    timeCol.attr('readonly','readonly');
    timeCol.val(hour);

    var taskCol = $('<textarea>');
    taskCol.text(task);

    var saveCol = $('<button>');
    saveCol.attr('class', 'saveBtn');
    saveCol.text("save");

    var newRow = $('<li>');
    newRow.attr('class', 'time-block');
    newRow.attr('class', 'row');

    newRow.append(timeCol);
    newRow.append(taskCol);
    newRow.append(saveCol);

    scheduler.append(newRow);
}

function showScheduler() {
    var currentScheduler = JSON.parse(localStorage.getItem("schedulingData"));
    currentScheduler.forEach(eachHour => {
        insertNewRow(eachHour.hour, eachHour.task);
    });
}

function refreshScheduler() {
    var newBlankScheduler = [
        {hour: "09 AM", task: ""},
        {hour: "10 AM", task: ""},
        {hour: "11 AM", task: ""},
        {hour: "12 PM", task: ""},
        {hour: "01 PM", task: ""},
        {hour: "02 PM", task: ""},
        {hour: "03 PM", task: ""},
        {hour: "04 PM", task: ""},
        {hour: "05 PM", task: ""}
    ]
    localStorage.setItem("dataDate", currentDay);
    localStorage.setItem("schedulingData", JSON.stringify(newBlankScheduler));
}

function updateScheduler(hour, task) {
    var currentScheduler = JSON.parse(localStorage.getItem("schedulingData"));
    currentScheduler.forEach(eachHour => {
        if (eachHour.hour == hour) {
            eachHour.task = task;
        }
    });
    localStorage.setItem("schedulingData", JSON.stringify(currentScheduler));
}

scheduler.on('click', '.saveBtn', function(event) {
    var hourlyTask = $(event.target).parent();

    var hour = hourlyTask.children().eq(0).val();
    var task = hourlyTask.children().eq(1).val();

    updateScheduler(hour, task);
});

function init() {
    var dataDate = localStorage.getItem("dataDate");
    if (dataDate === null || dataDate != currentDay) refreshScheduler();
    showScheduler();
}

init();