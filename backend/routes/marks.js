const express = require("express");
const router = express.Router();
const Marks = require("../models/Other/Marks");

// Endpoint for updating att
// router.post("/updateAtt/:enrollmentNo", async (req, res) => {
//   try {
//     const enrollmentNo = req.params.enrollmentNo;

//     // Find the document by enrollmentNo
//     const mark = await Mark.findOne({ enrollmentNo });

//     // If the document is found, update the att field
//     if (mark) {
//       mark.att = mark.att + 1;
//       await mark.save();

//       return res.status(200).json({ success: true, message: "Att updated successfully" });
//     } else {
//       return res.status(404).json({ success: false, message: "Mark not found" });
//     }
//   } catch (error) {
//     console.error(error);
//     res.status(500).json({ success: false, message: "Internal Server Error" });
//   }
// });



router.post("/getMarks", async (req, res) => {
  try {
    let Mark = await Marks.find(req.body);
    if (!Mark) {
      return res
        .status(400)
        .json({ success: false, message: "Marks Not Available" });
    }
    const data = {
      success: true,
      message: "All Marks Loaded!",
      Mark,
    };
    res.json(data);
  } catch (error) {
    console.error(error.message);
    res.status(500).json({ success: false, message: "Internal Server Error" });
  }
});

router.post("/addMarks", async (req, res) => {
  let { enrollmentNo } = req.body;
  try {
    let Mark = await Marks.findOne({ enrollmentNo });
    if (Mark) {
      await Marks.findByIdAndUpdate(Mark._id, req.body);
      const data = {
        success: true,
        message: "Marks Added!",
      };
      res.json(data);
    } else {
      await Marks.create(req.body);
      const data = {
        success: true,
        message: "Marks Added!",
      };
      res.json(data);
    }
  } catch (error) {
    console.error(error.message);
    res.status(500).json({ success: false, message: "Internal Server Error" });
  }
});

router.delete("/deleteMarks/:id", async (req, res) => {
  try {
    let mark = await Marks.findByIdAndDelete(req.params.id);
    if (!mark) {
      return res
        .status(400)
        .json({ success: false, message: "No Marks Data Exists!" });
    }
    const data = {
      success: true,
      message: "Marks Deleted!",
    };
    res.json(data);
  } catch (error) {
    console.error(error.message);
    res.status(500).json({ success: false, message: "Internal Server Error" });
  }
});

module.exports = router;
