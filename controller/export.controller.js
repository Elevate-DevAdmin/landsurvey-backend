const pdf = require('html-pdf');
const { default: mongoose } = require('mongoose');
const client = require('../models/client');
const job = require('../models/job');
const ratesheet = require('../models/ratesheet');
const { CLIENT_PIPELINE, JOB_PIPELINE, TASK_PIPELINE, QUOTE_PIPELINE } = require("../middleware/pipelines");
const task = require('../models/task');
const quote = require('../models/quote');

exports.exportClient = async (req, res) => {
    const { id } = req.params
    const clientData = await client.aggregate([
        {
            '$match': {
                '_id': mongoose.Types.ObjectId(id),
                'is_deleted': false
            }
        },
        ...CLIENT_PIPELINE
    ])
    res.render('Client/index', { client: clientData[0] }, (err, data) => {
        if (err) {
            res.send(err);
        } else {

            let options = {
                "height": "297mm",
                "width": "210mm",
                "border": '5mm',
                "header": {
                    "height": "5mm"
                },
                "footer": {
                    "height": "5mm",
                },
            };
            pdf.create(data, options).toFile(__dirname + `/../public/client/export/client-${clientData[0].client_num.toString().padStart(6, '0')}.pdf`, function (err, data) {
                if (err) {
                    res.send(err);
                } else {
                    res.render("Client/index", { client: clientData[0] })
                }
            });
        }
    })
}

exports.exportQuote = async (req, res) => {
    const { id } = req.params
    const quoteDate = await quote.aggregate([
        {
            '$match': {
                '_id': mongoose.Types.ObjectId(id),
                'is_deleted': false
            }
        },
        ...QUOTE_PIPELINE
    ]);
    res.render('Quote/index', { quote: quoteDate[0] }, (err, data) => {
        if (err) {
            res.send(err);
        } else {
            let options = {
                "height": "297mm",
                "width": "210mm",
                "border": '5mm',
                "header": {
                    "height": "5mm"
                },
                "footer": {
                    "height": "5mm",
                },
            };
            pdf.create(data, options).toFile(__dirname + `/../public/quote/export/quote-${quoteDate[0].number.toString().padStart(6, '0')}.pdf`, function (err, data) {
                if (err) {
                    res.send(err);
                } else {
                    res.render("Quote/index", { quote: quoteDate[0] })
                }
            });
        }
    })
}

exports.exportJob = async (req, res) => {
    const { id } = req.params
    const jobData = await job.aggregate([
        {
            '$match': {
                '_id': mongoose.Types.ObjectId(id),
                'is_deleted': false
            }
        }, { $sort: { createdAt: -1 } },
        ...JOB_PIPELINE
    ])
    res.render('Job/index', { job: jobData[0] }
        , (err, data) => {
            if (err) {
                res.send(err);
            } else {

                let options = {
                    "height": "297mm",
                    "width": "210mm",
                    "border": '5mm',
                    "header": {
                        "height": "5mm"
                    },
                    "footer": {
                        "height": "5mm",
                    },
                };
                pdf.create(data, options).toFile(__dirname + `/../public/job/export/job-${jobData[0].job_num.toString().padStart(6, '0')}.pdf`, function (err, data) {
                    if (err) {
                        res.send(err);
                    } else {
                        res.render("Job/index", { job: jobData[0] })
                    }
                });
            }
        }
    )
}

exports.exportTask = async (req, res) => {
    const { id } = req.params
    const taskData = await task.aggregate([
        {
            '$match': {
                '_id': mongoose.Types.ObjectId(id),
                'is_deleted': false
            }
        },
        ...TASK_PIPELINE
    ])
    res.render('Task/index', { task: taskData[0] }
        , (err, data) => {
            if (err) {
                res.send(err);
            } else {

                let options = {
                    "height": "297mm",
                    "width": "210mm",
                    "border": {
                        "top": "0mm",            // default is 0, units: mm, cm, in, px
                        "right": "10mm",
                        "bottom": "0mm",
                        "left": "10mm"
                    },
                    "header": {
                        "height": "0mm"
                    },
                    "footer": {
                        "height": "0mm",
                    },
                };
                pdf.create(data, options).toFile(__dirname + `/../public/task/export/task-${taskData[0].number.toString().padStart(6, '0')}.pdf`, function (err, data) {
                    if (err) {
                        res.send(err);
                    } else {
                        res.render("Task/index", { task: taskData[0] })
                    }
                });
            }
        }
    )
}

exports.exportRatesheet = async (req, res) => {
    const { id } = req.params
    const ratesheetData = await ratesheet.findById(id)
    res.render('Ratesheet/index', { ratesheet: ratesheetData }
        , (err, data) => {
            if (err) {
                res.send(err);
            } else {

                let options = {
                    "height": "297mm",
                    "width": "210mm",
                    "border": '5mm',
                    "header": {
                        "height": "5mm"
                    },
                    "footer": {
                        "height": "5mm",
                    },
                };
                pdf.create(data, options).toFile(__dirname + `/../public/ratesheet/export/ratesheet-${ratesheetData.name}.pdf`, function (err, data) {
                    if (err) {
                        res.send(err);
                    } else {
                        res.render("Ratesheet/index", { ratesheet: ratesheetData })
                    }
                });
            }
        }
    )
}