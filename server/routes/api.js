const express = require('express');
const router = express.Router();
const cors = require('cors');

// Allow router to use these library
router.use(cors());
router.use(express.json());
router.use(express.urlencoded({ extended: true }));

// router.use("/auth", require("./auth/auth"));
// router.use("/app", require("./application/application"));
// router.use("/bucket", require("./Util/bucket"));
// router.use("/page", require("./page/page"));
// router.use("/organization", require("./organization/organization"));
// router.use("/crypto", require("./crypto/crypto"));


router.post('/get-count', async (req, res) => {
    const { count } = req.body;
    try {
        console.log(`Number Received: ${count}`)
        
        if (isNaN(count)) {
            return res.status(400).json("Invalid input. Please provide a valid number");
        }

        const number = parseInt(count)

        let result;
        if (number % 2 === 0) {
            result = "even";
        }  else {
            result = "odd";
        }

        return  res.status(200).send({ result });
    } catch (err) {
        console.error(err.message);
        res.status(500).json("Server Error");
    }
});

// For connection testing purpose, PLEASE DO NOT REMOVE
router.get('/', async (req, res) => {
    try {
        res.json("API");
    } catch (err) {
        console.error(err.message);
        res.status(500).json("Server Error");
    }
});

module.exports = router;