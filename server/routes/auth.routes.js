const router = require("express").Router();
const {
    signup,
    login,
    profile,
    imageUpload,
    allImages,
} = require("../controllers/auth.controllers");
router.post("/signup",signup);
router.post("/login",login);
router.get("/profile", profile);
router.post("/image", imageUpload);
router.get("/images/all", allImages);
module.exports = router;
