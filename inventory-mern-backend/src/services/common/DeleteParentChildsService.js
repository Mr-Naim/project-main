const mongoose = require("mongoose");

const DeleteParentChildsService = async (req, res, ParentModel, ChildsModel, JoinPropertyName) => {
    const session = await mongoose.startSession();

    try {
        // Begin Transaction
        await session.startTransaction();

        // Parent Creation
        const DeleteID = req.params.id;
        const UserEmail = req.headers.email;

        const ChildQueryObject = {
            [JoinPropertyName]: DeleteID,
            UserEmail: UserEmail
        };

        const ParentQueryObject = {
            _id: DeleteID,
            UserEmail: UserEmail
        };

        // First Process
        const ChildsDelete = await ChildsModel.deleteMany(ChildQueryObject).session(session);

        // Second Process
        const ParentDelete = await ParentModel.deleteMany(ParentQueryObject).session(session);

        // Commit Transaction
        await session.commitTransaction();
        session.endSession();

        return { status: "success", Parent: ParentDelete, Childs: ChildsDelete };
    } catch (error) {
        // Roll Back Transaction
        await session.abortTransaction();
        session.endSession();
        return { status: "fail", data: error };
    }
};

module.exports = DeleteParentChildsService;
