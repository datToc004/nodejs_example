import res from "express/lib/response";
import db from "../models/index";
import CRUDService from "../services/CRUDService";

let getHomePage = async (req, res) => {
    try {
        let data = await db.User.findAll();

        return res.render("homepage.ejs", {
            data: JSON.stringify(data),
        });
    } catch (e) {
        console.log(e);
    }
};

let getAboutPage = (req, res) => {
    return res.render("test/about.ejs");
};

let getCRUD = (req, res) => {
    return res.render("crud.ejs");
};

let postCRUD = async (req, res) => {
    console.log(req.body);
    let mess = await CRUDService.createNewUser(req.body);
    console.log(mess);
    return res.send("crud post");
};

let displayCRUD = async (req, res) => {
    let data = await CRUDService.getAllUser();

    return res.render("displayCRUD.ejs", {
        data: data,
    });
};

let getEditCRUD = async (req, res) => {
    let userId = req.query.id;
    if (userId) {
        let userData = await CRUDService.getUserById(userId);

        return res.render("editCRUD.ejs", {
            user: userData,
        });
    } else {
        return res.send("users not found");
    }
};

let putCRUD = async (req, res) => {
    let data = req.body;
    let allUsers = await CRUDService.updateUser(data);

    return res.redirect("/get-crud");
};

let deleteCRUD = async (req, res) => {
    let id = req.query.id;
    if (id) {
        await CRUDService.deleteUser(id);

        return res.send("Delete the user success");
    } else {
        return res.send("user not found");
    }
};

module.exports = {
    getHomePage: getHomePage,
    getAboutPage: getAboutPage,
    getCRUD: getCRUD,
    postCRUD: postCRUD,
    displayCRUD: displayCRUD,
    getEditCRUD: getEditCRUD,
    putCRUD: putCRUD,
    deleteCRUD: deleteCRUD,
};
