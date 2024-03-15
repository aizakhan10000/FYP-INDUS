const mongoose = require("mongoose");
const bcrypt = require("bcryptjs");

const RadiologistSchema= new mongoose.Schema({
    name: {
        type: String,
        require: true,
    },
    hospitalID: {
        type: Number,
        require: true,
    },
    username: {
        type: String,
        require: true,

    },
    password: {
        type: String,
        require: true,
    }

});

RadiologistSchema.pre("save",function(next){
    console.log(this.password)
    this.password=bcrypt.hashSync(this.password,10);
    next();
});

const Radiologist= mongoose.model("radiologist",RadiologistSchema);

module.exports=Radiologist;