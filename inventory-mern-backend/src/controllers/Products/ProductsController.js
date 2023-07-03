const DataModel = require("../../models/Products/ProductsModel");
const CreateService = require("../../services/common/CreateService");
const UpdateService = require("../../services/common/UpdateService");
const ListTwoJoinService = require("../../services/common/ListTwoJoinService");
const mongoose = require("mongoose");
const CheckAssociateService = require("../../services/common/CheckAssociateService");
const SaleProductsModel = require("../../models/Sales/SaleProductsModel");
const PurchaseProductsModel = require("../../models/Purchases/PurchaseProductsModel");
const ReturnProductsModel = require("../../models/Returns/ReturnProductsModel");
const DeleteService = require("../../services/common/DeleteService");
const DetailsByIDService = require("../../services/common/DetailsByIDService");
const DropDownService = require("../../services/common/DropDownService");


exports.CreateProducts=async (req, res) => {
    let Result= await CreateService(req,DataModel);
    res.status(200).json(Result)
}

exports.UpdateProducts=async (req, res) => {
    let Result=await UpdateService(req,DataModel)
    res.status(200).json(Result)
}

exports.ProductsList=async (req, res) => {
    let SearchRgx = {"$regex": req.params.searchKeyword, "$options": "i"}
    let JoinStage1={$lookup: {from: "brands", localField: "BrandID", foreignField: "_id", as: "brands"}};
    let JoinStage2= {$lookup: {from: "categories", localField: "CategoryID", foreignField: "_id", as: "categories"}};
    let SearchArray=[{Name: SearchRgx},{Unit: SearchRgx},{Details: SearchRgx},{'brands.Name':SearchRgx},{'categories.Name':SearchRgx}]
    let Result=await ListTwoJoinService(req,DataModel,SearchArray,JoinStage1,JoinStage2);
    res.status(200).json(Result)
}


exports.ProductsDetailsByID=async (req, res) => {
    let Result= await DetailsByIDService(req,DataModel)
    res.status(200).json(Result)
}


exports.DeleteProduct = async (req, res) => {
    try {
      const deleteId = req.params.id;
      const ObjectId = mongoose.Types.ObjectId;
       const checkAssociations = async (model) => {
        return await CheckAssociateService({ ProductID: ObjectId(deleteId) }, model);
      };
       const checkReturnAssociate = await checkAssociations(ReturnProductsModel);
      const checkPurchaseAssociate = await checkAssociations(PurchaseProductsModel);
      const checkSaleAssociate = await checkAssociations(SaleProductsModel);
       if (checkReturnAssociate) {
        res.status(200).json({ status: "associate", data: "Associate with Return" });
      } else if (checkPurchaseAssociate) {
        res.status(200).json({ status: "associate", data: "Associate with Purchase" });
      } else if (checkSaleAssociate) {
        res.status(200).json({ status: "associate", data: "Associate with Sale" });
      } else {
        const result = await DeleteService(req, DataModel);
        res.status(200).json(result);
      }
    } catch (error) {
      res.status(500).json({ status: "error", message: "Internal Server Error" });
    }
  };
  
exports.ProductsDropDown=async (req, res) => {
    let Result= await DropDownService(req,DataModel,{_id:1,Name:1})
    res.status(200).json(Result)
}
