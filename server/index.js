const express = require("express")
const app = express();
const cookieParser = require("cookie-parser")
const cors = require("cors")
const { cloudinaryConnect } = require("./config/cloudinary")
const fileUpload = require("express-fileupload");
const dotenv = require("dotenv");
const connectDB = require("./config/db")


const authRoutes = require("./routes/authRoute")
const imageRoute = require("./routes/imageRoute");
const adminRoutes = require("./routes/adminAccess")

dotenv.config();

const PORT = process.env.PORT || 8080
connectDB();



// middleware 
app.use(express.json())
app.use(cookieParser());
app.use(cors({
  origin: "*",
  credentials: true,
}))

app.use(
  fileUpload({
    useTempFiles: true,
    tempFileDir: "/tmp"
  })
)

// cloudinary connect 
cloudinaryConnect();


// routes  
app.use("/api/v1/auth", authRoutes)
app.use("/api/v1/admin", adminRoutes)
app.use("/api/v1/image", imageRoute);
app.use("/api/v1/contact", require("./routes/contact"));
app.use("/api/v1/gallery", require("./routes/galleryRoute"))
app.use("/api/v1/company", require("./routes/companyRoute"))
app.use("/api/v1/group", require("./routes/groupRoute"))
app.use("/api/v1/ledger", require("./routes/ledgerRoute"))





// default route 
app.get("/", (req, res) => {
  return res.json({
    success: true,
    message: "Your server is up and running ..."
  })
})

app.listen(PORT, () => {
  console.log(`Server is running at port no ${PORT}`)
})
