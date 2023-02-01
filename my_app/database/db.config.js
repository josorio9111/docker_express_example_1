const { DB_USER, DB_PASSWORD, DB_HOST, DB_PORT, DB_NAME } = process.env;

const sUser = `mongodb://${DB_HOST}:${DB_PORT}/${DB_NAME}?authSource=admin`;
const cUser = `mongodb://${DB_USER}:${DB_PASSWORD}@${DB_HOST}:${DB_PORT}/${DB_NAME}?authSource=admin`;

module.exports = {
  url: DB_USER === "" ? sUser : cUser,
};
