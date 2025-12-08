import jwt from "jsonwebtoken";

export const generateToken = (id, role) => {
    return jwt.sign({ id, role }, process.env.JWT_SECRET || "default_secret_key_change_in_production", {
        expiresIn: "30d",
    });
};
