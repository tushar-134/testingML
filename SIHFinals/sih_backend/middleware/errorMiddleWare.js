const errorHandler = (err, req, res, next) => {
    console.log(err.stack);
    res.status(500).json({ message: err.message });
};

const notFound = (req, res, next) => {
    const error = new Error(`Not Found - ${req.originalUrl}`);
    res.status(404);
    next(error);
};

