const mongoose = require('mongoose');

exports.getErrorMessage = (err) => {
    if (err instanceof mongoose.MongooseError) {
        if (err.errors && Object.values(err.errors).length > 0) {
            return Object.values(err.errors).at(0).message;
        }
        return err.message || "An unknown Mongoose error occurred.";  // Fallback message
    } else if (err instanceof Error) {
        return err.message;
    }
    return "An unknown error occurred.";  // Generic fallback for unexpected errors
};
