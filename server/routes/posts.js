const express = require("express");
const router = express.Router();

// get all
router.get("/", (req, resp) => {
  resp.json({ msg: "Get all" });
});

// get by id
router.get("/:id", (req, resp) => {
  resp.json({ msg: "Get by id" });
});

// post new
router.post("/", (req, resp) => {
  resp.json({ msg: "Post new" });
});

// post new
router.delete("/:id", (req, resp) => {
  resp.json({ msg: "Delete by id" });
});

// post new
router.patch("/:id", (req, resp) => {
  resp.json({ msg: "Update by id" });
});

module.exports = router;
